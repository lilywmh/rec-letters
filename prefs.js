// Light/dark and text size, remembered in this browser.
// Loaded in <head> so the saved choice applies before the page paints.
(function () {
  var root = document.documentElement;
  var SIZES = ['m', 'l', 'xl'];
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function sysDark() { return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches; }
  function isDark() { var t = get('rl-theme'); return t ? t === 'dark' : sysDark(); }
  function apply() {
    var t = get('rl-theme');
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t); else root.removeAttribute('data-theme');
    var z = get('rl-size'); root.setAttribute('data-size', SIZES.indexOf(z) >= 0 ? z : 'm');
  }
  apply();

  var SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  window.RLPrefs = {
    controls: function () {
      return '<div class="tools">' +
        '<button class="tool" id="t-smaller" aria-label="Smaller text" title="Smaller text">A−</button>' +
        '<button class="tool" id="t-bigger" aria-label="Larger text" title="Larger text">A+</button>' +
        '<button class="tool" id="t-theme"></button>' +
      '</div>';
    },
    wire: function () {
      var th = document.getElementById('t-theme'), sm = document.getElementById('t-smaller'), bg = document.getElementById('t-bigger');
      if (!th) return;
      function paint() {
        var d = isDark();
        th.innerHTML = d ? SUN : MOON;
        th.setAttribute('aria-label', d ? 'Switch to light mode' : 'Switch to dark mode');
        th.title = d ? 'Light mode' : 'Dark mode';
        var i = SIZES.indexOf(root.getAttribute('data-size'));
        sm.disabled = i <= 0; bg.disabled = i >= SIZES.length - 1;
      }
      th.onclick = function () { set('rl-theme', isDark() ? 'light' : 'dark'); apply(); paint(); };
      function step(n) { var i = SIZES.indexOf(root.getAttribute('data-size')) + n; i = Math.max(0, Math.min(SIZES.length - 1, i)); set('rl-size', SIZES[i]); apply(); paint(); }
      sm.onclick = function () { step(-1); };
      bg.onclick = function () { step(1); };
      paint();
    }
  };
})();
