import fetch from 'node-fetch'

function isPinterestUrl(str) {
  return /^(https?:\/\/)?(www\.)?(pin\.it|pinterest\.com|m\.pinterest\.com)\//i.test(str.trim())
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`*ꕥ Por favor, ingresa un término de búsqueda o el enlace de Pinterest.*`)

  let q = args.join(' ')

  try {
    // ─── enlace ───
    if (isPinterestUrl(q)) {
      await m.reply(`🍄 *Procesando enlace...*`)

      const res = await fetch(`${api.url}/download/pinterest?url=${encodeURIComponent(q)}`)
      const json = await res.json()

      if (!json.status || !json.data?.media) throw 'No se pudo obtener el contenido'

      const d = json.data
      const author = d.author || {}
      const isVideo = d.type === 'video'

      const caption = `*乂 PINTEREST - ${isVideo ? 'VIDEO' : 'IMAGE'} 乂*

*｡ Título ›* ${d.title || 'N/A'}
*｡ Descripción ›* ${d.description || 'N/A'}
*｡ Autor ›* ${author.name || 'N/A'} (@${author.username || 'N/A'})
*｡ Seguidores ›* ${author.followers ?? 'N/A'}
*｡ Pins ›* ${author.pins ?? 'N/A'}
*｡ Likes ›* ${d.likes ?? 'N/A'}
*｡ Comentarios ›* ${d.comments ?? 'N/A'}
*｡ Fecha ›* ${d.date || 'N/A'}
*｡ Enlace ›* ${d.pinterest_url || q}`

      if (isVideo) {
        await conn.sendMessage(m.chat, {
          video: { url: d.media },
          caption,
          mimetype: 'video/mp4'
        }, { quoted: m })
      } else {
        await conn.sendMessage(m.chat, {
          image: { url: d.media },
          caption
        }, { quoted: m })
      }
      return
    }

    // ─── query ───
    await m.reply(`🍄 *Buscando:* ${q}`)
    const apiUrl = `${api.url}/search/pinterest?q=${encodeURIComponent(q)}`
    const res = await fetch(apiUrl)
    const json = await res.json()
    if (!json.status || !json.result?.images?.length) throw 'No se encontraron imágenes'
    const images = json.result.images.slice(0, 10)
    const medias = images.map((url, i) => ({
      image: { url: url },
      caption: i === 0 ? `*乂 PINTEREST - ${q.toUpperCase()} 乂*\n\n*• Total:* ${json.count || images.length}\n*• Búsqueda:* ${q}` : ''
    }))

    if (conn.sendAlbumMessage) {
      await conn.sendAlbumMessage(m.chat, medias, { quoted: m })
    } else {
      for (let media of medias) {
        await conn.sendMessage(m.chat, media, { quoted: m })
        await new Promise(r => setTimeout(r, 100))
      }
    }
  } catch (e) {
    m.reply(`> ✿︎ An unexpected error occurred while executing command *${usedPrefix + command}*.\n> *[Error: ${e.message}]*`)
  }
}

handler.help = ['pinterest']
handler.command = ['pinterest', 'pin']
handler.tags = ["download"]
handler.group = true

export default handler