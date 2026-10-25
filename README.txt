ROMA CLÍNICA DENTAL — Landing page institucional

Contenido
- index.html: landing responsive (mobile first), con navegación, servicios en carrusel, equipo, formulario que deriva a WhatsApp, datos de contacto, horarios, mapa y firma de Tereré Estudio.
- privacidad.html: política de privacidad (Ley 25.326). Tiene campos [COMPLETAR].
- 404.html: página de error personalizada.
- assets/styles.css y assets/main.js: estilos y script, en archivos separados para cumplir la CSP.
- assets/logo-roma.png, assets/endodoncia-visual.png, assets/team-*.webp, assets/firma-terereestudio.webp: imágenes.
- robots.txt, .well-known/security.txt: contacto de seguridad (pendiente de completar).
- .htaccess (Apache) y _headers (Netlify / Cloudflare Pages): cabeceras de seguridad y configuración del servidor.

Cómo probar
1. Descomprimí la carpeta o abrí el repositorio.
2. Abrí index.html en un navegador moderno.
3. Para probar el formulario, los enlaces de WhatsApp y el mapa, el dispositivo debe tener conexión a internet.
Nota: las cabeceras de seguridad solo se aplican cuando el sitio está publicado en un hosting que use .htaccess o _headers.

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

1. Medidas integradas en el código
- Sin scripts ni estilos inline: todo el JS y CSS está en archivos propios, para poder usar una CSP estricta sin "unsafe-inline" en script-src.
- CSP en cabecera (_headers / .htaccess) y, como respaldo, en <meta> dentro de cada página. Permite solo lo necesario: fuentes de Google Fonts y el mapa de Google.
- Cabeceras: HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options DENY, Cross-Origin-Opener-Policy same-origin.
- Anti-XSS: sin innerHTML, eval ni document.write. Los datos del formulario se limpian de caracteres de control y se recortan a largo máximo.
- Enlaces con target="_blank" con rel="noopener noreferrer".
- Formulario: campos con maxlength, honeypot (campo oculto que solo llenan los bots), trampa de tiempo (descarta envíos en menos de 3 segundos) y bloqueo de doble envío durante 3 segundos.
- Privacidad: casilla de consentimiento obligatoria, no premarcada, con enlace a la política; sin cookies propias ni analítica; sin emails publicados en texto plano; sin metadatos EXIF en las imágenes.
- Sin claves, tokens ni credenciales en el front.

2. Configuración del servidor (listo para pegar)
- Netlify, Cloudflare Pages: usar _headers (ya incluido en la raíz).
- Apache / hosting compartido: usar .htaccess (ya incluido en la raíz). Redirige HTTP a HTTPS, bloquea archivos ocultos y .zip/.psd/.md, y desactiva el listado de directorios.
- Si el hosting es otro (Vercel, Nginx), avisar para generar la configuración equivalente.

3. Tareas pendientes (cliente o hosting) — [COMPLETAR]
- Dominio real: og:image, JSON-LD (image) y el contacto de security.txt. Hoy son rutas relativas.
- privacidad.html: razón social o titular, CUIT, correo o WhatsApp de contacto, plazo de conservación y fecha de última actualización.
- Revisión de un profesional legal antes de publicar la política de privacidad.
- Confirmar el hosting (Apache o Netlify / Cloudflare Pages) para dejar activa la configuración correcta.
- Cloudflare delante del sitio: proxy, WAF, Bot Fight Mode y HTTPS automático.
- Correo del dominio: SPF, DKIM y DMARC (p=quarantine o reject). Bloqueo de transferencia del dominio, 2FA en el registrador, el hosting, Cloudflare y las redes.
- Si el formulario tiene que guardar datos o enviar correos: hace falta un endpoint en servidor con verificación de Cloudflare Turnstile y límite de envíos por IP. Hoy el formulario solo abre WhatsApp y no envía nada a un servidor.
- Verificar después de publicar: securityheaders.com, SSL Labs (ssllabs.com/ssltest), Mozilla Observatory y la consola del navegador sin errores de CSP. Objetivo: nota A o superior.

4. Riesgos residuales (en lenguaje simple)
- El formulario no guarda nada en ningún lado: al enviar, se abre WhatsApp. Por eso no hay captcha todavía: no hay servidor que lo verifique. El honeypot y la trampa de tiempo solo frenan a bots simples.
- Todo lo que está en el navegador es visible para cualquiera, incluido el código del formulario. Esto no compromete datos, porque no hay secretos en el front.
- Google Fonts y el mapa de Google reciben la dirección IP del visitante, según sus propias políticas. La política de privacidad lo menciona.
- El mapa embebido no usa sandbox: Google Maps necesita scripts para funcionar. Si se quiere sandbox, hay que probarlo antes con el mapa visible.
- Las cabeceras dependen del hosting: si el sitio se sirve sin .htaccess ni _headers, solo queda la CSP de respaldo en <meta>, que no incluye frame-ancestors ni HSTS.
- Ninguna web es 100 % invulnerable. El objetivo es eliminar los vectores comunes y dejar al cliente con buenas prácticas para mantener el sitio.
