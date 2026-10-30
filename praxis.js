/* «KI in der Praxis»: Seitennavigation, Kopieren, Simulationen, Rechner */
(function () {
  var fmt = function (n) { return Math.round(n).toLocaleString('de-CH'); };
  var $ = function (id) { return document.getElementById(id); };

  /* Scroll-Reveal für Karten (script.js blendet sie ein) */
  document.querySelectorAll('.bc, .rules li, .stages li, .px-sec .card, .gloss div, .diagram-wrap, .sim, .calc > *, .sources li').forEach(function (el) { el.classList.add('reveal'); });

  /* Scrollspy für die Seitennavigation */
  var links = document.querySelectorAll('.sidenav a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('active'); });
        var a = map[en.target.id];
        if (a) {
          a.classList.add('active');
          if (a.scrollIntoView && window.matchMedia('(max-width:1020px)').matches) {
            var bar = a.parentNode; bar.scrollTo({ left: a.offsetLeft - 24, behavior: 'smooth' });
          }
        }
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    Object.keys(map).forEach(function (id) { var s = $(id); if (s) spy.observe(s); });
  }

  /* Prompt kopieren */
  var copyBtn = $('copyPrompt'), pre = $('promptText');
  if (copyBtn && pre) {
    copyBtn.addEventListener('click', function () {
      var done = function () { copyBtn.textContent = 'Kopiert ✓'; setTimeout(function () { copyBtn.textContent = 'Kopieren'; }, 1800); };
      var fallback = function () {
        var r = document.createRange(); r.selectNodeContents(pre);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        copyBtn.textContent = 'Markiert, Strg+C';
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(pre.innerText).then(done, fallback);
      else fallback();
    });
  }

  /* Kontextfenster */
  (function () {
    var WIN = 200000, SYS = 2000, RES = 8000;
    var doc = $('docRange'), hist = $('histRange'), bar = $('ctxBar'), mark = $('ctxMark'), msg = $('ctxMsg');
    if (!doc || !hist || !bar) return;
    function draw() {
      var d = +doc.value, h = +hist.value, used = SYS + d + h + RES, scale = Math.max(WIN, used), over = Math.max(0, used - WIN);
      $('docOut').textContent = fmt(d) + ' Token';
      $('histOut').textContent = fmt(h) + ' Token';
      var segs = [[SYS, 'var(--navy)'], [d, 'var(--color-success)'], [h, '#8A6FD6'], [RES, 'var(--color-accent)']];
      bar.innerHTML = segs.map(function (s) { return '<div style="width:' + (s[0] / scale * 100) + '%;background:' + s[1] + '"></div>'; }).join('');
      mark.style.left = (WIN / scale * 100) + '%';
      if (over > 0) {
        var ov = document.createElement('div');
        ov.style.cssText = 'position:absolute;top:0;bottom:0;right:0;width:' + (over / scale * 100) + '%;background:repeating-linear-gradient(45deg,rgba(226,84,63,.92),rgba(226,84,63,.92) 6px,rgba(226,84,63,.65) 6px,rgba(226,84,63,.65) 12px)';
        bar.appendChild(ov);
        msg.className = 'sim-msg bad';
        msg.textContent = fmt(over) + ' Token passen nicht mehr ins Fenster. Das Modell lehnt ab oder die ältesten Inhalte fallen weg.';
      } else {
        msg.className = 'sim-msg ok';
        msg.textContent = 'Passt: ' + Math.round(used / WIN * 100) + ' % belegt, noch ' + fmt(WIN - used) + ' Token frei (Dokumente und Verlauf ≈ ' + fmt((d + h) * 0.6 / 400) + ' Seiten Text).';
      }
    }
    doc.addEventListener('input', draw); hist.addEventListener('input', draw); draw();
  })();

  /* Wahrscheinlichkeiten */
  (function () {
    var items = [['Bern', 6], ['Zürich', 4.2], ['Genf', 3], ['Basel', 2.5], ['Lausanne', 2], ['Andere', 2.8]];
    var wrap = $('probBars'), tr = $('tRange'), out = $('rollOut');
    if (!wrap || !tr) return;
    var probs = [];
    function calc() {
      var T = +tr.value, ex = items.map(function (i) { return Math.exp(i[1] / T); });
      var sum = ex.reduce(function (a, b) { return a + b; }, 0);
      probs = ex.map(function (e) { return e / sum; });
    }
    function draw() {
      calc();
      $('tOut').textContent = (+tr.value).toFixed(1);
      wrap.innerHTML = items.map(function (it, i) {
        var p = probs[i] * 100;
        return '<div class="prob-row"><span>' + it[0] + '</span><div class="prob-track"><div class="prob-fill" style="width:' + p + '%"></div></div><span class="prob-val">' + p.toFixed(1).replace('.', ',') + ' %</span></div>';
      }).join('');
      out.textContent = '';
    }
    function pick() { var r = Math.random(), c = 0; for (var i = 0; i < probs.length; i++) { c += probs[i]; if (r <= c) return items[i][0]; } return items[0][0]; }
    tr.addEventListener('input', draw);
    $('rollBtn').addEventListener('click', function () {
      var res = []; for (var k = 0; k < 10; k++) res.push(pick());
      out.textContent = 'Gezogen: ' + res.join(' · ');
    });
    draw();
  })();

  /* Wirtschaftlichkeits-Rechner */
  (function () {
    var ids = ['cN', 'cH', 'cR', 'cT', 'cP'];
    if (!ids.every(function (i) { return $(i); })) return;
    function draw() {
      var n = +$('cN').value, h = +$('cH').value, rate = +$('cR').value, tool = +$('cT').value, real = +$('cP').value / 100;
      $('cNo').textContent = n + ' Personen';
      $('cHo').textContent = h.toString().replace('.', ',') + ' Std.';
      $('cRo').textContent = 'CHF ' + rate;
      $('cTo').textContent = 'CHF ' + tool;
      $('cPo').textContent = Math.round(real * 100) + ' %';
      var gain = n * h * 4.33 * rate * real, cost = n * tool, net = gain - cost;
      var big = $('rNet');
      big.textContent = (net < 0 ? '−' : '') + 'CHF ' + fmt(Math.abs(net));
      big.className = 'big' + (net < 0 ? ' neg' : '');
      $('rGain').textContent = 'CHF ' + fmt(gain);
      $('rCost').textContent = 'CHF ' + fmt(cost);
      $('rYear').textContent = (net < 0 ? '−' : '') + 'CHF ' + fmt(Math.abs(net * 12));
      $('rFactor').textContent = cost > 0 ? (gain / cost).toFixed(1).replace('.', ',') + '×' : '–';
    }
    ids.forEach(function (i) { $(i).addEventListener('input', draw); });
    draw();
  })();
})();
