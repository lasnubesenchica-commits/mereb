/* ============================================================
   Mereb Nova · Datos de demostración
   Estructura extraída del sistema real (capturas jul 2026).
   "Hoy" está fijado al miércoles 1 de julio de 2026 para la demo.
   ============================================================ */

const HOY = "2026-07-01";

const ESTUDIANTE = {
  nombre: "Gianna Lorena",
  apellidos: "López Ordóñez",
  iniciales: "GL",
  grado: "5°A",
  nivel: "5° grado",
  consejera: "Nayrobis Cobas",
  colegio: "Colegio de Las Esclavas del Sagrado Corazón de Jesús",
  anio: 2026,
  acudiente: {
    correo: "vivistela24@gmail.com",
    notificaciones: true,
  },
};

/* Materias con color propio (consistente en toda la app) */
const MATERIAS = {
  espanol:   { nombre: "Español",                corto: "ESP", color: "#D9B23C", docente: "Nayrobis Cobas" },
  mate:      { nombre: "Matemática",             corto: "MAT", color: "#E8935A", docente: "Carolina Guevara" },
  science:   { nombre: "Science",                corto: "SCI", color: "#56B5A0", docente: "Mariam Jaramillo" },
  sociales:  { nombre: "Estudios Sociales",      corto: "SOC", color: "#7FB685", docente: "Aylin Castillo" },
  religion:  { nombre: "Religión y Moral",       corto: "REL", color: "#C0A05F", docente: "Mayra Vásquez" },
  edfisica:  { nombre: "Educación Física",       corto: "EDF", color: "#E07A7A", docente: "Gustavo Ortega" },
  tec:       { nombre: "Tecnología",             corto: "TEC", color: "#9D8BC2", docente: "María E. Montero" },
  english:   { nombre: "English",                corto: "ENG", color: "#4E7FBF", docente: "Mariam Jaramillo" },
  neo:       { nombre: "Neo",                    corto: "NEO", color: "#74A0C4", docente: "Griselda Castillo" },
  listening: { nombre: "Listening",              corto: "LIS", color: "#8FB8DC", docente: "Cheryl Dramen" },
  arte:      { nombre: "Expresiones Artísticas", corto: "ART", color: "#C98FB8", docente: "Lorena Lobo" },
};

/* Tipos de actividad (la leyenda del sistema real, ahora siempre visible) */
const TIPOS = {
  sumativa:    { nombre: "Sumativa",    plural: "Sumativas",    desc: "Se califica",        color: "#C94F4F" },
  formativa:   { nombre: "Formativa",   plural: "Formativas",   desc: "Práctica evaluada",  color: "#3B82A0" },
  asignacion:  { nombre: "Asignación",  plural: "Asignaciones", desc: "Tarea sin nota",     color: "#8B94A3" },
  diagnostica: { nombre: "Diagnóstica", plural: "Diagnósticas", desc: "Mide punto de partida", color: "#7C6BAD" },
  recreacion:  { nombre: "Recreación",  plural: "Recreaciones", desc: "Actividad especial", color: "#7FB685" },
};

/* ------------------------------------------------------------
   Agenda de la semana (lun 29 jun – vie 3 jul 2026)
   Contenido tomado de la guía semanal real de 5°A.
   ------------------------------------------------------------ */
