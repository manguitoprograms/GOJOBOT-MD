import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    await m.react('🕒')
    let url = command === 'neko' 
      ? `${api.url}/random/neko`
      : `${api.url}/random/waifu/v2`

    let txt = command === 'neko'
      ? '🍡 Aquí tienes tu *Neko*.'
      : '🍡 Aquí tienes tu *Waifu*.'

    await conn.sendFile(m.chat, url, 'thumbnail.jpg', txt, m)
    await m.react('✔️')
  } catch (error) {
    await conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`, m)
  }
}

handler.help = ['waifu', 'neko']
handler.tags = ['anime']
handler.command = ['waifu', 'neko']
handler.group = true

export default handler