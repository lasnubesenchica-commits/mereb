/* ============================================================
   Mereb Nova · Vista del docente
   Formulario de actividad con vista previa en vivo:
   la tarjeta se renderiza con el MISMO formato que ve la familia.
   ============================================================ */

const $ = (s, c = document) => c.querySelector(s);

const DIAS_PROX = [
  { id: "lun", label: "Lun 6", largo: "Lunes 6 de julio" },
  { id: "mar", label: "Mar 7", largo: "Martes 7 de julio" },
  { id: "mie", label: "Mié 8", largo: "Miércoles 8 de julio" },
  { id: "jue", label: "Jue 9", largo: "Jueves 9 de julio" },
  { id: "vie", label: "Vie 10", largo: "Viernes 10 de julio" },
];

/* Estado del formulario */
const act = {
  dia: "lun",
  materia: "espanol",
  tipo: "formativa",
  titulo: "",
  detalle: "",
  materiales: [],
  estudiar: "",
};

/* Actividades ya publicadas (arranque con un ejemplo) */
const publicadas = [
  { dia: "mar", materia: "listening", tipo: "sumativa", titulo: "Speech — World Foods", detalle: "Presentación oral individual de la receta trabajada en clase." },
];

/* ---------- selectores tipo pill ---------- */
function pintarPills(cont, opciones, activo, onPick) {
  cont.innerHTML = opciones.map(o => `
    <button type="button" data-v="${o.v}" class="${o.v === activo ? "sel" : ""}" style="--pc:${o.color || ""}">
      ${o.color ? '<span class="pt"></span>' : ""}${o.label}
    </button>`).join("");
  cont.querySelectorAll("button").forEach(b =>
    b.addEventListener("click", () => onPick(b.dataset.v)));
}

function pintarSelectores() {
  pintarPills($("#pick-dia"),
    DIAS_PROX.map(d => ({ v: d.id, label: d.label })),
    act.dia, v => { act.dia = v; refrescar(); });

  pintarPills($("#pick-materia"),
    Object.entries(MATERIAS).map(([k, m]) => ({ v: k, label: m.nombre, color: m.color })),
    act.materia, v => { act.materia = v; refrescar(); });

  pintarPills($("#pick-tipo"),
    Object.entries(TIPOS).map(([k, t]) => ({ v: k, label: t.nombre, color: t.color })),
    act.tipo, v => { act.tipo = v; refrescar(); });
}

/* ---------- tarjeta idéntica a la de la familia ---------- */
function tarjetaFamilia(a) {
  const m = MATERIAS[a.materia];
  const t = TIPOS[a.tipo];
  const secciones = [];
  if (a.materiales && a.materiales.length) {
    secciones.push(`<div class="seccion" style="--c:${m.color}">
      <div class="seccion-titulo">Materiales a traer</div>
      <ul>${a.materiales.map(x => `<li>${x}</li>`).join("")}</ul>
    </div>`);
  }
  if (a.estudiar) {
    secciones.push(`<div class="seccion" style="--c:${m.color}">
      <div class="seccion-titulo">Sugerencia de estudio</div>
      <ul><li>${a.estudiar}</li></ul>
    </div>`);
  }
  return `
  <article class="actividad" style="--c:${m.color}">
    <div class="barra"></div>
    <div class="actividad-body">
      <div class="actividad-top">
        <span class="materia-tag" style="--c:${m.color}">${m.nombre}</span>
        <span class="badge" style="background:${t.color}">${t.nombre}</span>
        <span class="prof">Prof. ${m.docente}</span>
      </div>
      <h3>${a.titulo || "Título de la actividad…"}</h3>
      <p class="detalle">${a.detalle || "La descripción que escribas aparecerá aquí, con este mismo formato."}</p>
      ${secciones.join("")}
    </div>
  </article>`;
}

function refrescar() {
  pintarSelectores();
  $("#preview").innerHTML = tarjetaFamilia(act);
  $("#preview-dia").textContent = "Aparecerá el " + DIAS_PROX.find(d => d.id === act.dia).largo.toLowerCase() + " en la agenda de 5°A.";
  $("#btn-publicar").disabled = !(act.titulo.trim() && act.detalle.trim());
}

/* ---------- materiales como chips ---------- */
function pintarChips() {
  const cont = $("#chips-materiales");
  cont.querySelectorAll(".chip").forEach(c => c.remove());
  const input = $("#f-material");
  act.materiales.forEach((mat, i) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.innerHTML = `${mat}<button type="button" aria-label="Quitar ${mat}">✕</button>`;
    chip.querySelector("button").addEventListener("click", () => {
      act.materiales.splice(i, 1);
      pintarChips();
      refrescar();
    });
    cont.insertBefore(chip, input);
  });
}

$("#f-material").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    const v = e.target.value.trim();
    if (v) {
      act.materiales.push(v);
      e.target.value = "";
      pintarChips();
      refrescar();
    }
  }
});

/* ---------- campos de texto ---------- */
$("#f-titulo").addEventListener("input", e => { act.titulo = e.target.value; refrescar(); });
$("#f-detalle").addEventListener("input", e => { act.detalle = e.target.value; refrescar(); });
$("#f-estudio").addEventListener("input", e => { act.estudiar = e.target.value; refrescar(); });

/* ---------- publicar ---------- */
function pintarPublicadas() {
  const orden = Object.fromEntries(DIAS_PROX.map((d, i) => [d.id, i]));
  const lista = [...publicadas].sort((a, b) => orden[a.dia] - orden[b.dia]);
  $("#lista-publicadas").innerHTML = lista.map(p => {
    const m = MATERIAS[p.materia];
    const t = TIPOS[p.tipo];
    const d = DIAS_PROX.find(x => x.id === p.dia);
    return `
    <div class="pub-row">
      <span class="dia-tag">${d.label.split(" ")[1]}<small>${d.label.split(" ")[0]}</small></span>
      <span class="materia-tag" style="--c:${m.color}">${m.corto}</span>
      <span class="t">${p.titulo}<small>${p.detalle}</small></span>
      <span class="badge" style="background:${t.color}">${t.nombre}</span>
    </div>`;
  }).join("");
}

$("#form").addEventListener("submit", e => {
  e.preventDefault();
  publicadas.push({ ...act, materiales: [...act.materiales] });
  pintarPublicadas();

  const toast = $("#toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);

  // limpiar para la siguiente
  act.titulo = ""; act.detalle = ""; act.estudiar = ""; act.materiales = [];
  $("#f-titulo").value = ""; $("#f-detalle").value = ""; $("#f-estudio").value = "";
  pintarChips();
  refrescar();
});

/* ---------- arranque ---------- */
pintarChips();
pintarPublicadas();
refrescar();
