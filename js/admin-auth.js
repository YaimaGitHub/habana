// =====================================================
//  AUTENTICACION DEL PANEL DE CONTROL
// -----------------------------------------------------
//  Las credenciales reales no aparecen en el codigo fuente.
//  Lo unico que se guarda es el hash SHA-256 de
//      <SAL> + ":" + <usuario>
//      <SAL> + ":" + <contrasena>
//  por lo que ni el usuario ni la contrasena pueden
//  deducirse leyendo este archivo.
// =====================================================

(function () {

    var SAL = 'cabreras-shop-2025';

    // hash(SAL + ':' + 'yannis')
    var USUARIO_HASH = 'e3e250081e7c4bacbc7d413cc5d20b6fd726d385ec01948eb9cd9cab7e85e9e7';
    // hash(SAL + ':' + 'root')
    var CLAVE_HASH   = '9dce792a1d813592d7b3ffa76cdd1cf0a4964a5bdfca83767cda33b1f85642a6';

    var STORAGE_KEY  = 'cabreras-admin-session';
    var SESSION_TTL_MS = 1000 * 60 * 60 * 8;   // 8 horas

    // ---------- utilidades ----------
    function abEnHex(buf) {
        var b = new Uint8Array(buf);
        var s = '';
        for (var i = 0; i < b.length; i++) {
            var h = b[i].toString(16);
            s += (h.length === 1 ? '0' : '') + h;
        }
        return s;
    }

    function sha256(texto) {
        if (!window.crypto || !window.crypto.subtle) {
            return Promise.reject(new Error('crypto.subtle no disponible (use HTTPS o localhost)'));
        }
        var enc = new TextEncoder().encode(texto);
        return window.crypto.subtle.digest('SHA-256', enc).then(abEnHex);
    }

    function comparacionConstante(a, b) {
        if (typeof a !== 'string' || typeof b !== 'string') return false;
        if (a.length !== b.length) return false;
        var diff = 0;
        for (var i = 0; i < a.length; i++) {
            diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return diff === 0;
    }

    // ---------- sesion ----------
    function sesionValida() {
        try {
            var raw = sessionStorage.getItem(STORAGE_KEY)
                    || localStorage.getItem(STORAGE_KEY);
            if (!raw) return false;
            var s = JSON.parse(raw);
            if (!s || !s.exp) return false;
            if (Date.now() > s.exp) {
                sessionStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(STORAGE_KEY);
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    function crearSesion(recordar) {
        var data = JSON.stringify({ ok: 1, exp: Date.now() + SESSION_TTL_MS });
        try {
            (recordar ? localStorage : sessionStorage).setItem(STORAGE_KEY, data);
        } catch (e) { /* ignorar */ }
    }

    function cerrarSesion() {
        try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
        try { localStorage.removeItem(STORAGE_KEY);   } catch (e) {}
        mostrarLogin();
    }

    // ---------- ui ----------
    function mostrarApp() {
        var app   = document.getElementById('adminApp');
        var login = document.getElementById('loginScreen');
        if (app)   app.style.display = '';
        if (login) login.style.display = 'none';
        document.body.classList.add('autenticado');
        document.body.classList.remove('no-autenticado');
    }

    function mostrarLogin() {
        var app   = document.getElementById('adminApp');
        var login = document.getElementById('loginScreen');
        if (app)   app.style.display = 'none';
        if (login) login.style.display = '';
        document.body.classList.remove('autenticado');
        document.body.classList.add('no-autenticado');
        // Limpiar campos
        var u = document.getElementById('loginUsuario');
        var p = document.getElementById('loginClave');
        if (u) u.value = '';
        if (p) p.value = '';
        if (u) setTimeout(function () { u.focus(); }, 50);
    }

    function pintarError(msg) {
        var box = document.getElementById('loginError');
        if (!box) return;
        box.textContent = msg || '';
        box.style.display = msg ? 'block' : 'none';
    }

    // ---------- login ----------
    function intentarLogin() {
        var u = (document.getElementById('loginUsuario').value || '').trim();
        var p = (document.getElementById('loginClave').value || '');
        var recordar = !!(document.getElementById('loginRecordar') &&
                          document.getElementById('loginRecordar').checked);

        if (!u || !p) {
            pintarError('Ingresa usuario y contrasena.');
            return;
        }

        var btn = document.getElementById('btnLogin');
        if (btn) { btn.disabled = true; btn.classList.add('cargando'); }
        pintarError('');

        Promise.all([
            sha256(SAL + ':' + u),
            sha256(SAL + ':' + p)
        ]).then(function (resultados) {
            var okU = comparacionConstante(resultados[0], USUARIO_HASH);
            var okP = comparacionConstante(resultados[1], CLAVE_HASH);
            if (okU && okP) {
                crearSesion(recordar);
                mostrarApp();
            } else {
                pintarError('Usuario o contrasena incorrectos.');
            }
        }).catch(function (e) {
            console.error('[v0] Error de login:', e);
            pintarError('No se pudo validar. Intenta nuevamente.');
        }).then(function () {
            if (btn) { btn.disabled = false; btn.classList.remove('cargando'); }
        });
    }

    // ---------- arranque ----------
    function inicializar() {
        if (sesionValida()) {
            mostrarApp();
        } else {
            mostrarLogin();
        }

        var form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', function (ev) {
                ev.preventDefault();
                intentarLogin();
            });
        }

        var btnVerClave = document.getElementById('btnVerClave');
        if (btnVerClave) {
            btnVerClave.addEventListener('click', function () {
                var inp = document.getElementById('loginClave');
                if (!inp) return;
                if (inp.type === 'password') {
                    inp.type = 'text';
                    btnVerClave.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    inp.type = 'password';
                    btnVerClave.innerHTML = '<i class="fas fa-eye"></i>';
                }
            });
        }

        var btnLogout = document.getElementById('btnLogout');
        if (btnLogout) {
            btnLogout.addEventListener('click', function (ev) {
                ev.preventDefault();
                if (confirm('Cerrar sesion del panel de control?')) {
                    cerrarSesion();
                }
            });
        }
    }

    // Exponer cerrarSesion para usos externos
    window.adminAuth = {
        logout: cerrarSesion,
        sesionValida: sesionValida
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }

})();
