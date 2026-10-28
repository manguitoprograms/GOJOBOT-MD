// Almacén global para las partidas activas de trivia por grupo
const triviaActiva = {};
const TIEMPO_PREGUNTA = 30000; // 30 segundos máximos por pregunta

const frasesFallo = [
  "¿Eso es todo lo que tienes? Qué aburrido...",
  "¡Fallaste! Parece que necesitas entrenar más tu energía maldita.",
  "¡Respuesta incorrecta! Hasta un hechicero de grado 4 lo sabría.",
  "¡Nop! Vacío Inconmensurable en tu mente en este momento.",
  "Fallaste... Ni los Seis Ojos te salvan de esta.",
  "¡Lástima! Satoru Gojo se está reyendo de esa respuesta.",
  "¡Incorrecto! Vuelve a la academia de hechicería.",
  "Respuesta equivocada... Te faltó poder de deducción."
];

const bloqueGojo = [
  { q: "¿Cuáles son las técnicas principales asociadas a Satoru Gojo?", options: ["A) Limitless y Seis Ojos", "B) Diez Sombras y Limitless", "C) Reencarnación y Vacío", "D) Sangre y Distorsión"], answer: "a" },
  { q: "¿Qué efecto principal produce el Infinito de Gojo?", options: ["A) Crear una barrera indestructible física", "B) Hacer que lo que se aproxima se ralentice indefinidamente antes de alcanzarlo", "C) Teletransportar cualquier objeto que lo toque", "D) Absorber la energía del oponente"], answer: "b" },
  { q: "¿Cómo se llama la técnica que atrae y genera un punto de implosión?", options: ["A) Rojo", "B) Púrpura", "C) Azul", "D) Vacío"], answer: "c" },
  { q: "¿Qué es el Rojo (Reversed Curse Technique - Red) en términos de energía?", options: ["A) La inversión de la técnica mediante energía maldita positiva", "B) Un hechizo de fuego directo", "C) Una maldición hereditaria", "D) Un escudo defensivo"], answer: "a" },
  { q: "¿Qué combinación da origen al Hollow Purple (Púrpura)?", options: ["A) Infinito y Vacío", "B) Azul y Rojo", "C) Seis Ojos y Dominio", "D) Energía positiva y negativa"], answer: "b" },
  { q: "¿Cómo se llama la Expansión de Dominio de Satoru Gojo?", options: ["A) Santuario Malevolente", "B) Jardín de las Sombras", "C) Vacío Inconmensurable", "D) Prisión Infinita"], answer: "c" },
  { q: "¿Qué efecto exacto produce el Dominio de Gojo sobre quienes quedan atrapados?", options: ["A) Los destruye instantáneamente", "B) Los transporta a otra dimensión", "C) Los convierte en piedra", "D) Los abruma con información hasta dificultar su capacidad de procesarla"], answer: "d" },
  { q: "¿Quién fue el mejor amigo de juventud de Gojo en la escuela de hechicería?", options: ["A) Kento Nanami", "B) Suguru Geto", "C) Masamichi Yaga", "D) Shoko Ieiri"], answer: "b" },
  { q: "¿Quién derrotó sorpresivamente a Gojo durante su etapa de estudiante protegiendo al Recipiente de Plasma Estelar?", options: ["A) Toji Fushiguro", "B) Sukuna", "C) Kenjaku", "D) Ougi Zenin"], answer: "a" },
  { q: "¿Qué evento clave despertó el verdadero potencial y la iluminación de Gojo?", options: ["A) La muerte de Geto", "B) Aprender la expansión de dominio", "C) Su experiencia casi mortal tras el ataque de Toji", "D) Desbloquear los Seis Ojos"], answer: "c" },
  { q: "¿Cómo se llama la técnica imaginaria que borra todo a su paso?", options: ["A) Azul", "B) Rojo", "C) Infinito", "D) Púrpura"], answer: "d" },
  { q: "¿Qué método usó Gojo para curar sus heridas fatales contra Toji por primera vez?", options: ["A) Pociones medicinales", "B) Técnica maldita inversa", "C) Ayuda externa de Shoko", "D) Un objeto maldito"], answer: "b" },
  { q: "¿Cuál es la función principal de los 'Seis Ojos'?", options: ["A) Ver a través de las paredes", "B) Predecir el futuro exacto", "C) Percibir la energía maldita con enorme precisión y utilizarla con gran eficiencia", "D) Controlar las mentes ajenas"], answer: "c" },
  { q: "¿En qué objeto quedó sellado Gojo durante el Incidente de Shibuya?", options: ["A) Prisión del Reino", "B) Caja de los mil años", "C) Esfera maldita", "D) Urna sagrada"], answer: "a" },
  { q: "¿Qué antagonista principal ideó el plan para sellar a Gojo?", options: ["A) Sukuna", "B) Mahito", "C) Jogo", "D) Kenjaku"], answer: "d" },
  { q: "En el Dominio de Gojo, ¿cuánto tiempo de información reciben las víctimas en apenas un instante?", options: ["A) Diez años", "B) Permanecer dentro del radio durante un minuto según el tiempo percibido por el objetivo", "C) Toda una vida", "D) Un siglo entero"], answer: "b" },
  { q: "¿En qué locación exacta ocurrió el sellado de Gojo?", options: ["A) La preparatoria de Tokio", "B) Un templo maldito en Kioto", "C) La estación de Shibuya, durante el incidente", "D) Las subterráneas de Shinjuku"], answer: "c" },
  { q: "¿Qué técnica usaron los protagonistas para intentar liberar a Gojo de su sello más adelante?", options: ["A) Amplificación de dominio", "B) Ritual de sangre", "C) Invocación divina", "D) Jacob's Ladder"], answer: "d" },
  { q: "¿Qué personaje posee la técnica Jacob's Ladder utilizada en los arcos finales?", options: ["A) Hana Kurusu", "B) Maki Zenin", "C) Utahime", "D) Nobara Kugisaki"], answer: "a" },
  { q: "¿Cuál era el objetivo táctico principal de Gojo al llegar a Shibuya?", options: ["A) Destruir todo el subterráneo", "B) Limitar la exposición de los civiles mientras neutralizaba las amenazas", "C) Buscar a Sukuna directamente", "D) Evitar que los hechiceros menores participaran"], answer: "b" },
  { q: "¿Qué ocurrió cuando Gojo desactivó el Infinito por 0.2 segundos en Shibuya?", options: ["A) Fue herido de gravedad", "B) Se quedó sin energía", "C) Activó una trampa mortal", "D) Los dejó incapacitados temporalmente, permitiendo que Gojo los eliminara rápidamente"], answer: "d" },
  { q: "¿Cuál era la misión original de Gojo junto a Geto en el arco del Recipiente de Plasma Estelar?", options: ["A) Asesinar al recipiente", "B) Entrenar a Riko Amanai", "C) Protegerla para que pudiera fusionarse con Tengen", "D) Investigar una maldición de grado especial"], answer: "c" },
  { q: "¿Por qué es vital el Maestro Tengen para el mundo de la hechicería?", options: ["A) Mantiene barreras fundamentales del mundo de la hechicería", "B) Es el creador de todas las técnicas", "C) Controla a todas las maldiciones", "D) Es el director de la academia"], answer: "a" },
  { q: "¿Qué característica define a las técnicas heredadas como los Seis Ojos?", options: ["A) Se pueden aprender leyendo libros antiguos", "B) Son una característica hereditaria excepcional que no aparece en todos los miembros", "C) Se obtienen mediante pactos", "D) Cambian de usuario cada generación"], answer: "b" },
  { q: "¿Cómo logra Gojo mantener el Infinito activo casi de manera permanente?", options: ["A) Consume objetos malditos sin parar", "B) Duerme mientras pelea", "C) Absorbe la energía de sus aliados", "D) Puede mantenerlo con gran eficiencia gracias a los Seis Ojos y su control"], answer: "d" },
  { q: "Técnica defensiva alternativa utilizada para contrarrestar dominios sin expansiones propias:", options: ["A) Simple Domain", "B) Capa protectora de sombra", "C) Cesta de Mimbre Hueca", "D) Barrera de contención"], answer: "c" },
  { q: "¿Qué hace la Amplificación de Dominio frente a una técnica como el Infinito?", options: ["A) Puede neutralizar o reducir el efecto de la técnica al contacto", "B) Destruye el dominio enemigo al instante", "C) Aumenta la velocidad del usuario", "D) Duplica el daño recibido"], answer: "a" },
  { q: "¿Qué poderoso shikigami de las Diez Sombras usó Sukuna en su batalla contra Gojo?", options: ["A) Nue", "B) Orochi", "C) Rabbit Escape", "D) Mahoraga"], answer: "d" },
  { q: "¿Cómo superó Sukuna la defensa del Infinito de Gojo en su combate cumbre?", options: ["A) Rompiendo la barrera a golpes", "B) Utilizar la adaptación de Mahoraga como modelo para ampliar el objetivo de su corte", "C) Usando fuego puro", "D) Anulando la energía maldita de Gojo"], answer: "b" },
  { q: "¿Cómo se definió el golpe final con el que Sukuna venció a Gojo?", options: ["A) Sukuna cortó la cabeza de Gojo por sorpresa", "B) Un golpe de fuerza bruta en el pecho", "C) Sukuna derrotó a Gojo con un corte que alcanzó el espacio o el mundo que ocupaba", "D) Una expansión de dominio perfecta"], answer: "c" },
  { q: "¿Qué arriesgado método usó Gojo para sanar su cerebro agotado durante el combate contra Sukuna?", options: ["A) Dañar y restaurar partes del cerebro para recuperar la técnica, asumiendo graves riesgos", "B) Inyectarse energía maldita pura", "C) Meditar durante 5 minutos", "D) Absorber energía de sus estudiantes"], answer: "a" },
  { q: "¿Por qué fue crucial el papel de Mahoraga en el combate contra Gojo?", options: ["A) Protegió a Sukuna de los ataques físicos", "B) Curó las heridas de Sukuna", "C) Distrajo a los espectadores", "D) Se adaptó al Infinito y ofreció un modelo para superar el obstáculo"], answer: "d" },
  { q: "¿Cómo se describe formalmente al Hollow Purple en los compendios de la serie?", options: ["A) Una técnica de ilusión óptica", "B) Técnica destructiva que combina Azul y Rojo", "C) Un sello de contención", "D) Un escudo impenetrable"], answer: "b" },
  { q: "¿Quién es considerado comúnmente el hechicero más fuerte de la era moderna?", options: ["A) Kento Nanami", "B) Yuji Itadori", "C) Satoru Gojo", "D) Yuta Okkotsu"], answer: "c" },
  { q: "¿Qué suceso marcó la separación ideológica definitiva entre Gojo y Geto en el pasado?", options: ["A) Derrotó a Geto en el enfrentamiento final", "B) Geto adoptó una visión extremista sobre los no hechiceros tras la muerte de Riko y los acontecimientos posteriores", "C) Geto abandonó la escuela por motivos familiares", "D) Discutieron por el liderazgo del clan"], answer: "b" },
  { q: "¿Cuál es la verdad sobre las reservas de energía de Gojo gracias a los Seis Ojos?", options: ["A) Son infinitas en términos absolutos", "B) Los Seis Ojos permiten administrar la energía con enorme eficiencia, reduciendo el consumo casi a cero, pero la reserva no es literalmente infinita", "C) Se duplican cada minuto", "D) Provienen de una maldición interna"], answer: "b" },
  { q: "¿Qué es exactamente el 'Infinito' de Gojo en la física de la serie?", options: ["A) Una pared invisible hecha de acero maldito", "B) Una ilusión óptica masiva", "C) Es una aplicación del control del espacio que proporciona Limitless", "D) Un pacto de inmortalidad"], answer: "c" },
  { q: "¿Quién es la experta médica y usuaria de técnica inversa en la escuela de Tokio?", options: ["A) Utahime", "B) Mai Zenin", "C) Shoko Ieiri", "D) Miwa"], answer: "c" },
  { q: "¿Qué clasificación oficial ostenta Satoru Gojo dentro de la jerarquía de hechiceros?", options: ["A) Grado 1", "B) Grado especial", "C) Hechicero supremo", "D) Clase maestra"], answer: "b" },
  { q: "¿Cómo interacciona el Infinito con los ataques físicos comunes?", options: ["A) El Infinito dificulta que los ataques alcancen su cuerpo, salvo que se neutralice o contrarreste", "B) Los desvía hacia el cielo", "C) Los convierte en cenizas", "D) Los rebota con el doble de fuerza"], answer: "a" }
];

