export type ChecklistKind = "status" | "preparation" | "verification";

export type ChecklistItem = {
  id: string;
  label: string;
  kind: ChecklistKind;
  claimId?: string;
};

export type ContentAction = {
  label: string;
  targetId?: string;
  sourceId?: string;
  href?: string;
};

export type ContentSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  claimIds?: string[];
  actions?: ContentAction[];
};

export type StagePage = {
  slug: string;
  navLabel: string;
  title: string;
  eyebrow: string;
  intro: string;
  stageKeys: string[];
  claimIds: string[];
  checklist: ChecklistItem[];
  sections: ContentSection[];
  nextSlug?: string;
};

export type ProblemPage = {
  slug: string;
  title: string;
  intro: string;
  stageSlug: string;
  claimIds: string[];
  steps: string[];
  actions?: ContentAction[];
  note?: string;
};

export const STAGE_ORDER = [
  { slug: "tutor-y-pei", label: "Tutor y PEI" },
  { slug: "tesis", label: "Tesis" },
  { slug: "cierre-academico", label: "Cierre académico" },
  { slug: "regularizacion", label: "Regularización" },
  { slug: "diploma", label: "Diploma" },
  { slug: "seguimiento", label: "Seguimiento" },
  { slug: "jura-y-entrega", label: "Entrega" },
] as const;

