import fetch from 'node-fetch'
import { prepareWAMessageMedia } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text }) => {
  if (!text)
    return conn.reply(m.chat, '`ꕥ` Ingrese el *nombre* de una canción de *soundcloud*.', m)

  try {
    const api = `${global.api.url}/api/play/soundcloud?q=${encodeURIComponent(text)}`
    const res = await fetch(api, { signal: AbortSignal.timeout(20000) })
    const json = await res.json()

    if (!json.status || !json.result)
      throw 'No se encontró la canción.'

    const data = json.result
    const { title, artist, duration, created, plays, likes, comments, genre, description, image, link, url
    } = data

    const linkPreview = image ? (await prepareWAMessageMedia({ image: { url: image }}, { upload: conn.waUploadToServer, mediaTypeOverride: 'thumbnail-link' }).then(({ imageMessage }) => ({ 
      'canonical-url': link, 
      'matched-text': link, 
      title: `✧ Soundcloud • Music ✧`, 
      description: `🍡 ${artist}`, 
      jpegThumbnail: imageMessage?.jpegThumbnail ? Buffer.from(imageMessage.jpegThumbnail) : undefined, 
      highQualityThumbnail: imageMessage || undefined 
    }))) : undefined

    await conn.sendMessage(m.chat, {
      text: `ׄ⬭ *Título :* ${title}
ׄ⬭ *Artista :* ${artist}
ׄ⬭ *Duración:* ${duration}
ׄ⬭ *Likes :* ${likes}
ׄ⬭ *Comentarios :* ${comments}
ׄ⬭ *Play :* ${plays}
ׄ⬭ *Genero :* ${genre}
ׄ⬭ *Publicado :* ${created}
ׄ⬭ *link :* ${link}`,
      linkPreview,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true
      }
    }, { quoted: m })

    const audioRes = await fetch(url)

    if (!audioRes.ok) throw 'Error al descargar el audio.'

    const buffer = await audioRes.buffer()

    await conn.sendMessage(m.chat, {
      document: buffer,
      mimetype: 'audio/mp4',
      fileName: `${title}.m4a`
    }, { quoted: m })
    
  } catch (e) {
    conn.reply(m.chat, `> ✿︎ An unexpected error occurred while executing command *${usedPrefix + command}*.\n> *[Error: ${e.message}]*`, m)
  }
}

handler.help = ['soundcloud']
handler.tags = ['download']
handler.command = ['soundcloud', 'scplay', 'scdl']

export default handler