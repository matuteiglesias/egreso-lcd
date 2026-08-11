# UX & Information Architecture

## 1. Mental model

The portal should feel like a lightweight guide/tool, not a documentation wiki.

Primary model:

```text
¿Dónde estoy?
    ↓
¿Qué me bloquea?
    ↓
¿Qué hago ahora?
    ↓
¿Qué preparo?
    ↓
¿Dónde lo hago oficialmente?
    ↓
¿Qué viene después?
```

## 2. Suggested routes

The exact route names may adapt to starter conventions, but preserve these concepts:

```text
/
├── /orientador
├── /etapas
│   ├── /tutor-pei
│   ├── /tesis
│   ├── /cierre-academico
│   ├── /regularizacion
│   ├── /diploma
│   ├── /seguimiento
│   └── /jura
├── /problemas
│   ├── /nota-faltante
│   ├── /secundario-sin-legalizar
│   ├── /subsanacion
│   ├── /guarda-temporal
│   ├── /no-aparece-siet
│   └── /constancia-titulo-en-tramite
└── /fuentes
```

Avoid deep route nesting that mirrors internal university departments.

## 3. Landing hierarchy

Recommended order:

1. Hero
2. Primary CTA: `Saber dónde estoy`
3. Linear journey map
4. "Ya sé en qué etapa estoy" shortcuts
5. Common problems
6. Trust/source explanation
7. Footer with official-system links/disclaimer

Suggested hero copy:

> **Terminaste o estás terminando Datos. ¿Y ahora qué?**
>
> Una guía para saber dónde estás, qué te falta y qué hacer hasta recibir tu título.

Do not imply the portal is an official UBA transactional site unless institutional status
is later formally established.

## 4. Resolver interaction

### Step 0 — broad triage

Ask one high-value question:

**¿En qué parte del proceso estás?**

Cards/buttons:

- Todavía estoy con tutor, PEI u optativas
- Estoy preparando o haciendo la tesis
- Ya aprobé materias y tesis
- Estoy con inclusiones, puntajes o equivalencias
- Estoy por iniciar o ya inicié el diploma
- Mi trámite ya está en SIET / UBA
- Mi diploma ya está terminado / quiero recibirlo

### Step 1+ — branch-specific questions

Do not ask irrelevant historic questions.

Example:
if someone is already in SIET, do not ask whether a tutor was approved years ago.

Question screens should contain:

- one question;
- short context only if needed;
- clear answer choices;
- back;
- exit/reset.

## 5. Resolver result

Result card/page:

```text
TU SITUACIÓN

Diploma — preparar documentación

✓ Carrera académicamente completa
✓ Regularización resuelta
✓ Secundario legalizado
! Falta preparar RC14 y comprobante

QUÉ HACER AHORA
Prepará la documentación antes de iniciar TAD.

[Ver checklist]

Después:
Iniciar Solicitud de Expedición de Diploma
```

Also show:

- evidence/source links;
- timing notice where relevant;
- "Corregir mis respuestas";
- "Empezar de nuevo".

## 6. Progress visualization

Use stage progress, not a misleading percentage.

Good:

```text
Tutor → PEI → Tesis → Regularización → Diploma → SIET → Entrega
                         ● estás acá
```

Avoid:
`73% completado`

The administrative process is not a uniform linear quantity.

## 7. Evidence visual language

Create visually distinct callouts.

### Requisito oficial
Used for hard prerequisites and blockers.

### Proceso oficial
Used for how an institution says the process works.

### Recomendación
Useful but non-binding guidance.

### Tiempo orientativo
Always include wording equivalent to:
`Es una referencia para planificar, no una garantía.`

### Atención
For time-sensitive or failure-prone states such as SUBSANACIÓN.

## 8. Outbound links

Official actions must be clearly marked as leaving the portal.

Examples:

- `Abrir TAD ↗`
- `Ir a SIET ↗`
- `Descargar RC14 ↗`
- `Ver fuente oficial ↗`

Never style an outbound official action as if the local portal itself were submitting the
procedure.

## 9. Mobile

Assume a substantial fraction of users will consult the guide while using another system
or from a phone.

Requirements:

- triage cards stack cleanly;
- no horizontal tables as primary interaction;
- checklists remain legible;
- official-link buttons are easy to tap;
- progress component can horizontally scroll or compress without hiding current stage;
- no hover-only information.

## 10. Future assistant seam

Do not show a fake AI widget in v1.

However, layouts should leave a natural future location for:

- a compact "Preguntá sobre tu trámite" entry on the landing;
- a page-level ask box;
- contextual answers linked back to structured guidance.

The future assistant should feel additive, not structurally necessary.
