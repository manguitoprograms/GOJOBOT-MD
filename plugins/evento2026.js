
const preguntas = [
  { nivel: 'facil', pregunta: '¿Cuántos días tiene una semana?', opciones: ['5 días', '6 días', '7 días', '8 días'], correcta: 2 },
  { nivel: 'facil', pregunta: '¿Cuál es el planeta donde vivimos?', opciones: ['Marte', 'Tierra', 'Venus', 'Júpiter'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Cuánto es 5 + 5?', opciones: ['8', '9', '10', '11'], correcta: 2 },
  { nivel: 'facil', pregunta: '¿Cuál es la capital del Perú?', opciones: ['Cusco', 'Lima', 'Trujillo', 'Arequipa'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Cuántos meses tiene un año?', opciones: ['10', '11', '12', '13'], correcta: 2 },
  { nivel: 'facil', pregunta: '¿Qué animal dice miau?', opciones: ['Perro', 'Gato', 'Vaca', 'Pato'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Cuánto es 10 × 2?', opciones: ['12', '20', '22', '30'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Qué color resulta de mezclar azul y amarillo?', opciones: ['Verde', 'Morado', 'Rosado', 'Negro'], correcta: 0 },
  { nivel: 'facil', pregunta: '¿Cuántas horas tiene un día?', opciones: ['12', '18', '24', '36'], correcta: 2 },
  { nivel: 'facil', pregunta: '¿Cuál es el satélite natural de la Tierra?', opciones: ['Sol', 'Luna', 'Marte', 'Venus'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Cuánto es 100 dividido entre 10?', opciones: ['5', '10', '20', '50'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Qué órgano usamos principalmente para ver?', opciones: ['Oídos', 'Nariz', 'Ojos', 'Manos'], correcta: 2 },
  { nivel: 'facil', pregunta: '¿En qué continente está el Perú?', opciones: ['Europa', 'Asia', 'América del Sur', 'África'], correcta: 2 },
  { nivel: 'facil', pregunta: '¿Cuántas patas tiene una araña?', opciones: ['6', '8', '10', '12'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Cuál es el primer mes del año?', opciones: ['Marzo', 'Enero', 'Junio', 'Diciembre'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Qué usamos para escribir en un cuaderno?', opciones: ['Cuchara', 'Lápiz', 'Plato', 'Vaso'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Cuál es el océano más grande?', opciones: ['Atlántico', 'Índico', 'Pacífico', 'Ártico'], correcta: 2 },

  { nivel: 'media', pregunta: '¿Cuántos lados tiene un hexágono?', opciones: ['5', '6', '7', '8'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Cuál es el resultado de 12 × 12?', opciones: ['124', '144', '132', '154'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Quién escribió Don Quijote de la Mancha?', opciones: ['Cervantes', 'Borges', 'Neruda', 'Vallejo'], correcta: 0 },
  { nivel: 'media', pregunta: '¿Cuál es el símbolo químico del oro?', opciones: ['Ag', 'Au', 'Fe', 'Go'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Cuántos minutos tiene una hora y media?', opciones: ['60', '75', '90', '120'], correcta: 2 },
  { nivel: 'media', pregunta: '¿Cuál es el planeta más grande del sistema solar?', opciones: ['Saturno', 'Tierra', 'Júpiter', 'Neptuno'], correcta: 2 },
  { nivel: 'media', pregunta: '¿Qué gas necesitan las personas para respirar?', opciones: ['Oxígeno', 'Helio', 'Hidrógeno', 'Metano'], correcta: 0 },
  { nivel: 'media', pregunta: '¿En qué año se proclamó la independencia del Perú?', opciones: ['1810', '1821', '1830', '1845'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Cuántos grados tiene un ángulo recto?', opciones: ['45', '90', '180', '360'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Cuál es la moneda oficial del Perú?', opciones: ['Peso', 'Dólar', 'Sol', 'Euro'], correcta: 2 },
  { nivel: 'media', pregunta: '¿Qué órgano bombea la sangre?', opciones: ['Pulmón', 'Corazón', 'Hígado', 'Riñón'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Cuál es el idioma oficial más hablado en Brasil?', opciones: ['Español', 'Portugués', 'Francés', 'Inglés'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Cuántos segundos tiene un minuto?', opciones: ['30', '60', '90', '100'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Qué instrumento mide la temperatura?', opciones: ['Barómetro', 'Termómetro', 'Brújula', 'Cronómetro'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Cuál es la raíz cuadrada de 81?', opciones: ['7', '8', '9', '10'], correcta: 2 },
  { nivel: 'media', pregunta: '¿Qué animal es un mamífero?', opciones: ['Tiburón', 'Delfín', 'Trucha', 'Pulpo'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Cuál es el continente más grande?', opciones: ['Europa', 'África', 'Asia', 'Oceanía'], correcta: 2 },

  { nivel: 'dificil', pregunta: '¿Cuál es el número primo más pequeño?', opciones: ['0', '1', '2', '3'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Qué científico formuló las leyes del movimiento clásico?', opciones: ['Newton', 'Darwin', 'Pasteur', 'Tesla'], correcta: 0 },
  { nivel: 'dificil', pregunta: '¿Cuál es la capital de Australia?', opciones: ['Sídney', 'Melbourne', 'Canberra', 'Perth'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Cuál es el símbolo químico del sodio?', opciones: ['So', 'Sd', 'Na', 'S'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Cuánto suman los ángulos interiores de un triángulo?', opciones: ['90°', '180°', '270°', '360°'], correcta: 1 },
  { nivel: 'dificil', pregunta: '¿Qué órgano produce la insulina?', opciones: ['Páncreas', 'Bazo', 'Pulmón', 'Tiroides'], correcta: 0 },
  { nivel: 'dificil', pregunta: '¿Cuál es el valor aproximado de pi?', opciones: ['2.14', '3.14', '4.13', '3.41'], correcta: 1 },
  { nivel: 'dificil', pregunta: '¿Cuál es el gas más abundante en la atmósfera terrestre?', opciones: ['Oxígeno', 'Nitrógeno', 'Dióxido de carbono', 'Hidrógeno'], correcta: 1 },
  { nivel: 'dificil', pregunta: '¿Qué país tiene forma de bota en el mapa?', opciones: ['Grecia', 'Italia', 'Portugal', 'Noruega'], correcta: 1 },
  { nivel: 'dificil', pregunta: '¿Cuál es la unidad de resistencia eléctrica?', opciones: ['Voltio', 'Amperio', 'Ohmio', 'Vatio'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Cuál es el hueso más largo del cuerpo humano?', opciones: ['Fémur', 'Radio', 'Tibia', 'Húmero'], correcta: 0 },
  { nivel: 'dificil', pregunta: '¿Qué proceso usan las plantas para producir alimento con luz?', opciones: ['Respiración', 'Fermentación', 'Fotosíntesis', 'Digestión'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Cuánto es 2 elevado a la quinta potencia?', opciones: ['16', '24', '32', '64'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Cuál es la capital de Canadá?', opciones: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'], correcta: 3 },
  { nivel: 'dificil', pregunta: '¿Qué elemento químico tiene el símbolo Fe?', opciones: ['Flúor', 'Hierro', 'Fósforo', 'Francio'], correcta: 1 },
  { nivel: 'dificil', pregunta: '¿En qué capa de la atmósfera ocurren la mayoría de fenómenos meteorológicos?', opciones: ['Estratosfera', 'Mesosfera', 'Troposfera', 'Termosfera'], correcta: 2 }
]

const usados = new Set()

let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  const args = (text || '').trim().toLowerCase()
  const esAdmin = isAdmin || isOwner

  if (!esAdmin) {
    return m.reply('⛔ Este comando es exclusivo de la administración del evento.')
  }

  if (args === 'respuesta') {
    const ultima = global.evento2026?.[m.chat]
    if (!ultima) return m.reply('⚠️ Todavía no hay una pregunta activa registrada en este grupo.')
    return m.reply(`🔐 *FICHA ADMINISTRATIVA*\n\nPregunta: ${ultima.pregunta}\nRespuesta correcta: ${String.fromCharCode(65 + ultima.correcta)}. ${ultima.opciones[ultima.correcta]}`)
  }

  const nivel = ['facil', 'media', 'dificil'].includes(args) ? args : null
  const disponibles = preguntas.filter((p, i) => (!nivel || p.nivel === nivel) && !usados.has(i))

  if (!disponibles.length) {
    return m.reply('⚠️ Ya no quedan preguntas disponibles de ese nivel. Reinicia el banco o añade nuevas preguntas.')
  }

  const elegida = disponibles[Math.floor(Math.random() * disponibles.length)]
  const indice = preguntas.indexOf(elegida)
  usados.add(indice)

  if (!global.evento2026) global.evento2026 = {}
  global.evento2026[m.chat] = elegida

  try {
    await conn.sendMessage(m.chat, {
      poll: {
        name: `🏆 GOJOBOT-MD 2026\n\n${elegida.pregunta}`,
        values: elegida.opciones.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`),
        selectableCount: 1
      }
    }, { quoted: m })
  } catch (e) {
    usados.delete(indice)
    return m.reply(`❌ No se pudo publicar la encuesta: ${e.message}`)
  }
}

handler.help = ['pregunta', 'pregunta facil', 'pregunta media', 'pregunta dificil', 'pregunta respuesta']
handler.tags = ['rpg']
handler.command = /^pregunta$/i
handler.group = true

export default handler
