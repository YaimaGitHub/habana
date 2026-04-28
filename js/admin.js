/**
 * =====================================================
 * ADMIN PANEL - JavaScript Logic
 * Cabrera's Shop - Panel de Control
 * =====================================================
 */

// Configuracion global del panel
var CONFIG = {
    tiempoEntrega: 4,
    tiempoCancelacion: 4,
    recargoAdmin: false,
    numeroWhatsapp: '5355135487'
};

// Clave para localStorage
var STORAGE_KEY = 'cabrerasShopData';

// =====================================================
// INICIALIZACION
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    adminPanel.init();
});

var adminPanel = {

    // Inicializar panel
    init: function() {
        this.cargarDatosGuardados();
        this.inicializarNavegacion();
        this.inicializarSidebar();
        this.actualizarDashboard();
        this.renderizarProductos();
        this.renderizarCategorias();
        this.renderizarMunicipios();
        this.llenarSelectCategorias();
        this.cargarConfiguracion();
    },

    // Cargar datos guardados de localStorage
    cargarDatosGuardados: function() {
        var datosGuardados = localStorage.getItem(STORAGE_KEY);
        if (datosGuardados) {
            try {
                var datos = JSON.parse(datosGuardados);
                if (datos.MENU) MENU = datos.MENU;
                if (datos.CATEGORIAS) CATEGORIAS = datos.CATEGORIAS;
                if (datos.MUNICIPIOS_HABANA) MUNICIPIOS_HABANA = datos.MUNICIPIOS_HABANA;
                if (datos.CONFIG) CONFIG = datos.CONFIG;
            } catch (e) {
                console.error('Error cargando datos:', e);
            }
        }
    },

    // Guardar datos en localStorage y notificar a la tienda en tiempo real
    guardarDatos: function() {
        var datos = {
            MENU: MENU,
            CATEGORIAS: CATEGORIAS,
            MUNICIPIOS_HABANA: MUNICIPIOS_HABANA,
            CONFIG: CONFIG,
            // marca de tiempo para forzar el evento 'storage' incluso si el
            // resto del JSON serializado coincidiera por casualidad
            _ts: Date.now()
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
        } catch (e) {
            console.error('[v0] Error guardando datos:', e);
        }

        // 1) Disparar evento custom para la MISMA pestaña (cuando admin y
        //    tienda están abiertos a la vez en una sola pestaña, ej: iframe).
        try {
            window.dispatchEvent(new CustomEvent('cabreras:datos-actualizados', {
                detail: { ts: datos._ts }
            }));
        } catch (e) { /* navegadores antiguos */ }

        // 2) BroadcastChannel: notifica a TODAS las pestañas/ventanas del
        //    mismo origen (mecanismo más rápido que 'storage' y útil cuando
        //    la tienda está en otra pestaña). El listener vive en app.js.
        try {
            if (typeof BroadcastChannel !== 'undefined') {
                if (!this._bc) this._bc = new BroadcastChannel('cabreras-shop');
                this._bc.postMessage({ tipo: 'datos-actualizados', ts: datos._ts });
            }
        } catch (e) { /* ignorar */ }
    },

    // =====================================================
    // NAVEGACION
    // =====================================================

    inicializarNavegacion: function() {
        var navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                var seccion = this.getAttribute('data-section');
                adminPanel.mostrarSeccion(seccion);
            });
        });
    },

    mostrarSeccion: function(seccion) {
        // Actualizar navegacion activa
        document.querySelectorAll('.nav-item').forEach(function(item) {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === seccion) {
                item.classList.add('active');
            }
        });

        // Mostrar seccion correspondiente
        document.querySelectorAll('.content-section').forEach(function(section) {
            section.classList.remove('active');
        });
        var targetSection = document.getElementById('section-' + seccion);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Actualizar titulo
        var titulos = {
            'dashboard': 'Dashboard',
            'productos': 'Gestion de Productos',
            'categorias': 'Gestion de Categorias',
            'envios': 'Costos de Envio',
            'configuracion': 'Configuracion'
        };
        document.getElementById('pageTitle').textContent = titulos[seccion] || seccion;

        // Cerrar sidebar en movil
        document.getElementById('sidebar').classList.remove('mobile-open');

        // Actualizar datos si es necesario
        if (seccion === 'dashboard') {
            this.actualizarDashboard();
        } else if (seccion === 'productos') {
            this.llenarSelectCategorias();
        }
    },

    // =====================================================
    // SIDEBAR
    // =====================================================

    inicializarSidebar: function() {
        var toggleBtn = document.getElementById('sidebarToggle');
        var mobileMenuBtn = document.getElementById('mobileMenuBtn');
        var sidebar = document.getElementById('sidebar');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                sidebar.classList.toggle('collapsed');
            });
        }

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                sidebar.classList.toggle('mobile-open');
            });
        }

        // Cerrar sidebar al hacer clic fuera en movil
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    sidebar.classList.remove('mobile-open');
                }
            }
        });
    },

    // =====================================================
    // DASHBOARD
    // =====================================================

    actualizarDashboard: function() {
        var totalProductos = 0;
        var productosDisponibles = 0;
        var productosAgotados = 0;

        Object.keys(MENU).forEach(function(cat) {
            MENU[cat].forEach(function(prod) {
                totalProductos++;
                if (prod.agotado) {
                    productosAgotados++;
                } else {
                    productosDisponibles++;
                }
            });
        });

        document.getElementById('totalProductos').textContent = totalProductos;
        document.getElementById('productosDisponibles').textContent = productosDisponibles;
        document.getElementById('productosAgotados').textContent = productosAgotados;
        document.getElementById('totalCategorias').textContent = Object.keys(CATEGORIAS).length;
    },

    // =====================================================
    // PRODUCTOS
    // =====================================================

    renderizarProductos: function() {
        var container = document.getElementById('listaProductos');
        if (!container) return;

        var filtroCategoria = document.getElementById('filtroCategoria').value;
        var filtroEstado = document.getElementById('filtroEstado').value;
        var filtroPesaje = document.getElementById('filtroPesaje').value;
        var busqueda = (document.getElementById('buscarProducto').value || '').toLowerCase().trim();

        var html = '';
        var hayProductos = false;

        Object.keys(MENU).forEach(function(catKey) {
            if (filtroCategoria && catKey !== filtroCategoria) return;

            var catInfo = CATEGORIAS[catKey] || { nome: catKey, icone: 'fas fa-box' };

            MENU[catKey].forEach(function(producto) {
                // Filtrar por estado
                if (filtroEstado === 'disponible' && producto.agotado) return;
                if (filtroEstado === 'agotado' && !producto.agotado) return;

                // Filtrar por pesaje
                var pesaje = producto.pesaje || 'unidad';
                if (filtroPesaje && pesaje !== filtroPesaje) return;

                // Filtrar por busqueda
                if (busqueda && producto.name.toLowerCase().indexOf(busqueda) === -1) return;

                hayProductos = true;

                var estadoClass = producto.agotado ? 'agotado' : 'disponible';
                var estadoTexto = producto.agotado ? 'Agotado' : 'Disponible';
                var pesajeTexto = {
                    'unidad': 'Unidad',
                    'libras': 'Libras',
                    'kilogramos': 'Kilogramos'
                }[pesaje] || 'Unidad';

                html += '<div class="product-item">';
                html += '<input type="checkbox" class="product-checkbox" data-id="' + producto.id + '" data-categoria="' + catKey + '">';
                html += '<img src="' + producto.img + '" alt="' + producto.name + '" class="product-image" onerror="this.src=\'./img/placeholder.png\'">';
                html += '<div class="product-info">';
                html += '<span class="product-name">' + producto.name + '</span>';
                html += '<span class="product-category"><i class="' + catInfo.icone + '"></i> ' + catInfo.nome + '</span>';
                html += '</div>';
                html += '<span class="product-price">MN$ ' + producto.price.toFixed(2) + '</span>';
                html += '<span class="product-pesaje"><i class="fas fa-balance-scale"></i> ' + pesajeTexto + '</span>';
                html += '<span class="product-status ' + estadoClass + '"><i class="fas fa-' + (producto.agotado ? 'times' : 'check') + '-circle"></i> ' + estadoTexto + '</span>';
                html += '<div class="product-actions">';
                html += '<button class="btn-icon" onclick="adminPanel.editarProducto(\'' + producto.id + '\', \'' + catKey + '\')" title="Editar"><i class="fas fa-edit"></i></button>';
                html += '<button class="btn-icon danger" onclick="adminPanel.eliminarProducto(\'' + producto.id + '\', \'' + catKey + '\')" title="Eliminar"><i class="fas fa-trash"></i></button>';
                html += '</div>';
                html += '</div>';
            });
        });

        if (!hayProductos) {
            html = '<div class="empty-state"><i class="fas fa-box-open"></i><p>No se encontraron productos</p></div>';
        }

        container.innerHTML = html;
    },

    filtrarProductos: function() {
        this.renderizarProductos();
    },

    llenarSelectCategorias: function() {
        var selects = document.querySelectorAll('#filtroCategoria, #productoCategoriaSelect');
        selects.forEach(function(select) {
            var valorActual = select.value;
            var esSelect = select.id === 'productoCategoriaSelect';
            
            select.innerHTML = esSelect ? '' : '<option value="">Todas</option>';
            
            Object.keys(CATEGORIAS).forEach(function(key) {
                var option = document.createElement('option');
                option.value = key;
                option.textContent = CATEGORIAS[key].nome;
                select.appendChild(option);
            });

            if (valorActual) {
                select.value = valorActual;
            }
        });
    },

    // Modal Producto
    abrirModalProducto: function() {
        document.getElementById('modalProductoTitulo').textContent = 'Nuevo Producto';
        document.getElementById('productoId').value = '';
        document.getElementById('productoCategoria').value = '';
        document.getElementById('productoNombre').value = '';
        document.getElementById('productoPrecio').value = '';
        document.getElementById('productoPesaje').value = 'unidad';
        document.getElementById('productoEstado').value = 'disponible';
        document.getElementById('productoDescripcion').value = '';
        document.getElementById('productoImagenUrl').value = '';
        document.getElementById('imagenPreview').classList.add('hidden');
        document.getElementById('uploadPlaceholder').classList.remove('hidden');
        
        this.llenarSelectCategorias();
        document.getElementById('modalProducto').classList.add('active');
    },

    cerrarModalProducto: function() {
        document.getElementById('modalProducto').classList.remove('active');
    },

    editarProducto: function(id, categoria) {
        var producto = MENU[categoria].find(function(p) { return p.id === id; });
        if (!producto) return;

        document.getElementById('modalProductoTitulo').textContent = 'Editar Producto';
        document.getElementById('productoId').value = producto.id;
        document.getElementById('productoCategoria').value = categoria;
        document.getElementById('productoNombre').value = producto.name;
        document.getElementById('productoPrecio').value = producto.price;
        document.getElementById('productoPesaje').value = producto.pesaje || 'unidad';
        document.getElementById('productoEstado').value = producto.agotado ? 'agotado' : 'disponible';
        document.getElementById('productoDescripcion').value = producto.dsc || '';
        document.getElementById('productoImagenUrl').value = producto.img || '';

        this.llenarSelectCategorias();
        document.getElementById('productoCategoriaSelect').value = categoria;

        // Mostrar imagen actual
        if (producto.img) {
            document.getElementById('imagenPreview').src = producto.img;
            document.getElementById('imagenPreview').classList.remove('hidden');
            document.getElementById('uploadPlaceholder').classList.add('hidden');
        }

        document.getElementById('modalProducto').classList.add('active');
    },

    previsualizarImagen: function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagenPreview').src = e.target.result;
                document.getElementById('imagenPreview').classList.remove('hidden');
                document.getElementById('uploadPlaceholder').classList.add('hidden');
                document.getElementById('productoImagenUrl').value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    },

    guardarProducto: function() {
        var nombre = document.getElementById('productoNombre').value.trim();
        var precio = parseFloat(document.getElementById('productoPrecio').value) || 0;
        var categoria = document.getElementById('productoCategoriaSelect').value;
        var pesaje = document.getElementById('productoPesaje').value;
        var estado = document.getElementById('productoEstado').value;
        var descripcion = document.getElementById('productoDescripcion').value.trim();
        var imagen = document.getElementById('productoImagenUrl').value.trim();

        if (!nombre) {
            this.mostrarToast('El nombre del producto es obligatorio', 'error');
            return;
        }
        if (precio <= 0) {
            this.mostrarToast('El precio debe ser mayor a 0', 'error');
            return;
        }
        if (!categoria) {
            this.mostrarToast('Selecciona una categoria', 'error');
            return;
        }

        var productoId = document.getElementById('productoId').value;
        var categoriaOriginal = document.getElementById('productoCategoria').value;

        // Si estamos editando y la categoria cambio, eliminar de la categoria original
        if (productoId && categoriaOriginal && categoriaOriginal !== categoria) {
            MENU[categoriaOriginal] = MENU[categoriaOriginal].filter(function(p) {
                return p.id !== productoId;
            });
        }

        var producto = {
            id: productoId || this.generarId(),
            name: nombre,
            price: precio,
            img: imagen || './img/placeholder.png',
            dsc: descripcion,
            pesaje: pesaje,
            agotado: estado === 'agotado'
        };

        if (!MENU[categoria]) {
            MENU[categoria] = [];
        }

        if (productoId && (!categoriaOriginal || categoriaOriginal === categoria)) {
            // Actualizar producto existente en la misma categoria
            var index = MENU[categoria].findIndex(function(p) { return p.id === productoId; });
            if (index !== -1) {
                MENU[categoria][index] = producto;
            } else {
                MENU[categoria].push(producto);
            }
        } else {
            // Agregar nuevo producto
            MENU[categoria].push(producto);
        }

        this.guardarDatos();
        this.cerrarModalProducto();
        this.renderizarProductos();
        this.actualizarDashboard();
        this.mostrarToast('Producto guardado correctamente', 'success');
    },

    eliminarProducto: function(id, categoria) {
        if (!confirm('¿Estas seguro de eliminar este producto?')) return;

        MENU[categoria] = MENU[categoria].filter(function(p) {
            return p.id !== id;
        });

        this.guardarDatos();
        this.renderizarProductos();
        this.actualizarDashboard();
        this.mostrarToast('Producto eliminado', 'success');
    },

    // Acciones masivas
    getProductosSeleccionados: function() {
        var checkboxes = document.querySelectorAll('.product-checkbox:checked');
        var productos = [];
        checkboxes.forEach(function(cb) {
            productos.push({
                id: cb.getAttribute('data-id'),
                categoria: cb.getAttribute('data-categoria')
            });
        });
        return productos;
    },

    marcarSeleccionadosDisponibles: function() {
        var seleccionados = this.getProductosSeleccionados();
        if (seleccionados.length === 0) {
            this.mostrarToast('Selecciona al menos un producto', 'warning');
            return;
        }

        seleccionados.forEach(function(sel) {
            var producto = MENU[sel.categoria].find(function(p) { return p.id === sel.id; });
            if (producto) producto.agotado = false;
        });

        this.guardarDatos();
        this.renderizarProductos();
        this.actualizarDashboard();
        this.mostrarToast(seleccionados.length + ' productos marcados como disponibles', 'success');
    },

    marcarSeleccionadosAgotados: function() {
        var seleccionados = this.getProductosSeleccionados();
        if (seleccionados.length === 0) {
            this.mostrarToast('Selecciona al menos un producto', 'warning');
            return;
        }

        seleccionados.forEach(function(sel) {
            var producto = MENU[sel.categoria].find(function(p) { return p.id === sel.id; });
            if (producto) producto.agotado = true;
        });

        this.guardarDatos();
        this.renderizarProductos();
        this.actualizarDashboard();
        this.mostrarToast(seleccionados.length + ' productos marcados como agotados', 'success');
    },

    cambiarPesajeSeleccionados: function(tipoPesaje) {
        var seleccionados = this.getProductosSeleccionados();
        if (seleccionados.length === 0) {
            this.mostrarToast('Selecciona al menos un producto', 'warning');
            return;
        }

        seleccionados.forEach(function(sel) {
            var producto = MENU[sel.categoria].find(function(p) { return p.id === sel.id; });
            if (producto) producto.pesaje = tipoPesaje;
        });

        this.guardarDatos();
        this.renderizarProductos();
        this.mostrarToast(seleccionados.length + ' productos cambiados a ' + tipoPesaje, 'success');
    },

    marcarTodosDisponibles: function() {
        if (!confirm('¿Marcar TODOS los productos como disponibles?')) return;

        Object.keys(MENU).forEach(function(cat) {
            MENU[cat].forEach(function(prod) {
                prod.agotado = false;
            });
        });

        this.guardarDatos();
        this.renderizarProductos();
        this.actualizarDashboard();
        this.mostrarToast('Todos los productos estan ahora disponibles', 'success');
    },

    marcarTodosAgotados: function() {
        if (!confirm('¿Marcar TODOS los productos como agotados?')) return;

        Object.keys(MENU).forEach(function(cat) {
            MENU[cat].forEach(function(prod) {
                prod.agotado = true;
            });
        });

        this.guardarDatos();
        this.renderizarProductos();
        this.actualizarDashboard();
        this.mostrarToast('Todos los productos estan ahora agotados', 'success');
    },

    // =====================================================
    // CATEGORIAS
    // =====================================================

    renderizarCategorias: function() {
        var container = document.getElementById('listaCategorias');
        if (!container) return;

        var html = '';

        Object.keys(CATEGORIAS).forEach(function(key) {
            var cat = CATEGORIAS[key];
            var conteo = (MENU[key] || []).length;

            html += '<div class="category-card">';
            html += '<div class="category-icon"><i class="' + cat.icone + '"></i></div>';
            html += '<div class="category-info">';
            html += '<span class="category-name">' + cat.nome + '</span>';
            html += '<span class="category-count">' + conteo + ' productos</span>';
            html += '</div>';
            html += '<div class="category-actions">';
            html += '<button class="btn-icon" onclick="adminPanel.editarCategoria(\'' + key + '\')" title="Editar"><i class="fas fa-edit"></i></button>';
            html += '<button class="btn-icon danger" onclick="adminPanel.eliminarCategoria(\'' + key + '\')" title="Eliminar"><i class="fas fa-trash"></i></button>';
            html += '</div>';
            html += '</div>';
        });

        if (Object.keys(CATEGORIAS).length === 0) {
            html = '<div class="empty-state"><i class="fas fa-tags"></i><p>No hay categorias</p></div>';
        }

        container.innerHTML = html;
    },

    abrirModalCategoria: function() {
        document.getElementById('modalCategoriaTitulo').textContent = 'Nueva Categoria';
        document.getElementById('categoriaKey').value = '';
        document.getElementById('categoriaNombre').value = '';
        document.getElementById('categoriaClaveInterna').value = '';
        document.getElementById('categoriaIcono').value = 'fas fa-shopping-basket';
        document.getElementById('iconoPreview').className = 'fas fa-shopping-basket';
        
        document.getElementById('modalCategoria').classList.add('active');
    },

    cerrarModalCategoria: function() {
        document.getElementById('modalCategoria').classList.remove('active');
    },

    editarCategoria: function(key) {
        var cat = CATEGORIAS[key];
        if (!cat) return;

        document.getElementById('modalCategoriaTitulo').textContent = 'Editar Categoria';
        document.getElementById('categoriaKey').value = key;
        document.getElementById('categoriaNombre').value = cat.nome;
        document.getElementById('categoriaClaveInterna').value = key;
        document.getElementById('categoriaIcono').value = cat.icone;
        document.getElementById('iconoPreview').className = cat.icone;

        document.getElementById('modalCategoria').classList.add('active');
    },

    seleccionarIcono: function(icono) {
        document.getElementById('categoriaIcono').value = icono;
        document.getElementById('iconoPreview').className = icono;
    },

    guardarCategoria: function() {
        var nombre = document.getElementById('categoriaNombre').value.trim();
        var clave = document.getElementById('categoriaClaveInterna').value.trim().toLowerCase().replace(/\s+/g, '-');
        var icono = document.getElementById('categoriaIcono').value.trim();
        var keyOriginal = document.getElementById('categoriaKey').value;

        if (!nombre) {
            this.mostrarToast('El nombre de la categoria es obligatorio', 'error');
            return;
        }
        if (!clave) {
            this.mostrarToast('La clave interna es obligatoria', 'error');
            return;
        }

        // Si estamos editando y la clave cambio
        if (keyOriginal && keyOriginal !== clave) {
            // Mover productos a la nueva clave
            if (MENU[keyOriginal]) {
                MENU[clave] = MENU[keyOriginal];
                delete MENU[keyOriginal];
            }
            delete CATEGORIAS[keyOriginal];
        }

        CATEGORIAS[clave] = {
            nome: nombre,
            icone: icono || 'fas fa-shopping-basket'
        };

        if (!MENU[clave]) {
            MENU[clave] = [];
        }

        this.guardarDatos();
        this.cerrarModalCategoria();
        this.renderizarCategorias();
        this.llenarSelectCategorias();
        this.actualizarDashboard();
        this.mostrarToast('Categoria guardada correctamente', 'success');
    },

    eliminarCategoria: function(key) {
        var conteo = (MENU[key] || []).length;
        var mensaje = conteo > 0 
            ? '¿Eliminar esta categoria? Se eliminaran ' + conteo + ' productos.'
            : '¿Eliminar esta categoria?';

        if (!confirm(mensaje)) return;

        delete CATEGORIAS[key];
        delete MENU[key];

        this.guardarDatos();
        this.renderizarCategorias();
        this.renderizarProductos();
        this.llenarSelectCategorias();
        this.actualizarDashboard();
        this.mostrarToast('Categoria eliminada', 'success');
    },

    // =====================================================
    // MUNICIPIOS / ENVIOS
    // =====================================================

    renderizarMunicipios: function() {
        var container = document.getElementById('listaMunicipios');
        if (!container) return;

        var html = '';

        MUNICIPIOS_HABANA.forEach(function(mun, index) {
            html += '<div class="municipio-item">';
            html += '<div class="municipio-info">';
            html += '<div class="municipio-icon"><i class="fas fa-map-marker-alt"></i></div>';
            html += '<span class="municipio-name">' + mun.nome + '</span>';
            html += '</div>';
            html += '<span class="municipio-costo">MN$ ' + mun.costo.toFixed(2) + '</span>';
            html += '<div class="municipio-actions">';
            html += '<button class="btn-icon" onclick="adminPanel.editarMunicipio(' + index + ')" title="Editar"><i class="fas fa-edit"></i></button>';
            html += '<button class="btn-icon danger" onclick="adminPanel.eliminarMunicipio(' + index + ')" title="Eliminar"><i class="fas fa-trash"></i></button>';
            html += '</div>';
            html += '</div>';
        });

        if (MUNICIPIOS_HABANA.length === 0) {
            html = '<div class="empty-state"><i class="fas fa-truck"></i><p>No hay municipios configurados</p></div>';
        }

        container.innerHTML = html;
    },

    abrirModalMunicipio: function() {
        document.getElementById('modalMunicipioTitulo').textContent = 'Agregar Municipio';
        document.getElementById('municipioId').value = '';
        document.getElementById('municipioNombre').value = '';
        document.getElementById('municipioCosto').value = '';
        
        document.getElementById('modalMunicipio').classList.add('active');
    },

    cerrarModalMunicipio: function() {
        document.getElementById('modalMunicipio').classList.remove('active');
    },

    editarMunicipio: function(index) {
        var mun = MUNICIPIOS_HABANA[index];
        if (!mun) return;

        document.getElementById('modalMunicipioTitulo').textContent = 'Editar Municipio';
        document.getElementById('municipioId').value = index;
        document.getElementById('municipioNombre').value = mun.nome;
        document.getElementById('municipioCosto').value = mun.costo;

        document.getElementById('modalMunicipio').classList.add('active');
    },

    guardarMunicipio: function() {
        var nombre = document.getElementById('municipioNombre').value.trim();
        var costo = parseFloat(document.getElementById('municipioCosto').value) || 0;
        var indexStr = document.getElementById('municipioId').value;

        if (!nombre) {
            this.mostrarToast('El nombre del municipio es obligatorio', 'error');
            return;
        }

        var municipio = {
            id: nombre.toLowerCase().replace(/\s+/g, '-'),
            nome: nombre,
            costo: costo
        };

        if (indexStr !== '') {
            var index = parseInt(indexStr);
            MUNICIPIOS_HABANA[index] = municipio;
        } else {
            MUNICIPIOS_HABANA.push(municipio);
        }

        this.guardarDatos();
        this.cerrarModalMunicipio();
        this.renderizarMunicipios();
        this.mostrarToast('Municipio guardado correctamente', 'success');
    },

    eliminarMunicipio: function(index) {
        if (!confirm('¿Eliminar este municipio?')) return;

        MUNICIPIOS_HABANA.splice(index, 1);

        this.guardarDatos();
        this.renderizarMunicipios();
        this.mostrarToast('Municipio eliminado', 'success');
    },

    // =====================================================
    // CONFIGURACION
    // =====================================================

    cargarConfiguracion: function() {
        document.getElementById('tiempoEntrega').value = CONFIG.tiempoEntrega || 4;
        document.getElementById('tiempoCancelacion').value = CONFIG.tiempoCancelacion || 4;
        document.getElementById('recargoAdmin').checked = CONFIG.recargoAdmin || false;
        document.getElementById('numeroWhatsapp').value = CONFIG.numeroWhatsapp || '5355135487';
    },

    guardarConfiguracion: function() {
        CONFIG.tiempoEntrega = parseInt(document.getElementById('tiempoEntrega').value) || 4;
        CONFIG.tiempoCancelacion = parseInt(document.getElementById('tiempoCancelacion').value) || 4;
        CONFIG.numeroWhatsapp = document.getElementById('numeroWhatsapp').value.trim();

        this.guardarDatos();
        this.mostrarToast('Configuracion guardada correctamente', 'success');
    },

    toggleRecargo: function() {
        CONFIG.recargoAdmin = document.getElementById('recargoAdmin').checked;
        this.guardarDatos();
        this.mostrarToast(CONFIG.recargoAdmin ? 'Recargo administrativo activado' : 'Recargo administrativo desactivado', 'success');
    },

    // =====================================================
    // UTILIDADES
    // =====================================================

    generarId: function() {
        return 'prod-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    },

    mostrarToast: function(mensaje, tipo) {
        var container = document.getElementById('toastContainer');
        var iconos = {
            'success': 'fas fa-check',
            'error': 'fas fa-times',
            'warning': 'fas fa-exclamation'
        };

        var toast = document.createElement('div');
        toast.className = 'toast ' + (tipo || 'success');
        toast.innerHTML = '<div class="toast-icon"><i class="' + iconos[tipo || 'success'] + '"></i></div>' +
                          '<span class="toast-message">' + mensaje + '</span>' +
                          '<button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>';

        container.appendChild(toast);

        // Auto-remove despues de 4 segundos
        setTimeout(function() {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 4000);
    }
};

// Actualizar preview del icono cuando cambia el input
document.addEventListener('DOMContentLoaded', function() {
    var iconoInput = document.getElementById('categoriaIcono');
    if (iconoInput) {
        iconoInput.addEventListener('input', function() {
            document.getElementById('iconoPreview').className = this.value;
        });
    }
});
