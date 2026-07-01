# Auditoría UX — Mereb (i-MEREB / v4.bseducativo.com)

**Fecha:** 1 de julio de 2026
**Fuente:** 25 capturas de pantalla de la cuenta de acudiente (perfil de la estudiante Gianna, 5°A, Colegio de Las Esclavas del Sagrado Corazón de Jesús).
**Objetivo:** documentar el estado actual del sistema para fundamentar el rediseño.

---

## 1. Inventario de pantallas revisadas

| Pantalla | URL | Estado observado |
|---|---|---|
| Login | `/` | Modal sobre página de marketing; usuario = cédula |
| Pantalla principal | `/Home/Index2` | Publicidad arriba, datos del estudiante abajo del pliegue |
| Guía semanal (Agenda) | `/EstudianteNotaAgenda` | Tablas HTML apiladas por materia |
| Calendario mensual | `/EstudianteNotaAgenda` | Grilla con pastillas amarillas/verdes sin leyenda |
| Notas diarias | `/EstudianteNotaAgenda` | Grilla N1–N14 sin fechas ni nombres de actividad |
| Promedio preliminar | `/EstudianteNotaAgenda` | Tabla profesor/materia/promedio |
| Boletín oficial | `/EstudianteNotaAgenda` | Modal de advertencia bloquea el contenido; trimestres futuros en 0.00 |
| Ausencias | `/EstudianteNotaAgenda` | Tabla por materia con ausencias/tardanzas |
| Mensajería | `/Mensajeria` | Clon de webmail (CC, BCC, carpetas, cuota de espacio) |
| Centro de Pagos | `/centropago` | Publicidad de la casa de software dentro del flujo de pago |
| Estado de cuenta | `/centropago` | Requiere seleccionar al único estudiante; caja gris rota |
| Comprobantes | `/centropago` | Vacío al entrar ("No se encontraron registros") |
| Eventos disciplinarios | `/EventosDisciplinario` | Tabla vacía sin estado amigable |
| Documentos | `/Home/Index2` | "Contrato de Matrícula 2020" (desactualizado) |
| Contratos | `/ContratosAnte` | Tabla simple 2025/2026 |
| Actualizar datos | `/ActualizarDatos` | Formulario largo de 5 pestañas |
| Magroom (LMS) | `/MagroomPrincipal/Estudiante` | Todo en 0, sin contenido |
| MERITUM | popup | Upsell de producto "próximamente" para profesionales |
| Perfil | `/Usuarios/UpdatePerfil` | Muestra la foto de la profesora, no de la estudiante |
| Ayuda | `/AyudaTodo/Index` | Galería de videos promocionales de Bios Software |

## 2. Bugs confirmados en capturas

1. **Foto de perfil incorrecta** — el perfil de la estudiante muestra la foto de una profesora (`perfil-sale-foto-profesora.png`).
2. **Estado del período contradictorio** — "Período en Curso: [Primer trimestre] (Ya finalizo)" mientras la agenda muestra actividades de junio–julio (segundo trimestre).
3. **Magroom vacío** — el LMS integrado no muestra nada para la estudiante (`magroom-no-sale-nada.png`).
4. **Caja rota en Estado de Cuenta** — un contenedor con borde negro y degradado gris sin contenido (imagen rota).
5. **Comprobantes vacío al entrar** — no precarga al único estudiante de la cuenta; hay que seleccionarlo manualmente en cada pestaña.
6. **Boletín**: correo "No definido" aunque el perfil tiene correo registrado; trimestres sin calificar aparecen como `0.00` (parece reprobado) en vez de vacío.
7. **Índice académico con precisión absurda** — `4.622222`, `---> 0.000000`.
8. **Typos** — "contrasena" y "al alance" en login; "Estimado/a rAcudiente" en alertas oficiales; "(Ya finalizo)" sin tilde.
9. **Prefijos del modelo de datos filtrados a la UI** — materias listadas como `--SCIENCE`, `------ENGLISH`, `5-A(--LISTENING)`.
10. **Bandera de España** para el idioma español (contexto: Panamá).

## 3. Problemas estructurales de UX

### 3.1 El contenido diario está enterrado; la publicidad no
- Lo primero que ve un acudiente al entrar: 3 banners de venta (QR-School, Umáximo, Orion) dirigidos a **directores de colegio**, no a padres.
- La información real (agenda, notas, período) está abajo del pliegue en tarjetas "Estado".
- Un ítem permanente del menú (MERITUM "Pronto") es publicidad de un producto que ni existe, con popup interruptor.
- Publicidad de diseño web de Bios Software dentro del Centro de Pagos.