export const STAGE_PAGES: Record<string, StagePage> = {
  "tutor-y-pei": {
    slug: "tutor-y-pei",
    navLabel: "Tutor y PEI",
    title: "Tutor/a, PEI y tercer ciclo",
    eyebrow: "Etapa 1",
    intro:
      "El tutor y el PEI ordenan el tercer ciclo. Son trámites consecutivos: primero necesitás una tutoría aprobada y después puede tratarse el PEI.",
    stageKeys: ["tutor", "pei"],
    claimIds: [
      "TUT-01",
      "TUT-02",
      "TUT-03",
      "TUT-04",
      "TUT-05",
      "PEI-01",
      "PEI-02",
      "PEI-03",
      "PEI-04",
      "PEI-05",
      "PEI-06",
    ],
    checklist: [
      {
        id: "tutor-selected",
        kind: "preparation",
        label: "Elegí un/a tutor/a y confirmé que puede asumir el rol.",
        claimId: "TUT-02",
      },
      {
        id: "tutor-request",
        kind: "preparation",
        label: "Completé la solicitud y el/la tutor/a validó el circuito por correo.",
        claimId: "TUT-03",
      },
      {
        id: "tutor-approved",
        kind: "status",
        label: "La Comisión de Carrera aprobó mi tutoría.",
        claimId: "TUT-04",
      },
      {
        id: "pei-with-tutor",
        kind: "preparation",
        label: "Armé el PEI junto con mi tutor/a.",
        claimId: "PEI-01",
      },
      {
        id: "pei-hours",
        kind: "verification",
        label: "Verifiqué que el tercer ciclo cumpla al menos 640 horas.",
        claimId: "PEI-05",
      },
      {
        id: "pei-approved",
        kind: "status",
        label: "La Comisión aprobó mi PEI.",
        claimId: "PEI-02",
      },
    ],
    sections: [
      {
        title: "1. Resolver la tutoría",
        paragraphs: [
          "La carrera recomienda elegir tutor/a con anticipación, idealmente antes de entrar de lleno en las optativas. La tutoría no queda aprobada por el solo acuerdo entre las partes: debe completar el circuito y ser aprobada por la Comisión de Carrera.",
          "Si todavía no tenés esa aprobación, el orientador te mantiene en esta etapa. No conviene preparar el PEI como si ambos trámites pudieran cerrarse juntos.",
        ],
        claimIds: ["TUT-01", "TUT-02", "TUT-03", "TUT-04", "TUT-05"],
        actions: [
          { label: "Abrir formulario de tutor/a ↗", targetId: "tutor_form" },
          { label: "Escribir a Tutorías LCD ↗", targetId: "tutorias_email" },
        ],
      },
      {
        title: "2. Armar y presentar el PEI",
        paragraphs: [
          "El PEI se arma con el/la tutor/a y define el recorrido del tercer ciclo. La Comisión sólo considera PEI con tutoría previamente aprobada.",
          "El plan no se limita a una lista cerrada de materias: pueden proponerse otras opciones con el aval del/la tutor/a y la aprobación de la Comisión.",
        ],
        claimIds: ["PEI-01", "PEI-02", "PEI-05", "PEI-06"],
        actions: [{ label: "Abrir formulario de PEI ↗", targetId: "pei_form" }],
      },
      {
        title: "3. Planificar los tiempos",
        paragraphs: [
          "Tutoría y PEI son pasos separados. La información publicada estima alrededor de 1–2 meses para tutoría y 2–3 meses para PEI, y aclara que no se aprueban en la misma reunión.",
          "Tomá esos tiempos como referencias para organizar el tramo final, no como fechas garantizadas.",
        ],
        claimIds: ["PEI-03", "TUT-05", "PEI-04"],
      },
    ],
    nextSlug: "tesis",
  },

  tesis: {
    slug: "tesis",
    navLabel: "Tesis",
    title: "De tema de tesis a defensa",
    eyebrow: "Etapa 2",
    intro:
      "La tesis es un sub-recorrido completo: preparación, cursada, manuscrito, evaluación del jurado, eventuales correcciones, defensa y finalmente carga de la nota.",
    stageKeys: ["tesis"],
    claimIds: [
      "THS-01",
      "THS-02",
      "THS-03",
      "THS-04",
      "THS-05",
      "THS-06",
      "THS-07",
      "THS-08",
      "THS-09",
      "THS-10",
      "THS-11",
      "THS-12",
      "THS-13",
      "THS-14",
      "THS-15",
    ],
    checklist: [
      {
        id: "thesis-second-cycle",
        kind: "verification",
        label: "Tengo aprobados con final los cursos del segundo ciclo.",
        claimId: "THS-02",
      },
      {
        id: "thesis-director-topic",
        kind: "status",
        label: "Tengo tema y director/a.",
        claimId: "THS-03",
      },
      {
        id: "thesis-plan",
        kind: "preparation",
        label: "Tengo un plan de trabajo realizable en un cuatrimestre.",
        claimId: "THS-04",
      },
      {
        id: "thesis-manuscript",
        kind: "status",
        label: "Entregué el manuscrito listo para evaluación.",
        claimId: "THS-09",
      },
      {
        id: "thesis-jury",
        kind: "verification",
        label: "La tesis pasó por el circuito de evaluación del jurado.",
        claimId: "THS-11",
      },
      {
        id: "thesis-defense",
        kind: "status",
        label: "Defendí la tesis y luego verifiqué la carga de la nota en SIU.",
      },
    ],
    sections: [
      {
        title: "¿Podés empezar?",
        paragraphs: [
          "El inicio formal se da con la inscripción a Tesis de Licenciatura. Antes necesitás los finales del segundo ciclo aprobados, un tema, un/a director/a y un plan de trabajo realizable en el cuatrimestre.",
          "El Encuentro de Iniciación de Tesis está pensado para ayudarte a encontrar temas y direcciones. El reglamento lo recomienda, pero no lo convierte en requisito de inscripción.",
        ],
        claimIds: ["THS-02", "THS-03", "THS-04", "THS-05", "THS-06"],
        actions: [
          { label: "Ver información oficial de tesis ↗", sourceId: "LCD_THESIS" },
        ],
      },
      {
        title: "Durante la cursada",
        paragraphs: [
          "La materia está pensada como un trabajo intensivo durante un cuatrimestre. El reglamento espera unas 20 horas semanales y organiza hitos para convertir una idea en un manuscrito evaluable.",
        ],
        bullets: [
          "Inicio: tema, dirección y plan escrito.",
          "Presentación oral del plan.",
          "Presentación de avances y primeros resultados.",
          "Índice comentado para ordenar la escritura.",
          "Manuscrito listo para evaluación antes de terminar el cuatrimestre.",
        ],
        claimIds: ["THS-07", "THS-08", "THS-09", "THS-10"],
      },
      {
        title: "Jurado, correcciones y defensa",
        paragraphs: [
          "Una vez entregado el manuscrito, cada integrante del jurado dispone del tiempo reglamentario para evaluarlo. La devolución puede habilitar la defensa, pedir correcciones antes de defender o no habilitarla.",
          "La defensa es oral. Para realizarla deben participar al menos dos de los tres integrantes del jurado.",
        ],
        claimIds: ["THS-11", "THS-12", "THS-13", "THS-14"],
      },
      {
        title: "¿Quién puede dirigir?",
        paragraphs: [
          "El reglamento contiene las categorías completas de personas habilitadas para dirigir y co-dirigir. Para el portal, la regla operativa más importante es esta: si la dirección no es docente o investigador/a con lugar de trabajo en FCEN, hace falta una co-dirección de la Facultad.",
          "Si tu caso no encaja claramente, verificá el reglamento o consultá a la materia antes de asumir que la dirección está habilitada.",
        ],
        claimIds: ["THS-15"],
        actions: [
          { label: "Abrir la página oficial de tesis ↗", sourceId: "LCD_THESIS" },
        ],
      },
    ],
    nextSlug: "cierre-academico",
  },

  "cierre-academico": {
    slug: "cierre-academico",
    navLabel: "Cierre académico",
    title: "Cerrar la carrera académicamente",
    eyebrow: "Etapa 3",
    intro:
      "Haber rendido lo último y estar listo para iniciar el diploma no son exactamente lo mismo. Primero confirmá que materias y tesis estén efectivamente cerradas en el registro académico.",
    stageKeys: ["cierre_academico"],
    claimIds: ["DIP-01", "INC-04", "DIP-02"],
    checklist: [
      {
        id: "all-courses",
        kind: "status",
        label: "Aprobé todas las materias de mi plan.",
        claimId: "DIP-01",
      },
      {
        id: "thesis-done",
        kind: "status",
        label: "Aprobé la tesis.",
        claimId: "DIP-01",
      },
      {
        id: "siu-complete",
        kind: "verification",
        label: "Verifiqué que materias y tesis figuren correctamente en SIU.",
      },
      {
        id: "admin-pending",
        kind: "verification",
        label: "Revisé si todavía tengo inclusiones, puntajes o equivalencias pendientes.",
        claimId: "INC-04",
      },
    ],
    sections: [
      {
        title: "La condición académica",
        paragraphs: [
          "El diploma no debe iniciarse antes de aprobar la totalidad de materias del plan, incluida la tesis cuando corresponda.",
          "El orientador considera el cierre académico completo sólo cuando también confirmaste que esas aprobaciones figuran correctamente en SIU. Si falta una nota, quedate en esta etapa y resolvé el registro antes de avanzar.",
        ],
        claimIds: ["DIP-01"],
      },
      {
        title: "La condición administrativa",
        paragraphs: [
          "Después del cierre académico, preguntate si tu plan necesita algún trámite adicional: inclusión, puntaje, equivalencia u otro expediente relacionado.",
          "Si corresponde alguno, el diploma espera. Esos trámites deben estar concluidos con resolución numerada.",
        ],
        claimIds: ["INC-04", "DIP-02"],
      },
    ],
    nextSlug: "regularizacion",
  },

  regularizacion: {
    slug: "regularizacion",
    navLabel: "Regularización",
    title: "Regularizar el plan antes del diploma",
    eyebrow: "Etapa 4",
    intro:
      "Si tu recorrido incluye inclusiones, puntajes, equivalencias u otros trámites del plan, el objetivo de esta etapa es llegar a una resolución numerada antes de pedir el diploma.",
    stageKeys: ["regularizacion"],
    claimIds: ["INC-01", "INC-02", "INC-03", "INC-04", "INC-05"],
    checklist: [
      {
        id: "regularization-needed",
        kind: "verification",
        label: "Identifiqué qué trámite necesita mi plan.",
      },
      {
        id: "origin",
        kind: "verification",
        label: "Confirmé de dónde provienen las materias involucradas.",
      },
      {
        id: "programs",
        kind: "preparation",
        label: "Si son materias FCEN, preparé los programas correspondientes.",
        claimId: "INC-03",
      },
      {
        id: "expediente-started",
        kind: "status",
        label: "Inicié el expediente por el circuito que corresponde.",
      },
      {
        id: "numbered-resolution",
        kind: "status",
        label: "Tengo la resolución numerada que concluye el trámite.",
        claimId: "INC-04",
      },
    ],
    sections: [
      {
        title: "Primero: identificar el caso",
        paragraphs: [
          "No todas las materias siguen exactamente el mismo circuito. El orientador distingue materias de FCEN, materias externas y situaciones de movilidad/intercambio para evitar darte una instrucción única que no corresponda.",
        ],
        claimIds: ["INC-04"],
        actions: [
          {
            label: "Ver trámites administrativos de FCEN ↗",
            sourceId: "FCEN_ADMIN",
          },
        ],
      },
      {
        title: "Si son materias de FCEN",
        paragraphs: [
          "Para puntaje o inclusión de materias optativas con origen en FCEN, la guía oficial indica iniciar TAD y buscar “Mesa de Entrada de la Facultad de Ciencias Exactas y Naturales”.",
          "En el motivo se identifican el tipo de trámite, las materias y las carreras de origen y destino. También se adjuntan los programas.",
        ],
        claimIds: ["INC-01", "INC-02", "INC-03"],
        actions: [{ label: "Abrir TAD ↗", targetId: "tad" }],
      },
      {
        title: "El resultado que necesitás",
        paragraphs: [
          "No tomes la mera apertura del expediente como cierre de esta etapa. Antes del diploma, los trámites pertinentes deben estar concluidos con resolución numerada.",
          "Como referencia práctica para planificar, presupuestá alrededor de tres meses. Puede variar y no es un plazo garantizado.",
        ],
        claimIds: ["INC-04", "INC-05"],
      },
    ],
    nextSlug: "diploma",
  },

  diploma: {
    slug: "diploma",
    navLabel: "Diploma",
    title: "Preparar e iniciar el trámite de diploma",
    eyebrow: "Etapa 5",
    intro:
      "Este es el momento de ser metódico: verificá los bloqueos previos, prepará todos los documentos y recién entonces iniciá una única Solicitud de Expedición de Diploma por TAD.",
    stageKeys: ["diploma"],
    claimIds: [
      "DIP-01",
      "DIP-02",
      "DIP-03",
      "DIP-04",
      "DIP-05",
      "DIP-06",
      "DIP-07",
      "DIP-08",
      "DIP-09",
      "DIP-10",
    ],
    checklist: [
      {
        id: "academic-complete",
        kind: "status",
        label: "La carrera está académicamente completa.",
        claimId: "DIP-01",
      },
      {
        id: "resolutions-complete",
        kind: "status",
        label: "Las regularizaciones que correspondían tienen resolución numerada.",
        claimId: "DIP-02",
      },
      {
        id: "secondary-legalized",
        kind: "verification",
        label: "Tengo el título secundario efectivamente legalizado por UBA.",
        claimId: "DIP-05",
      },
      {
        id: "dni",
        kind: "preparation",
        label: "Preparé DNI frente y dorso, en color y PDF.",
        claimId: "DIP-04",
      },
      {
        id: "rc14",
        kind: "preparation",
        label: "Completé el RC14 vigente.",
        claimId: "DIP-06",
      },
      {
        id: "payment",
        kind: "preparation",
        label: "Tengo el comprobante emitido por el Portal de Pagos.",
        claimId: "DIP-07",
      },
      {
        id: "pdf-quality",
        kind: "verification",
        label: "Revisé tamaño, legibilidad, color e integridad de los PDFs.",
        claimId: "DIP-08",
      },
    ],
    sections: [
      {
        title: "Antes de abrir TAD",
        paragraphs: [
          "La solicitud de diploma viene después de dos cierres: el académico y el administrativo. Si todavía falta una materia, tesis o una resolución pertinente, no avances.",
          "La legalización del título secundario también es un bloqueo real: el requisito es tener la legalización concluida, no sólo un número provisorio de trámite.",
        ],
        claimIds: ["DIP-01", "DIP-02", "DIP-05"],
      },
      {
        title: "Preparar la documentación",
        paragraphs: [
          "Los datos personales tienen que coincidir con el DNI. Prepará la copia de DNI, el RC14 vigente, el título secundario legalizado y el comprobante correcto del Portal de Pagos.",
          "Antes de confirmar, revisá también los requisitos de tamaño y calidad de cada PDF.",
        ],
        claimIds: ["DIP-03", "DIP-04", "DIP-06", "DIP-07", "DIP-08"],
        actions: [
          { label: "Descargar RC14 ↗", targetId: "rc14" },
          { label: "Abrir Portal de Pagos ↗", targetId: "portal_pagos" },
          { label: "Abrir TAD ↗", targetId: "tad" },
        ],
      },
      {
        title: "Después de iniciar",
        paragraphs: [
          "Evitá duplicar el trámite. Si hay un rechazo, primero revisá el informe que explica la causa y seguí el circuito indicado.",
          "Para planificar, usá aproximadamente 8 meses como referencia práctica del proceso completo de diploma. Puede ser más corto o más largo: no es un plazo garantizado.",
        ],
        claimIds: ["DIP-09", "DIP-10"],
      },
    ],
    nextSlug: "seguimiento",
  },

  seguimiento: {
    slug: "seguimiento",
    navLabel: "Seguimiento",
    title: "Seguir el título entre TAD y SIET",
    eyebrow: "Etapa 6",
    intro:
      "TAD y SIET muestran partes distintas del recorrido. Primero seguí el expediente y cualquier pedido de corrección en TAD; cuando el trámite ingrese al circuito de títulos de UBA, SIET pasa a ser otra referencia central.",
    stageKeys: ["seguimiento", "siet"],
    claimIds: [
      "TRK-01",
      "TRK-02",
      "TRK-03",
      "TRK-04",
      "TRK-05",
      "TRK-06",
      "POST-01",
      "POST-02",
    ],
    checklist: [
      {
        id: "tad-followup",
        kind: "verification",
        label: "Reviso el expediente y los informes incorporados en TAD.",
        claimId: "TRK-01",
      },
      {
        id: "subsanacion",
        kind: "verification",
        label: "Si aparece SUBSANACIÓN, reviso “Expedientes → Mis tareas” sin demora.",
        claimId: "TRK-03",
      },
      {
        id: "siet",
        kind: "status",
        label: "Cuando corresponde, verifiqué si el trámite ya aparece en SIET.",
        claimId: "TRK-06",
      },
      {
        id: "siet-actions",
        kind: "verification",
        label: "Completé las confirmaciones que SIET me solicita.",
        claimId: "POST-02",
      },
    ],
    sections: [
      {
        title: "Mientras está en TAD",
        paragraphs: [
          "No mires sólo el nombre general del expediente: revisá también sus informes y tareas. El estado te indica si podés esperar o si tenés que intervenir.",
        ],
        claimIds: ["TRK-01", "TRK-02"],
        actions: [{ label: "Abrir TAD ↗", targetId: "tad" }],
      },
      {
        title: "Si aparece SUBSANACIÓN",
        paragraphs: [
          "SUBSANACIÓN significa que hay algo que corregir. La página de FCEN informa una ventana de cinco días antes de que el expediente pase a Guarda Temporal, por eso el portal lo trata como una situación urgente.",
        ],
        claimIds: ["TRK-03", "TRK-04"],
      },
      {
        title: "Si aparece GUARDA TEMPORAL",
        paragraphs: [
          "Ese estado implica rechazo del trámite. Leé el informe para entender la causa y volvé a iniciar el expediente cumpliendo los requisitos señalados.",
        ],
        claimIds: ["TRK-05"],
      },
      {
        title: "Cuando aparece en SIET",
        paragraphs: [
          "SIET permite consultar con CUIG o, si todavía no lo conocés, mediante datos de documento y fecha de nacimiento.",
          "En un estado suficientemente avanzado, UBA contempla la posibilidad de pedir una constancia de título en trámite. No alcanza con haber iniciado TAD: se deben cumplir las condiciones específicas definidas por Títulos y Planes.",
        ],
        claimIds: ["TRK-06", "POST-01", "POST-02"],
        actions: [
          { label: "Abrir SIET ↗", targetId: "siet" },
          {
            label: "Ver información de Títulos y Planes ↗",
            sourceId: "UBA_DIPLOMAS",
          },
        ],
      },
    ],
    nextSlug: "jura-y-entrega",
  },

  "jura-y-entrega": {
    slug: "jura-y-entrega",
    navLabel: "Entrega",
    title: "Recibir el diploma y cerrar el recorrido",
    eyebrow: "Etapa 7",
    intro:
      "Cuando el diploma ya está terminado, todavía queda una última condición práctica: que figure en la lista de diplomas en condiciones de ser entregados.",
    stageKeys: ["jura", "post_egreso"],
    claimIds: ["JUR-01", "JUR-02", "POST-03"],
    checklist: [
      {
        id: "delivery-list",
        kind: "verification",
        label: "Mi diploma figura en la lista de diplomas en condiciones de ser entregados.",
        claimId: "JUR-01",
      },
      {
        id: "jura-mode",
        kind: "preparation",
        label: "Consulté la modalidad y fecha de jura vigente.",
        claimId: "JUR-02",
      },
      {
        id: "delivered",
        kind: "status",
        label: "Recibí el diploma.",
      },
    ],
    sections: [
      {
        title: "Primero: verificar que esté habilitado para entrega",
        paragraphs: [
          "Que el diploma figure como terminado en el circuito no reemplaza la lista de entrega de FCEN. Para inscribirte a una jura, debe aparecer en la lista de diplomas en condiciones de ser entregados.",
        ],
        claimIds: ["JUR-01"],
        actions: [{ label: "Ver página de juras ↗", sourceId: "FCEN_JURAS" }],
      },
      {
        title: "Elegir modalidad",
        paragraphs: [
          "FCEN publica modalidades de jura pública y privada. Fechas, cupos y condiciones son información volátil: consultá siempre la página vigente al momento de inscribirte.",
        ],
        claimIds: ["JUR-02"],
      },
      {
        title: "Después de la entrega",
        paragraphs: [
          "Una vez expedido el diploma, UBA también contempla la solicitud de certificado de egresado/a. A partir de acá, el portal deja de guiar un trámite pendiente y funciona sólo como puente hacia recursos de graduados.",
        ],
        claimIds: ["POST-03"],
        actions: [
          {
            label: "Ver información de Títulos y Planes ↗",
            sourceId: "UBA_DIPLOMAS",
          },
        ],
      },
    ],
  },
};

