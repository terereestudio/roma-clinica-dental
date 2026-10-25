"use strict";
    (function () {
      const menuToggle = document.getElementById('menuToggle');
      const navLinks = document.getElementById('navLinks');
      const bookingForm = document.getElementById('bookingForm');
      const year = document.getElementById('year');
      const phone = '5493794633850';
      const NS = 'http://www.w3.org/2000/svg';
      const setMenuIcon = function (id) {
        while (menuToggle.firstChild) { menuToggle.removeChild(menuToggle.firstChild); }
        const svg = document.createElementNS(NS, 'svg');
        const use = document.createElementNS(NS, 'use');
        use.setAttribute('href', id);
        svg.appendChild(use);
        menuToggle.appendChild(svg);
      };
      if (year) year.textContent = new Date().getFullYear();

      menuToggle.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        setMenuIcon(isOpen ? '#i-x' : '#i-menu');
      });
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Abrir menú');
          setMenuIcon('#i-menu');
        });
      });

      document.querySelectorAll('.service-cta').forEach(function (link) {
        link.addEventListener('click', function (event) {
          const service = link.getAttribute('data-service');
          if (!service) return;
          event.preventDefault();
          const message = 'Hola, ROMA Clínica Dental. Quisiera consultar por: ' + service + '. ¿Me podrían informar sobre disponibilidad de turnos?';
          window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
        });
      });


      const track = document.getElementById('serviceTrack');
      const prevBtn = document.getElementById('servicePrev');
      const nextBtn = document.getElementById('serviceNext');
      const dotsBox = document.getElementById('serviceDots');
      if (track) {
        const cards = Array.prototype.slice.call(track.children);
        const stepOf = function () { return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth; };
        const current = function () {
          const step = stepOf();
          return Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / step)));
        };
        const dots = cards.map(function (_, i) {
          const b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('aria-label', 'Ir al servicio ' + (i + 1));
          b.addEventListener('click', function () { track.scrollTo({ left: i * stepOf(), behavior: 'smooth' }); });
          dotsBox.appendChild(b);
          return b;
        });
        const update = function () {
          const max = track.scrollWidth - track.clientWidth - 2;
          const idx = track.scrollLeft >= max ? cards.length - 1 : current();
          dots.forEach(function (d, i) { d.setAttribute('aria-current', i === idx ? 'true' : 'false'); });
          prevBtn.disabled = track.scrollLeft <= 2;
          nextBtn.disabled = track.scrollLeft >= max;
        };
        prevBtn.addEventListener('click', function () { track.scrollBy({ left: -stepOf(), behavior: 'smooth' }); });
        nextBtn.addEventListener('click', function () { track.scrollBy({ left: stepOf(), behavior: 'smooth' }); });
        track.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
      }


      const orbit = document.getElementById('orbit');
      if (orbit) {
        const cards = Array.prototype.slice.call(orbit.querySelectorAll('.orbit-card'));
        const N = cards.length;
        const tilt = -18 * Math.PI / 180;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let cur = 0, target = 0, last = performance.now();
        const layout = function () {
          const w = orbit.clientWidth, h = orbit.clientHeight;
          const rx = w * 0.46, ry = h * 0.34;
          cards.forEach(function (c, i) {
            const th = cur + i * 2 * Math.PI / N;
            const x = rx * Math.cos(th), y = ry * Math.sin(th);
            const xr = x * Math.cos(tilt) - y * Math.sin(tilt);
            const yr = x * Math.sin(tilt) + y * Math.cos(tilt);
            const depth = (Math.sin(th) + 1) / 2;
            c.style.transform = 'translate(-50%,-50%) translate(' + xr.toFixed(1) + 'px,' + yr.toFixed(1) + 'px) scale(' + (0.8 + 0.2 * depth).toFixed(3) + ')';
            c.style.opacity = (0.55 + 0.45 * depth).toFixed(2);
            c.style.zIndex = depth > 0.5 ? 6 : 1;
          });
        };
        const frame = function (now) {
          if (now - last >= 2000) { last = now; target += 2 * Math.PI / N; }
          cur += (target - cur) * 0.06;
          layout();
          requestAnimationFrame(frame);
        };
        layout();
        if (!reduce) requestAnimationFrame(frame);
        window.addEventListener('resize', layout);
      }
      const MAP_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d631.6537920131134!2d-58.841967421455124!3d-27.475615488781088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456d007e5dff0b%3A0x5cabf2716c022820!2sRoma%20Cl%C3%ADnica%20Dental!5e1!3m2!1ses!2sar!4v1792773004165!5m2!1ses!2sar';
      const mapCard = document.getElementById('mapCard');
      const mapLoad = document.getElementById('mapLoad');
      if (mapCard && mapLoad) {
        mapLoad.addEventListener('click', function () {
          const frame = document.createElement('iframe');
          frame.title = 'Ubicación de ROMA Clínica Dental, Corrientes Capital';
          frame.setAttribute('loading', 'lazy');
          frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
          frame.setAttribute('allowfullscreen', '');
          frame.src = MAP_SRC;
          mapCard.replaceChildren(frame);
        });
      }
      const GENERIC_ERROR = 'No pudimos procesar tu consulta. Probá de nuevo o escribinos directamente por WhatsApp.';
      const loadedAt = Date.now();
      const statusBox = document.getElementById('formStatus');
      const submitBtn = bookingForm.querySelector('.form-submit');
      const clean = function (value, max) {
        return String(value || '').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
      };
      bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (statusBox) statusBox.textContent = '';
        if (!bookingForm.reportValidity()) return;
        const data = new FormData(bookingForm);
        const honeypot = String(data.get('website') || '').trim();
        const elapsed = Date.now() - loadedAt;
        const name = clean(data.get('patientName'), 80);
        const service = clean(data.get('service'), 80);
        const preferredDay = clean(data.get('preferredDay'), 40);
        const contactPreference = clean(data.get('contactPreference'), 60);
        const details = clean(data.get('details'), 500);
        // Honeypot y trampa de tiempo: descartan envíos automáticos sin revelar el motivo.
        if (honeypot || elapsed < 3000 || !name || !service) {
          if (statusBox) statusBox.textContent = GENERIC_ERROR;
          return;
        }
        const payload = new URLSearchParams({
          'form-name': 'turnos', 'bot-field': '', patientName: name, service: service,
          preferredDay: preferredDay, contactPreference: contactPreference, details: details, consent: 'si'
        });
        fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: payload.toString() }).catch(function () {});
        submitBtn.disabled = true;
        setTimeout(function () { submitBtn.disabled = false; }, 3000);
        let message = 'Hola, ROMA Clínica Dental. Quisiera consultar por un turno.\n\n';
        message += 'Nombre: ' + name + '\n';
        message += 'Servicio: ' + service + '\n';
        if (preferredDay) message += 'Horario preferido: ' + preferredDay + '\n';
        if (contactPreference && contactPreference !== 'No lo indiqué') message += 'Primera consulta: ' + contactPreference + '\n';
        if (details) message += 'Comentario: ' + details + '\n';
        message += '\n¿Me podrían informar la disponibilidad?';
        window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
      });
    })();
