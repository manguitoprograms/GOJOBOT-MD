
const preguntas = [
  // 🟢 RONDA 1: FÁCIL
  { nivel: 'facil', pregunta: '¿De qué anime es Satoru Gojo?', opciones: ['Naruto', 'One Piece', 'Jujutsu Kaisen', 'Dragon Ball'], correcta: 2 },
  { nivel: 'facil', pregunta: '¿De qué color es el cabello de Gojo?', opciones: ['Negro', 'Blanco', 'Rojo', 'Verde'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Qué tipo de proyecto es GOJOBOT-MD?', opciones: ['Un bot multidispositivo para WhatsApp', 'Un videojuego', 'Una red social', 'Un editor de fotos'], correcta: 0 },
  { nivel: 'facil', pregunta: '¿Cómo se llama la técnica ocular especial de Gojo?', opciones: ['Sharingan', 'Byakugan', 'Rinnegan', 'Seis Ojos'], correcta: 3 },
  { nivel: 'facil', pregunta: '¿Qué aplicación de mensajería utiliza GOJOBOT-MD?', opciones: ['Telegram exclusivamente', 'WhatsApp', 'Snapchat', 'Pinterest'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Qué es Satoru Gojo?', opciones: ['Un pirata', 'Un detective', 'Un hechicero', 'Un astronauta'], correcta: 2 },
  { nivel: 'facil', pregunta: '¿Qué entorno de ejecución utiliza GOJOBOT-MD?', opciones: ['Node.js', 'Unity', 'Scratch', 'Excel'], correcta: 0 },
  { nivel: 'facil', pregunta: '¿Qué suele llevar Gojo sobre los ojos?', opciones: ['Un casco', 'Un sombrero', 'Una máscara de hierro', 'Una venda o antifaz'], correcta: 3 },
  { nivel: 'facil', pregunta: '¿Qué biblioteca se utiliza para conectar GOJOBOT-MD con WhatsApp?', opciones: ['Pygame', 'Baileys', 'Laravel', 'NumPy'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Cuál es el nombre del proyecto de bot?', opciones: ['NARUTO-MD', 'MEGUMI-BOT', 'GOJOBOT-MD', 'SUKUNA-MD'], correcta: 2 },

  // 🔵 RONDA 2: INTERMEDIO
  { nivel: 'media', pregunta: '¿Cómo se llama la expansión de dominio de Gojo?', opciones: ['Santuario Malevolente', 'Vacío Inconmensurable', 'Jardín de Sombras', 'Prisión de Hierro'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Qué lenguaje se utiliza habitualmente con Node.js?', opciones: ['JavaScript', 'CSS exclusivamente', 'HTML exclusivamente', 'SQL exclusivamente'], correcta: 0 },
  { nivel: 'media', pregunta: '¿Cómo se llama la técnica maldita relacionada con la manipulación del espacio de Gojo?', opciones: ['Respiración del Agua', 'Diez Sombras', 'Limitless (Ilimitado)', 'Manipulación de sangre'], correcta: 2 },
  { nivel: 'media', pregunta: '¿Para qué sirve un plugin en un bot?', opciones: ['Cambiar físicamente el teléfono', 'Aumentar la pantalla', 'Eliminar Internet', 'Añadir funciones o comandos'], correcta: 3 },
  { nivel: 'media', pregunta: '¿Qué color se asocia con la técnica Azul de Gojo?', opciones: ['Amarillo', 'Azul', 'Naranja', 'Rosa'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Qué archivo suele contener las dependencias de un proyecto Node.js?', opciones: ['package.json', 'photo.png', 'video.mp4', 'wallpaper.jpg'], correcta: 0 },
  { nivel: 'media', pregunta: '¿Qué efecto produce principalmente Azul, una aplicación de Limitless?', opciones: ['Controlar el fuego', 'Crear copias', 'Generar atracción', 'Curar cualquier enfermedad'], correcta: 2 },
  { nivel: 'media', pregunta: '¿Qué hace normalmente un handler en un bot?', opciones: ['Carga la batería', 'Diseña teléfonos', 'Cambia el operador', 'Procesa eventos y mensajes'], correcta: 3 },
  { nivel: 'media', pregunta: '¿Qué técnica de Gojo se asocia con la repulsión?', opciones: ['Azul', 'Rojo', 'Diez Sombras', 'Manipulación de sangre'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Qué significa que un bot sea multidispositivo?', opciones: ['Está diseñado para funcionar mediante una conexión multidispositivo', 'Solo funciona en una computadora', 'Es un sistema operativo', 'No necesita dispositivos'], correcta: 0 },

  // 🟣 RONDA 3: DIFÍCIL
  { nivel: 'dificil', pregunta: '¿Qué técnica resulta de la combinación de Azul y Rojo de Gojo?', opciones: ['Dragón de Agua', 'Flecha de Fuego', 'Púrpura (Hollow Purple)', 'Espada del Trueno'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Qué ventaja especial proporcionan los Seis Ojos?', opciones: ['Volar sin límite', 'Volverse invisible', 'Controlar el tiempo', 'Percepción extraordinaria y uso muy eficiente de la energía maldita'], correcta: 3 },
  { nivel: 'dificil', pregunta: '¿Qué biblioteca de JavaScript se utiliza habitualmente para crear interfaces de usuario?', opciones: ['Baileys', 'React', 'FFmpeg', 'Nodemailer'], correcta: 1 },
  { nivel: 'dificil', pregunta: '¿Qué sucede cuando un mensaje activa un comando del bot?', opciones: ['El bot puede procesar el mensaje y ejecutar una función', 'El teléfono se reinicia', 'WhatsApp se elimina', 'Se inicia una llamada automáticamente'], correcta: 0 },
  { nivel: 'dificil', pregunta: '¿Qué efecto tiene Vacío Inconmensurable sobre quienes quedan atrapados en él?', opciones: ['Los convierte en animales', 'Les concede inmortalidad', 'Los somete a una cantidad abrumadora de información y estímulos', 'Los transporta a otro país'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Qué archivo puede utilizarse como punto de entrada de un proyecto Node.js?', opciones: ['fondo.jpg', 'musica.mp3', 'imagen.png', 'index.js'], correcta: 3 },
  { nivel: 'dificil', pregunta: '¿Para qué sirve una sesión de autenticación en un bot multidispositivo?', opciones: ['Guardar solamente imágenes', 'Mantener la información necesaria para autenticar la conexión', 'Aumentar la resolución de la cámara', 'Editar vídeos'], correcta: 1 },
  { nivel: 'dificil', pregunta: '¿Cuál es la relación entre Azul y Rojo en las técnicas de Gojo?', opciones: ['Azul se asocia con la atracción y Rojo con la repulsión', 'Ambos son técnicas de fuego', 'Ambos sirven exclusivamente para curar', 'Rojo pertenece a las Diez Sombras'], correcta: 0 },
  { nivel: 'dificil', pregunta: '¿Qué es una dependencia en programación?', opciones: ['Un archivo de música', 'Una contraseña del teléfono', 'Una biblioteca o paquete utilizado por el proyecto', 'Un fondo de pantalla'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Qué conviene hacer antes de modificar archivos importantes del bot?', opciones: ['Borrar todo el proyecto', 'Eliminar las dependencias', 'Ignorar los errores', 'Crear una copia de seguridad'], correcta: 3 },

  // 🔴 RONDA 4: EXPERTO
  { nivel: 'experto', pregunta: '¿Qué describe mejor Limitless, la técnica de Gojo?', opciones: ['Una técnica para controlar plantas', 'Una técnica maldita relacionada con la manipulación del espacio', 'Una técnica para viajar a otros planetas', 'Una técnica de invocación de dragones'], correcta: 1 },
  { nivel: 'experto', pregunta: '¿Qué es una API?', opciones: ['Un tipo de batería', 'Un formato exclusivo de imagen', 'Un modelo de teléfono', 'Una interfaz que permite la comunicación entre componentes de software'], correcta: 3 },
  { nivel: 'experto', pregunta: '¿Qué buena práctica ayuda a evitar que una actualización rompa el bot?', opciones: ['Cambiar todos los archivos al azar', 'Ignorar los errores', 'Probar los cambios y conservar una copia de seguridad', 'Eliminar los registros de errores'], correcta: 2 },
  { nivel: 'experto', pregunta: '¿Para qué puede utilizarse un archivo .env?', opciones: ['Para almacenar exclusivamente imágenes', 'Para reemplazar JavaScript', 'Para aumentar la memoria RAM', 'Para configurar variables de entorno'], correcta: 3 },
  { nivel: 'experto', pregunta: '¿Qué práctica es más segura para las credenciales de un bot?', opciones: ['Publicarlas en el grupo', 'Mantenerlas privadas y protegerlas', 'Compartirlas con todos', 'Incluirlas en el anuncio'], correcta: 1 },
  { nivel: 'experto', pregunta: '¿Qué relación existe entre los Seis Ojos y Limitless?', opciones: ['Son conceptos diferentes que complementan las habilidades de Gojo', 'Son dos nombres para su dominio', 'Ambos pertenecen a Megumi', 'Son armas físicas'], correcta: 0 },
  { nivel: 'experto', pregunta: '¿Qué debe hacer un administrador si dos participantes terminan empatados?', opciones: ['Elegir a su amigo', 'Cambiar las reglas después del evento', 'Aplicar el criterio de desempate anunciado previamente', 'Dar la victoria automáticamente al primero que escriba'], correcta: 2 },
  { nivel: 'experto', pregunta: '¿Qué representa Púrpura en las técnicas de Gojo?', opciones: ['Una técnica de curación de Shoko', 'Una invocación de Megumi', 'Una técnica de fuego de Sukuna', 'Una combinación de Azul y Rojo'], correcta: 3 },
  { nivel: 'experto', pregunta: '¿Qué tecnología se utiliza para ejecutar JavaScript fuera del navegador en GOJOBOT-MD?', opciones: ['Photoshop', 'Node.js', 'Microsoft Word', 'PowerPoint'], correcta: 1 },
  { nivel: 'experto', pregunta: '¿Cuál es el objetivo principal de una competencia comunitaria bien organizada?', opciones: ['Eliminar la comunidad', 'Competir sin reglas', 'Fomentar el conocimiento, la diversión y la participación', 'Obligar a todos a enviar mensajes'], correcta: 2 },

  // ⚫ RONDA 5: DESAFÍO FINAL
  { nivel: 'final', pregunta: '¿Qué personaje es conocido como el Rey de las Maldiciones?', opciones: ['Yuji Itadori', 'Satoru Gojo', 'Megumi Fushiguro', 'Ryomen Sukuna'], correcta: 3 },
  { nivel: 'final', pregunta: '¿Cómo se llama el estudiante de Gojo que es el protagonista principal de Jujutsu Kaisen?', opciones: ['Yuji Itadori', 'Kento Nanami', 'Toji Fushiguro', 'Yuta Okkotsu'], correcta: 0 },
  { nivel: 'final', pregunta: '¿Qué personaje utiliza la técnica de las Diez Sombras?', opciones: ['Satoru Gojo', 'Megumi Fushiguro', 'Kento Nanami', 'Aoi Todo'], correcta: 1 },
  { nivel: 'final', pregunta: '¿Qué herramienta de Node.js permite instalar paquetes desde el registro de npm?', opciones: ['Paint', 'Bloc de notas', 'npm', 'Bluetooth'], correcta: 2 },
  { nivel: 'final', pregunta: '¿Qué archivo se utiliza habitualmente para ignorar archivos al usar Git?', opciones: ['package.png', 'index.mp3', 'config.jpg', '.gitignore'], correcta: 3 },
  { nivel: 'final', pregunta: '¿Qué debe hacer un bot si pierde la conexión con WhatsApp?', opciones: ['Gestionar la desconexión y, cuando corresponda, intentar reconectarse de forma controlada', 'Borrar automáticamente todo el proyecto', 'Cambiar todas las contraseñas', 'Eliminar los archivos JavaScript'], correcta: 0 },
  { nivel: 'final', pregunta: '¿Qué técnica de Gojo se asocia con el color Rojo?', opciones: ['Atracción', 'Repulsión', 'Invocación de lobos', 'Manipulación de sangre'], correcta: 1 },
  { nivel: 'final', pregunta: '¿Qué afirmación sobre el uso de plugins en GOJOBOT-MD es correcta?', opciones: ['Todos los plugins son necesariamente imágenes', 'Los plugins no pueden contener código', 'Los plugins pueden añadir funcionalidades al bot', 'Los plugins siempre son archivos de audio'], correcta: 2 },
  { nivel: 'final', pregunta: '¿Qué describe mejor el funcionamiento de una expansión de dominio en Jujutsu Kaisen?', opciones: ['Una aplicación para editar vídeos', 'Una conexión a Internet', 'Una herramienta de programación', 'Una técnica avanzada que crea un espacio de dominio con efectos propios'], correcta: 3 },
  { nivel: 'final', pregunta: '¿Cuál es la misión del GOJOBOT-MD × SATORU GOJO CHALLENGE?', opciones: ['Premiar únicamente a los administradores', 'Combinar conocimientos de GOJOBOT-MD, anime y participación comunitaria', 'Promover el spam', 'Evitar que los usuarios participen'], correcta: 1 }
]

const usadas = new Set()
const ultimaPregunta = new Map()

let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  const args = (text || '').trim().toLowerCase()
  const esAdmin = isAdmin || isOwner

  if (!esAdmin) {
    return m.reply('⛔ Solo Administración y Soporte pueden utilizar este comando.')
  }

  if (args === 'respuesta') {
    const ultima = ultimaPregunta.get(m.chat)
    if (!ultima) {
      return m.reply('⚠️ Todavía no hay una pregunta registrada en este grupo.')
    }

    return m.reply(
      `🔐 *FICHA DE ADMINISTRACIÓN*\n\n` +
      `🏆 GOJOBOT-MD × SATORU GOJO CHALLENGE\n\n` +
      `❓ ${ultima.pregunta}\n` +
      `✅ Respuesta correcta: ${String.fromCharCode(65 + ultima.correcta)}. ${ultima.opciones[ultima.correcta]}`
    )
  }

  const niveles = ['facil', 'media', 'dificil', 'experto', 'final']

  if (args && !niveles.includes(args)) {
    return m.reply(
      '📋 *COMANDOS DEL EVENTO 2026*\n\n' +
      '• .pregunta\n' +
      '• .pregunta facil\n' +
      '• .pregunta media\n' +
      '• .pregunta dificil\n' +
      '• .pregunta experto\n' +
      '• .pregunta final\n' +
      '• .pregunta respuesta'
    )
  }

  const disponibles = preguntas.filter((p, i) =>
    (!args || p.nivel === args) && !usadas.has(i)
  )

  if (!disponibles.length) {
    return m.reply(
      `⚠️ Ya se agotaron las preguntas${args ? ` del nivel ${args}` : ''}.\n` +
      'No se repetirán hasta que reinicies el plugin.'
    )
  }

  const elegida = disponibles[Math.floor(Math.random() * disponibles.length)]
  const indice = preguntas.indexOf(elegida)

  

try {
  const encuesta = await conn.sendMessage(m.chat, {
    poll: {
      name: `💚🔥 GOJOBOT-MD × SATORU GOJO CHALLENGE 🔥💚\n\n⏳ ¡SOLO TIENEN 1 MINUTO Y MEDIO PARA RESPONDER!\n\n${elegida.pregunta}`,
      values: elegida.opciones.map((opcion, i) =>
        `${String.fromCharCode(65 + i)}) ${opcion}`
      ),
      selectableCount: 1
    }
  }, { quoted: m })

  usadas.add(indice)
  ultimaPregunta.set(m.chat, elegida)

  // Esperar 90 segundos y eliminar la encuesta
  setTimeout(async () => {
    try {
      await conn.sendMessage(m.chat, {
        delete: encuesta.key
      })
      console.log('[GOJOBOT-MD] Solicitud de eliminación enviada.')
    } catch (error) {
      console.error('[GOJOBOT-MD] Error al eliminar encuesta:', error)
    }
  }, 90000)

} catch (error) {
  console.error('[GOJOBOT-MD] Error al publicar encuesta:', error)
  return m.reply(`❌ No se pudo publicar la encuesta: ${error.message}`)
}
}

handler.help = [
  'pregunta',
  'pregunta facil',
  'pregunta media',
  'pregunta dificil',
  'pregunta experto',
  'pregunta final',
  'pregunta respuesta'
]
handler.help = ['pregunta']
handler.tags = ['evento']
handler.command = ['pregunta']
handler.group = true

export default handler
