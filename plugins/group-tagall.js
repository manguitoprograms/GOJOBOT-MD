let handler = async (m, { conn, args }) => {
  const groupInfo = await conn.groupMetadata(m.chat)
  const participants = groupInfo.participants
  const pesan = args.join(' ')
  let teks = `﹒⌗﹒🌱 .ৎ˚₊‧  ${pesan || 'Revivan 🪴'}\n\n𐚁 ֹ ִ \`GROUP TAG\` ! ୧ ֹ ִ🍃\n\n🍄 \`Miembros :\` ${participants.length}\n🌿 \`Solicitado por :\` @${m.sender.split('@')[0]}\n\n` +
    `╭┄ ꒰ \`Lista de usuarios:ׄ\` ꒱ ┄\n`
  for (const mem of participants) {
    teks += `┊ꕥ @${mem.id.split('@')[0]}\n`
  }
  teks += `╰⸼ ┄ ┄ ꒰ \`${vs}\` ꒱ ┄ ┄⸼`
  return conn.reply(m.chat, teks, m, { mentions: [m.sender, ...participants.map(p => p.id)] })
}

handler.help = ['todos']
handler.tags = ['grupo']
handler.command = ['todos', 'invocar', 'tagall']
handler.admin = true
handler.group = true

export default handler