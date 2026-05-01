/**
 * Panel de Control - D'Mima
 * Sistema de administracion de la tienda
 */

// Credenciales de acceso
const ADMIN_USER = 'any';
const ADMIN_PASS = 'carlosmiamor';

// Copia local de los datos para edicion
var localMENU = {};
var localCATEGORIAS = {};
var localMUNICIPIOS = [];
var localCONTACT = {
    whatsapp: '',
    address: '',
    storeName: ''
};

// Estado de la aplicacion
var isLoggedIn = false;

// Objeto principal del panel
var adminPanel = {

    // =====================
    // INICIALIZACION
    // =====================
    
    init: function() {
        // Cargar datos desde las variables globales
        this.loadData();
        
        // Verificar sesion guardada
        if (sessionStorage.getItem('adminLoggedIn') === 'true') {
            this.showAdminPanel();
        }
    },

    loadData: function() {
        // Copiar datos del MENU global
        if (typeof MENU !== 'undefined') {
            localMENU = JSON.parse(JSON.stringify(MENU));
        }
        
        // Copiar CATEGORIAS si existe, sino crear estructura basica
        if (typeof CATEGORIAS !== 'undefined') {
            localCATEGORIAS = JSON.parse(JSON.stringify(CATEGORIAS));
        } else {
            localCATEGORIAS = {
                "burgers": { nome: "Mercado", icone: "fas fa-store" },
                "pizzas": { nome: "Embutido", icone: "fas fa-bacon" },
                "churrasco": { nome: "Carnico", icone: "fas fa-drumstick-bite" },
                "steaks": { nome: "Harinas", icone: "fas fa-bread-slice" },
                "bebidas": { nome: "Liquidos", icone: "fas fa-tint" },
                "sobremesas": { nome: "Aseo", icone: "fas fa-soap" },
                "outros": { nome: "Confituras", icone: "fas fa-candy-cane" }
            };
        }
        
        // Copiar MUNICIPIOS_HABANA
        if (typeof MUNICIPIOS_HABANA !== 'undefined') {
            localMUNICIPIOS = JSON.parse(JSON.stringify(MUNICIPIOS_HABANA));
        }
        
        // Cargar datos de contacto
        if (typeof CELULAR_EMPRESA !== 'undefined') {
            localCONTACT.whatsapp = CELULAR_EMPRESA;
        }
        
        if (typeof MEU_ENDERECO !== 'undefined' && MEU_ENDERECO) {
            localCONTACT.address = MEU_ENDERECO;
        }

        localCONTACT.storeName = "D'Mima";
    },

    // =====================
    // AUTENTICACION
    // =====================
    
    login: function(event) {
        event.preventDefault();
        
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var errorEl = document.getElementById('loginError');
        
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            isLoggedIn = true;
            this.showAdminPanel();
            errorEl.textContent = '';
        } else {
            errorEl.textContent = 'Usuario o contrasena incorrectos';
            errorEl.classList.add('show');
        }
        
        return false;
    },

    logout: function() {
        sessionStorage.removeItem('adminLoggedIn');
        isLoggedIn = false;
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('adminPanel').classList.add('hidden');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    },

    showAdminPanel: function() {
        isLoggedIn = true;
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        
        // Cargar dashboard
        this.updateDashboard();
        this.loadAllSections();
    },

    // =====================
    // NAVEGACION
    // =====================
    
    showSection: function(sectionId) {
        // Ocultar todas las secciones
        document.querySelectorAll('.content-section').forEach(function(section) {
            section.classList.remove('active');
        });
        
        // Mostrar seccion seleccionada
        var target = document.getElementById('section-' + sectionId);
        if (target) {
            target.classList.add('active');
        }
        
        // Actualizar nav activo
        document.querySelectorAll('.nav-item').forEach(function(item) {
            item.classList.remove('active');
        });
        document.querySelector('.nav-item[data-section="' + sectionId + '"]').classList.add('active');
        
        // Actualizar titulo
        var titles = {
            'dashboard': 'Panel de Control',
            'products': 'Gestion de Productos',
            'categories': 'Gestion de Categorias',
            'shipping': 'Municipios y Envios',
            'contact': 'Informacion de Contacto',
            'export': 'Exportar Configuracion'
        };
        document.getElementById('sectionTitle').textContent = titles[sectionId] || 'Panel de Control';
        
        // Cerrar sidebar en movil
        document.querySelector('.sidebar').classList.remove('open');
    },

    toggleSidebar: function() {
        document.querySelector('.sidebar').classList.toggle('open');
    },

    // =====================
    // DASHBOARD
    // =====================
    
    updateDashboard: function() {
        // Contar productos
        var totalProducts = 0;
        for (var cat in localMENU) {
            if (localMENU.hasOwnProperty(cat)) {
                totalProducts += localMENU[cat].length;
            }
        }
        document.getElementById('totalProducts').textContent = totalProducts;
        
        // Contar categorias
        document.getElementById('totalCategories').textContent = Object.keys(localCATEGORIAS).length;
        
        // Contar municipios
        document.getElementById('totalMunicipios').textContent = localMUNICIPIOS.length;
        
        // WhatsApp
        var wp = localCONTACT.whatsapp || '---';
        document.getElementById('whatsappNumber').textContent = '+' + wp.substring(0, 4) + '...';
    },

    loadAllSections: function() {
        this.loadProducts();
        this.loadCategories();
        this.loadMunicipios();
        this.loadContact();
    },

    // =====================
    // PRODUCTOS
    // =====================
    
    loadProducts: function() {
        var grid = document.getElementById('productsGrid');
        var filterSelect = document.getElementById('filterCategory');
        var self = this;
        
        // Cargar opciones del filtro y del modal
        filterSelect.innerHTML = '<option value="">Todas las categorias</option>';
        var productCategorySelect = document.getElementById('productCategory');
        productCategorySelect.innerHTML = '';
        
        for (var key in localCATEGORIAS) {
            if (localCATEGORIAS.hasOwnProperty(key)) {
                var cat = localCATEGORIAS[key];
                filterSelect.innerHTML += '<option value="' + key + '">' + cat.nome + '</option>';
                productCategorySelect.innerHTML += '<option value="' + key + '">' + cat.nome + '</option>';
            }
        }
        
        // Renderizar productos
        this.renderProducts();
    },

    renderProducts: function(filterCat, searchTerm) {
        var grid = document.getElementById('productsGrid');
        grid.innerHTML = '';
        
        var self = this;
        filterCat = filterCat || '';
        searchTerm = (searchTerm || '').toLowerCase();
        
        for (var cat in localMENU) {
            if (localMENU.hasOwnProperty(cat)) {
                if (filterCat && cat !== filterCat) continue;
                
                var catInfo = localCATEGORIAS[cat] || { nome: cat, icone: 'fas fa-box' };
                
                localMENU[cat].forEach(function(product, index) {
                    if (searchTerm && product.name.toLowerCase().indexOf(searchTerm) === -1) {
                        return;
                    }
                    
                    var card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = '\
                        <div class="product-image">\
                            <img src="' + product.img + '" alt="' + product.name + '" onerror="this.src=\'./img/icone-pedido.png\'">\
                        </div>\
                        <div class="product-info">\
                            <span class="product-category"><i class="' + catInfo.icone + '"></i> ' + catInfo.nome + '</span>\
                            <h3>' + product.name + '</h3>\
                            <p class="product-price">MN$ ' + product.price.toFixed(2).replace('.', ',') + '</p>\
                        </div>\
                        <div class="product-actions">\
                            <button class="btn-edit" onclick="adminPanel.editProduct(\'' + cat + '\', ' + index + ')">\
                                <i class="fas fa-edit"></i>\
                            </button>\
                            <button class="btn-delete" onclick="adminPanel.deleteProduct(\'' + cat + '\', ' + index + ')">\
                                <i class="fas fa-trash"></i>\
                            </button>\
                        </div>\
                    ';
                    grid.appendChild(card);
                });
            }
        }
        
        if (grid.innerHTML === '') {
            grid.innerHTML = '<div class="empty-state"><i class="fas fa-box-open"></i><p>No hay productos que mostrar</p></div>';
        }
    },

    filterProducts: function() {
        var cat = document.getElementById('filterCategory').value;
        var search = document.getElementById('searchProduct').value;
        this.renderProducts(cat, search);
    },

    showProductModal: function(isEdit) {
        document.getElementById('productModal').classList.remove('hidden');
        document.getElementById('productModalTitle').textContent = isEdit ? 'Editar Producto' : 'Nuevo Producto';
        if (!isEdit) {
            document.getElementById('productForm').reset();
            document.getElementById('productId').value = '';
            document.getElementById('productOldCategory').value = '';
            document.getElementById('imagePreview').innerHTML = '';
        }
    },

    closeProductModal: function() {
        document.getElementById('productModal').classList.add('hidden');
    },

    editProduct: function(category, index) {
        var product = localMENU[category][index];
        
        document.getElementById('productId').value = product.id;
        document.getElementById('productOldCategory').value = category;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productUnit').value = product.unit || 'unidad';
        document.getElementById('productDesc').value = product.dsc || '';
        document.getElementById('productImg').value = product.img || '';
        
        if (product.img) {
            document.getElementById('imagePreview').innerHTML = '<img src="' + product.img + '" alt="Preview">';
        }
        
        this.showProductModal(true);
    },

    saveProduct: function(event) {
        event.preventDefault();
        
        var id = document.getElementById('productId').value;
        var oldCategory = document.getElementById('productOldCategory').value;
        var name = document.getElementById('productName').value;
        var category = document.getElementById('productCategory').value;
        var price = parseFloat(document.getElementById('productPrice').value);
        var unit = document.getElementById('productUnit').value;
        var desc = document.getElementById('productDesc').value;
        var img = document.getElementById('productImg').value;
        
        // Generar ID si es nuevo
        if (!id) {
            id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        }
        
        var productData = {
            id: id,
            img: img || './img/icone-pedido.png',
            name: name,
            dsc: desc,
            price: price,
            unit: unit
        };
        
        // Si estamos editando y cambio la categoria, eliminar del viejo
        if (oldCategory && oldCategory !== category) {
            var oldIndex = localMENU[oldCategory].findIndex(function(p) { return p.id === id; });
            if (oldIndex > -1) {
                localMENU[oldCategory].splice(oldIndex, 1);
            }
        }
        
        // Verificar si existe en la categoria destino
        if (!localMENU[category]) {
            localMENU[category] = [];
        }
        
        var existingIndex = localMENU[category].findIndex(function(p) { return p.id === id; });
        
        if (existingIndex > -1) {
            localMENU[category][existingIndex] = productData;
        } else {
            localMENU[category].push(productData);
        }
        
        // Actualizar variable global
        MENU = JSON.parse(JSON.stringify(localMENU));
        
        this.closeProductModal();
        this.renderProducts();
        this.updateDashboard();
        this.showToast('Producto guardado correctamente', 'success');
        
        return false;
    },

    deleteProduct: function(category, index) {
        if (confirm('¿Esta seguro de eliminar este producto?')) {
            var productName = localMENU[category][index].name;
            localMENU[category].splice(index, 1);
            
            // Actualizar variable global
            MENU = JSON.parse(JSON.stringify(localMENU));
            
            this.renderProducts();
            this.updateDashboard();
            this.showToast('Producto "' + productName + '" eliminado', 'warning');
        }
    },

    // =====================
    // CATEGORIAS
    // =====================
    
    loadCategories: function() {
        var list = document.getElementById('categoriesList');
        list.innerHTML = '';
        
        for (var key in localCATEGORIAS) {
            if (localCATEGORIAS.hasOwnProperty(key)) {
                var cat = localCATEGORIAS[key];
                var productCount = (localMENU[key] || []).length;
                
                var item = document.createElement('div');
                item.className = 'category-item';
                item.innerHTML = '\
                    <div class="category-icon"><i class="' + cat.icone + '"></i></div>\
                    <div class="category-info">\
                        <h3>' + cat.nome + '</h3>\
                        <p>Clave: ' + key + ' | ' + productCount + ' productos</p>\
                    </div>\
                    <div class="category-actions">\
                        <button class="btn-edit" onclick="adminPanel.editCategory(\'' + key + '\')">\
                            <i class="fas fa-edit"></i>\
                        </button>\
                        <button class="btn-delete" onclick="adminPanel.deleteCategory(\'' + key + '\')">\
                            <i class="fas fa-trash"></i>\
                        </button>\
                    </div>\
                ';
                list.appendChild(item);
            }
        }
    },

    showCategoryModal: function(isEdit) {
        document.getElementById('categoryModal').classList.remove('hidden');
        document.getElementById('categoryModalTitle').textContent = isEdit ? 'Editar Categoria' : 'Nueva Categoria';
        if (!isEdit) {
            document.getElementById('categoryForm').reset();
            document.getElementById('categoryKey').value = '';
            document.getElementById('categoryIsNew').value = 'true';
            document.getElementById('categoryClave').removeAttribute('readonly');
        }
    },

    closeCategoryModal: function() {
        document.getElementById('categoryModal').classList.add('hidden');
    },

    editCategory: function(key) {
        var cat = localCATEGORIAS[key];
        
        document.getElementById('categoryKey').value = key;
        document.getElementById('categoryIsNew').value = 'false';
        document.getElementById('categoryClave').value = key;
        document.getElementById('categoryClave').setAttribute('readonly', 'true');
        document.getElementById('categoryName').value = cat.nome;
        document.getElementById('categoryIcon').value = cat.icone;
        
        this.showCategoryModal(true);
    },

    saveCategory: function(event) {
        event.preventDefault();
        
        var oldKey = document.getElementById('categoryKey').value;
        var isNew = document.getElementById('categoryIsNew').value === 'true';
        var key = document.getElementById('categoryClave').value;
        var name = document.getElementById('categoryName').value;
        var icon = document.getElementById('categoryIcon').value || 'fas fa-box';
        
        if (isNew && localCATEGORIAS[key]) {
            this.showToast('Ya existe una categoria con esa clave', 'error');
            return false;
        }
        
        localCATEGORIAS[key] = {
            nome: name,
            icone: icon
        };
        
        // Crear array de productos vacio si es nueva
        if (isNew && !localMENU[key]) {
            localMENU[key] = [];
            MENU[key] = [];
        }
        
        // Actualizar variable global
        if (typeof CATEGORIAS !== 'undefined') {
            CATEGORIAS = JSON.parse(JSON.stringify(localCATEGORIAS));
        }
        
        this.closeCategoryModal();
        this.loadCategories();
        this.loadProducts();
        this.updateDashboard();
        this.showToast('Categoria guardada correctamente', 'success');
        
        return false;
    },

    deleteCategory: function(key) {
        var productCount = (localMENU[key] || []).length;
        
        if (productCount > 0) {
            if (!confirm('Esta categoria tiene ' + productCount + ' productos. ¿Desea eliminarla junto con todos sus productos?')) {
                return;
            }
        } else {
            if (!confirm('¿Esta seguro de eliminar esta categoria?')) {
                return;
            }
        }
        
        delete localCATEGORIAS[key];
        delete localMENU[key];
        
        if (typeof CATEGORIAS !== 'undefined') {
            delete CATEGORIAS[key];
        }
        delete MENU[key];
        
        this.loadCategories();
        this.loadProducts();
        this.updateDashboard();
        this.showToast('Categoria eliminada', 'warning');
    },

    // =====================
    // MUNICIPIOS
    // =====================
    
    loadMunicipios: function() {
        var list = document.getElementById('municipiosList');
        list.innerHTML = '';
        
        localMUNICIPIOS.forEach(function(mun, index) {
            var item = document.createElement('div');
            item.className = 'municipio-item';
            item.innerHTML = '\
                <div class="municipio-icon"><i class="fas fa-map-marker-alt"></i></div>\
                <div class="municipio-info">\
                    <h3>' + mun.nome + '</h3>\
                    <p>ID: ' + mun.id + '</p>\
                </div>\
                <div class="municipio-cost">\
                    <span>MN$ ' + mun.costo + '</span>\
                </div>\
                <div class="municipio-actions">\
                    <button class="btn-edit" onclick="adminPanel.editMunicipio(' + index + ')">\
                        <i class="fas fa-edit"></i>\
                    </button>\
                    <button class="btn-delete" onclick="adminPanel.deleteMunicipio(' + index + ')">\
                        <i class="fas fa-trash"></i>\
                    </button>\
                </div>\
            ';
            list.appendChild(item);
        });
        
        if (localMUNICIPIOS.length === 0) {
            list.innerHTML = '<div class="empty-state"><i class="fas fa-map"></i><p>No hay municipios configurados</p></div>';
        }
    },

    showMunicipioModal: function(isEdit) {
        document.getElementById('municipioModal').classList.remove('hidden');
        document.getElementById('municipioModalTitle').textContent = isEdit ? 'Editar Municipio' : 'Nuevo Municipio';
        if (!isEdit) {
            document.getElementById('municipioForm').reset();
            document.getElementById('municipioIndex').value = '-1';
        }
    },

    closeMunicipioModal: function() {
        document.getElementById('municipioModal').classList.add('hidden');
    },

    editMunicipio: function(index) {
        var mun = localMUNICIPIOS[index];
        
        document.getElementById('municipioIndex').value = index;
        document.getElementById('municipioId').value = mun.id;
        document.getElementById('municipioName').value = mun.nome;
        document.getElementById('municipioCost').value = mun.costo;
        
        this.showMunicipioModal(true);
    },

    saveMunicipio: function(event) {
        event.preventDefault();
        
        var index = parseInt(document.getElementById('municipioIndex').value);
        var id = document.getElementById('municipioId').value;
        var name = document.getElementById('municipioName').value;
        var cost = parseInt(document.getElementById('municipioCost').value);
        
        var munData = {
            id: id,
            nome: name,
            costo: cost
        };
        
        if (index === -1) {
            localMUNICIPIOS.push(munData);
        } else {
            localMUNICIPIOS[index] = munData;
        }
        
        // Actualizar variable global
        if (typeof MUNICIPIOS_HABANA !== 'undefined') {
            MUNICIPIOS_HABANA = JSON.parse(JSON.stringify(localMUNICIPIOS));
        }
        
        this.closeMunicipioModal();
        this.loadMunicipios();
        this.updateDashboard();
        this.showToast('Municipio guardado correctamente', 'success');
        
        return false;
    },

    deleteMunicipio: function(index) {
        if (confirm('¿Esta seguro de eliminar este municipio?')) {
            var munName = localMUNICIPIOS[index].nome;
            localMUNICIPIOS.splice(index, 1);
            
            if (typeof MUNICIPIOS_HABANA !== 'undefined') {
                MUNICIPIOS_HABANA = JSON.parse(JSON.stringify(localMUNICIPIOS));
            }
            
            this.loadMunicipios();
            this.updateDashboard();
            this.showToast('Municipio "' + munName + '" eliminado', 'warning');
        }
    },

    // =====================
    // CONTACTO
    // =====================
    
    loadContact: function() {
        document.getElementById('whatsappInput').value = localCONTACT.whatsapp;
        document.getElementById('addressInput').value = localCONTACT.address || '';
        document.getElementById('storeNameInput').value = localCONTACT.storeName;
    },

    saveWhatsApp: function() {
        var whatsapp = document.getElementById('whatsappInput').value.trim();
        
        if (!whatsapp) {
            this.showToast('Ingrese un numero de WhatsApp', 'error');
            return;
        }
        
        localCONTACT.whatsapp = whatsapp;
        
        // Actualizar variable global
        if (typeof CELULAR_EMPRESA !== 'undefined') {
            CELULAR_EMPRESA = whatsapp;
        }
        
        this.updateDashboard();
        this.showToast('WhatsApp actualizado correctamente. Recuerde exportar la configuracion para guardar los cambios permanentemente.', 'success');
    },

    saveAddress: function() {
        var address = document.getElementById('addressInput').value.trim();
        
        localCONTACT.address = address;
        
        // Actualizar variable global
        if (typeof MEU_ENDERECO !== 'undefined') {
            MEU_ENDERECO = address;
        }
        
        this.showToast('Direccion actualizada correctamente', 'success');
    },

    saveStoreName: function() {
        var name = document.getElementById('storeNameInput').value.trim();
        
        if (!name) {
            this.showToast('Ingrese un nombre para la tienda', 'error');
            return;
        }
        
        localCONTACT.storeName = name;
        this.showToast('Nombre de tienda actualizado. Este cambio requiere editar el codigo fuente manualmente.', 'info');
    },

    // =====================
    // EXPORTAR/IMPORTAR
    // =====================
    
    exportAll: function() {
        var config = {
            exportDate: new Date().toISOString(),
            version: '1.0',
            storeName: localCONTACT.storeName,
            contact: {
                whatsapp: localCONTACT.whatsapp,
                address: localCONTACT.address
            },
            categories: localCATEGORIAS,
            products: localMENU,
            shipping: localMUNICIPIOS
        };
        
        this.downloadJSON(config, 'dmima-config-completa.json');
        this.showToast('Configuracion exportada correctamente', 'success');
    },

    exportProducts: function() {
        var data = {
            exportDate: new Date().toISOString(),
            categories: localCATEGORIAS,
            products: localMENU
        };
        
        this.downloadJSON(data, 'dmima-productos.json');
        this.showToast('Productos exportados correctamente', 'success');
    },

    exportShipping: function() {
        var data = {
            exportDate: new Date().toISOString(),
            shipping: localMUNICIPIOS
        };
        
        this.downloadJSON(data, 'dmima-envios.json');
        this.showToast('Configuracion de envios exportada', 'success');
    },

    downloadJSON: function(data, filename) {
        var json = JSON.stringify(data, null, 2);
        var blob = new Blob([json], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    importConfig: function(event) {
        var file = event.target.files[0];
        if (!file) return;
        
        var self = this;
        var reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                var config = JSON.parse(e.target.result);
                
                // Importar datos
                if (config.products) {
                    localMENU = config.products;
                    MENU = JSON.parse(JSON.stringify(localMENU));
                }
                
                if (config.categories) {
                    localCATEGORIAS = config.categories;
                    if (typeof CATEGORIAS !== 'undefined') {
                        CATEGORIAS = JSON.parse(JSON.stringify(localCATEGORIAS));
                    }
                }
                
                if (config.shipping) {
                    localMUNICIPIOS = config.shipping;
                    if (typeof MUNICIPIOS_HABANA !== 'undefined') {
                        MUNICIPIOS_HABANA = JSON.parse(JSON.stringify(localMUNICIPIOS));
                    }
                }
                
                if (config.contact) {
                    localCONTACT.whatsapp = config.contact.whatsapp || localCONTACT.whatsapp;
                    localCONTACT.address = config.contact.address || localCONTACT.address;
                    
                    if (typeof CELULAR_EMPRESA !== 'undefined') {
                        CELULAR_EMPRESA = localCONTACT.whatsapp;
                    }
                }
                
                if (config.storeName) {
                    localCONTACT.storeName = config.storeName;
                }
                
                // Recargar todo
                self.loadAllSections();
                self.updateDashboard();
                self.showToast('Configuracion importada correctamente', 'success');
                
            } catch (error) {
                self.showToast('Error al leer el archivo: ' + error.message, 'error');
            }
        };
        
        reader.readAsText(file);
        event.target.value = '';
    },

    // =====================
    // UTILIDADES
    // =====================
    
    showToast: function(message, type) {
        var container = document.getElementById('toastContainer');
        
        var toast = document.createElement('div');
        toast.className = 'toast toast-' + (type || 'info');
        
        var icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-times-circle';
        if (type === 'warning') icon = 'fa-exclamation-triangle';
        
        toast.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';
        
        container.appendChild(toast);
        
        setTimeout(function() {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() {
                container.removeChild(toast);
            }, 300);
        }, 4000);
    }
};

// Event listeners para navegacion
document.addEventListener('DOMContentLoaded', function() {
    adminPanel.init();
    
    // Navegacion del sidebar
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var section = this.getAttribute('data-section');
            adminPanel.showSection(section);
        });
    });
    
    // Preview de imagen en modal de producto
    document.getElementById('productImg').addEventListener('input', function() {
        var url = this.value;
        var preview = document.getElementById('imagePreview');
        if (url) {
            preview.innerHTML = '<img src="' + url + '" alt="Preview" onerror="this.style.display=\'none\'">';
        } else {
            preview.innerHTML = '';
        }
    });
});
