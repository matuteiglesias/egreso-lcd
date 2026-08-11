# Product Spec — Egreso LCD v1

Status: **frozen pre-development implementation spec**

## 1. Product objective

Help a person move from the final portion of the LCD academic journey to receiving the
degree by converting fragmented institutional information into:

**estado → bloqueos → próximo paso → checklist → explicación → fuente oficial**

The portal is an orientation layer, not an administrative authority.

## 2. Primary audience

Main audience:

- students in the last part of the degree;
- students preparing or completing the thesis;
- people who have academically completed the degree but still have administrative steps;
- recent graduates waiting for degree processing or delivery.

The journey begins before formal graduation because tutor, PEI and thesis choices create
later administrative dependencies.

## 3. User jobs

The product should make these tasks easy:

- "No sé qué trámite me toca ahora."
- "¿Puedo avanzar o todavía me falta algo?"
- "¿Qué necesito preparar antes de abrir TAD?"
- "¿Qué significa este estado de TAD?"
- "¿Dónde sigo mi título?"
- "¿Qué hago si algo está trabado?"
- "¿Dónde está la fuente oficial?"
- "¿Qué puedo ir preparando con anticipación?"

## 4. Core product surfaces

### 4.1 Landing

Must communicate:

- what the portal does;
- who it is for;
- primary CTA: **Saber dónde estoy**;
- visible linear map of the main journey;
- quick access to common problems;
- explicit note that official actions happen in UBA/FCEN systems.

### 4.2 Stage triage

First classify into one broad area:

1. Tutor / PEI / optativas
2. Tesis
3. Cierre académico
4. Inclusiones / equivalencias / regularización
5. Diploma / TAD
6. SIET / UBA
7. Entrega / jura

Then ask only the minimum questions required inside that branch.

### 4.3 Resolver

Input:
non-sensitive answers.

Output:

- human-readable stage;
- current situation;
- completed prerequisites;
- blocker(s);
- next action;
- relevant checklist;
- expected timing if applicable;
- relevant claim/source links;
- next stage preview.

The resolver must never require an LLM.

### 4.4 Checklists

Three distinct semantics:

**Estado**
- "Tutor aprobado"
- "PEI aprobado"

**Preparación**
- "Preparé el DNI"
- "Completé RC14"

**Verificación**
- "Confirmé que la nota figura en SIU"
- "Confirmé que la resolución está numerada"

Avoid presenting institutional facts as casual to-do items.

### 4.5 Guidance pages

Seven content modules:

1. Preparar el tercer ciclo
2. Hacer la tesis
3. Cerrar la carrera académicamente
4. Regularizar el plan
5. Pedir el diploma
6. Seguir el título
7. Recibir el diploma / etapa de graduadx

Each module should contain:

- what this stage is;
- prerequisites;
- practical steps;
- what not to do yet;
- expected output;
- timing notice where supported;
- common failures;
- official outbound links;
- source/freshness information;
- next stage.

### 4.6 Common-problem entry points

At minimum:

- Falta una nota en SIU
- No tengo el secundario legalizado
- Mi tutor/a sigue pendiente
- Mi PEI sigue pendiente
- TAD dice SUBSANACIÓN
- TAD dice GUARDA TEMPORAL
- No sé si mis materias necesitan inclusión/equivalencia
- No encuentro mi trámite en SIET
- Necesito acreditar que el título está en trámite
- Mi diploma terminó: ¿cómo lo recibo?

## 5. Source semantics

Every operational statement belongs to one of these categories:

- **Requisito oficial**
- **Proceso oficial**
- **Tiempo oficial**
- **Recomendación oficial**
- **Expectativa práctica**

The UI must not flatten these categories into a generic "info" style.

Times are expectations unless a normative source explicitly creates a deadline.

Current product convention:
the diploma journey may show **aprox. 8 meses** as a practical planning expectation,
explicitly labeled as orientative and not guaranteed.

## 6. Navigation principle

Organize around the user's stage and action, not around the bureaucracy that owns it.

Good:
`Diploma → Preparar documentos → Iniciar en TAD`

Avoid as primary navigation:
`Dirección de Estudiantes y Graduados → Mesa de Entradas → ...`

Institutional ownership belongs in secondary metadata and source cards.

## 7. Persistence

V1 may persist resolver progress locally in the browser.

Constraints:

- no login;
- no server storage;
- no PII;
- user can reset state;
- version the stored payload so later state-model changes can invalidate safely.

Suggested key:
`egreso-lcd:resolver:v1`

## 8. Search

If the chosen starter has useful local search, keep/adapt it.

Search is secondary to the state resolver, but useful for known-item lookup such as:

- "RC14"
- "subsanación"
- "director tesis"
- "secundario"
- "SIET"

Do not add a hosted search service for v1 unless there is a demonstrated need.

## 9. V1 non-goals

Do not add:

- AI assistant;
- RAG;
- user accounts;
- database;
- push notifications;
- automated deadline monitoring;
- automated scraping;
- official transaction submission;
- a broad copy of the entire LCD website;
- a general student portal.

## 10. Phase 2 awareness

The design should reserve clean information architecture for a future "Preguntá" surface,
but v1 should not pretend that the assistant already exists.

The future assistant is an alternate query surface over the same knowledge system, not a
replacement for structured navigation or deterministic state.
