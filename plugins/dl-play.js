import yts from 'yt-search'
import fetch from 'node-fetch'
import { prepareWAMessageMedia } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text?.trim()) return conn.reply(m.chat, `✿ Ejemplo: *${usedPrefix + command} diles - Bad Bunny*`, m)

  try {
    await m.react("🕐")
    let search = await yts(text)
    let d = search.videos[0]
    if (!d) return conn.reply(m.chat, "✿ No se encontraron resultados.", m)

    let caption = `    ˚ · ๑୧ YOᑌTᑌᗷᗴ ᗪOᗯᑎᒪOᗩᗪᗴᖇ ✧
    
*｡ 𝚃𝙸𝚃𝚄𝙻𝙾 ›* ${d.title}
*｡ 𝙲𝙰𝙽𝙰𝙻 ›* ${d.author.name}
*｡ 𝙳𝚄𝚁𝙰𝙲𝙸𝙾𝙽 ›* ${d.timestamp}
*｡ 𝙿𝚄𝙱𝙻𝙸𝙲𝙰𝙳𝙾 ›* ${d.ago}
*｡ 𝚅𝙸𝚂𝚃𝙰𝚂 ›* ${d.views.toLocaleString()}
*｡ 𝙴𝙽𝙻𝙰𝙲𝙴 ›* ${d.url}`

    await conn.sendMessage(m.chat, {
      text: caption,
      linkPreview: d.thumbnail ? (await prepareWAMessageMedia(
        { image: { url: d.thumbnail } },
        { upload: conn.waUploadToServer, mediaTypeOverride: 'thumbnail-link' }
      ).then(({ imageMessage }) => ({
        'canonical-url': d.url,
        'matched-text': d.url,
        title: `𖹭  ׄ  ְ 🍡 Y O U T U B E - M U S I C   ݁      ✩   ݂      ݁  `,
        description: dev,
        jpegThumbnail: imageMessage?.jpegThumbnail ? Buffer.from(imageMessage.jpegThumbnail) : undefined,
        highQualityThumbnail: imageMessage || undefined
      }))) : undefined,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: false
      }
    }, { quoted: m })

    let apiRes = await (await fetch(`${api.url}/download/savetube?url=${d.url}&type=audio`)).json()
    let dl = apiRes.data?.dl
    if (!dl) throw new Error("No se pudo obtener el enlace de descarga")

    await conn.sendMessage(m.chat, {
      audio: { url: dl },
      mimetype: 'audio/mpeg',
      fileName: `${d.title}.mp3`
    }, { quoted: m })
    await m.react("✔️")

  } catch (e) {
    conn.reply(m.chat, `> ✿︎ An unexpected error occurred while executing command *${usedPrefix + command}*.\n> *[Error: ${e.message || e}]*`, m)
  }
}

handler.command = ['play', 'audio', 'mp3', 'ytaudio']
handler.tags = ['download']
handler.help = ['play <query/url>']
handler.group = true
export default handler