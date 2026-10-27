import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text?.trim()) return conn.reply(m.chat, `✿ Ejemplo: *${usedPrefix + command} https://www.capcut.com/template-detail/...*`, m)

  try {
    await m.react("🕐")
    if (!/capcut\.com/.test(text)) return conn.reply(m.chat, "✿ Ingresa un link válido de CapCut.", m)
    let dl = await (await fetch(`${api.url}/download/capcut?url=${encodeURIComponent(text)}`)).json()
    let d = dl.data
    if (!d?.videoUrl) throw new Error("No se pudo obtener el video")
    let caption = `*⌘ CAPCUT - DOWNLOAD*

*｡ Título ›* ${d.title}
*｡ Autor ›* ${d.author?.name || 'Desconocido'}
*｡ Duración ›* ${d.durationSec}s
*｡ Likes ›* ${d.likeCount?.toLocaleString()}
*｡ Usos ›* ${d.usageCount?.toLocaleString()}
*｡ Creado ›* ${new Date(d.createdAt).toLocaleDateString('es-PE')}
*｡ Link ›* ${d.canonicalUrl || text}
`

    await conn.sendFile(m.chat, d.videoUrl, `${d.title || 'capcut'}.mp4`, caption, m)
    await m.react("✔️")
  } catch (e) {
    conn.reply(m.chat, `✿ Error: ${e.message}`, m)
  }
}

handler.command = ['capcut', 'capcutdl', 'ccdl']
handler.tags = ['download']
handler.help = ['capcut <url>']
handler.group = true
export default handler