### 3.2 Navegación pensada para el colegio, no para la familia
- 8+ secciones de primer nivel con jerga interna: Magroom, Meritum, Gestión QR, Matrícula.
- El flujo más frecuente (¿qué tiene Gianna esta semana?) requiere: Gestión → Notas y Agendas → pestaña Horarios → botón Agenda → vista Semanal.
- Notas, boletín, ausencias y agenda viven como pestañas horizontales dentro de una sección genérica "Notas y Agendas".

### 3.3 Presentación de datos indigerible
- La guía semanal son tablas HTML apiladas con encabezados tipo `5-A(ESPAÑOL) (Tema 2) Prof:NAYROBIS COBAS DE CUBAS`, columnas fijas (Tema / Detalle de evaluación / Sugerencia de estudio) que los docentes llenan de forma inconsistente.
- Código de colores (amarillo/verde) sin leyenda visible.
- Notas diarias: columnas N1–N14 sin fecha, sin nombre de actividad, sin ponderación — imposible saber qué fue el 2.50 de Science.
- Todo en MAYÚSCULAS, decimales crudos, celdas rojas/verdes sin explicación de umbral.

### 3.4 Fricción operativa
- Sesión con temporizador visible de 30 minutos que expulsa al usuario.
- Modal "Este documento no es válido sin las firmas y sellos" que hay que cerrar cada vez para ver el boletín.
- La mensajería replica un cliente de correo de los 2000 (CC, BCC, cuota de espacio, carpetas, 11 páginas) para lo que en realidad son comunicados del colegio y notas de docentes.
- Leer un mensaje abre un modal con campos de composición (PARA/CC/BCC) — confuso.
- Estados vacíos crudos: "Sin registros que mostrar".
- Solo escritorio; en móvil es inutilizable (el propio proveedor empuja una app aparte).

## 4. Lo que sí hay que conservar (funcionalidad valiosa)

- Concepto de agenda con tipos de actividad: **Sumativa / Formativa / Asignación / Diagnóstica** y sugerencias de estudio.
- Vistas Mes / Semana / Día.
- Notas por período con promedio preliminar, boletín proyectado y boletín oficial.
- Ausencias y tardanzas por materia.
- Comunicados y mensajería con docentes (104 mensajes: es el canal real del colegio).
- Estado de cuenta, pagos en línea (Visa/MC), comprobantes, recargos.
- Documentos institucionales (contrato, reglamento) y proceso de matrícula/actualización de datos.
- Eventos disciplinarios.

## 5. Dirección del rediseño

**Principio rector:** el acudiente entra para responder 4 preguntas en menos de 10 segundos:
1. ¿Qué necesita mi hija **hoy/esta semana**? (agenda, materiales, evaluaciones)
2. ¿Cómo va? (notas con contexto y tendencia, no grillas N1–N14)
3. ¿Qué me comunicó el colegio? (mensajes con prioridad, no webmail)
4. ¿Estoy al día con pagos?

**Arquitectura propuesta (5 secciones):**
- **Hoy / Semana** — agenda tipo tarjetas (base: prototipo `index.html` de abril, recuperable en el historial git `15b0cdc`).
- **Calificaciones** — por materia, cada nota con fecha, nombre de actividad y tipo; promedios con umbral visual explicado.
- **Mensajes** — hilo de comunicados y conversaciones con docentes, prioridades, adjuntos.
- **Pagos** — saldo, próximo vencimiento, historial y comprobantes en una sola vista.
- **Estudiante** — perfil, documentos, matrícula, ausencias, disciplina.

**Lenguaje visual:** el del prototipo de abril — tipografías Fraunces + Nunito, materias con código de color consistente, badges de tipo de actividad, mobile-first, imprimible.

## 6. Datos reales de referencia (para el prototipo con datos de ejemplo)

- Estudiante: 5° grado, grupo 5-A. Consejera: Nayrobis Cobas.
- Materias: Español, Matemática, Science, Estudios Sociales, Religión y Moral, Educación Física, Tecnología, English, Neo, Listening, Expresiones Artísticas.
- Escala de notas: 1.00–5.00; umbral visual ~3.0 (rojo), ~4.0 (amarillo).
- Períodos: 3 trimestres (Primer trimestre: 2 mar – 29 may 2026).
- Tipos de actividad: Sumativa, Formativa, Asignación, Diagnóstica.
- Finanzas: matrícula, cuotas mensuales, recargo 5%, pagos en banco y en línea.

> Nota: para la demo al colegio se usarán **datos ficticios** con esta misma estructura.
