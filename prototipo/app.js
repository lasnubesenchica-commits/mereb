/* ============================================================
   Mereb Nova · Lógica de la interfaz (prototipo, sin backend)
   ============================================================ */

/* ---------- utilidades ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function fechaCorta(iso) {
  const [, m, d] = iso.split("-").map(Number);
  return `${d} ${MESES[m - 1].slice(0, 3)}`;
}

function dinero(n) {
  return "B/. " + n.toLocaleString("es-PA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function claseNota(v) {
  const { aprobado, excelencia } = CALIFICACIONES.escala;
  if (v < aprobado) return "bad";
  if (v < excelencia) return "warn";
  return "ok";
}

function badge(tipoKey) {
  const t = TIPOS[tipoKey];
  return `<span class="badge" style="background:${t.color}" title="${t.desc}">${t.nombre}</span>`;
}

function materiaTag(key) {
  const m = MATERIAS[key];
  return `<span class="materia-tag" style="--c:${m.color}">${m.nombre}</span>`;
}

function iniciales(nombre) {
  return nombre.split(/\s+/).filter(Boolean).slice(0, 2).map(p => p[0]).join("").toUpperCase();
}

/* Paleta estable para avatares de remitentes */
const AVATAR_COLORES = ["#4E7FBF", "#7FB685", "#C98FB8", "#9D8BC2", "#E8935A", "#56B5A0"];
function avatarColor(nombre) {
  let h = 0;
  for (const c of nombre) h = (h * 31 + c.charCodeAt(0)) % 997;
  return AVATAR_COLORES[h % AVATAR_COLORES.length];
}

/* ============================================================
   NAVEGACIÓN
   ============================================================ */
const ICONOS = {
  semana: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  notas: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  mensajes: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  pagos: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="3"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  perfil: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
};

const VISTAS = [
  { id: "semana", nombre: "Semana" },
  { id: "notas", nombre: "Notas" },
  { id: "mensajes", nombre: "Mensajes" },
  { id: "pagos", nombre: "Pagos" },
  { id: "perfil", nombre: "Estudiante" },
];

function pintarNav() {
  const noLeidos = MENSAJES.filter(m => m.noLeido).length;
  const botones = VISTAS.map(v => `
    <button data-view="${v.id}" aria-label="${v.nombre}">
      ${ICONOS[v.id]}<span>${v.nombre}</span>
      ${v.id === "mensajes" && noLeidos ? `<span class="dot">${noLeidos}</span>` : ""}
    </button>`).join("");
  $("#nav-desktop").innerHTML = botones;
  $("#nav-mobile").innerHTML = botones;

  $$("[data-view]").forEach(b => b.addEventListener("click", () => mostrarVista(b.dataset.view)));
}

