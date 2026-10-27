import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text?.trim()) return conn.reply(m.chat, `✿ Ingresa un link de YouTube.\nEj: *${usedPrefix + command} https://youtu.be/...*`, m)
  try {
    await conn.reply(m.chat, `> 🕸️ Buscando video, espera un momento...`, m)

    let isDoc = text.includes('--doc')
    let url = text.replace('--doc','').trim().split(/\s+/)[0]
    if (!/youtu|youtube/.test(url)) throw "Link inválido"

    let apiRes = await (await fetch(`${api.url}/download/ytdl.php?url=${encodeURIComponent(url)}&format=mp4`)).json()
    if (!apiRes.status) throw "No se pudo descargar"
    let data = apiRes.data

    let size = "Desconocido"
    try {
      let head = await fetch(data.download_url, { method: "HEAD" })
      let bytes = head.headers.get("content-length")
      if (bytes) size = (bytes / (1024*1024)).toFixed(2) + " MB"
    } catch {}

    await conn.sendMessage(m.chat, {
      image: { url: data.thumbnail },
      caption: `   *｡ Título ›* ${data.title}
   *｡ Autor ›* ${data.author}
   *｡ Formato ›* ${data.format}
   *｡ Calidad ›* ${data.quality}p
   *｡ Tamaño ›* ${size}
    
> *🍜 Descargando video...*`
    }, { quoted: m })

    if (isDoc) {
      await conn.sendMessage(m.chat, {
        document: { url: data.download_url },
        mimetype: "video/mp4",
        fileName: data.filename
      }, { quoted: m })
    } else {
      await conn.sendMessage(m.chat, {
        video: { url: data.download_url },
        mimetype: "video/mp4",
        fileName: data.filename
      }, { quoted: m })
    }

  } catch (e) {
    conn.reply(m.chat, `Error: ${e.message || e}`, m)
  }
}
handler.command = ["ytv", "ytmp4", "mp4doc"]
handler.tags = ["download"]
handler.help = ["ytv *« link --doc »*"]
handler.group = true
export default handler