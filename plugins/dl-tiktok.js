import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`*ꕥ Por favor, ingresa un término de búsqueda o el enlace de TikTok.*`)

  const text = args.join(' ')
  const isUrl = /tiktok\.com|vt\.tiktok\.com/i.test(text)

  try {
    await m.reply('➪ Procesando contenido de TikTok...')

    if (isUrl) {
      const apiUrl = `${api.url}/download/tiktok?url=${encodeURIComponent(text)}`
      const res = await fetch(apiUrl)
      const json = await res.json()
      if (!json.status || !json.data) throw 'Enlace inválido o sin contenido descargable.'

      const d = json.data
      const stats = d.stats || {}
      const authorName = d.author?.name || d.author?.nickname || 'N/A'
      const authorUser = d.author?.username || 'N/A'

      const cap = `    *乂 TIKTOK - INFO 乂*

   *｡ Título ›* ${d.title || 'Sin título'}
   *｡ Autor ›* ${authorName} (@${authorUser})
   *｡ Tipo ›* ${d.type || 'N/A'}
   *｡ Duración ›* ${d.duration || 'N/A'}
   *｡ Tamaño ›* ${d.size || 'N/A'}
   *｡ Región ›* ${d.region || 'N/A'}
   *｡ Fecha ›* ${d.date || 'N/A'}

   *｡ Likes ›* ${stats.likes || '0'}
   *｡ Comentarios ›* ${stats.comments || '0'}
   *｡ Vistas ›* ${stats.views || '0'}
   *｡ Favoritos ›* ${stats.favorites || '0'}
   *｡ Shares ›* ${stats.shares || '0'}
   *｡ Descargas ›* ${stats.downloads || '0'}

   *｡ Audio ›* ${d.audio || 'N/A'}
   *｡ Enlace ›* ${d.link || text}`.trim()

      if (d.type === 'video') {
        const videoUrl = d.media?.download || d.media?.watermark || d.watermark
        if (!videoUrl) throw 'No se encontró enlace de video.'
        await conn.sendMessage(m.chat, {
          video: { url: videoUrl },
          caption: cap,
          mimetype: 'video/mp4'
        }, { quoted: m })

      } else if (d.type === 'image') {
        const images = d.media?.images || []
        if (!images.length) throw 'No se encontraron imágenes.'

        const medias = images.map((img, i) => ({
          type: 'image',
          data: { url: img },
          caption: i === 0 ? cap : ''
        }))

        if (conn.sendSylphy) {
          await conn.sendSylphy(m.chat, medias, { quoted: m })
        } else if (conn.sendAlbumMessage) {
          const albumMedias = images.map((img, i) => ({
            image: { url: img },
            caption: i === 0 ? cap : ''
          }))
          await conn.sendAlbumMessage(m.chat, albumMedias, { quoted: m })
        } else {
          for (const media of medias) {
            await conn.sendMessage(m.chat, {
              image: { url: media.data.url },
              caption: media.caption
            }, { quoted: m })
          }
        }

        const audioUrl = d.audio_download || d.music_info?.download
        if (audioUrl) {
          await conn.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mp4',
            fileName: 'tiktok_audio.mp4'
          }, { quoted: m })
        }

      } else {
        throw `Tipo de contenido no soportado: ${d.type}`
      }

    } else {
      const searchUrl = `${api.url}/search/tiktok?q=${encodeURIComponent(text)}&count=10`
      const res = await fetch(searchUrl)
      const json = await res.json()
      if (!json.status || !json.data?.length) throw 'No se encontraron resultados.'

      const results = json.data.filter(v => v.download?.video).slice(0, 10)
      if (!results.length) throw 'No se encontraron videos válidos.'

      const makeCap = (v, i) => {
        const s = v.stats || {}
        return `*乂 TIKTOK - ${i + 1} 乂*

   *｡ Título ›* ${v.title || 'Sin título'}
   *｡ Autor ›* ${v.author?.nickname || 'N/A'} (@${v.author?.username || 'N/A'})
   *｡ Duración ›* ${v.duration || 'N/A'}
   *｡ Tamaño ›* ${v.size || 'N/A'}
   *｡ Fecha ›* ${v.date || 'N/A'}

   *｡ Likes ›* ${s.likes || '0'}
   *｡ Comentarios ›* ${s.comments || '0'}
   *｡ Vistas ›* ${s.views || '0'}
   *｡ Favoritos ›* ${s.favorites || '0'}
   *｡ Shares ›* ${s.shares || '0'}

   *｡ Música ›* ${v.music?.title || 'N/A'}
   *｡ Enlace ›* ${v.url || 'N/A'}`
      }

      const medias = results.map((v, i) => ({
        type: 'video',
        data: { url: v.download.video },
        caption: makeCap(v, i)
      }))

      if (conn.sendSylphy) {
        await conn.sendSylphy(m.chat, medias, { quoted: m })
      } else if (conn.sendAlbumMessage) {
        const albumMedias = results.map((v, i) => ({
          video: { url: v.download.video },
          caption: makeCap(v, i)
        }))
        await conn.sendAlbumMessage(m.chat, albumMedias, { quoted: m })
      } else {
        for (const media of medias) {
          await conn.sendMessage(m.chat, {
            video: { url: media.data.url },
            caption: media.caption,
            mimetype: 'video/mp4'
          }, { quoted: m })
        }
      }
    }

  } catch (e) {
    m.reply(`> ✿︎ An unexpected error occurred while executing command *${usedPrefix + command}*.\n> *[Error: ${e.message}]*`)
  }
}

handler.help = ['tiktok', 'tt']
handler.tags = ['download', 'search']
handler.command = ['tiktok', 'tt', 'tiktoks', 'tts']
handler.group = true

export default handler