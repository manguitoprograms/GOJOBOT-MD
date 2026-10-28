import fetch from 'node-fetch'

let juegosActivos = new Map()
let timersReto = new Map() // para guardar los timeout

class Conecta4 {
  constructor(jugador1Id, jugador1Nombre, jugador2Id, jugador2Nombre) {
    this.tablero = Array(6).fill(null).map(() => Array(7).fill('⚪'))
    this.columnas = Array(7).fill(0)
    this.jugador1 = { id: jugador1Id, nombre: jugador1Nombre, color: '🔴', simbolo: 'R' }
    this.jugador2 = { id: jugador2Id, nombre: jugador2Nombre, color: '🟡', simbolo: 'Y' }
    this.turnoActual = 1
    this.gameOver = false
    this.ganador = null
  }

  mostrarTablero() {
    let board = '1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣\n'
    for (let i = 0; i < 6; i++) board += this.tablero[i].join('') + '\n'
    return board
  }

  colocarFicha(columna, numJugador) {
    columna = parseInt(columna) - 1
    if (columna < 0 || columna > 6) return { exito: false, mensaje: '《✧》Columna inválida (1-7)' }
    if (this.columnas[columna] >= 6) return { exito: false, mensaje: '《✧》Columna llena' }

    const fila = 5 - this.columnas[columna]
    const jugador = numJugador === 1? this.jugador1 : this.jugador2

    this.tablero[fila][columna] = jugador.color
    this.columnas[columna]++

    if (this.verificarGanador(fila, columna, jugador.simbolo)) {
      this.gameOver = true
      this.ganador = jugador
      return { exito: true, ganador: true, jugador: jugador }
    }
    if (this.verificarEmpate()) {
      this.gameOver = true
      return { exito: true, empate: true }
    }

    this.turnoActual = numJugador === 1? 2 : 1
    return { exito: true }
  }

  verificarGanador(f, c, s) {
    const color = s === 'R'? '🔴' : '🟡'
    let count
    count=1; for(let i=c-1;i>=0&&this.tablero[f][i]===color;i--)count++; for(let i=c+1;i<7&&this.tablero[f][i]===color;i++)count++; if(count>=4)return true
    count=1; for(let i=f-1;i>=0&&this.tablero[i][c]===color;i--)count++; for(let i=f+1;i<6&&this.tablero[i][c]===color;i++)count++; if(count>=4)return true
    count=1; for(let i=1;f-i>=0&&c+i<7&&this.tablero[f-i][c+i]===color;i++)count++; for(let i=1;f+i<6&&c-i>=0&&this.tablero[f+i][c-i]===color;i++)count++; if(count>=4)return true
    count=1; for(let i=1;f-i>=0&&c-i>=0&&this.tablero[f-i][c-i]===color;i++)count++; for(let i=1;f+i<6&&c+i<7&&this.tablero[f+i][c+i]===color;i++)count++; if(count>=4)return true
    return false
  }
  verificarEmpate() { return this.columnas.every(col => col === 6) }
}

// Función para cancelar reto por tiempo
function cancelarReto(chatId, conn, retadoId) {
    if (juegosActivos.has(chatId)) {
        juegosActivos.delete(chatId)
        conn.sendMessage(chatId, {
            text: `《✧》 *Tiempo agotado*\n➮ @${retadoId.split('@')[0]} no aceptó el reto en 60s.`,
            mentions: [retadoId]
        })
    }
    timersReto.delete(chatId)
}