const SEMANA = {
  etiqueta: "29 de junio — 3 de julio, 2026",
  dias: [
    {
      fecha: "2026-06-29", dia: "Lunes", num: 29, mes: "junio",
      actividades: [
        {
          materia: "mate", tipo: "formativa",
          titulo: "Potencias, raíces y fracciones",
          detalle: "Seguimos trabajando las potencias, raíces y fracciones en clase.",
          traer: ["Práctica del viernes 26 corregida de casa"],
        },
        {
          materia: "espanol", tipo: "formativa",
          titulo: "Los campos semánticos",
          detalle: "Iniciamos la explicación del tema 2.",
          traer: ["Libro y cuaderno de Español"],
        },
        {
          materia: "sociales", tipo: "sumativa",
          titulo: "Charlas: provincias y comarcas",
          detalle: "Presentación grupal. Cada grupo expone su provincia o comarca asignada.",
          traer: ["Presentación del grupo en USB"],
          estudiar: "Libro de texto y página web recomendada",
        },
      ],
    },
    {
      fecha: "2026-06-30", dia: "Martes", num: 30, mes: "junio",
      actividades: [
        {
          materia: "listening", tipo: "sumativa",
          titulo: "World Foods — presentación",
          detalle: "Descargar la plantilla PPT y completarla con la información de la receta. La página de ingredientes lleva solo imágenes, sin palabras. Guardar como APELLIDO_INICIAL_GRADO y enviar por correo.",
          traer: ["PPT terminado y enviado a la profesora"],
          estudiar: "Practicar el speech 3 veces al día",
          adjunto: "Plantilla World Foods.pptx",
        },
        {
          materia: "mate", tipo: "asignacion",
          titulo: "Cuaderno de actividades, pág. 48",
          detalle: "Resolver la página completa en casa.",
          rubrica: [["Puntualidad", 5], ["Orden y aseo", 5], ["Contenido", 15]],
        },
        {
          materia: "science", tipo: "sumativa",
          titulo: "Test — Unit 4: States of Matter",
          detalle: "Evaluación de la unidad 4.",
          estudiar: "Activity Book: páginas 33–34 y 37–40",
        },
        {
          materia: "espanol", tipo: "formativa",
          titulo: "Lectura: “Un pájaro estaba en el jardín”",
          detalle: "Lectura en clase y copia del vocabulario #2.",
          traer: ["Cuaderno y libro de Español"],
        },
      ],
    },
    {
      fecha: "2026-07-01", dia: "Miércoles", num: 1, mes: "julio",
      actividades: [
        {
          materia: "espanol", tipo: "formativa",
          titulo: "Tema #3",
          detalle: "Desarrollo del tema 3 en clase.",
          traer: ["Libro y cuaderno de Español"],
        },
        {
          materia: "tec", tipo: "formativa",
          titulo: "Clase 1 — segundo trimestre",
          detalle: "Inicio de la unidad del segundo trimestre en el laboratorio.",
        },
        {
          materia: "arte", tipo: "formativa",
          titulo: "Figuras con alto relieve",
          detalle: "Taller en clase: técnica de alto relieve sobre cartulina.",
          traer: ["Cartulina blanca", "Tijeras", "Pegamento en barra"],
        },
      ],
    },
    {
      fecha: "2026-07-02", dia: "Jueves", num: 2, mes: "julio",
      actividades: [
        {
          materia: "arte", tipo: "formativa",
          titulo: "Figuras con alto relieve (continuación)",
          detalle: "Segunda sesión del taller. Diez minutos antes de terminar, dejar el área limpia y organizada.",
          traer: ["Los mismos materiales del miércoles"],
        },
        {
          materia: "espanol", tipo: "sumativa",
          titulo: "Ejercicio 2",
          detalle: "Evaluación escrita de los temas 2 y 3: campos semánticos y vocabulario.",
          estudiar: "Repasar cuaderno y vocabularios #1 y #2",
        },
      ],
    },
    {
      fecha: "2026-07-03", dia: "Viernes", num: 3, mes: "julio",
      actividades: [
        {
          materia: "tec", tipo: "formativa",
          titulo: "Clase 1 — práctica",
          detalle: "Repaso y práctica de la clase 1 en el laboratorio.",
        },
        {
          materia: "espanol", tipo: "asignacion",
          titulo: "Lectura en casa",
          detalle: "Lectura del capítulo asignado durante el fin de semana.",
        },
      ],
    },
  ],
  finDeSemana: "Sábado 4 y domingo 5 · sin actividades asignadas",
};

/* Próxima evaluación importante fuera de la semana visible */
const PROXIMO = {
  fecha: "martes 7 de julio",
  materia: "listening",
  titulo: "Speech — World Foods",
};

/* ------------------------------------------------------------
   Calificaciones · Primer trimestre (2 mar – 29 may 2026)
   Promedios reales; cada nota ahora tiene nombre, fecha y tipo.
   ------------------------------------------------------------ */
const PERIODOS = ["Primer trimestre", "Segundo trimestre (en curso)"];

