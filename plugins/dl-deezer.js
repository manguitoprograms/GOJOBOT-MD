import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text?.trim()) return conn.reply(m.chat, "✿ *Por favor, proporciona el nombre de una canción o artista.*", m)
  try {
    const s = await (await fetch(`${api.url}/search/deezer?q=${encodeURIComponent(text)}&limit=1`)).json()
    if (!s.status || !s.data?.length) throw "Sin resultados"
    const song = s.data[0]

    await conn.sendMessage(m.chat, {
      image: { url: song.thumbnail },
      caption: `   *｡ Título ›* ${song.title}
   *｡ Artista ›* ${song.artist}
   *｡ Álbum ›* ${song.album}
   *｡ Duración ›* ${song.duration}
   *｡ Date ›* ${song.date}
   *｡ Enlace ›* ${song.link}
    
> 🕸️ Descargando audio... `
    }, { quoted: m })

    const d = await (await fetch(`${api.url}/download/deezer?url=${song.link}`)).json()
    await conn.sendMessage(m.chat, { audio: { url: d.data.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: m })
  } catch (e) {
    conn.reply(m.chat, `> ✿︎ An unexpected error occurred while executing command *${usedPrefix + command}*.\n> *[Error: ${e.message}]*`, m)
  }
}
handler.command = ["deezer", "dz", "playdz"]
handler.tags = ["download"]
handler.help = ["deezer *« ǫᴜᴇʀʏ »*"]
handler.group = true

export default handler