let handler = async (m, { conn, text, command }) => {
  const chatId = m.chat
  const userId = m.sender
  const userName = m.pushName || 'Usuario'

  try {
    // 1. INICIAR RETO
    if (command === 'c4' || command === 'conecta4') {
      if (juegosActivos.has(chatId)) {
        const sesion = juegosActivos.get(chatId)
        if (sesion.estado === 'pendiente') return m.reply('《✧》 Ya hay un reto pendiente. Usa `c4stop` para cancelarlo.')
        return m.reply('《✧》 Ya hay un juego activo. Usa `c4stop` para terminar.')
      }

      let jugador2Id = m.mentionedJid?.[0] || m.quoted?.sender
      if (!jugador2Id) return m.reply(`《✧》 Debes responder al mensaje de algún usuario para retarlo a conecta 4.`)

      if (jugador2Id === userId) return m.reply('《✧》 No puedes retarte a ti mismo.')
      if (jugador2Id === conn.user.jid) return m.reply('《✧》 Las partidas contra el Bot están desactivadas.')

      let jugador2Nombre
      try { jugador2Nombre = conn.getName(jugador2Id) || 'Jugador 2' }
      catch { jugador2Nombre = jugador2Id.split('@')[0] }

      juegosActivos.set(chatId, {
        estado: 'pendiente',
        retador: { id: userId, nombre: userName },
        retado: { id: jugador2Id, nombre: jugador2Nombre }
      })

      // NUEVO: Iniciar timer de 60s
      const timer = setTimeout(() => cancelarReto(chatId, conn, jugador2Id), 60000)
      timersReto.set(chatId, timer)

      let mensajeReto = `《✧》 *RETO DE CONECTA 4* 《✧》\n\n@${userId.split('@')[0]} ha retado a @${jugador2Id.split('@')[0]}\n\n➮ *@${jugador2Id.split('@')[0]}*, tienes *60 segundos* para aceptar.\n➮ Usa *.c4accept* para aceptar.\n➮ Usa *.c4deny* para rechazar.\n✎ *REGLAS EXPLICADAS:*\n➫ Conecta 4 fichas de tu color asignado.\n➫ Conecta en vertical, horizontal o diagonal.\n➫ Las fichas se apilan verticalmente.\n➫ Bloquea al rival evitando que conecte 4.`
      await conn.sendMessage(chatId, { text: mensajeReto, mentions: [userId, jugador2Id] }, { quoted: m })
      await conn.sendMessage(chatId, { react: { text: '⚔️', key: m.key } })
    }

    // 2. ACEPTAR
    if (command === 'c4accept' || command === 'c4aceptar') {
      if (!juegosActivos.has(chatId)) return m.reply('《✧》 No hay reto pendiente.')
      const sesion = juegosActivos.get(chatId)
      if (sesion.estado!== 'pendiente') return m.reply('《✧》 El juego ya está en marcha.')
      if (userId!== sesion.retado.id) return conn.sendMessage(chatId, { text: `《✧》 Solo @${sesion.retado.id.split('@')[0]} puede aceptar.`, mentions: [sesion.retado.id] }, { quoted: m })

      // NUEVO: Limpiar timer al aceptar
      clearTimeout(timersReto.get(chatId))
      timersReto.delete(chatId)

      const juego = new Conecta4(sesion.retador.id, sesion.retador.nombre, sesion.retado.id, sesion.retado.nombre)
      juegosActivos.set(chatId, { estado: 'jugando', juego })

      let mensaje = `《✧》 ¡RETO ACEPTADO! CONECTA 4\n\n➮ 🔴 *Jugador 1:* @${sesion.retador.id.split('@')[0]}\n➮ 🟡 *Jugador 2:* @${sesion.retado.id.split('@')[0]}\n\n${juego.mostrarTablero()}\n\n✰ *Reglas:* Conecta 4. Usa *.c4play <1-7>*\n\n✰ 🔴 Turno de @${sesion.retador.id.split('@')[0]}`
      await conn.sendMessage(chatId, { text: mensaje, mentions: [sesion.retador.id, sesion.retado.id] }, { quoted: m })
      await conn.sendMessage(chatId, { react: { text: '🎮', key: m.key } })
    }

    // 3. RECHAZAR
    if (command === 'c4deny' || command === 'c4rechazar') {
      if (!juegosActivos.has(chatId)) return m.reply('《✧》 No hay reto.')
      const sesion = juegosActivos.get(chatId)
      if (sesion.estado!== 'pendiente') return m.reply('《✧》 El juego ya comenzó.')
      if (userId!== sesion.retado.id && userId!== sesion.retador.id) return m.reply('《✧》 Solo los involucrados pueden cancelar.')

      // NUEVO: Limpiar timer al rechazar
      clearTimeout(timersReto.get(chatId))
      timersReto.delete(chatId)

      juegosActivos.delete(chatId)
      await m.reply('《✧》 El reto fue rechazado/cancelado.')
      await conn.sendMessage(chatId, { react: { text: '✖️', key: m.key } })
    }

    // 4. JUGAR
    if (command === 'c4play') {
      if (!text) return m.reply('《✧》 Usa: `c4play` <1-7>')
      if (!juegosActivos.has(chatId)) return m.reply('《✧》 No hay juego activo.')
      const sesion = juegosActivos.get(chatId)
      if (sesion.estado === 'pendiente') return m.reply('《✧》 Acepta el reto primero con `c4accept`.')

      const juego = sesion.juego
      if (juego.gameOver) return m.reply('《✧》 El juego ya terminó.')

      const jugadorActual = juego.turnoActual === 1? juego.jugador1 : juego.jugador2
      if (userId!== jugadorActual.id) return conn.sendMessage(chatId, { text: `《✧》 No es tu turno.\n➮ ${jugadorActual.color} Turno de: @${jugadorActual.id.split('@')[0]}`, mentions: [jugadorActual.id] }, { quoted: m })

      const resultado = juego.colocarFicha(text, juego.turnoActual)
      if (!resultado.exito) return m.reply(resultado.mensaje)

      let mensaje = `${juego.mostrarTablero()}\n`

      if (resultado.ganador) {
        mensaje += `\n✰ ¡@${resultado.jugador.id.split('@')[0]} GANÓ! ✰\nColor: ${resultado.jugador.color}`
        juegosActivos.delete(chatId)
        await conn.sendMessage(chatId, { react: { text: '🏆', key: m.key } })
        return conn.sendMessage(chatId, { text: mensaje, mentions: [resultado.jugador.id] }, { quoted: m })
      }
      if (resultado.empate) {
        mensaje += `\n✰ ¡EMPATE!`
        juegosActivos.delete(chatId)
        return m.reply(mensaje)
      }

      const siguienteJugador = juego.turnoActual === 1? juego.jugador1 : juego.jugador2
      mensaje += `\n➮ ${siguienteJugador.color} Turno de @${siguienteJugador.id.split('@')[0]}`
      return conn.sendMessage(chatId, { text: mensaje, mentions: [siguienteJugador.id] }, { quoted: m })
    }

    // 5. STOP
    if (command === 'c4stop') {
      if (!juegosActivos.has(chatId)) return m.reply('《✧》 No hay juego activo.')
      const sesion = juegosActivos.get(chatId)

      // NUEVO: Limpiar timer si se cancela manual
      if (timersReto.has(chatId)) {
          clearTimeout(timersReto.get(chatId))
          timersReto.delete(chatId)
      }

      const id1 = sesion.estado === 'pendiente'? sesion.retador.id : sesion.juego.jugador1.id
      const id2 = sesion.estado === 'pendiente'? sesion.retado.id : sesion.juego.jugador2.id
      if (userId!== id1 && userId!== id2) return m.reply('《✧》 Solo los jugadores pueden cancelar.')
      juegosActivos.delete(chatId)
      await m.reply('✰ Partida o solicitud cancelada.')
      await conn.sendMessage(chatId, { react: { text: '✔️', key: m.key } })
    }

  } catch (e) {
    console.error(e)
    await conn.sendMessage(chatId, { text: `《✧》Error: ${e.message}` }, { quoted: m })
  }
}

handler.help = ['conecta4 @user', 'c4accept', 'c4deny', 'c4play <columna>', 'c4stop']
handler.tags = ['game']
handler.command = ['conecta4', 'c4', 'c4accept', 'c4aceptar', 'c4deny', 'c4rechazar', 'c4play', 'c4stop']

export default handler