export const PROBLEM_PAGES: Record<string, ProblemPage> = {
  "notas-en-siu": {
    slug: "notas-en-siu",
    title: "Falta una nota en SIU",
    intro:
      "Si una aprobación todavía no figura correctamente, no des por cerrado el tramo académico.",
    stageSlug: "cierre-academico",
    claimIds: ["DIP-01"],
    steps: [
      "Identificá qué materia o tesis todavía no aparece como aprobada.",
      "No inicies el diploma mientras el cierre académico siga incompleto.",
      "Cuando el registro esté corregido, volvé al orientador para verificar si además necesitás regularizar materias del plan.",
    ],
  },
  "secundario-sin-legalizar": {
    slug: "secundario-sin-legalizar",
    title: "No tengo el secundario legalizado",
    intro:
      "La legalización UBA del título secundario es un bloqueo previo al inicio seguro del diploma.",
    stageSlug: "diploma",
    claimIds: ["DIP-05"],
    steps: [
      "Verificá si la legalización está efectivamente concluida.",
      "No confundas un número provisorio de trámite con el requisito terminado.",
      "Completá la legalización antes de iniciar la Solicitud de Expedición de Diploma.",
    ],
    actions: [
      { label: "Ver requisitos de diploma en FCEN ↗", sourceId: "FCEN_DIPLOMAS" },
    ],
  },
  "tutor-pendiente": {
    slug: "tutor-pendiente",
    title: "Mi tutor/a sigue pendiente",
    intro:
      "La tutoría necesita aprobación de la Comisión antes de que el PEI pueda ser tratado.",
    stageSlug: "tutor-y-pei",
    claimIds: ["TUT-04", "TUT-05", "PEI-02"],
    steps: [
      "Confirmá que la solicitud y la validación por correo se hayan completado.",
      "Tené en cuenta la referencia publicada de 1–2 meses.",
      "No cuentes con que el PEI pueda aprobarse en paralelo con una tutoría todavía pendiente.",
    ],
    actions: [{ label: "Escribir a Tutorías LCD ↗", targetId: "tutorias_email" }],
  },
  "pei-pendiente": {
    slug: "pei-pendiente",
    title: "Mi PEI sigue pendiente",
    intro:
      "El PEI tiene su propio tratamiento y no se aprueba en la misma reunión que la tutoría.",
    stageSlug: "tutor-y-pei",
    claimIds: ["PEI-03", "PEI-04"],
    steps: [
      "Confirmá que la tutoría ya estuviera aprobada antes de la presentación.",
      "Usá 2–3 meses como referencia publicada para planificar.",
      "Esperá confirmación de aprobación antes de tratar el PEI como cerrado.",
    ],
  },
  equivalencias: {
    slug: "equivalencias",
    title: "Tengo inclusiones, puntajes o equivalencias pendientes",
    intro:
      "Estos trámites pueden convertirse en el bloqueo administrativo que aparece entre terminar la carrera y pedir el diploma.",
    stageSlug: "regularizacion",
    claimIds: ["INC-04", "INC-05"],
    steps: [
      "Identificá qué tipo de regularización necesita tu plan.",
      "Seguí el circuito correspondiente al origen de las materias.",
      "No des por cerrado el trámite hasta tener la resolución numerada.",
      "Como planificación práctica, reservá alrededor de tres meses sin tratarlo como garantía.",
    ],
    actions: [
      { label: "Ver trámites administrativos de FCEN ↗", sourceId: "FCEN_ADMIN" },
    ],
  },
  subsanacion: {
    slug: "subsanacion",
    title: "TAD dice SUBSANACIÓN",
    intro:
      "Es un estado accionable y con una ventana breve: revisalo cuanto antes.",
    stageSlug: "seguimiento",
    claimIds: ["TRK-03", "TRK-04"],
    steps: [
      "Entrá a TAD.",
      "Abrí “Expedientes → Mis tareas”.",
      "Leé qué documentación o dato necesita corrección.",
      "Respondé dentro de la ventana disponible; FCEN publica cinco días antes del pase a Guarda Temporal.",
    ],
    actions: [{ label: "Abrir TAD ↗", targetId: "tad" }],
    note: "No lo dejes para después: el portal trata SUBSANACIÓN como una alerta urgente.",
  },
  "guarda-temporal": {
    slug: "guarda-temporal",
    title: "TAD dice GUARDA TEMPORAL",
    intro:
      "El trámite fue rechazado y necesita una nueva presentación después de entender la causa.",
    stageSlug: "seguimiento",
    claimIds: ["TRK-05", "DIP-09"],
    steps: [
      "Abrí el expediente y leé el informe que explica el rechazo.",
      "Corregí la causa antes de volver a presentar.",
      "Reiniciá el trámite según la indicación oficial.",
      "No abras expedientes duplicados sin entender qué falló en el anterior.",
    ],
    actions: [{ label: "Abrir TAD ↗", targetId: "tad" }],
  },
  "no-aparece-siet": {
    slug: "no-aparece-siet",
    title: "Mi trámite todavía no aparece en SIET",
    intro:
      "SIET corresponde a una etapa posterior del circuito. Mientras no aparezca allí, el seguimiento principal sigue siendo TAD.",
    stageSlug: "seguimiento",
    claimIds: ["TRK-01", "TRK-06"],
    steps: [
      "Revisá el expediente y los informes en TAD.",
      "Volvé a consultar SIET más adelante.",
      "Cuando esté disponible, podés entrar con CUIG o usar la búsqueda por documento y fecha de nacimiento.",
    ],
    actions: [
      { label: "Abrir TAD ↗", targetId: "tad" },
      { label: "Abrir SIET ↗", targetId: "siet" },
    ],
  },
  "constancia-titulo-en-tramite": {
    slug: "constancia-titulo-en-tramite",
    title: "Necesito acreditar que el título está en trámite",
    intro:
      "UBA contempla una constancia específica, pero sólo cuando el expediente alcanzó el estadio requerido en Títulos y Planes.",
    stageSlug: "seguimiento",
    claimIds: ["POST-01", "POST-02"],
    steps: [
      "Confirmá que el expediente ya haya llegado a la Dirección General de Títulos y Planes.",
      "Verificá que haya pasado sus controles.",
      "Completá las confirmaciones requeridas en SIET.",
      "Recién entonces evaluá la solicitud de la constancia según la información vigente.",
    ],
    actions: [
      {
        label: "Ver información de Títulos y Planes ↗",
        sourceId: "UBA_DIPLOMAS",
      },
    ],
  },
  diploma: {
    slug: "diploma",
    title: "No puedo iniciar el diploma",
    intro:
      "La mayoría de los bloqueos están antes del botón de TAD: cierre académico, resoluciones o documentación.",
    stageSlug: "diploma",
    claimIds: ["DIP-01", "DIP-02", "DIP-05", "DIP-06", "DIP-07", "DIP-08"],
    steps: [
      "Confirmá que materias y tesis estén aprobadas.",
      "Confirmá que las regularizaciones pertinentes tengan resolución numerada.",
      "Verificá la legalización del título secundario.",
      "Prepará RC14, DNI y comprobante correcto del Portal de Pagos.",
      "Revisá los PDFs antes de confirmar el trámite.",
    ],
  },
  "diploma-listo": {
    slug: "diploma-listo",
    title: "Mi diploma está terminado: ¿cómo lo recibo?",
    intro:
      "El paso práctico siguiente es verificar si ya está en condiciones de ser entregado por FCEN.",
    stageSlug: "jura-y-entrega",
    claimIds: ["JUR-01", "JUR-02"],
    steps: [
      "Buscá tu diploma en la lista de diplomas en condiciones de ser entregados.",
      "Si figura, revisá las modalidades de jura disponibles.",
      "Consultá la página vigente antes de elegir fecha o modalidad, porque esa información cambia.",
    ],
    actions: [{ label: "Ver página de juras ↗", sourceId: "FCEN_JURAS" }],
  },
};

export const RESOLVER_STAGE_TO_SLUG: Record<string, string> = {
  tutor: "tutor-y-pei",
  pei: "tutor-y-pei",
  tesis: "tesis",
  cierre_academico: "cierre-academico",
  regularizacion: "regularizacion",
  diploma: "diploma",
  seguimiento: "seguimiento",
  siet: "seguimiento",
  jura: "jura-y-entrega",
  post_egreso: "jura-y-entrega",
};

export function getStagePage(slug: string) {
  return STAGE_PAGES[slug];
}

export function getProblemPage(slug: string) {
  return PROBLEM_PAGES[slug];
}

export function getChecklistForResolverStage(stage: string) {
  const slug = RESOLVER_STAGE_TO_SLUG[stage];
  return slug ? STAGE_PAGES[slug]?.checklist ?? [] : [];
}