function mostrarVista(id) {
  $$(".view").forEach(v => v.classList.toggle("active", v.id === `view-${id}`));
  $$("[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === id));
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ============================================================
   VISTA · SEMANA
   ============================================================ */
function contarTipos() {
  const c = {};
  SEMANA.dias.forEach(d => d.actividades.forEach(a => { c[a.tipo] = (c[a.tipo] || 0) + 1; }));
  return c;
}

function pintarSemana() {
  const conteo = contarTipos();
  const chips = Object.keys(TIPOS).filter(k => conteo[k])
    .map(k => `<span class="chip"><span class="num">${conteo[k]}</span> ${conteo[k] > 1 ? TIPOS[k].plural : TIPOS[k].nombre}</span>`)
    .join("");

  const hoy = SEMANA.dias.find(d => d.fecha === HOY);
  const actividadesHoy = hoy ? hoy.actividades.length : 0;

  const diasNav = SEMANA.dias.map(d => `
    <a href="#dia-${d.fecha}" class="${d.fecha === HOY ? "hoy" : ""}">
      <span class="n">${d.num}</span>
      <span class="d">${d.dia.slice(0, 3)}</span>
      <span class="c">${d.actividades.length} act.</span>
    </a>`).join("") + `
    <a href="#finde"><span class="n">4</span><span class="d">Fin</span><span class="c">libre</span></a>`;

  const dias = SEMANA.dias.map(d => {
    const cards = d.actividades.map(a => {
      const m = MATERIAS[a.materia];
      const secciones = [];
      if (a.traer) {
        secciones.push(`<div class="seccion" style="--c:${m.color}">
          <div class="seccion-titulo">Materiales a traer</div>
          <ul>${a.traer.map(t => `<li>${t}</li>`).join("")}</ul>
        </div>`);
      }
      if (a.estudiar) {
        secciones.push(`<div class="seccion" style="--c:${m.color}">
          <div class="seccion-titulo">Sugerencia de estudio</div>
          <ul><li>${a.estudiar}</li></ul>
        </div>`);
      }
      if (a.rubrica) {
        const total = a.rubrica.reduce((s, [, p]) => s + p, 0);
        secciones.push(`<div class="seccion" style="--c:${m.color}">
          <div class="seccion-titulo">Cómo se evalúa · ${total} pts</div>
          <div class="rubrica">${a.rubrica.map(([n, p]) => `<span>${n} <b>${p}</b></span>`).join("")}</div>
        </div>`);
      }
      if (a.adjunto) {
        secciones.push(`<div class="seccion" style="--c:${m.color}">
          <div class="seccion-titulo">Adjunto</div>
          <span class="adjunto">📎 ${a.adjunto}</span>
        </div>`);
      }
      return `
      <article class="actividad" style="--c:${m.color}">
        <div class="barra"></div>
        <div class="actividad-body">
          <div class="actividad-top">
            ${materiaTag(a.materia)}
            ${badge(a.tipo)}
            <span class="prof">Prof. ${m.docente}</span>
          </div>
          <h3>${a.titulo}</h3>
          <p class="detalle">${a.detalle}</p>
          ${secciones.join("")}
        </div>
      </article>`;
    }).join("");

    return `
    <section class="dia" id="dia-${d.fecha}">
      <div class="dia-header">
        <h2>${d.dia}</h2>
        <span class="fecha">${d.num} de ${d.mes}</span>
        ${d.fecha === HOY ? '<span class="pill-hoy">Hoy</span>' : ""}
        <span class="count">${d.actividades.length} actividad${d.actividades.length !== 1 ? "es" : ""}</span>
      </div>
      <div class="actividades">${cards}</div>
    </section>`;
  }).join("");

  const proxM = MATERIAS[PROXIMO.materia];

  $("#view-semana").innerHTML = `
    <div class="view-head">
      <div class="eyebrow">Agenda escolar · ${ESTUDIANTE.grado}</div>
      <h1>La semana de <em>${ESTUDIANTE.nombre.split(" ")[0]}</em></h1>
      <p class="meta">${SEMANA.etiqueta} · hoy hay ${actividadesHoy} actividad${actividadesHoy !== 1 ? "es" : ""}</p>
      <div class="hoy-hero">${chips}</div>
    </div>

    <div class="leyenda">
      ${Object.values(TIPOS).map(t => `<span><span class="badge" style="background:${t.color}">${t.nombre.slice(0, 4).toUpperCase()}</span> ${t.desc.toLowerCase()}</span>`).join("")}
    </div>

    <nav class="dias-nav" aria-label="Ir a un día">${diasNav}</nav>

    ${dias}

    <section class="dia" id="finde">
      <div class="fin-semana">
        <h2>Fin de semana libre</h2>
        <p>${SEMANA.finDeSemana}</p>
      </div>
      <div class="proximo">
        <span class="ico">🔭</span>
        <span>Lo que viene: <strong>${PROXIMO.titulo}</strong> — ${proxM.nombre}, ${PROXIMO.fecha}.</span>
      </div>
    </section>`;
}

/* ============================================================
   VISTA · CALIFICACIONES
   ============================================================ */
function pintarNotas() {
  const cal = CALIFICACIONES;
  const pct = (cal.promedioGeneral - cal.escala.min) / (cal.escala.max - cal.escala.min);
  const R = 56, C = 2 * Math.PI * R;

  const enAtencion = cal.materias
    .filter(m => m.promedio < cal.escala.excelencia ||
                 m.notas.some(n => n.valor < cal.escala.aprobado))
    .sort((a, b) => a.promedio - b.promedio).slice(0, 3);

  const materias = cal.materias.map((mc, i) => {
    const m = MATERIAS[mc.materia];
    const barras = mc.notas.map(n =>
      `<i style="height:${Math.max(15, (n.valor / cal.escala.max) * 100)}%; --c:${m.color}" title="${n.nombre}: ${n.valor.toFixed(2)}"></i>`).join("");
    const filas = mc.notas.map(n => `
      <div class="nota-row">
        <span class="fecha">${fechaCorta(n.fecha)}</span>
        <span class="nombre">${n.nombre}</span>
        ${badge(n.tipo)}
        <span class="valor ${claseNota(n.valor)}">${n.valor.toFixed(2)}</span>
      </div>`).join("");
    return `
    <div class="card materia-card" id="mat-${i}">
      <button aria-expanded="false" data-toggle="${i}">
        ${materiaTag(mc.materia)}
        <span class="prof">Prof. ${m.docente} · ${mc.notas.length} notas</span>
        <span class="prom ${claseNota(mc.promedio)}">${mc.promedio.toFixed(2)}</span>
        <span class="mini-notas" style="--c:${m.color}">${barras}</span>
        <span class="ver-detalle">Ver notas ↓</span>
      </button>
      <div class="materia-detalle">${filas}</div>
    </div>`;
  }).join("");

  $("#view-notas").innerHTML = `
    <div class="view-head">
      <div class="eyebrow">Calificaciones · ${ESTUDIANTE.grado}</div>
      <h1>Cómo va <em>${ESTUDIANTE.nombre.split(" ")[0]}</em></h1>
      <p class="meta">Cada nota con su fecha, actividad y tipo — sin misterios</p>
    </div>

    <div class="periodo-bar">
      <select aria-label="Período">${PERIODOS.map((p, i) => `<option ${i === 0 ? "selected" : ""}>${p}</option>`).join("")}</select>
      <span class="escala-nota">Escala 1.00–5.00 · aprobado desde ${cal.escala.aprobado.toFixed(2)} · <span style="color:#33714B">■</span> 4.50+ &nbsp;<span style="color:#8F6D1B">■</span> 3.00–4.49 &nbsp;<span style="color:#A33A3A">■</span> &lt; 3.00</span>
    </div>

    <div class="resumen-grid">
      <div class="card promedio-card">
        <div class="anillo">
          <svg width="130" height="130">
            <circle cx="65" cy="65" r="${R}" fill="none" stroke="#EFE9DC" stroke-width="10"/>
            <circle cx="65" cy="65" r="${R}" fill="none" stroke="#4E9A6C" stroke-width="10"
              stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/>
          </svg>
          <span class="valor">${cal.promedioGeneral.toFixed(2)}</span>
        </div>
        <span class="lbl">Promedio general</span>
        <span class="sub">${cal.periodo}</span>
      </div>
      <div class="card atencion-card">
        <h3>Dónde enfocar el apoyo</h3>
        ${enAtencion.map(mc => {
          const baja = mc.notas.find(n => n.valor < cal.escala.aprobado);
          const motivo = baja
            ? `tiene un ${baja.valor.toFixed(2)} que recuperar (${baja.nombre})`
            : "va bien, puede subir un poco más";
          return `
          <div class="atencion-item">
            ${materiaTag(mc.materia)}
            <span>${motivo}</span>
            <span class="valor-mini ${claseNota(mc.promedio)}" style="padding:2px 9px;border-radius:7px">${mc.promedio.toFixed(2)}</span>
          </div>`;
        }).join("")}
        <div class="atencion-item" style="margin-top:4px; font-size:12.5px; color:var(--ink-mute)">
          El resto de las materias está en 4.50 o más. 💪
        </div>
      </div>
    </div>

    <div class="materias-grid">${materias}</div>`;

  $$("[data-toggle]").forEach(b => b.addEventListener("click", () => {
    const card = $(`#mat-${b.dataset.toggle}`);
    const abierto = card.classList.toggle("open");
    b.setAttribute("aria-expanded", abierto);
    b.querySelector(".ver-detalle").textContent = abierto ? "Ocultar notas ↑" : "Ver notas ↓";
  }));
}

/* ============================================================
   VISTA · MENSAJES
   ============================================================ */
let filtroActual = "todos";

function pintarMensajes() {
  const filtros = [
    ["todos", "Todos"],
    ["noleidos", "No leídos"],
    ["colegio", "Del colegio"],
    ["docente", "De docentes"],
  ];

  const lista = MENSAJES.filter(m => {
    if (filtroActual === "noleidos") return m.noLeido;
    if (filtroActual === "todos") return true;
    return m.categoria === filtroActual;
  });

  const items = lista.map(m => {
    const color = m.materia ? MATERIAS[m.materia].color : avatarColor(m.remitente);
    const tags = [
      m.urgente ? '<span class="tag urgente">Urgente</span>' : "",
      m.categoria === "docente" && m.materia ? `<span class="tag">${MATERIAS[m.materia].nombre}</span>` : "",
      m.categoria === "colegio" ? '<span class="tag">Comunicado</span>' : "",
    ].join("");
    return `
    <button class="mensaje-item ${m.noLeido ? "no-leido" : ""}" data-msg="${m.id}">
      <span class="avatar" style="background:${color}">${iniciales(m.remitente)}</span>
      <span class="remitente">${m.remitente} ${tags}</span>
      <span class="cuando">${fechaCorta(m.fecha)}${m.noLeido ? '<span class="punto-noleido"></span>' : ""}${m.adjunto ? '<span class="clip">📎</span>' : ""}</span>
      <span class="asunto">${m.asunto}</span>
    </button>`;
  }).join("");

  $("#view-mensajes").innerHTML = `
    <div class="view-head">
      <div class="eyebrow">Comunicación</div>
      <h1>Mensajes</h1>
      <p class="meta">Comunicados del colegio y conversaciones con docentes, en un solo lugar</p>
    </div>
    <div class="filtros">
      ${filtros.map(([k, n]) => `<button class="${filtroActual === k ? "active" : ""}" data-filtro="${k}">${n}${k === "noleidos" ? ` (${MENSAJES.filter(x => x.noLeido).length})` : ""}</button>`).join("")}
    </div>
    <div class="mensajes-lista">${items || '<div class="vacio-feliz card" style="padding:26px"><span class="emoji">📭</span><b>Nada por aquí</b><br>No hay mensajes en este filtro.</div>'}</div>`;

  $$("[data-filtro]").forEach(b => b.addEventListener("click", () => {
    filtroActual = b.dataset.filtro;
    pintarMensajes();
  }));

  $$("[data-msg]").forEach(b => b.addEventListener("click", () => abrirMensaje(Number(b.dataset.msg))));
}

function abrirMensaje(id) {
  const m = MENSAJES.find(x => x.id === id);
  if (!m) return;
  m.noLeido = false;

  const color = m.materia ? MATERIAS[m.materia].color : avatarColor(m.remitente);
  $("#msg-avatar").style.background = color;
  $("#msg-avatar").textContent = iniciales(m.remitente);
  $("#msg-remitente").textContent = m.remitente;
  $("#msg-fecha").textContent = `${fechaCorta(m.fecha)} · ${m.hora}`;
  $("#msg-asunto").textContent = m.asunto;
  $("#msg-cuerpo").textContent = m.cuerpo;
  $("#msg-adjunto").innerHTML = m.adjunto ? `<span class="adjunto-row">📎 ${m.adjunto} <span style="color:var(--ink-mute);font-weight:600">· descargar</span></span>` : "";

  $("#overlay").classList.add("open");
  $("#panel-mensaje").classList.add("open");
  pintarNav();          // refresca contadores de no leídos
  marcarNavActiva("mensajes");
}

function cerrarMensaje() {
  $("#overlay").classList.remove("open");
  $("#panel-mensaje").classList.remove("open");
  pintarMensajes();
}

function marcarNavActiva(id) {
  $$("[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === id));
}

/* ============================================================
   VISTA · PAGOS
   ============================================================ */
function pintarPagos() {
  const p = PAGOS;

  const movs = p.movimientos.map(m => `
    <div class="mov-row">
      <span class="fecha">${fechaCorta(m.fecha)}</span>
      <span class="concepto">${m.concepto}</span>
      <span class="montos">
        <span>Cargo ${dinero(m.cargo)} · Pagado <b>${dinero(m.pago)}</b></span>
        <span>Saldo <span class="saldo-pill ${m.saldo === 0 ? "cero" : "debe"}">${m.saldo === 0 ? "al día" : dinero(m.saldo)}</span></span>
      </span>
      ${m.ref ? `<span class="ref">Ref. ${m.ref}</span>` : "<span></span>"}
    </div>`).join("");

  const comps = p.comprobantes.map(c => `
    <div class="comprobante-row">
      <span class="fecha">${fechaCorta(c.fecha)}</span>
      <span class="nombre">${c.concepto}</span>
      <span class="monto">${dinero(c.monto)}</span>
      <button class="btn-descargar" aria-label="Descargar comprobante" title="Descargar PDF">⬇</button>
    </div>`).join("");

  $("#view-pagos").innerHTML = `
    <div class="view-head">
      <div class="eyebrow">Financiero</div>
      <h1>Pagos</h1>
      <p class="meta">Saldo, movimientos y comprobantes — sin pasos de más</p>
    </div>

    <div class="pagos-grid">
      <div class="card saldo-card">
        <span class="lbl">Saldo pendiente</span>
        <span class="monto">${dinero(p.saldo)}</span>
        <span class="vence">⏳ Vence el ${p.proximoVencimiento}</span>
        <div class="desglose">
          ${p.desglose.map(d => `<div><span>${d.concepto}</span><span>${dinero(d.monto)}</span></div>`).join("")}
        </div>
        <button class="btn-pagar">Pagar en línea →</button>
        <span class="nota">${p.notaRecargo} · Visa y Mastercard</span>
      </div>

      <div class="card comprobantes-card">
        <h3>Comprobantes</h3>
        ${comps}
      </div>
    </div>

    <div class="card movs-card">
      <h3>Estado de cuenta · ${ESTUDIANTE.anio}</h3>
      ${movs}
    </div>`;
}

/* ============================================================
   VISTA · ESTUDIANTE
   ============================================================ */
function pintarPerfil() {
  const a = ASISTENCIA;

  const detalleAsis = a.detalle.length
    ? a.detalle.map(d => `
      <div class="fila">${materiaTag(d.materia)}<span>Prof. ${MATERIAS[d.materia].docente}</span><b>${d.ausencias} aus. · ${d.tardanzas} tard.</b></div>`).join("")
    : "";

  const docs = DOCUMENTOS.map(d => `
    <div class="doc-row">
      <span class="ico-doc">📄</span>
      <span class="nombre">${d.nombre}<span>${d.tipo} · ${fechaCorta(d.fecha)} ${d.fecha.slice(0, 4)}</span></span>
      <button class="btn-descargar" aria-label="Descargar ${d.nombre}" title="Descargar">⬇</button>
    </div>`).join("");

  $("#view-perfil").innerHTML = `
    <div class="view-head">
      <div class="eyebrow">Perfil</div>
      <h1>Estudiante</h1>
    </div>

    <div class="perfil-grid">
      <div class="card perfil-card">
        <span class="avatar-xl">${ESTUDIANTE.iniciales}</span>
        <div class="datos">
          <h2>${ESTUDIANTE.nombre} ${ESTUDIANTE.apellidos}</h2>
          <p class="sub">${ESTUDIANTE.colegio}</p>
          <div class="chips">
            <span class="chip">${ESTUDIANTE.nivel} · grupo ${ESTUDIANTE.grado}</span>
            <span class="chip">Consejera: ${ESTUDIANTE.consejera}</span>
            <span class="chip">Año escolar ${ESTUDIANTE.anio}</span>
          </div>
        </div>
      </div>

      <div class="card bloque">
        <h3>🗓 Asistencia · ${a.periodo}</h3>
        <div class="asistencia-resumen">
          <div class="kpi"><b>${a.ausencias}</b><span>Ausencias</span></div>
          <div class="kpi"><b>${a.tardanzas}</b><span>Tardanzas</span></div>
        </div>
        <div class="asistencia-detalle">
          ${detalleAsis || '<div class="vacio-feliz"><span class="emoji">🌟</span><b>Asistencia perfecta</b></div>'}
        </div>
      </div>

      <div class="card bloque">
        <h3>🤝 Disciplina</h3>
        ${DISCIPLINA.eventos.length ? "" : `
        <div class="vacio-feliz">
          <span class="emoji">🎉</span>
          <b>Sin eventos disciplinarios este año</b><br>
          ¡Sigue así, ${ESTUDIANTE.nombre.split(" ")[0]}!
        </div>`}
      </div>

      <div class="card bloque">
        <h3>📁 Documentos</h3>
        ${docs}
      </div>

      <div class="card bloque">
        <h3>👤 Datos del acudiente</h3>
        <div class="contacto-row">
          <div>✉️ ${ESTUDIANTE.acudiente.correo}</div>
          <div>🔔 Notificaciones: ${ESTUDIANTE.acudiente.notificaciones ? "activadas" : "desactivadas"}</div>
        </div>
        <button class="btn-secundario">Actualizar datos de matrícula →</button>
      </div>
    </div>`;
}

/* ============================================================
   ARRANQUE
   ============================================================ */
pintarNav();
pintarSemana();
pintarNotas();
pintarMensajes();
pintarPagos();
pintarPerfil();
mostrarVista("semana");

$("#msg-cerrar").addEventListener("click", cerrarMensaje);
$("#overlay").addEventListener("click", cerrarMensaje);
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarMensaje(); });
