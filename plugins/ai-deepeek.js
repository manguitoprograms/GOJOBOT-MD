import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text?.trim()) return conn.reply(m.chat, `✿ Usa: *${usedPrefix + command} hola*`, m)

  try {
    await conn.sendPresenceUpdate('composing', m.chat)
    await m.react('🕒')
    let res = await fetch(`${api.url}/ai/chat?prompt=${encodeURIComponent(text)}&model=deepseek/deepseek-v4-flash`)
      .then(r => r.json())

    if (!res.status || !res.result) throw new Error('Sin respuesta')

    await conn.reply(m.chat, res.result, m)
    await m.react('✔️')
  } catch (e) {
    conn.reply(m.chat, `🌾 Error: ${e.message}`, m)
  }
}

handler.command = ['deepseek', 'dp', 'deep']
handler.tags = ['ai']
handler.help = ['deepseek <texto>']

export default handler