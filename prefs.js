// Theme (system / light / dark) and text size, remembered in this browser.
// Loaded in <head> so the saved choice applies before the page paints.
(function () {
  var root = document.documentElement;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function apply() {
    var t = get('rl-theme'), z = get('rl-size');
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t); else root.removeAttribute('data-theme');
    root.setAttribute('data-size', z === 'l' || z === 'xl' ? z : 'm');
  }
  apply();

  window.RLPrefs = {
    mount: function () {
      var wrap = document.createElement('div');
      wrap.className = 'prefs';
      wrap.innerHTML =
        '<button class="prefs-btn" id="prefs-btn" aria-haspopup="true" aria-expanded="false" aria-label="Display settings">Aa</button>' +
        '<div class="prefs-pop" id="prefs-pop" hidden>' +
          '<div class="prefs-label">Appearance</div>' +
          '<div class="prefs-seg" data-key="rl-theme">' +
            '<button data-v="system">System</button><button data-v="light">Light</button><button data-v="dark">Dark</button>' +
          '</div>' +
          '<div class="prefs-label">Text size</div>' +
          '<div class="prefs-seg" data-key="rl-size">' +
            '<button data-v="m" aria-label="Default text size"><span style="font-size:13px">A</span></button>' +
            '<button data-v="l" aria-label="Larger text"><span style="font-size:16px">A</span></button>' +
            '<button data-v="xl" aria-label="Largest text"><span style="font-size:19px">A</span></button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(wrap);
      var btn = wrap.querySelector('#prefs-btn'), pop = wrap.querySelector('#prefs-pop');
      function mark() {
        wrap.querySelectorAll('.prefs-seg').forEach(function (seg) {
          var k = seg.getAttribute('data-key'), cur = get(k) || (k === 'rl-theme' ? 'system' : 'm');
          seg.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-v') === cur)); });
        });
      }
      mark();
      btn.onclick = function (e) { e.stopPropagation(); pop.hidden = !pop.hidden; btn.setAttribute('aria-expanded', String(!pop.hidden)); };
      pop.onclick = function (e) {
        e.stopPropagation();
        var b = e.target.closest('button[data-v]'); if (!b) return;
        set(b.parentNode.getAttribute('data-key'), b.getAttribute('data-v')); apply(); mark();
      };
      document.addEventListener('click', function () { if (!pop.hidden) { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
    }
  };
})();
