import yts from 'yt-search'

let handler = async (m, { conn, text }) => {
  if (!text?.trim()) return conn.reply(m.chat, "✿ Ingresa texto para buscar en Youtube.", m)
  let res = await yts(text)
  let videos = res.videos.slice(0, 20)
  
  let txt = videos.map((v, i) => 
`*[${i+1}] ${v.title}*
> Canal: ${v.author.name}
> Duración: ${v.timestamp}
> Fecha: ${v.ago}
> Link: ${v.url}`).join("\n\n")

  await conn.sendMessage(m.chat, { 
    image: { url: videos[0].thumbnail }, 
    caption: txt 
  }, { quoted: m })
}
handler.help = ['ytsearch *« ǫᴜᴇʀʏ »*']
handler.tags = ['search']
handler.command = ['yts', 'ytsearch']
export default handler