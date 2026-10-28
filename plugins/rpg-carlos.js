import fetch from 'node-fetch'

const handler = async (m, { conn, args, command }) => {
  const senderNumber = m.sender.split('@')[0]

  if (['quieropene'].includes(command)) {
    if (!global.db.data.users[m.sender]) {
      global.db.data.users[m.sender] = { 
        lastclaim: 0,
        coin: 0,
        exp: 0
      }
    }

    const user = global.db.data.users[m.sender]
    const cooldown = 86400000
    const now = Date.now()
    const timeRemaining = user.lastclaim + cooldown - now

    if (timeRemaining > 0) {
      return conn.reply(
        m.chat,
        `🕒 *Ya reclamaste tu recompensa*\n\n⌛ Próxima recompensa en: *${msToTime(timeRemaining)}*`,
        m
      )
    }

    const rewardCoins = 40000
    const rewardExp = 2500

    user.coin += rewardCoins
    user.exp += rewardExp
    user.lastclaim = now

    const senderName = await conn.getName(m.sender)

    const texto = `╔═══_.·:·.☽✧ RECOMPENSA ✧☾.·:·._═══╗
┃
┃ Usuario: ${senderName}
┃ ID: ${senderNumber}
┃
╠══════════════════════════════════╣
┃ RECURSOS OBTENIDOS:
┃ 💦 Goticas: 40,000
┃ 🎉 Experiencia: 2,500 XP
┃
╠══════════════════════════════════╣
┃ "Sabía que te gustaba el pene,
┃ aver toma el mio :3"
┃
┃ Próxima recompensa en: 24 horas
╚══════════════════════════════════╝
         『 GojoBot - MD 🌟 』`

    const imageUrl = 'https://files.catbox.moe/jzppv9.jpg'

    await conn.sendMessage(
      m.chat,
      {
        image: { url: imageUrl },
        caption: texto,
        mentions: [m.sender]
      },
      { quoted: m }
    )
  }
}

handler.help = ['quieropene']
handler.tags = ['rpg']
handler.command = ['quieropene']
handler.group = true

export default handler

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60)
  let minutes = Math.floor((duration / 60000) % 60)
  let hours = Math.floor((duration / 3600000) % 24)
  let days = Math.floor(duration / 86400000)
  return `${days ? days + 'd ' : ''}${hours ? hours + 'h ' : ''}${minutes ? minutes + 'm ' : ''}${seconds}s`
      }