const CALIFICACIONES = {
  periodo: "Primer trimestre",
  promedioGeneral: 4.62,
  escala: { min: 1, max: 5, aprobado: 3.0, excelencia: 4.5 },
  materias: [
    {
      materia: "espanol", promedio: 4.7,
      notas: [
        { fecha: "2026-03-09", nombre: "Dictado — vocabulario 1", tipo: "formativa", valor: 4.6 },
        { fecha: "2026-03-20", nombre: "Ejercicio 1 — El sustantivo", tipo: "sumativa", valor: 4.8 },
        { fecha: "2026-04-08", nombre: "Comprensión lectora", tipo: "formativa", valor: 4.9 },
        { fecha: "2026-04-20", nombre: "Proyecto: Caligrama", tipo: "sumativa", valor: 4.6 },
        { fecha: "2026-05-18", nombre: "Ejercicio 2 — Los adjetivos", tipo: "sumativa", valor: 5.0 },
      ],
    },
    {
      materia: "mate", promedio: 4.8,
      notas: [
        { fecha: "2026-03-06", nombre: "Práctica — números hasta 100 000", tipo: "formativa", valor: 5.0 },
        { fecha: "2026-03-27", nombre: "Ejercicio 1 — Suma y resta", tipo: "sumativa", valor: 4.5 },
        { fecha: "2026-04-20", nombre: "Ejercicio 3 — Cálculos combinados", tipo: "sumativa", valor: 5.0 },
        { fecha: "2026-05-11", nombre: "Divisiones — práctica", tipo: "formativa", valor: 4.2 },
        { fecha: "2026-05-26", nombre: "Prueba final del trimestre", tipo: "sumativa", valor: 5.0 },
      ],
    },
    {
      materia: "science", promedio: 3.9, alerta: true,
      notas: [
        { fecha: "2026-03-13", nombre: "Quiz — Unit 3: Mixtures", tipo: "sumativa", valor: 2.5 },
        { fecha: "2026-04-17", nombre: "Lab activity — Solutions", tipo: "formativa", valor: 5.0 },
        { fecha: "2026-05-22", nombre: "Test — Unit 3 review", tipo: "sumativa", valor: 4.3 },
      ],
    },
    {
      materia: "sociales", promedio: 4.5,
      notas: [
        { fecha: "2026-03-16", nombre: "Mapa de Panamá — regiones", tipo: "formativa", valor: 5.0 },
        { fecha: "2026-03-30", nombre: "Taller en grupo", tipo: "formativa", valor: 4.5 },
        { fecha: "2026-04-13", nombre: "Ejercicio 1 — Las provincias", tipo: "sumativa", valor: 2.8 },
        { fecha: "2026-04-20", nombre: "Día de la Tierra — mural", tipo: "sumativa", valor: 4.7 },
        { fecha: "2026-05-15", nombre: "Charla individual", tipo: "sumativa", valor: 5.0 },
        { fecha: "2026-05-27", nombre: "Prueba final del trimestre", tipo: "sumativa", valor: 5.0 },
      ],
    },
    {
      materia: "religion", promedio: 5.0,
      notas: [
        { fecha: "2026-03-12", nombre: "Reflexión escrita", tipo: "formativa", valor: 5.0 },
        { fecha: "2026-04-16", nombre: "Trabajo de Semana Santa", tipo: "sumativa", valor: 5.0 },
        { fecha: "2026-05-14", nombre: "Proyecto de valores", tipo: "sumativa", valor: 5.0 },
      ],
    },
    {
      materia: "edfisica", promedio: 4.6,
      notas: [
        { fecha: "2026-03-10", nombre: "Circuito de coordinación", tipo: "formativa", valor: 4.6 },
        { fecha: "2026-04-14", nombre: "Prueba de resistencia", tipo: "sumativa", valor: 4.6 },
        { fecha: "2026-05-12", nombre: "Juegos pre-deportivos", tipo: "formativa", valor: 4.4 },
        { fecha: "2026-05-26", nombre: "Evaluación final", tipo: "sumativa", valor: 5.0 },
      ],
    },
    {
      materia: "tec", promedio: 5.0,
      notas: [
        { fecha: "2026-03-11", nombre: "Uso del correo — práctica", tipo: "formativa", valor: 5.0 },
        { fecha: "2026-04-22", nombre: "Diseño 3D — escuela ideal (Tinkercad)", tipo: "formativa", valor: 5.0 },
        { fecha: "2026-05-20", nombre: "Proyecto final 3D", tipo: "sumativa", valor: 5.0 },
      ],
    },
    {
      materia: "english", promedio: 4.3,
      notas: [
        { fecha: "2026-03-13", nombre: "Quiz — Unit 1 vocabulary", tipo: "sumativa", valor: 4.2 },
        { fecha: "2026-03-27", nombre: "Workbook check", tipo: "formativa", valor: 4.0 },
        { fecha: "2026-04-23", nombre: "Exercise 3 — Unit 2: The Seasons", tipo: "sumativa", valor: 4.2 },
        { fecha: "2026-05-15", nombre: "Speaking practice", tipo: "formativa", valor: 4.5 },
        { fecha: "2026-05-28", nombre: "Final test", tipo: "sumativa", valor: 4.8 },
      ],
    },
    {
      materia: "neo", promedio: 5.0,
      notas: [
        { fecha: "2026-03-18", nombre: "Platform activities — Module 1", tipo: "formativa", valor: 5.0 },
        { fecha: "2026-04-29", nombre: "Module 2 progress", tipo: "formativa", valor: 5.0 },
        { fecha: "2026-05-21", nombre: "Module review", tipo: "sumativa", valor: 5.0 },
      ],
    },
    {
      materia: "listening", promedio: 4.5,
      notas: [
        { fecha: "2026-04-21", nombre: "Quiz 1 — Understand Maps", tipo: "sumativa", valor: 4.5 },
        { fecha: "2026-05-19", nombre: "Listening comprehension", tipo: "formativa", valor: 4.6 },
      ],
    },
    {
      materia: "arte", promedio: 4.7,
      notas: [
        { fecha: "2026-03-19", nombre: "Técnica de acuarela", tipo: "formativa", valor: 5.0 },
        { fecha: "2026-04-09", nombre: "Máscara de Anubis", tipo: "sumativa", valor: 4.8 },
        { fecha: "2026-04-30", nombre: "Composición libre", tipo: "formativa", valor: 5.0 },
        { fecha: "2026-05-14", nombre: "Proyecto egipcio — entrega", tipo: "sumativa", valor: 4.5 },
        { fecha: "2026-05-28", nombre: "Portafolio del trimestre", tipo: "sumativa", valor: 4.3 },
      ],
    },
  ],
};

