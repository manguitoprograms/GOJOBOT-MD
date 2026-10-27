
const preguntas = [
  // 🟢 RONDA 1: FÁCIL
  { nivel: 'facil', pregunta: '¿De qué anime es Satoru Gojo?', opciones: ['Naruto', 'One Piece', 'Jujutsu Kaisen', 'Dragon Ball'], correcta: 2 },
  { nivel: 'facil', pregunta: '¿Cuál es el color natural del cabello de Satoru Gojo?', opciones: ['Negro', 'Blanco', 'Rojo', 'Verde'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Cómo se llama la técnica ocular especial de Gojo?', opciones: ['Sharingan', 'Byakugan', 'Rinnegan', 'Seis Ojos'], correcta: 3 },
  { nivel: 'facil', pregunta: '¿Cómo se llama la expansión de dominio de Gojo?', opciones: ['Santuario Malevolente', 'Jardín de Sombras', 'Prisión de Hierro', 'Vacío Inconmensurable'], correcta: 3 },
  { nivel: 'facil', pregunta: '¿Qué suele llevar Gojo sobre los ojos?', opciones: ['Un casco', 'Una venda o antifaz', 'Un sombrero', 'Una máscara de hierro'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Qué personaje es conocido como el Rey de las Maldiciones?', opciones: ['Yuji Itadori', 'Megumi Fushiguro', 'Ryomen Sukuna', 'Kento Nanami'], correcta: 2 },
  { nivel: 'facil', pregunta: '¿Quién es el protagonista principal de Jujutsu Kaisen?', opciones: ['Yuji Itadori', 'Toji Fushiguro', 'Aoi Todo', 'Suguru Geto'], correcta: 0 },
  { nivel: 'facil', pregunta: '¿Qué técnica maldita está relacionada con la manipulación del espacio de Gojo?', opciones: ['Diez Sombras', 'Manipulación de sangre', 'Respiración del Agua', 'Limitless (Ilimitado)'], correcta: 3 },
  { nivel: 'facil', pregunta: '¿Quién utiliza la técnica de las Diez Sombras?', opciones: ['Satoru Gojo', 'Megumi Fushiguro', 'Kento Nanami', 'Aoi Todo'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Qué color se asocia con la técnica Azul de Gojo?', opciones: ['Amarillo', 'Rojo', 'Azul', 'Verde'], correcta: 2 },
  { nivel: 'facil', pregunta: '¿Qué tipo de personaje es Satoru Gojo?', opciones: ['Un hechicero', 'Un pirata', 'Un detective', 'Un astronauta'], correcta: 0 },
  { nivel: 'facil', pregunta: '¿Qué técnica de Gojo se asocia con la repulsión?', opciones: ['Azul', 'Diez Sombras', 'Manipulación de sangre', 'Rojo'], correcta: 3 },
  { nivel: 'facil', pregunta: '¿Qué personaje fue amigo de Gojo durante su juventud y después se convirtió en su enemigo?', opciones: ['Kento Nanami', 'Suguru Geto', 'Yuji Itadori', 'Aoi Todo'], correcta: 1 },
  { nivel: 'facil', pregunta: '¿Qué relación tiene Gojo con los estudiantes de la Escuela de Hechicería?', opciones: ['Es su profesor', 'Es su hermano', 'Es su director de cine', 'Es un estudiante de primaria'], correcta: 0 },

  // 🔵 RONDA 2: INTERMEDIO
  { nivel: 'media', pregunta: '¿Qué técnica resulta de la combinación de Azul y Rojo de Gojo?', opciones: ['Dragón de Agua', 'Flecha de Fuego', 'Púrpura (Hollow Purple)', 'Espada del Trueno'], correcta: 2 },
  { nivel: 'media', pregunta: '¿Qué ventaja especial proporcionan los Seis Ojos?', opciones: ['Volar sin límite', 'Volverse invisible', 'Controlar el tiempo', 'Percepción extraordinaria y uso eficiente de la energía maldita'], correcta: 3 },
  { nivel: 'media', pregunta: '¿Qué efecto produce principalmente la técnica Azul?', opciones: ['Controlar el fuego', 'Generar atracción', 'Curar cualquier enfermedad', 'Crear copias'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Qué efecto produce principalmente la técnica Roja?', opciones: ['Repulsión', 'Atracción', 'Invisibilidad', 'Control del fuego'], correcta: 0 },
  { nivel: 'media', pregunta: '¿Qué sucede con quienes quedan atrapados en Vacío Inconmensurable?', opciones: ['Se vuelven inmortales', 'Viajan a otro país', 'Reciben una cantidad abrumadora de información y estímulos', 'Obtienen las Diez Sombras'], correcta: 2 },
  { nivel: 'media', pregunta: '¿Qué objetivo tuvo Gojo al limitar su dominio a aproximadamente 0,2 segundos en Shibuya?', opciones: ['Derrotar a Sukuna', 'Limitar la exposición de civiles a los efectos del dominio', 'Desactivar los Seis Ojos', 'Destruir la Prisión del Reino'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Qué objeto fue utilizado para mantener a Gojo sellado durante el incidente de Shibuya?', opciones: ['La Prisión del Reino', 'El martillo de Nobara', 'La espada de Toji', 'El anillo de Yuta'], correcta: 0 },
  { nivel: 'media', pregunta: '¿Qué relación existe entre los Seis Ojos y Limitless?', opciones: ['Son dos nombres para su dominio', 'Ambos pertenecen a Megumi', 'Son armas físicas', 'Son conceptos diferentes que complementan las habilidades de Gojo'], correcta: 3 },
  { nivel: 'media', pregunta: '¿Quién fue el padre de Megumi Fushiguro?', opciones: ['Suguru Geto', 'Toji Fushiguro', 'Kento Nanami', 'Masamichi Yaga'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Qué técnica utiliza Gojo para protegerse mediante la manipulación del espacio?', opciones: ['Diez Sombras', 'Santuario Malevolente', 'Limitless', 'Manipulación de sangre'], correcta: 2 },
  { nivel: 'media', pregunta: '¿Qué describe mejor una expansión de dominio?', opciones: ['Una técnica avanzada que crea un espacio de dominio con efectos propios', 'Un entrenamiento físico normal', 'Una herramienta para curar heridas comunes', 'Una técnica exclusiva de armas'], correcta: 0 },
  { nivel: 'media', pregunta: '¿Qué color se asocia principalmente con Púrpura de Gojo?', opciones: ['Verde', 'Amarillo', 'Naranja', 'Morado'], correcta: 3 },
  { nivel: 'media', pregunta: '¿Qué característica distingue a Gojo entre los hechiceros?', opciones: ['No posee energía maldita', 'Su combinación de los Seis Ojos y Limitless', 'Puede usar todas las técnicas de Sukuna', 'No necesita aprender técnicas'], correcta: 1 },
  { nivel: 'media', pregunta: '¿Quién derrotó a Gojo durante su misión con Riko Amanai?', opciones: ['Yuji Itadori', 'Mahito', 'Toji Fushiguro', 'Jogo'], correcta: 2 },

  // 🟣 RONDA 3: DIFÍCIL
  { nivel: 'dificil', pregunta: '¿Qué técnica se relaciona con la convergencia de Azul y Rojo?', opciones: ['Púrpura (Hollow Purple)', 'Santuario Malevolente', 'Transfiguración inactiva', 'Diez Sombras'], correcta: 0 },
  { nivel: 'dificil', pregunta: '¿Qué ventaja aporta la eficiencia de los Seis Ojos al uso de energía maldita?', opciones: ['Energía infinita sin límites', 'Anula todas las técnicas enemigas', 'Copia cualquier dominio automáticamente', 'Reduce enormemente el gasto de energía al usar técnicas'], correcta: 3 },
  { nivel: 'dificil', pregunta: '¿Qué sucede cuando Gojo activa Vacío Inconmensurable?', opciones: ['Todos recuperan su energía', 'El enemigo obtiene una nueva técnica', 'El objetivo queda abrumado por información y estímulos', 'Se desactiva toda la energía maldita del mundo'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Cuál es una característica de la técnica Limitless?', opciones: ['Invoca únicamente lobos', 'Manipula el espacio mediante conceptos relacionados con el infinito', 'Controla las sombras de cualquier persona', 'Crea armas de fuego'], correcta: 1 },
  { nivel: 'dificil', pregunta: '¿Qué hace especial a la técnica Púrpura?', opciones: ['Combina los efectos de Azul y Rojo', 'Es una técnica de curación', 'Pertenece a Megumi', 'Solo detecta maldiciones'], correcta: 0 },
  { nivel: 'dificil', pregunta: '¿Por qué Gojo suele cubrirse los ojos?', opciones: ['No puede ver sin una venda', 'Oculta una lesión permanente', 'Perdió los Seis Ojos', 'Para controlar la percepción y reducir el esfuerzo asociado a sus ojos'], correcta: 3 },
  { nivel: 'dificil', pregunta: '¿Qué diferencia general existe entre Azul y Rojo?', opciones: ['Ambos producen el mismo efecto', 'Azul se asocia con la atracción y Rojo con la repulsión', 'Azul cura y Rojo resucita', 'Rojo pertenece a las Diez Sombras'], correcta: 1 },
  { nivel: 'dificil', pregunta: '¿Qué marcó profundamente la relación entre Gojo y Geto?', opciones: ['Una competencia deportiva', 'La creación de GOJOBOT-MD', 'Los acontecimientos relacionados con Riko Amanai y sus distintas visiones del mundo', 'Una misión con Sukuna como aliado'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Cómo se llamaba la joven que Gojo y Geto debían proteger durante el arco del pasado?', opciones: ['Riko Amanai', 'Maki Zenin', 'Nobara Kugisaki', 'Shoko Ieiri'], correcta: 0 },
  { nivel: 'dificil', pregunta: '¿Qué describe mejor el papel de Gojo en la sociedad de hechiceros?', opciones: ['Usuario de maldiciones sin entrenamiento', 'Estudiante sin habilidades', 'Civil sin energía maldita', 'Uno de los hechiceros más poderosos que altera el equilibrio de poder'], correcta: 3 },
  { nivel: 'dificil', pregunta: '¿Qué personaje está asociado con la técnica de transfiguración inactiva?', opciones: ['Jogo', 'Mahito', 'Panda', 'Inumaki'], correcta: 1 },
  { nivel: 'dificil', pregunta: '¿Qué técnica utiliza Sukuna como expansión de dominio?', opciones: ['Vacío Inconmensurable', 'Jardín de Sombras', 'Santuario Malevolente', 'Púrpura'], correcta: 2 },
  { nivel: 'dificil', pregunta: '¿Qué clan está relacionado con el linaje de Satoru Gojo?', opciones: ['Clan Gojo', 'Clan Uzumaki', 'Clan Uchiha', 'Clan Ackerman'], correcta: 0 },
  { nivel: 'dificil', pregunta: '¿Qué limitación importante tiene una expansión de dominio en combate?', opciones: ['Nunca afecta a otros personajes', 'Siempre dura una hora', 'No requiere energía maldita', 'Su uso consume recursos y puede dejar al usuario en desventaja'], correcta: 3 },

  // 🔴 RONDA 4: EXPERTO
  { nivel: 'experto', pregunta: '¿Qué describe mejor la relación entre Azul y el concepto de infinito en Limitless?', opciones: ['Azul es una técnica de fuego', 'Azul amplifica la convergencia para producir un efecto de atracción', 'Azul elimina toda energía maldita', 'Azul permite controlar el clima'], correcta: 1 },
  { nivel: 'experto', pregunta: '¿Qué describe mejor el efecto de Rojo?', opciones: ['Una fuerza de repulsión asociada a Limitless', 'Una técnica de invocación de animales', 'Una barrera que cura a todos', 'Una técnica exclusiva de Sukuna'], correcta: 0 },
  { nivel: 'experto', pregunta: '¿Qué describe mejor la función de los Seis Ojos?', opciones: ['Copian automáticamente cualquier dominio', 'Controlan todas las maldiciones', 'Permiten viajar en el tiempo', 'Proporcionan percepción excepcional y control eficiente de la energía maldita'], correcta: 3 },
  { nivel: 'experto', pregunta: '¿Cuál fue una consecuencia importante del sellado de Gojo en Shibuya?', opciones: ['Todas las maldiciones desaparecieron', 'La escuela dejó de existir inmediatamente', 'Los hechiceros perdieron uno de sus mayores recursos para enfrentar la crisis', 'Sukuna se convirtió en profesor'], correcta: 2 },
  { nivel: 'experto', pregunta: '¿Qué distingue una técnica maldita innata de una habilidad física común?', opciones: ['Es una capacidad sobrenatural relacionada con la energía maldita', 'Siempre requiere un arma de fuego', 'No puede utilizarse en combate', 'Es simplemente entrenamiento muscular'], correcta: 0 },
  { nivel: 'experto', pregunta: '¿Qué debe tenerse en cuenta al comparar el dominio de Gojo con el de Sukuna?', opciones: ['Son idénticos en todos los aspectos', 'No pueden entrar en conflicto', 'Ambos pertenecen al mismo clan', 'Sus características y condiciones son diferentes y pueden influir en el enfrentamiento'], correcta: 3 },
  { nivel: 'experto', pregunta: '¿Qué relación existe entre el pasado de Gojo y su manera de enseñar?', opciones: ['Nunca tuvo compañeros', 'Sus experiencias influyen en su deseo de formar una nueva generación de hechiceros', 'Quiere eliminar a sus estudiantes', 'Su objetivo es abandonar la hechicería'], correcta: 1 },
  { nivel: 'experto', pregunta: '¿Cuál es la mejor descripción de la técnica Púrpura?', opciones: ['Una barrera sin capacidad ofensiva', 'Una técnica de curación inversa', 'Una técnica destructiva que combina propiedades de Azul y Rojo', 'Una invocación de las Diez Sombras'], correcta: 2 },
  { nivel: 'experto', pregunta: '¿Qué diferencia a los Seis Ojos de una técnica maldita común?', opciones: ['Son una característica ocular excepcional asociada al linaje Gojo', 'Son un objeto que Gojo guarda en el bolsillo', 'Son una expansión de dominio', 'Son una maldición creada por Geto'], correcta: 0 },
  { nivel: 'experto', pregunta: '¿Por qué es importante gestionar la energía maldita durante una batalla?', opciones: ['Elimina la necesidad de estrategia', 'Garantiza la victoria siempre', 'Permite ignorar técnicas enemigas', 'Los recursos, el control y el momento de uso influyen en la eficacia del combate'], correcta: 3 },
  { nivel: 'experto', pregunta: '¿Qué debe hacer un administrador si dos participantes terminan empatados?', opciones: ['Elegir a su amigo', 'Aplicar el criterio de desempate anunciado previamente', 'Cambiar las reglas después del evento', 'Dar la victoria al primero que escriba'], correcta: 1 },
  { nivel: 'experto', pregunta: '¿Por qué Gojo altera el equilibrio del mundo de la hechicería?', opciones: ['No tiene habilidades especiales', 'Es incapaz de usar energía maldita', 'Su poder influye en las decisiones y estrategias de otros grupos', 'Nunca participa en conflictos'], correcta: 2 },
  { nivel: 'experto', pregunta: '¿Qué afirmación sobre las técnicas de Gojo es correcta?', opciones: ['Limitless, Azul, Rojo y Púrpura están relacionados entre sí', 'Todas sus técnicas pertenecen al clan Zenin', 'Su dominio se llama Santuario Malevolente', 'Sus Seis Ojos son una espada maldita'], correcta: 0 },
  { nivel: 'experto', pregunta: '¿Qué representa el enfrentamiento entre Gojo y Sukuna?', opciones: ['Una competencia escolar sin consecuencias', 'Una pelea entre estudiantes normales', 'Un entrenamiento de programación', 'Un choque entre poderes extraordinarios con consecuencias para el mundo de la hechicería'], correcta: 3 },

  // ⚫ RONDA 5: GOJOBOT-MD
  { nivel: 'final', pregunta: '¿Qué tipo de proyecto es GOJOBOT-MD?', opciones: ['Un videojuego', 'Un editor de fotografías', 'Un bot multidispositivo para WhatsApp', 'Una red social independiente'], correcta: 2 },
  { nivel: 'final', pregunta: '¿Qué entorno de ejecución utiliza GOJOBOT-MD?', opciones: ['Node.js', 'Unity', 'Scratch', 'Excel'], correcta: 0 },
  { nivel: 'final', pregunta: '¿Qué biblioteca se utiliza en el proyecto para conectar con WhatsApp?', opciones: ['Pygame', 'Laravel', 'NumPy', 'Baileys'], correcta: 3 },
  { nivel: 'final', pregunta: '¿Qué lenguaje se utiliza habitualmente con Node.js?', opciones: ['CSS exclusivamente', 'JavaScript', 'HTML exclusivamente', 'SQL exclusivamente'], correcta: 1 },
  { nivel: 'final', pregunta: '¿Para qué sirve un plugin en un bot?', opciones: ['Cambiar físicamente el teléfono', 'Eliminar Internet', 'Añadir funciones o comandos', 'Aumentar la pantalla'], correcta: 2 },
  { nivel: 'final', pregunta: '¿Qué hace normalmente un handler en un bot?', opciones: ['Procesa eventos y mensajes', 'Carga la batería', 'Cambia el operador', 'Diseña teléfonos'], correcta: 0 },
  { nivel: 'final', pregunta: '¿Qué archivo suele contener las dependencias de un proyecto Node.js?', opciones: ['photo.png', 'video.mp4', 'wallpaper.jpg', 'package.json'], correcta: 3 },
  { nivel: 'final', pregunta: '¿Qué archivo puede utilizarse como punto de entrada de un proyecto Node.js?', opciones: ['fondo.jpg', 'index.js', 'musica.mp3', 'imagen.png'], correcta: 1 },
  { nivel: 'final', pregunta: '¿Para qué sirve una sesión de autenticación en un bot multidispositivo?', opciones: ['Guardar solamente imágenes', 'Editar vídeos', 'Mantener la información necesaria para autenticar la conexión', 'Aumentar la resolución de la cámara'], correcta: 2 },
  { nivel: 'final', pregunta: '¿Qué es una dependencia en programación?', opciones: ['Una biblioteca o paquete utilizado por el proyecto', 'Un archivo de música', 'Una contraseña del teléfono', 'Un fondo de pantalla'], correcta: 0 },
  { nivel: 'final', pregunta: '¿Qué conviene hacer antes de modificar archivos importantes del bot?', opciones: ['Borrar todo el proyecto', 'Eliminar las dependencias', 'Ignorar los errores', 'Crear una copia de seguridad'], correcta: 3 },
  { nivel: 'final', pregunta: '¿Qué es una API?', opciones: ['Un tipo de batería', 'Una interfaz que permite la comunicación entre componentes de software', 'Un formato exclusivo de imagen', 'Un modelo de teléfono'], correcta: 1 },
  { nivel: 'final', pregunta: '¿Para qué puede utilizarse un archivo .env?', opciones: ['Guardar exclusivamente imágenes', 'Reemplazar JavaScript', 'Configurar variables de entorno', 'Aumentar la memoria RAM'], correcta: 2 },
  { nivel: 'final', pregunta: '¿Qué práctica es más segura para las credenciales de un bot?', opciones: ['Mantenerlas privadas y protegerlas', 'Publicarlas en el grupo', 'Compartirlas con todos', 'Incluirlas en el anuncio'], correcta: 0 },
  { nivel: 'final', pregunta: '¿Qué tecnología permite ejecutar JavaScript fuera del navegador?', opciones: ['Photoshop', 'Microsoft Word', 'PowerPoint', 'Node.js'], correcta: 3 },
  { nivel: 'final', pregunta: '¿Qué herramienta permite instalar paquetes desde el registro de npm?', opciones: ['Paint', 'npm', 'Bloc de notas', 'Bluetooth'], correcta: 1 },
  { nivel: 'final', pregunta: '¿Qué archivo se utiliza habitualmente para ignorar archivos al usar Git?', opciones: ['package.png', 'index.mp3', '.gitignore', 'config.jpg'], correcta: 2 },
  { nivel: 'final', pregunta: '¿Qué debe hacer un bot si pierde la conexión con WhatsApp?', opciones: ['Gestionar la desconexión y, cuando corresponda, intentar reconectarse de forma controlada', 'Borrar automáticamente el proyecto', 'Cambiar todas las contraseñas', 'Eliminar los archivos JavaScript'], correcta: 0 },
  { nivel: 'final', pregunta: '¿Qué buena práctica ayuda a evitar que una actualización rompa el bot?', opciones: ['Cambiar todos los archivos al azar', 'Ignorar los errores', 'Eliminar los registros de errores', 'Probar los cambios y conservar una copia de seguridad'], correcta: 3 },
  { nivel: 'final', pregunta: '¿Qué sucede cuando un mensaje activa un comando del bot?', opciones: ['El teléfono se reinicia', 'El bot puede procesar el mensaje y ejecutar una función', 'WhatsApp se elimina', 'Se inicia una llamada automáticamente'], correcta: 1 },
  { nivel: 'final', pregunta: '¿Qué significa que un bot sea multidispositivo?', opciones: ['Solo funciona en una computadora', 'Es un sistema operativo', 'Está diseñado para funcionar mediante una conexión multidispositivo', 'No necesita dispositivos'], correcta: 2 },
  { nivel: 'final', pregunta: '¿Qué práctica ayuda a investigar un error del bot?', opciones: ['Revisar los registros y el mensaje de error', 'Borrar el proyecto inmediatamente', 'Ignorar los errores', 'Eliminar todos los archivos'], correcta: 0 },
  { nivel: 'final', pregunta: '¿Qué puede causar un error de credenciales en una API?', opciones: ['Tener un fondo de pantalla diferente', 'Usar un teclado físico', 'Cambiar el brillo de pantalla', 'No configurar la clave requerida o utilizar una clave inválida'], correcta: 3 },
  { nivel: 'final', pregunta: '¿Qué representa un comando en GOJOBOT-MD?', opciones: ['Una imagen de perfil', 'Una instrucción que el bot reconoce y procesa', 'Una pieza del teléfono', 'Una conexión Bluetooth'], correcta: 1 },
  { nivel: 'final', pregunta: '¿Qué puede suceder si se eliminan archivos de sesión sin revisar cómo los utiliza el bot?', opciones: ['El bot mejora siempre', 'Aumenta automáticamente la memoria RAM', 'Puede ser necesario volver a autenticar una conexión', 'Se actualiza WhatsApp automáticamente'], correcta: 2 },
  { nivel: 'final', pregunta: '¿Qué debe protegerse al publicar el código de un bot en GitHub?', opciones: ['Las claves privadas, tokens y credenciales', 'Los nombres de las funciones públicas', 'Los comentarios de documentación', 'Los archivos de ejemplo sin secretos'], correcta: 0 },
  { nivel: 'final', pregunta: '¿Qué propósito tiene una copia de seguridad?', opciones: ['Hacer que el código sea más largo', 'Eliminar todas las dependencias', 'Desactivar WhatsApp', 'Permitir recuperar archivos ante pérdidas o errores'], correcta: 3 },
  { nivel: 'final', pregunta: '¿Qué puede aportar un sistema de plugins bien organizado?', opciones: ['Impedir que se ejecuten comandos', 'Facilitar la incorporación y el mantenimiento de funcionalidades', 'Eliminar la necesidad de probar el código', 'Garantizar que nunca haya errores'], correcta: 1 },
  { nivel: 'final', pregunta: '¿Cuál es el objetivo principal de una competencia comunitaria bien organizada?', opciones: ['Eliminar la comunidad', 'Competir sin reglas', 'Fomentar el conocimiento, la diversión y la participación', 'Obligar a todos a enviar mensajes'], correcta: 2 },
  { nivel: 'final', pregunta: '¿Cuál es la misión del GOJOBOT-MD × SATORU GOJO CHALLENGE?', opciones: ['Combinar conocimientos de GOJOBOT-MD, anime y participación comunitaria', 'Premiar únicamente a los administradores', 'Promover el spam', 'Evitar que los usuarios participen'], correcta: 0 }
]

const usadas = new Set()
const ultimaPregunta = new Map()

let handler = async (m, { conn, text, isAdmin, isOwner }) => {
  const args = (text || '').trim().toLowerCase()
  const esAdmin = isAdmin || isOwner

  if (!esAdmin) {
    return m.reply('⛔ Solo Administración y Soporte pueden utilizar este comando.')
  }

  if (args === 'respuesta') {
    const ultima = ultimaPregunta.get(m.chat)

    if (!ultima) {
      return m.reply('⚠️ Todavía no hay una pregunta registrada en este grupo.')
    }

    return m.reply(
      `🔐 *FICHA DE ADMINISTRACIÓN*\n\n` +
      `🏆 GOJOBOT-MD × SATORU GOJO CHALLENGE\n\n` +
      `❓ ${ultima.pregunta}\n` +
      `✅ Respuesta correcta: ${String.fromCharCode(65 + ultima.correcta)}. ${ultima.opciones[ultima.correcta]}`
    )
  }

  if (args === 'reiniciar') {
    usadas.clear()
    ultimaPregunta.delete(m.chat)
    return m.reply('🔄 ¡Preguntas reiniciadas! Las 70 preguntas vuelven a estar disponibles.')
  }

  const niveles = ['facil', 'media', 'dificil', 'experto', 'final']

  if (args && !niveles.includes(args)) {
    return m.reply(
      '📋 *COMANDOS DEL EVENTO 2026*\n\n' +
      '• .pregunta\n' +
      '• .pregunta facil\n' +
      '• .pregunta media\n' +
      '• .pregunta dificil\n' +
      '• .pregunta experto\n' +
      '• .pregunta final\n' +
      '• .pregunta respuesta\n' +
      '• .pregunta reiniciar'
    )
  }

  const disponibles = preguntas.filter((p, i) =>
    (!args || p.nivel === args) && !usadas.has(i)
  )

  if (!disponibles.length) {
    return m.reply(
      `⚠️ Ya se agotaron las preguntas${args ? ` del nivel ${args}` : ''}.\n` +
      'Usa .pregunta reiniciar para volver a habilitarlas.'
    )
  }

  const elegida = disponibles[Math.floor(Math.random() * disponibles.length)]
  const indice = preguntas.indexOf(elegida)

  
try {
  const encuesta = await conn.sendMessage(m.chat, {
    poll: {
      name:
        `💚🔥 GOJOBOT-MD × SATORU GOJO CHALLENGE 🔥💚\n\n` +
        `⏳ ¡SOLO TIENEN 30 SEGUNDOS PARA RESPONDER!\n\n` +
        elegida.pregunta,
      values: elegida.opciones.map((opcion, i) =>
        `${String.fromCharCode(65 + i)}) ${opcion}`
      ),
      selectableCount: 1
    }
  }, { quoted: m })

  usadas.add(indice)
  ultimaPregunta.set(m.chat, elegida)

  // Solicitar eliminación de la encuesta después de 30 segundos.
  setTimeout(async () => {
    try {
      await conn.sendMessage(m.chat, {
        delete: encuesta.key
      })
      console.log('[GOJOBOT-MD] Solicitud de eliminación de encuesta enviada.')
    } catch (error) {
      console.error('[GOJOBOT-MD] No se pudo eliminar la encuesta:', error)
    }
  }, 30000)

} catch (error) {
  console.error('[GOJOBOT-MD] Error al publicar encuesta:', error)
  return m.reply(`❌ No se pudo publicar la encuesta: ${error.message}`)
}
}

handler.help = [
  'pregunta',
  'pregunta facil',
  'pregunta media',
  'pregunta dificil',
  'pregunta experto',
  'pregunta final',
  'pregunta respuesta',
  'pregunta reiniciar'
]

handler.tags = ['evento']
handler.command = ['pregunta']
handler.group = true

export default handler
 
