import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const DB_PATH = path.resolve('src/gemini.json')
function getDB() {
  if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, '{}')
    return {}
  }
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8') || '{}')
  } catch { return {} }
}
function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let jid = m.sender
  let db = getDB()

  if (['resetgemini'].includes(command)) {
    delete db[jid]
    saveDB(db)
    return conn.reply(m.chat, `🌾 Sesión Gemini borrada para ${jid.split('@')[0]}`, m)
  }

  if (!text?.trim()) return conn.reply(m.chat, `✿ Usa: *${usedPrefix}gemini hola*`, m)

  try {
    await conn.sendPresenceUpdate('composing', m.chat)

    let sessionId = db[jid]?.sessionId
    let url = `${api2.url}/ai/gemini/v2?text=${encodeURIComponent(text)}${sessionId ? `&sessionId=${encodeURIComponent(sessionId)}` : ''}`

    let res = await fetch(url).then(r => r.json())
    if (!res.status) throw new Error('API falló')

    let answer = res.data.response
    let newSessionId = res.data.sessionId
    db[jid] = {
      sessionId: newSessionId,
      lastMsg: text,
      updatedAt: new Date().toISOString()
    }
    saveDB(db)

    await conn.reply(m.chat, answer, m)

  } catch (e) {
    conn.reply(m.chat, `🍃 Error Gemini: ${e.message}`, m)
  }
}

handler.command = ['gemini', 'resetgemini']
handler.tags = ['ai']
handler.help = ['gemini <texto>', 'resetgemini']
export default handler