const bloqueBot = [
  { q: "¿Qué biblioteca principal se utiliza en GOJOBOT-MD para conectar con WhatsApp?", options: ["A) whatsapp-web.js", "B) @adiwajshing/baileys", "C) @whiskeysockets/baileys", "D) libsignal-node"], answer: "c" },
  { q: "¿Cuál es la función principal de un manejador (handler) en el bot?", options: ["A) Procesar y dirigir los mensajes hacia la lógica o los comandos correspondientes", "B) Apagar el servidor si hay un error", "C) Descargar imágenes automáticamente", "D) Encriptar la base de datos"], answer: "a" },
  { q: "¿Qué aspectos se deben validar principalmente al procesar un mensaje en grupo?", options: ["A) El nivel de batería del host", "B) La versión de Android del remitente", "C) El color de perfil", "D) Revisar los filtros de grupos, el identificador del chat y las condiciones del handler"], answer: "d" },
  { q: "¿Qué archivo de un proyecto Node.js contiene el registro de dependencias y metadatos?", options: ["A) index.js", "B) package.json", "C) config.env", "D) handler.js"], answer: "b" },
  { q: "¿Cuál es una causa común de error al importar módulos en proyectos modernos de bots?", options: ["A) Falta de memoria RAM en el teléfono", "B) Exceso de espacio libre", "C) Incompatibilidad entre la sintaxis de módulos (ESM/CommonJS) y la configuración del proyecto", "D) Mala conexión WiFi"], answer: "c" },
  { q: "¿Qué error genera comúnmente JavaScript al intentar leer una propiedad de un objeto nulo o indefinido?", options: ["A) Se intenta acceder al índice 0 de un valor que es undefined (TypeError)", "B) Database Error", "C) NullPointerException de red", "D) SyntaxError de compilación"], answer: "a" },
  { q: "¿Por qué se utiliza un sistema modular de plugins en GOJOBOT-MD?", options: ["A) Para ocupar más espacio en disco", "B) Para ralentizar el bot", "C) Para evitar el uso de JavaScript", "D) Permite separar funcionalidades y mantener los comandos de forma ordenada"], answer: "d" },
  { q: "¿Qué contienen típicamente las carpetas de sesión (auth_folder)?", options: ["A) Fotografías del usuario", "B) Datos de autenticación y estado que permiten conservar la conexión del dispositivo vinculado", "C) Registros de llamadas", "D) Copias de seguridad de WhatsApp"], answer: "b" },
  { q: "¿Qué riesgo existe si se eliminan archivos de sesión mientras el bot está ejecutándose?", options: ["A) El bot mejora su velocidad", "B) Se actualiza solo", "C) Puede haber escrituras activas y la eliminación puede dejar conexiones en estado inconsistente", "D) Ninguno"], answer: "c" },
  { q: "¿Cuál es la diferencia conceptual entre una instancia principal y un subbot?", options: ["A) El principal coordina o representa la instancia principal y cada subbot puede tener su propia conexión y estado", "B) No hay ninguna diferencia", "C) Los subbots no usan código", "D) El principal es un juego y el subbot es un menú"], answer: "a" },
  { q: "¿Qué busca evitar un buen sistema de control de eventos en entornos grupales con múltiples instancias?", options: ["A) Que el bot mande audios", "B) Que cambie el fondo de pantalla", "C) Que el bot responda en idiomas extraños", "D) Evitar respuestas duplicadas y establecer qué instancia debe atender el grupo"], answer: "d" },
  { q: "¿Cómo se suele resolver la selección de respuestas en sistemas concurrentes?", options: ["A) Al azar", "B) La primera respuesta válida dentro de una ventana de selección, con reglas de desempate definidas", "C) Ignorando los mensajes", "D) Enviando un reporte por correo"], answer: "b" },
  { q: "¿Qué problema principal surge al escalar bots en múltiples procesos sin coordinación?", options: ["A) La pantalla se pone negra", "B) Se gasta mucha tinta", "C) La latencia varía y varias instancias pueden competir sin coordinación", "D) El teclado se bloquea"], answer: "c" },
  { q: "¿Cuál suele ser el paso inicial para sincronizar una tarea de bot en clústeres?", options: ["A) Asignar la instancia seleccionada como principal, validando permisos y estado", "B) Reiniciar el módem", "C) Borrar la caché del sistema", "D) Desinstalar Baileys"], answer: "a" },
  { q: "¿Cómo se revierte una asignación manual de prioridad en el bot?", options: ["A) Apagando el teléfono", "B) Cambiando la tarjeta SIM", "C) Desinstalando WhatsApp", "D) Quitar la asignación manual y permitir la política de elección configurada"], answer: "d" },
  { q: "¿Qué aspectos críticos administra un gestor de procesos robusto para bots?", options: ["A) Controlar concurrencia, memoria, reconexiones, aislamiento de sesiones y recursos", "B) Editar videos automáticamente", "C) Reproducir música en el grupo", "D) Cambiar nombres de contactos"], answer: "a" },
  { q: "¿Qué problemas de sesión ocurren al correr dos instancias con la misma credencial simultáneamente?", options: ["A) Velocidad ilimitada", "B) Conflictos de credenciales, estado compartido y desconexiones cruzadas", "C) Mejores gráficos", "D) Aumento de memoria RAM"], answer: "b" },
  { q: "¿Qué información contiene típicamente un objeto de mensaje estructurado en el bot?", options: ["A) La clave del mensaje con los datos necesarios del chat, autor o participante e identificador", "B) El clima actual", "C) La ubicación GPS del servidor", "D) El porcentaje de batería del bot"], answer: "a" },
  { q: "¿Qué datos requiere una función de eliminación de mensajes (delete)?", options: ["A) La clave o metadatos que identifican el mensaje que se quiere borrar", "B) El número de teléfono del creador de WhatsApp", "C) Una foto de perfil", "D) Un comando de voz"], answer: "a" },
  { q: "¿En qué unidad de medida se configuran comúnmente los temporizadores (timeouts) en Node.js?", options: ["A) Segundos", "B) Minutos", "C) Milisegundos", "D) Horas"], answer: "c" },
  { q: "¿Cuál es un tiempo estándar recomendado para esperar respuestas en trivias interactivas?", options: ["A) 5 segundos", "B) 90 segundos", "C) 30 segundos", "D) 10 minutos"], answer: "c" },
  { q: "¿Qué se debe comprobar ante un fallo al borrar un mensaje en un grupo?", options: ["A) Comprobar la clave del mensaje, el temporizador y posibles fallos de permisos o contexto", "B) Comprar un celular nuevo", "C) Cambiar el operador de red", "D) Reiniciar el router"], answer: "a" },
  { q: "¿Cuál es la estrategia recomendada al fallar una petición de red en Baileys?", options: ["A) Apagar el bot para siempre", "B) Enviar spam al chat", "C) Reintentar un borrado fallido con límite, espera y registro del error", "D) Ignorar el error por completo"], answer: "c" },
  { q: "¿Por qué es importante limitar los reintentos automáticos (retries)?", options: ["A) Evitar ciclos infinitos, tráfico innecesario y saturación de la conexión", "B) Para que el bot sea más divertido", "C) Para consumir más internet", "D) No tiene importancia"], answer: "a" },
  { q: "¿Qué sucede si se programan múltiples temporizadores sin limpiarlos (clearTimeout)?", options: ["A) El bot vuela", "B) Se programan varios temporizadores y pueden producirse intentos repetidos o colisiones de eventos", "C) Se borra todo el código", "D) El teléfono se apaga"], answer: "b" },
  { q: "¿Qué validación de seguridad es indispensable en comandos administrativos?", options: ["A) Comprobar los permisos y limitar el comando al ámbito previsto", "B) Pedir la contraseña del banco", "C) Solicitar una foto de carnet", "D) Verificar la edad del usuario"], answer: "a" },
  { q: "¿Por qué son vitales los registros de consola (console.error / logger)?", options: ["A) Para adornar la pantalla", "B) Para gastar energía", "C) Permite diagnosticar qué operación falló sin depender de adivinanzas", "D) Para ralentizar el sistema"], answer: "c" },
  { q: "¿Cómo se previene la caída constante de sesión en despliegues 24/7?", options: ["A) Usar reconexiones controladas, evitar instancias duplicadas y verificar el estado de la sesión", "B) No apagar nunca la pantalla del celular", "C) Desconectarse de internet cada hora", "D) Borrar los plugins"], answer: "a" },
  { q: "¿Qué pilar garantiza la estabilidad de un bot multi-dispositivo en grupos activos?", options: ["A) Enviar stickers cada 5 segundos", "B) Asignación de principal coordinada, deduplicación de eventos y control de concurrencia", "C) Bloquear a todos los usuarios", "D) Usar fuentes de letras góticas"], answer: "b" },
  { q: "¿Cuál es el indicador de que un bot opera con máxima salud y estabilidad?", options: ["A) La batería dura más", "B) El celular no se calienta", "C) La pantalla brilla más", "D) La instancia designada responde consistentemente, no hay duplicados y las desconexiones se gestionan correctamente"], answer: "d" }
];