/* ------------------------------------------------------------
   Mensajes (estructura de la mensajería real, sin webmail)
   ------------------------------------------------------------ */
const MENSAJES = [
  {
    id: 1, categoria: "colegio", remitente: "Administración",
    asunto: "Gafete para autos",
    fecha: "2026-06-30", hora: "7:27 a.m.", noLeido: true,
    cuerpo: "Estimadas familias:\n\nA partir del lunes 6 de julio será obligatorio el gafete vehicular para el retiro de estudiantes en el área de autos. Pueden retirarlo en recepción en horario de 7:00 a.m. a 3:00 p.m.\n\nAgradecemos su colaboración.",
  },
  {
    id: 2, categoria: "docente", remitente: "Carolina Guevara", materia: "mate",
    asunto: "RE: Consulta — práctica de matemáticas",
    fecha: "2026-06-29", hora: "12:37 p.m.", noLeido: true,
    cuerpo: "Buenas tardes:\n\nGracias por escribir. La práctica del viernes 26 puede corregirse en casa y traerla el lunes; la revisaremos juntas al inicio de la clase. Gianna va muy bien con las fracciones, solo necesita reforzar la simplificación.\n\nSaludos cordiales,\nProf. Carolina Guevara",
  },
  {
    id: 3, categoria: "docente", remitente: "Nayrobis Cobas", materia: "espanol",
    asunto: "Nota para padres",
    fecha: "2026-06-29", hora: "11:37 a.m.", adjunto: "Circular 5A.pdf", urgente: true,
    cuerpo: "Estimados acudientes de 5°A:\n\nAdjunto la circular con las indicaciones para el Ejercicio 2 del jueves 2 de julio y el detalle del vocabulario que se evaluará. Por favor revisar con sus hijos.\n\nProf. Nayrobis Cobas\nConsejera 5°A",
  },
  {
    id: 4, categoria: "colegio", remitente: "Juana Rueda",
    asunto: "Venta de pizza 1 de julio — Apoyo al Club de Debate",
    fecha: "2026-06-26", hora: "2:23 p.m.", adjunto: "Volante.pdf",
    cuerpo: "El Club de Debate CLE realizará una venta de pizza el miércoles 1 de julio durante el recreo. Porción: B/. 2.00. Los fondos apoyan la participación del club en el torneo nacional.",
  },
  {
    id: 5, categoria: "colegio", remitente: "Sandra García-Bylleres",
    asunto: "Taller para padres — martes 30, 6:00 p.m.",
    fecha: "2026-06-26", hora: "1:27 p.m.",
    cuerpo: "Se invita a los acudientes al taller “Acompañar sin hacer la tarea” este martes 30 de junio a las 6:00 p.m. en el salón de usos múltiples. Cupo limitado; confirmar asistencia respondiendo este mensaje.",
  },
  {
    id: 6, categoria: "colegio", remitente: "Sandra García-Bylleres",
    asunto: "Programa de FSU",
    fecha: "2026-06-24", hora: "10:01 a.m.", adjunto: "Programa FSU.pdf",
    cuerpo: "Compartimos el programa de la Feria de Servicio y Unidad (FSU) del próximo mes, con el calendario de actividades por grado.",
  },
  {
    id: 7, categoria: "colegio", remitente: "Sandra García-Bylleres",
    asunto: "Lineamientos Copa Santa Rafaela",
    fecha: "2026-06-23", hora: "3:41 p.m.",
    cuerpo: "Adjuntamos los lineamientos de la Copa Santa Rafaela 2026: categorías, horarios de entrenamiento y requisitos de inscripción.",
  },
  {
    id: 8, categoria: "colegio", remitente: "Sandra García-Bylleres",
    asunto: "Apoyemos a la Selección / Suéter rojo",
    fecha: "2026-06-22", hora: "3:31 p.m.",
    cuerpo: "Este viernes los estudiantes pueden asistir con suéter rojo en apoyo a la Selección Nacional. No es obligatorio; el uniforme regular también es bienvenido.",
  },
];

