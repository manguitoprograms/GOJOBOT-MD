import { sticker, addExif } from '../lib/sticker.js'
import axios from 'axios'
import fetch from 'node-fetch'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fetchSticker = async (text, attempt = 1) => {
  try {
    const response = await axios.get(`https://skyzxu-brat.hf.space/brat`, { params: { text }, responseType: 'arraybuffer' })
    return response.data
  } catch (error) {
    if (error.response?.status === 429 && attempt <= 3) {
      const retryAfter = error.response.headers['retry-after'] || 5
      await delay(retryAfter * 1000)
      return fetchSticker(text, attempt + 1)
    }
    throw error
  }
}

const fetchStickerVideo = async (text) => {
  const response = await axios.get(`https://skyzxu-brat.hf.space/brat-animated`, { params: { text }, responseType: 'arraybuffer' })
  if (!response.data) throw new Error('Error al obtener el video de la API.')
  return response.data
}

// Función con respaldo múltiple para .qc (evita el error 526)
const generateQuote = async (quoteObj) => {
  const apis = [
    'https://qc.botcahx.eu.org/generate',
    'https://quote-api.vercel.app/generate',
    'https://bot.lyo.su/quote/generate'
  ]
  
  for (const api of apis) {
    try {
      const res = await axios.post(api, quoteObj, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      })
      if (res.data?.result?.image) {
        return Buffer.from(res.data.result.image, 'base64')
      }
    } catch (e) {
      continue
    }
  }
  throw new Error('Todas las API de QC están temporalmente fuera de servicio.')
}

const handler = async (m, { conn, text, args, command, usedPrefix }) => {
  try {
    let userId = m.sender
    let packstickers = global.db?.data?.users[userId] || {}
    let texto1 = packstickers.text1 || global.packsticker || 'Bot'
    let texto2 = packstickers.text2 || global.packsticker2 || 'GojoBot'

    switch (command) {
      case 'brat': {
        text = m.quoted?.text || text
        if (!text) return conn.sendMessage(m.chat, { text: '❀ Por favor, responde a un mensaje o ingresa un texto para crear el Sticker.' }, { quoted: m })
        await m.react('🕒')
        const buffer = await fetchSticker(text)
        const stiker = await sticker(buffer, false, texto1, texto2)
        if (!stiker) throw new Error('ꕥ No se pudo generar el sticker.')
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        await m.react('✔️')
        break
      }

      case 'bratv': {
        text = m.quoted?.text || text
        if (!text) return conn.sendMessage(m.chat, { text: '❀ Por favor, responde a un mensaje o ingresa un texto para crear el Sticker.' }, { quoted: m })
        await m.react('🕒')
        const videoBuffer = await fetchStickerVideo(text)
        const stickerBuffer = await sticker(videoBuffer, null, texto1, texto2)
        await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
        await m.react('✔️')
        break
      }

      case 'emojimix': {
        if (!text) return m.reply(`❀ Ingresa 2 emojis para combinar.\n> Ejemplo: *${usedPrefix + command}* 👻+👀`)
        let emojis = text.split(/[\+\s]/).filter(v => v.trim())
        if (emojis.length < 2) return m.reply(`❀ Debes ingresar 2 emojis.\n> Ejemplo: *${usedPrefix + command}* 👻+👀`)
        
        let emoji1 = emojis[0].trim()
        let emoji2 = emojis[1].trim()
        
        await m.react('🕒')
        
        let stiker = null

        // Intento 1: API Delirius
        try {
          let res = await fetch(`https://delirius-apiofc.vercel.app/tools/emojimix?emoji1=${encodeURIComponent(emoji1)}&emoji2=${encodeURIComponent(emoji2)}`)
          let json = await res.json()
          if (json.status && json.url) {
            stiker = await sticker(false, json.url, texto1, texto2)
          }
        } catch (e) {}

        // Intento 2: Tenor API
        if (!stiker) {
          try {
            let resTenor = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
            let jsonTenor = await resTenor.json()
            if (jsonTenor.results && jsonTenor.results.length > 0) {
              stiker = await sticker(false, jsonTenor.results[0].url, texto1, texto2)
            }
          } catch (e) {}
        }

        if (!stiker) throw new Error('ꕥ No se encontró combinación válida para esos emojis.')

        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        await m.react('✔️')
        break
      }

      case 'qc': {
        let textFinal = args.join(' ') || m.quoted?.text
        if (!textFinal) return conn.reply(m.chat, `❀ Ingresa un texto para crear el sticker.`, m)
        let target = m.quoted ? m.quoted.sender : m.sender
        const pp = await conn.profilePictureUrl(target).catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
        
        const nombre = await (async () => {
          try {
            return global.db?.data?.users[target]?.name || await conn.getName(target) || target.split('@')[0]
          } catch {
            return target.split('@')[0]
          }
        })()

        const mentionRegex = new RegExp(`@${target.split('@')[0]}`, 'g')
        let frase = textFinal.replace(mentionRegex, '')
        if (frase.length > 30) {
          await m.react('✖️')
          return conn.reply(m.chat, `ꕥ El texto no puede tener más de 30 caracteres.`, m)
        }

        await m.react('🕒')
        const quoteObj = { 
          type: 'quote', 
          format: 'png', 
          backgroundColor: '#000000', 
          width: 512, 
          height: 768, 
          scale: 2, 
          messages: [{ 
            entities: [], 
            avatar: true, 
            from: { id: 1, name: nombre, photo: { url: pp } }, 
            text: frase, 
            replyMessage: {} 
          }]
        }

        const buffer = await generateQuote(quoteObj)
        const stiker = await sticker(buffer, false, texto1, texto2)
        if (stiker) {
          await m.react('✔️')
          await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        }
        break
      }

      case 'take': case 'wm': {
        if (!m.quoted) return m.reply(`❀ Responde a un sticker con el comando *${usedPrefix + command}* seguido del nuevo nombre.\n> Ejemplo: *${usedPrefix + command}* NuevoNombre`)
        await m.react('🕒')
        const stickerData = await m.quoted.download()
        if (!stickerData) {
          await m.react('✖️')
          return m.reply('ꕥ No se pudo descargar el sticker.')
        }
        const parts = text.split(/[\u2022|]/).map(p => p.trim())
        const nuevoPack = parts[0] || texto1
        const nuevoAutor = parts[1] || texto2
        const exif = await addExif(stickerData, nuevoPack, nuevoAutor)
        await conn.sendMessage(m.chat, { sticker: exif }, { quoted: m })
        await m.react('✔️')
        break
      }
    }
  } catch (e) {
    await m.react('✖️')
    conn.sendMessage(m.chat, { text: `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}` }, { quoted: m })
  }
}

handler.tags = ['sticker']
handler.help = ['brat', 'bratv', 'emojimix', 'qc', 'take', 'robar', 'wm']
handler.command = ['brat', 'bratv', 'emojimix', 'qc', 'take', 'wm']

export default handler
