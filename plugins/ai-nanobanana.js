import fetch from 'node-fetch'
import { FormData, Blob } from 'formdata-node'

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) { return conn.reply(m.chat, `🍡 Por favor responde a una imagen con el prompt.`, m)
    }
    
    let q = m.quoted ? m.quoted : m
    let mimeType = (q.msg || q).mimetype || ''
    
    if (!/image\/(jpe?g|png)/.test(mimeType)) {
      return conn.reply(m.chat, `🥢 Por favor responde o etiqueta una **imagen** con el comando.`, m)
    }
    try {
        await m.react('🕒')
        let imgBuffer = await q.download()
        let imageUrl = await uploadImage(imgBuffer)
        
        if (!imageUrl) {
          return conn.reply(m.chat, `⚠︎ Error al subir la imagen.`, m)
        }
        const apiUrl = `${api.url}/ai/nanobanana?url=${encodeURIComponent(imageUrl)}&prompt=${encodeURIComponent(text)}`
        const res = await fetch(apiUrl)
        const json = await res.json()

        if (!json.status || !json.result_url?.[0]) {
          return conn.reply(m.chat, `⚠︎ Error en la API: ${json.message || 'Desconocido'}`, m)
        }

        const editedRes = await fetch(json.result_url[0])
        const editedBuffer = await editedRes.buffer()

        const caption = `🍡 *NanoBanana* - Imagen editada\n🌷 *Prompt:* ${text}\n⏱️ *Tiempo:* ${json.time_ms}ms`

        await conn.sendFile(m.chat, editedBuffer, 'nanobanana.jpg', caption, m)
        await m.react('✔️')

    } catch (error) {
        await conn.reply(m.chat, `⚠︎ Error al procesar la imagen.\n\n${error.message}`, m)
    }
}

handler.help = ['nanobanana <prompt>']
handler.tags = ['ai', 'tools', 'image']
handler.command = ['nanobanana', 'banana', 'nb', 'editimg']

export default handler

async function uploadImage(buffer) {
  try {
    const body = new FormData()
    body.append('files[]', new Blob([buffer], { type: 'image/jpeg' }), 'image.jpg')
    
    const res = await fetch('https://uguu.se/upload.php', { 
      method: 'POST', 
      body 
    })
    
    const json = await res.json()
    return json.files?.[0]?.url || null
  } catch (e) {
    console.error('Error uploading:', e)
    return null
  }
}