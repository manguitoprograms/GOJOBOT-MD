import fetch from 'node-fetch'

const MIME_MAP = {
  // video
  mp4: 'video/mp4', m4v: 'video/mp4', mkv: 'video/x-matroska', webm: 'video/webm',
  avi: 'video/x-msvideo', mov: 'video/quicktime', flv: 'video/x-flv', wmv: 'video/x-ms-wmv',
  mpg: 'video/mpeg', mpeg: 'video/mpeg', '3gp': 'video/3gpp',
  // audio
  mp3: 'audio/mpeg', m4a: 'audio/mp4', aac: 'audio/aac', wav: 'audio/wav',
  flac: 'audio/flac', ogg: 'audio/ogg', oga: 'audio/ogg', opus: 'audio/opus',
  wma: 'audio/x-ms-wma', amr: 'audio/amr',
  // imagen
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif',
  webp: 'image/webp', bmp: 'image/bmp', svg: 'image/svg+xml', ico: 'image/x-icon',
  // documentos
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  txt: 'text/plain', csv: 'text/csv', json: 'application/json', xml: 'application/xml',
  html: 'text/html', css: 'text/css', js: 'application/javascript',
  // comprimidos
  zip: 'application/zip', rar: 'application/vnd.rar', '7z': 'application/x-7z-compressed',
  tar: 'application/x-tar', gz: 'application/gzip', bz2: 'application/x-bzip2',
  // apk / ejecutables
  apk: 'application/vnd.android.package-archive',
  exe: 'application/x-msdownload', msi: 'application/x-msi',
  deb: 'application/vnd.debian.binary-package', rpm: 'application/x-rpm',
  // fuentes
  ttf: 'font/ttf', otf: 'font/otf', woff: 'font/woff', woff2: 'font/woff2'
}

function detectMime(data) {
  if (data.mimetype && /^[\w-]+\/[\w.+-]+$/.test(data.mimetype)) return data.mimetype

  const name = (data.filename || '').toLowerCase().trim()
  const extFromName = name.includes('.') ? name.split('.').pop() : null
  if (extFromName && MIME_MAP[extFromName]) return MIME_MAP[extFromName]

  const type = (data.type || '').toLowerCase().replace(/^\./, '')
  if (type && MIME_MAP[type]) return MIME_MAP[type]
  return 'application/octet-stream'
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`《✧》 Manda link de Mediafire\n*Ejemplo:* ${usedPrefix + command} https://www.mediafire.com/file/xxx/file`)
  try {
    await m.reply('*🧋 Buscando.....*')
    const apiUrl = `${global.api.url}/download/mediafire?url=${encodeURIComponent(text)}`
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json.status || !json.data) {
      return m.reply('《✧》 No se pudo obtener el archivo')
    }

    const d = json.data
    const { filename, filetype, size, uploaded, owner, download_url } = d
    const mimetype = detectMime(d)

    const thumbBuf = await fetch('https://raw.githubusercontent.com/Dev-lxyz/file/main/files/ey7gd.jpeg').then(r => r.buffer())
    const b64 = Buffer.from(thumbBuf).toString('base64')

    const txt = ` ° *Nombre:* ${filename}
 ° *Tipo:* ${filetype || mimetype}
 ° *Mime:* ${mimetype}
 ° *Peso:* ${size}
 ° *Subido:* ${uploaded}
 ° *Owner:* ${owner}`;

    await conn.relayMessage(m.chat, {
      extendedTextMessage: {
        text: api.url + txt,
        matchedText: api.url,
        description: '🧃 *MEDIAFIRE DOWNLOADER*',
        title: dev,
        previewType: 'shadow',
        jpegThumbnail: b64,
        contextInfo: {
          quotedMessage: m.message,
          participant: m.sender,
          stanzaId: m.id,
          remoteJid: m.chat
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      document: { url: download_url },
      fileName: filename,
      mimetype
    }, { quoted: m })

  } catch (e) {
    m.reply(`《✧》 Error: ${e.message}`)
  }
}

handler.help = ['md <link>']
handler.tags = ['download']
handler.command = ['mf', 'mediafire']

export default handler