/* ------------------------------------------------------------
   Pagos (estado de cuenta real resumido)
   ------------------------------------------------------------ */
const PAGOS = {
  saldo: 304.5,
  alDia: false,
  proximoVencimiento: "15 de julio",
  notaRecargo: "Después del día 15 se aplica un recargo del 5 % sobre el saldo.",
  desglose: [
    { concepto: "Cuota de junio (saldo)", monto: 290.0 },
    { concepto: "Recargo 5 % — junio", monto: 14.5 },
  ],
  movimientos: [
    { fecha: "2026-06-18", concepto: "Recargo mensualidad 5 %", ref: "ATX-34-0022322", cargo: 43.5, pago: 29.0, saldo: 14.5 },
    { fecha: "2026-06-15", concepto: "Cuota — pago en banco", ref: "ATX-34-0021735", cargo: 1160.0, pago: 870.0, saldo: 290.0 },
    { fecha: "2026-03-03", concepto: "Inscripción o matrícula 2026", ref: "", cargo: 605.0, pago: 605.0, saldo: 0.0 },
  ],
  comprobantes: [
    { fecha: "2026-06-15", concepto: "Pago en banco — cuota junio", monto: 870.0 },
    { fecha: "2026-03-03", concepto: "Matrícula 2026", monto: 605.0 },
  ],
};

/* ------------------------------------------------------------
   Asistencia, documentos y matrícula
   ------------------------------------------------------------ */
const ASISTENCIA = {
  periodo: "Primer trimestre",
  ausencias: 2,
  tardanzas: 0,
  detalle: [{ materia: "espanol", ausencias: 2, tardanzas: 0 }],
};

const DOCUMENTOS = [
  { nombre: "Contrato de Matrícula 2026", tipo: "PDF", fecha: "2026-02-10" },
  { nombre: "Reglamento Interno", tipo: "PDF", fecha: "2026-02-01" },
  { nombre: "Boletín oficial — Primer trimestre", tipo: "PDF", fecha: "2026-06-05" },
];

const DISCIPLINA = { eventos: [] };
