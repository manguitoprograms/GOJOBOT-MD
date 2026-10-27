import fetch from 'node-fetch'

let handler = async (m, { command, usedPrefix, conn, text, args }) => {
  if (!text) return m.reply(`ꕥ *Por favor, proporciona el nombre de una canción o artista.*`)

  try {
    m.react('🕒')
    const res = await fetch(`${api.url}/search/spotify?q=${encodeURIComponent(text)}&limit=10`)
    const json = await res.json()

    if (!json.status || !json.tracks?.length) throw new Error('No se encontraron canciones.')

    const songs = json.tracks.slice(0, 10)

    let caption = `乂 \`S P O T I F Y - S E A R C H\`\n\n`
    caption += `≡ *Total resultados :* ${songs.length}\n\n`

    songs.forEach((song, i) => {
      const artists = Array.isArray(song.artists) ? song.artists.join(', ') : song.artists
      caption += `\`${i + 1}\` *${song.title}*\n`
      caption += ` *｡ Artista :* ${artists}\n`
      caption += ` *｡ Álbum :* ${song.album}\n`
      caption += ` *｡ Duración :* ${song.duration}\n`
      caption += ` *｡ Date :* ${song.publish}\n\n`
    })

    caption += `> Responde con números separados por coma para descargar múltiples.\n> Ejemplo: *1,2,3* o solo *1*`

    const sent = await conn.sendMessage(m.chat, { text: caption }, { quoted: m })

    conn.spotify = conn.spotify || {}
    conn.spotify[m.sender] = {
      songs,
      key: sent.key,
      downloading: false,
      timeout: setTimeout(() => delete conn.spotify[m.sender], 600_000)
    }

    m.react('✅')
  } catch (e) {
    m.reply(' Error: ' + e.message)
  }
}

handler.before = async (m, { conn }) => {
  conn.spotify = conn.spotify || {}
  const session = conn.spotify[m.sender]

  if (!session || !m.quoted || m.quoted.id !== session.key.id) return

  if (session.downloading) return m.reply('🌷 Ya hay una descarga en curso.')

  const nums = m.text.trim().split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
  
  if (nums.length === 0 || nums.some(n => n < 1 || n > session.songs.length))
    return m.reply(`🌵 Números inválidos. Elige entre 1 y ${session.songs.length}.\nEjemplo: 1,2,3`)

  session.downloading = true
  m.react('📥')

  const selectedSongs = nums.map(n => session.songs[n - 1])

  for (const song of selectedSongs) {
    try {
      const artists = Array.isArray(song.artists) ? song.artists.join(', ') : song.artists
      const thumbBuf = await fetch(song.thumbnail).then(r => r.buffer())
      const b64 = Buffer.from(thumbBuf).toString('base64')
      await conn.relayMessage(m.chat, { extendedTextMessage: { text: `https://api--shadowcorexyz.replit.app\n❀ Descargando *${song.title}* - ${artists}...`, matchedText: 'https://api--shadowcorexyz.replit.app', description: namebot, title: '𖹭  ׄ  ְ 🧊 Spotify - Music ✩', previewType: 'shadow', jpegThumbnail: b64, contextInfo: { quotedMessage: m.message, participant: m.sender, stanzaId: m.id, remoteJid: m.chat, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363421367237421@newsletter', serverMessageId: '', newsletterName: botname }, } }}, { quoted: m })

      let lyrics = null
      try {
        const lyricsRes = await fetch(`${global.api.url}/search/spotify-lyrics?url=${encodeURIComponent(song.url)}`)
        const lyricsJson = await lyricsRes.json()
        if (lyricsJson.status && lyricsJson.data?.syncedLyrics) {
          lyrics = lyricsJson.data.syncedLyrics
        }
      } catch (err) {
        console.log('No se encontraron lyrics')
      }

      let downloadUrl = null
      let title = song.title
      let artist = artists
      let thumbnail = song.thumbnail

      try {
        const dlRes = await fetch(`${global.api.url}/download/spotify/v2?url=${encodeURIComponent(song.url)}`)
        const dlJson = await dlRes.json()
        if (dlJson.status && dlJson.data?.dl) {
          downloadUrl = dlJson.data.dl
          title = dlJson.data.title
          artist = dlJson.data.artist
        }
      } catch (err) {
        const dlRes2 = await fetch(`${global.api.url}/api/play/spotify?q=${encodeURIComponent(song.url)}`)
        const dlJson2 = await dlRes2.json()
        if (dlJson2.status && dlJson2.result?.download) {
          downloadUrl = dlJson2.result.download
          title = dlJson2.result.title
          artist = dlJson2.result.artist
          thumbnail = dlJson2.result.image || thumbnail
        }
      }

      if (!downloadUrl) throw new Error('No se pudo obtener el enlace.')

      await conn.sendMessage(m.chat, { 
        document: { url: downloadUrl }, 
        mimetype: 'audio/m4a', 
        fileName: `${title}.m4a`,
        caption: `╭𖹭╮𝅄𖹠  _Downloader from spotify_
│𐂗│  Título : ${title}
│𐂗│  Artist : ${artist}
╰──────────𖹭╯`
      }, { quoted: m })

      if (lyrics) {
        const lyricsCaption = `🍡 *LYRICS*\n\n${lyrics.substring(0, 10000)}`
        await conn.sendMessage(m.chat, { text: lyricsCaption }, { quoted: m })
      }

      m.react('✅')
    } catch (err) {
      await m.reply(` Error: ${song.title}: ${err.message}`)
    }
  }

  clearTimeout(session.timeout)
  delete conn.spotify[m.sender]
}

handler.command = ['spotify', 'spot', 'spdl', 'sp']
handler.tags = ['download']
handler.help = ['spotify  *« query/url »*']

export default handler