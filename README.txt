ROMA CLÍNICA DENTAL — Landing page institucional

Contenido
- index.html: landing responsive (mobile first), con navegación, servicios en carrusel, equipo, formulario que deriva a WhatsApp, datos de contacto, horarios, mapa y firma de Tereré Estudio.
- privacidad.html: política de privacidad (Ley 25.326). Tiene campos [COMPLETAR].
- 404.html: página de error personalizada.
- assets/styles.css y assets/main.js: estilos y script, en archivos separados para cumplir la CSP.
- assets/logo-roma.png, assets/endodoncia-visual.png, assets/team-*.webp, assets/firma-terereestudio.webp: imágenes.
- robots.txt, .well-known/security.txt: contacto de seguridad (pendiente de completar).
- _headers y _redirects (Netlify): cabeceras de seguridad y redirecciones.
- gracias/index.html: página a la que va el formulario sin JavaScript.
- fonts/: tipografías DM Sans y Playfair Display, alojadas en el sitio (licencia OFL, incluida).

Cómo probar
1. Descomprimí la carpeta o abrí el repositorio.
2. Abrí index.html en un navegador moderno.
3. Para probar el formulario, los enlaces de WhatsApp y el mapa, el dispositivo debe tener conexión a internet.
Nota: las cabeceras de seguridad se aplican cuando el sitio está publicado en Netlify (archivo _headers).

Antes de publicar
- Confirmar que el número de WhatsApp +54 9 379 463-3850 abre la cuenta correcta (confirmado por la clínica).
- Confirmar que la clínica desea usar estas representaciones ilustradas en la sección del equipo o reemplazarlas por retratos profesionales.
- Revisar la lista definitiva de tratamientos.
- Reemplazar las URLs de imagen y los metadatos por el dominio real (ver Pendientes).
- Completar los datos legales de privacidad.html.

SEO inicial
- Title y meta description orientados a odontología en Corrientes Capital.
- JSON-LD de tipo Dentist con dirección, coordenadas y horarios.
- Secciones semánticas, encabezados y enlaces de navegación.

=====================================================================
SEGURIDAD (protocolo de seguridad para landings de Tereré Estudio)
=====================================================================

Hosting: Netlify. Sin Cloudflare delante (solo DNS, si el dominio lo usa).

1. Medidas integradas en el código
- Sin scripts ni estilos inline. JS y CSS en archivos propios: la CSP es estricta (sin unsafe-inline).
- CSP en _headers y, como respaldo, en <meta> de cada página. Permite solo: fuentes propias, mapa de Google al hacer clic, y envíos al propio sitio.
- Cabeceras: HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options DENY, Cross-Origin-Opener-Policy same-origin.
- Fuentes alojadas en el sitio (fonts/): ninguna conexión a Google al cargar la página.
- Mapa en fachada: no carga nada de Google hasta que la persona hace clic en "Ver mapa interactivo".
- Formulario con Netlify Forms: campo honeypot (bot-field y website) oculto, trampa de tiempo de 3 segundos, bloqueo de doble envío, largos máximos y limpieza de caracteres de control. Los datos se envían por POST al propio sitio; luego se abre WhatsApp como antes.
- Sin innerHTML, eval ni document.write. Enlaces externos con rel="noopener noreferrer".
- Consentimiento obligatorio (no premarcado) con enlace a la política de privacidad.
- Sin metadatos EXIF en las imágenes. Sin claves ni datos sensibles en el front.

2. Configuración del servidor (listo para pegar)
- Netlify: _headers y _redirects en la raíz del sitio publicado.
- Netlify Forms: en el panel, Forms → turnos → Form notifications, para recibir un email por cada solicitud.

3. Pendientes [COMPLETAR]
- Aprobar el texto de privacidad.html (ver abajo). Hasta entonces no publicar.
- Dominio definitivo: og:image, JSON-LD y el contacto de security.txt.
- Email de seguridad del estudio: .well-known/security.txt.
- Datos del responsable en privacidad.html: razón social o titular, CUIT, correo de contacto, plazo de conservación, fecha de última actualización.
- Revisión de un profesional legal antes de publicar la política.
- Notificaciones de Netlify Forms (paso 2).
- Correo del dominio: SPF, DKIM y DMARC. Bloqueo de transferencia del dominio y 2FA en registrador, hosting y correo.

4. Riesgos residuales (en lenguaje simple)
- Los datos del formulario quedan guardados en Netlify Forms, además del mensaje que se envía por WhatsApp. Eso debe reflejarse en la política (ver abajo).
- El formulario no tiene captcha: Netlify Forms filtra spam del lado servidor, pero si llega spam, se puede activar reCAPTCHA de Netlify (cambia la CSP y agrega un widget visible).
- El mapa, al cargarse, tiene su propia política de Google. Sin sandbox, porque Google Maps necesita scripts para funcionar.
- Las fuentes están en formato WOFF (no WOFF2). Funcionan en todos los navegadores; WOFF2 pesa algo menos.
- Ninguna web es 100 % invulnerable. El objetivo es eliminar los vectores comunes y dejar al cliente con buenas prácticas para mantener el sitio.

5. Propuesta de texto para privacidad.html (requiere aprobación; hoy no se cambió)
- Sección 4, reemplazar el primer párrafo por: "Los datos del formulario se guardan en Netlify Forms, el servicio que aloja este sitio, y los usamos solo para coordinar tu turno. Al tocar 'Continuar por WhatsApp' también se abre una conversación con el mensaje armado, que vos decidís enviar. A partir de ahí, la clínica los trata para coordinar tu turno, y WhatsApp los procesa según sus propias políticas."
- Sección 5, reemplazar la primera frase sobre tipografías y mapa por: "Las tipografías están alojadas en este mismo sitio. El mapa se carga desde Google Maps solo si hacés clic en 'Ver mapa interactivo', y en ese caso Google puede registrar datos técnicos, como tu dirección IP, según sus propias políticas."
