import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const DB_PATH = path.resolve('src/chatgpt.json')
function getDB() {
  try {
    if (!fs.existsSync(path.dirname(DB_PATH))) {
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, '{}')
      return {}
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8') || '{}')
  } catch {
    return {}
  }
}

function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let jid = m.sender
  let db = getDB()

  if (['resetgpt','cleargpt','chatgptreset'].includes(command)) {
    let oldSession = db[jid]?.session_id
    if (oldSession) {
      await fetch(`${API}/ai/chatgpt/reset?session_id=${oldSession}`).catch(()=>{})
    }
    delete db[jid]
    saveDB(db)
    return conn.reply(m.chat, `🌾 Sesión borrada para *${jid.split('@')[0]}*\nArchivo: \`src/chatgpt.json\` actualizado`, m)
  }

  if (!text?.trim()) return conn.reply(m.chat, `❀ Ingrese una petición.`, m)

  try {
    await m.react('🧠')
    await conn.sendPresenceUpdate('composing', m.chat)
    let session_id = db[jid]?.session_id
    let url = `${api.url}/ai/chatgpt?prompt=${encodeURIComponent(text)}${session_id ? `&session=${session_id}` : ''}`

    let res = await fetch(url).then(r => r.json())
    if (!res.status || !res.data?.answer) throw new Error('No hay respuesta')

    db[jid] = {
      session_id: res.data.session_id,
      conversation_id: res.data.conversation_id,
      updatedAt: new Date().toISOString()
    }
    saveDB(db)
    await conn.reply(m.chat, res.data.answer, m)
  } catch (e) {
    conn.reply(m.chat, `🍃 Error: ${e.message}`, m)
  }
}

handler.command = ['ia', 'chatgpt','gpt','resetgpt','cleargpt','chatgptreset']
handler.tags = ['ai']
handler.help = ['chatgpt <texto>', 'resetgpt']
export default handler