function mezclarArray(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function obtenerPreguntasEstructuradas() {
  return [
    ...mezclarArray(bloqueGojo),
    ...mezclarArray(bloqueBot)
  ];
}

let handler = async (m, { conn, command }) => {
  if (!m.isGroup) return m.reply('⚠️ Este comando solo funciona en grupos.');
  const chatId = m.chat;

  if (['gojo', 'gjc', 'iniciarchallenge'].includes(command)) {
    if (triviaActiva[chatId]) return m.reply('⚠️ Ya hay un challenge activo en este grupo. Si se trabó, usa *.resetgjc* para reiniciarlo.');

    triviaActiva[chatId] = {
      preguntasEstructuradas: obtenerPreguntasEstructuradas(),
      preguntaActual: 0,
      puntuaciones: {},
      aciertosPregunta: [],
      intentosFallidos: [],
      esperandoRespuesta: true,
      timer: null
    };

    const inicioTxt = `💚🔥 𝗚𝗢𝗝𝗢𝗕𝗢𝗧-𝗠𝗗 × 𝗦𝗔𝗧𝗢𝗥𝗨 𝗚𝗢𝗝𝗢 𝗖𝗛𝗔𝗟𝗟𝗘𝗡𝗚𝗘 🔥💚\n\n` +
                      `🏆 Competencia oficial iniciada. ¡70 preguntas en total!\n` +
                      `🥇 1er lugar: 5 pts | 🥈 2do lugar: 3 pts | 🥉 3er lugar: 1 pt\n\n` +
                      `💡 *Usa .puntaje para ver la tabla y .saltar si alguna se congela.*\n` +
                      `⚠️ *¡Solo 1 intento por pregunta!*`;

    await conn.reply(chatId, inicioTxt, m);
    return enviarSiguientePregunta(conn, chatId);
  }

  // Comando de rescate para forzar la siguiente pregunta si se traba
  if (['saltar', 'siguiente'].includes(command)) {
    const trivia = triviaActiva[chatId];
    if (!trivia) return m.reply('⚠️ No hay ningún challenge activo.');
    await conn.reply(chatId, '⏭️ *Forzando el avance a la siguiente pregunta...*', m);
    return pasarASiguiente(conn, chatId);
  }

  // Comando de emergencia para limpiar la sesión trabada
  if (['resetgjc', 'forzarstop'].includes(command)) {
    if (!triviaActiva[chatId]) return m.reply('⚠️ No hay ninguna trivia activa para resetear.');
    if (triviaActiva[chatId].timer) clearTimeout(triviaActiva[chatId].timer);
    delete triviaActiva[chatId];
    return conn.reply(chatId, '🔄 *Memoria de la trivia limpiada a la fuerza.* Ya puedes iniciar otra con *.gojo*', m);
  }

  if (['puntaje', 'puntos', 'scoreboard'].includes(command)) {
    const trivia = triviaActiva[chatId];
    if (!trivia) return m.reply('⚠️ No hay ningún challenge activo en este grupo. Inicia uno con *.gojo*');

    const ranking = Object.entries(trivia.puntuaciones)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    let scoreTxt = `📊 𝗧𝗔𝗕𝗟𝗔 𝗗𝗘 𝗣𝗨𝗡𝗧𝗔𝗝𝗘𝗦 𝗔𝗖𝗧𝗨𝗔𝗟\n📌 Pregunta en curso: ${trivia.preguntaActual + 1} / 70\n\n`;

    if (ranking.length === 0) {
      scoreTxt += `_Aún no hay participantes con puntos registrados._`;
    } else {
      ranking.forEach(([jid, pts], index) => {
        const medalla = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🔹';
        scoreTxt += `${medalla} @${jid.split('@')[0]} — *${pts} pts*\n`;
      });
    }

    const mentionsList = ranking.map(([jid]) => jid);
    return conn.sendMessage(chatId, { text: scoreTxt, mentions: mentionsList });
  }

  if (['stopgjc', 'detenerchallenge'].includes(command)) {
    if (!triviaActiva[chatId]) return m.reply('⚠️ No hay ningún challenge activo en este grupo.');
    if (triviaActiva[chatId].timer) clearTimeout(triviaActiva[chatId].timer);
    delete triviaActiva[chatId];
    return conn.reply(chatId, '❌ El challenge ha sido detenido.', m);
  }
};

async function enviarSiguientePregunta(conn, chatId) {
  const trivia = triviaActiva[chatId];
  if (!trivia) return;

  if (trivia.timer) clearTimeout(trivia.timer);

  if (trivia.preguntaActual >= trivia.preguntasEstructuradas.length) {
    return finalizarChallenge(conn, chatId);
  }

  trivia.aciertosPregunta = [];
  trivia.intentosFallidos = [];
  trivia.esperandoRespuesta = true;

  const num = trivia.preguntaActual + 1;
  let categoriaTag = num <= 35 ? "🔵 𝗠Ó𝗗𝗨𝗟𝗢: 𝗦𝗔𝗧𝗢𝗥𝗨 𝗚𝗢𝗝𝗢" : "🟢 𝗠Ó𝗗𝗨𝗟𝗢: 𝗚𝗢𝗝𝗢𝗕𝗢𝗧-𝗠𝗗";

  const p = trivia.preguntasEstructuradas[trivia.preguntaActual];
  const texto = `📋 𝗣𝗿𝗲𝗴𝘂𝗻𝘁𝗮 ${num} / 𝟩𝟬 [${categoriaTag}]\n\n` +
                `❓ ${p.q}\n\n` +
                p.options.join('\n') + `\n\n` +
                `⏳ *Responde con A, B, C o D* (Usa .saltar si se congela)`;

  await conn.sendMessage(chatId, { text: texto });

  trivia.timer = setTimeout(() => {
    if (triviaActiva[chatId] && trivia.esperandoRespuesta) {
      pasarASiguiente(conn, chatId, "⏰ *¡Tiempo agotado para esta pregunta!*");
    }
  }, TIEMPO_PREGUNTA);
}

async function pasarASiguiente(conn, chatId, motivo = "") {
  const trivia = triviaActiva[chatId];
  if (!trivia) return;

  if (trivia.timer) clearTimeout(trivia.timer);
  trivia.esperandoRespuesta = false;

  if (motivo) await conn.sendMessage(chatId, { text: motivo });

  trivia.preguntaActual++;
  setTimeout(() => enviarSiguientePregunta(conn, chatId), 2500);
}

handler.before = async function (m, { conn }) {
  const chatId = m.chat;
  const trivia = triviaActiva[chatId];
  if (!trivia || !trivia.esperandoRespuesta) return;

  const textoUser = m.text?.trim().toLowerCase();
  if (!['a', 'b', 'c', 'd'].includes(textoUser)) return;

  const sender = m.sender;

  if (trivia.aciertosPregunta.includes(sender) || trivia.intentosFallidos.includes(sender)) return;

  const p = trivia.preguntasEstructuradas[trivia.preguntaActual];

  if (textoUser === p.answer) {
    trivia.aciertosPregunta.push(sender);
    const orden = trivia.aciertosPregunta.length;
    let pts = 0;
    let medalla = '';

    if (orden === 1) { pts = 5; medalla = '🥇 1er lugar'; }
    else if (orden === 2) { pts = 3; medalla = '🥈 2do lugar'; }
    else if (orden === 3) { pts = 1; medalla = '🥉 3er lugar'; }

    if (!trivia.puntuaciones[sender]) trivia.puntuaciones[sender] = 0;
    trivia.puntuaciones[sender] += pts;

    await conn.reply(chatId, `✅ ¡Correcto @${sender.split('@')[0]}! (${medalla}: +${pts} pts)`, m, { mentions: [sender] });

    if (trivia.aciertosPregunta.length >= 3) {
      pasarASiguiente(conn, chatId, "🎯 *¡3 personas han acertado! Avanzando a la siguiente...*");
    }
  } else {
    trivia.intentosFallidos.push(sender);
    const frase = frasesFallo[Math.floor(Math.random() * frasesFallo.length)];
    await conn.reply(chatId, `❌ @${sender.split('@')[0]} ${frase}`, m, { mentions: [sender] });
  }
};

async function finalizarChallenge(conn, chatId) {
  const trivia = triviaActiva[chatId];
  if (!trivia) return;

  if (trivia.timer) clearTimeout(trivia.timer);

  const ranking = Object.entries(trivia.puntuaciones)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  let resultadoTxt = `🏆 𝗙𝗜𝗡 𝗗𝗘𝗟 𝗚𝗢𝗝𝗢𝗕𝗢𝗧-𝗠𝗗 𝗖𝗛𝗔𝗟𝗟𝗘𝗡𝗚𝗘 (𝟩𝟬/𝟩𝟬) 🏆\n\n📊 𝗣𝗢𝗗𝗜𝗢𝗦 𝗙𝗜𝗡𝗔𝗟𝗘𝗦:\n`;
  
  ranking.forEach(([jid, pts], index) => {
    const medalla = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
    resultadoTxt += `${medalla} @${jid.split('@')[0]} — *${pts} puntos*\n`;
  });

  if (ranking.length === 0) {
    resultadoTxt += `No hubo participantes con respuestas correctas.`;
  }

  const mentionsList = ranking.map(([jid]) => jid);

  await conn.sendMessage(chatId, { text: resultadoTxt, mentions: mentionsList });
  delete triviaActiva[chatId];
}

handler.help = ['gojo', 'gjc', 'puntaje', 'saltar', 'resetgjc', 'stopgjc'];
handler.tags = ['game'];
handler.command = ['gojo', 'gjc', 'iniciarchallenge', 'puntaje', 'puntos', 'scoreboard', 'saltar', 'siguiente', 'resetgjc', 'forzarstop', 'stopgjc', 'detenerchallenge'];
handler.group = true;

export default handler;
