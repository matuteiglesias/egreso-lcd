# Feedback por email — setup

## Decisión

V1 usa un `POST /api/feedback` propio en Next.js y envía el mensaje con la API HTTP de Resend.

Se eligió esta opción porque mantiene el formulario y la validación dentro del portal, no agrega base de datos ni dashboard de comentarios, no expone destinatarios o claves al navegador y no requiere una dependencia npm adicional: el Route Handler usa `fetch` del runtime de Node.

Alternativas consideradas:

- **Formspree**: muy rápido de integrar y con antispam incorporado, pero introduce un backend/dashboard de submissions que no necesitamos para una prueba de 30–50 comentarios.
- **SMTP/Nodemailer (por ejemplo Gmail)**: viable, pero agrega una dependencia y acopla el portal a credenciales de una casilla personal/app password; es más frágil operativamente que una API transaccional.
- **Resend + Route Handler (elegida)**: una única API key server-side, envío transaccional simple y suficiente margen en el plan gratuito para esta prueba.

## Variables de entorno

Configurar en Vercel → Project → Settings → Environment Variables:

```text
RESEND_API_KEY=re_...
FEEDBACK_TO_EMAIL=casilla-que-recibe-los-comentarios@example.com
FEEDBACK_FROM_EMAIL=Egreso LCD <feedback@subdominio-verificado.example.com>
```

Aplicarlas a `Production` y, si se quiere probar el PR/preview con entrega real, también a `Preview`.

Después de guardar las variables, hacer un redeploy para que el deployment las tome.

Para desarrollo local, usar las mismas claves en `.env.local` (el repo ya ignora `.env*`).

## Cuenta Resend

1. Crear una cuenta en Resend y una API key con permiso de envío.
2. Para producción, verificar un dominio o subdominio propio y usarlo en `FEEDBACK_FROM_EMAIL`.
3. Para una prueba inicial únicamente, `onboarding@resend.dev` puede enviar al email asociado a la cuenta Resend; no sirve para enviar a otros destinatarios sin verificar dominio.

El portal no guarda comentarios. Resend procesa el email como proveedor de entrega y puede conservar metadata/logs según su servicio.

## Protección antispam proporcional

- campo honeypot fuera de la interfaz;
- límites server-side de longitud y formato;
- límite de tamaño del body del endpoint;
- el destinatario y la API key viven sólo en variables server-side.

No se agregó CAPTCHA, Redis ni rate limiting distribuido porque sería infraestructura desproporcionada para el volumen esperado. Si la prueba pública atrae spam real, ése sería el trigger para agregar una capa adicional.
