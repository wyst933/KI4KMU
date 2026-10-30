/* Gemeinsames Skript: Menü, aktive Seite, Scroll-Reveal. Ohne JS bleibt alles sichtbar und bedienbar. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
    var here = (location.pathname.split('/').pop() || 'index.html');
    nav.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('#') === -1 && href.split('/').pop() === here) a.setAttribute('aria-current', 'page');
    });
  }

  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  var show = function (el) { el.classList.add('in'); setTimeout(function () { el.classList.remove('reveal'); }, 800); };
  if (!('IntersectionObserver' in window)) { items.forEach(show); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  items.forEach(function (el) { io.observe(el); });
  setTimeout(function () { items.forEach(show); }, 4000);
})();
