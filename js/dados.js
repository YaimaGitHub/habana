// =====================================================
// DATOS DE LA TIENDA - Cabrera's Shop
// Categorias: Mercado, Embutido, Carnico, Harina-Levaduras, Liquidos, Aseo, Confituras
// =====================================================

var MENU = {
    "mercado": [
        {
            "id": "arroz-1kg",
            "img": "./img/cardapio/mercado/arroz.jpg",
            "name": "Arroz (1kg)",
            "dsc": "Arroz de primera calidad",
            "price": 250,
            "pesaje": "kilogramos"
        },
        {
            "id": "frijoles-negros-1lb",
            "img": "./img/cardapio/mercado/frijoles.jpg",
            "name": "Frijoles Negros",
            "dsc": "Frijoles negros de primera",
            "price": 180,
            "pesaje": "libras"
        },
        {
            "id": "aceite-1lt",
            "img": "./img/cardapio/mercado/aceite.jpg",
            "name": "Aceite Vegetal (1L)",
            "dsc": "Aceite vegetal para cocinar",
            "price": 450,
            "pesaje": "unidad"
        },
        {
            "id": "azucar-1kg",
            "img": "./img/cardapio/mercado/azucar.jpg",
            "name": "Azucar (1kg)",
            "dsc": "Azucar refino",
            "price": 200,
            "pesaje": "kilogramos"
        },
        {
            "id": "sal-1kg",
            "img": "./img/cardapio/mercado/sal.jpg",
            "name": "Sal (1kg)",
            "dsc": "Sal de mesa",
            "price": 80,
            "pesaje": "kilogramos"
        },
        {
            "id": "pasta-500g",
            "img": "./img/cardapio/mercado/pasta.jpg",
            "name": "Pasta (500g)",
            "dsc": "Pasta espagueti",
            "price": 150,
            "pesaje": "unidad"
        }
    ],
    "embutido": [
        {
            "id": "jamon-1lb",
            "img": "./img/cardapio/embutido/jamon.jpg",
            "name": "Jamon",
            "dsc": "Jamon de cerdo",
            "price": 450,
            "pesaje": "libras"
        },
        {
            "id": "salchicha-1lb",
            "img": "./img/cardapio/embutido/salchicha.jpg",
            "name": "Salchichas",
            "dsc": "Salchichas de cerdo",
            "price": 380,
            "pesaje": "libras"
        },
        {
            "id": "mortadela-1lb",
            "img": "./img/cardapio/embutido/mortadela.jpg",
            "name": "Mortadela",
            "dsc": "Mortadela de cerdo",
            "price": 350,
            "pesaje": "libras"
        },
        {
            "id": "chorizo-1lb",
            "img": "./img/cardapio/embutido/chorizo.jpg",
            "name": "Chorizo",
            "dsc": "Chorizo espanol",
            "price": 520,
            "pesaje": "libras"
        },
        {
            "id": "bacon-1lb",
            "img": "./img/cardapio/embutido/bacon.jpg",
            "name": "Bacon / Tocineta",
            "dsc": "Tocineta ahumada",
            "price": 600,
            "pesaje": "libras"
        }
    ],
    "carnico": [
        {
            "id": "pollo-1lb",
            "img": "./img/cardapio/carnico/pollo.jpg",
            "name": "Pollo",
            "dsc": "Pollo fresco",
            "price": 280,
            "pesaje": "libras"
        },
        {
            "id": "cerdo-1lb",
            "img": "./img/cardapio/carnico/cerdo.jpg",
            "name": "Carne de Cerdo",
            "dsc": "Carne de cerdo fresca",
            "price": 350,
            "pesaje": "libras"
        },
        {
            "id": "res-1lb",
            "img": "./img/cardapio/carnico/res.jpg",
            "name": "Carne de Res",
            "dsc": "Carne de res fresca",
            "price": 450,
            "pesaje": "libras"
        },
        {
            "id": "picadillo-1lb",
            "img": "./img/cardapio/carnico/picadillo.jpg",
            "name": "Picadillo de Res",
            "dsc": "Picadillo molido",
            "price": 400,
            "pesaje": "libras"
        },
        {
            "id": "pescado-1lb",
            "img": "./img/cardapio/carnico/pescado.jpg",
            "name": "Pescado Fresco",
            "dsc": "Pescado del dia",
            "price": 320,
            "pesaje": "libras"
        },
        {
            "id": "camarones-1lb",
            "img": "./img/cardapio/carnico/camarones.jpg",
            "name": "Camarones",
            "dsc": "Camarones frescos",
            "price": 800,
            "pesaje": "libras"
        }
    ],
    "harina-levaduras": [
        {
            "id": "harina-trigo-1kg",
            "img": "./img/cardapio/harina/harina-trigo.jpg",
            "name": "Harina de Trigo (1kg)",
            "dsc": "Harina de trigo para todo uso",
            "price": 180,
            "pesaje": "kilogramos"
        },
        {
            "id": "harina-maiz-1kg",
            "img": "./img/cardapio/harina/harina-maiz.jpg",
            "name": "Harina de Maiz (1kg)",
            "dsc": "Harina de maiz precocida",
            "price": 200,
            "pesaje": "kilogramos"
        },
        {
            "id": "levadura-seca",
            "img": "./img/cardapio/harina/levadura.jpg",
            "name": "Levadura Seca",
            "dsc": "Levadura seca instantanea",
            "price": 120,
            "pesaje": "unidad"
        },
        {
            "id": "polvo-hornear",
            "img": "./img/cardapio/harina/polvo-hornear.jpg",
            "name": "Polvo de Hornear",
            "dsc": "Polvo de hornear Royal",
            "price": 150,
            "pesaje": "unidad"
        },
        {
            "id": "maicena-200g",
            "img": "./img/cardapio/harina/maicena.jpg",
            "name": "Maicena (200g)",
            "dsc": "Fecula de maiz",
            "price": 100,
            "pesaje": "unidad"
        }
    ],
    "liquidos": [
        {
            "id": "leche-1lt",
            "img": "./img/cardapio/liquidos/leche.jpg",
            "name": "Leche (1L)",
            "dsc": "Leche entera",
            "price": 250,
            "pesaje": "unidad"
        },
        {
            "id": "agua-5lt",
            "img": "./img/cardapio/liquidos/agua.jpg",
            "name": "Agua (5L)",
            "dsc": "Agua purificada",
            "price": 80,
            "pesaje": "unidad"
        },
        {
            "id": "refresco-2lt",
            "img": "./img/cardapio/liquidos/refresco.jpg",
            "name": "Refresco (2L)",
            "dsc": "Refresco de cola",
            "price": 180,
            "pesaje": "unidad"
        },
        {
            "id": "jugo-1lt",
            "img": "./img/cardapio/liquidos/jugo.jpg",
            "name": "Jugo Natural (1L)",
            "dsc": "Jugo de frutas natural",
            "price": 220,
            "pesaje": "unidad"
        },
        {
            "id": "cerveza-lata",
            "img": "./img/cardapio/liquidos/cerveza.jpg",
            "name": "Cerveza (lata)",
            "dsc": "Cerveza Bucanero",
            "price": 120,
            "pesaje": "unidad"
        },
        {
            "id": "ron-750ml",
            "img": "./img/cardapio/liquidos/ron.jpg",
            "name": "Ron Havana Club (750ml)",
            "dsc": "Ron anejo 3 anos",
            "price": 800,
            "pesaje": "unidad"
        }
    ],
    "aseo": [
        {
            "id": "jabon-bano",
            "img": "./img/cardapio/aseo/jabon.jpg",
            "name": "Jabon de Bano",
            "dsc": "Jabon de tocador",
            "price": 80,
            "pesaje": "unidad"
        },
        {
            "id": "detergente-1kg",
            "img": "./img/cardapio/aseo/detergente.jpg",
            "name": "Detergente (1kg)",
            "dsc": "Detergente en polvo",
            "price": 250,
            "pesaje": "kilogramos"
        },
        {
            "id": "cloro-1lt",
            "img": "./img/cardapio/aseo/cloro.jpg",
            "name": "Cloro (1L)",
            "dsc": "Cloro desinfectante",
            "price": 100,
            "pesaje": "unidad"
        },
        {
            "id": "shampoo-500ml",
            "img": "./img/cardapio/aseo/shampoo.jpg",
            "name": "Shampoo (500ml)",
            "dsc": "Shampoo para el cabello",
            "price": 300,
            "pesaje": "unidad"
        },
        {
            "id": "pasta-dental",
            "img": "./img/cardapio/aseo/pasta-dental.jpg",
            "name": "Pasta Dental",
            "dsc": "Pasta dental con fluor",
            "price": 150,
            "pesaje": "unidad"
        },
        {
            "id": "papel-higienico",
            "img": "./img/cardapio/aseo/papel.jpg",
            "name": "Papel Higienico (4 rollos)",
            "dsc": "Papel higienico suave",
            "price": 180,
            "pesaje": "unidad"
        }
    ],
    "confituras": [
        {
            "id": "chocolate-100g",
            "img": "./img/cardapio/confituras/chocolate.jpg",
            "name": "Chocolate (100g)",
            "dsc": "Chocolate con leche",
            "price": 200,
            "pesaje": "unidad"
        },
        {
            "id": "galletas-paquete",
            "img": "./img/cardapio/confituras/galletas.jpg",
            "name": "Galletas (paquete)",
            "dsc": "Galletas dulces",
            "price": 120,
            "pesaje": "unidad"
        },
        {
            "id": "caramelos-100g",
            "img": "./img/cardapio/confituras/caramelos.jpg",
            "name": "Caramelos (100g)",
            "dsc": "Caramelos surtidos",
            "price": 80,
            "pesaje": "unidad"
        },
        {
            "id": "mermelada-250g",
            "img": "./img/cardapio/confituras/mermelada.jpg",
            "name": "Mermelada (250g)",
            "dsc": "Mermelada de fresa",
            "price": 180,
            "pesaje": "unidad"
        },
        {
            "id": "dulce-leche-250g",
            "img": "./img/cardapio/confituras/dulce-leche.jpg",
            "name": "Dulce de Leche (250g)",
            "dsc": "Dulce de leche artesanal",
            "price": 220,
            "pesaje": "unidad"
        },
        {
            "id": "helado-1lt",
            "img": "./img/cardapio/confituras/helado.jpg",
            "name": "Helado (1L)",
            "dsc": "Helado de vainilla",
            "price": 350,
            "pesaje": "unidad"
        }
    ]
};

// Metadata de las categorias: nombre visible, icono y clave interna
var CATEGORIAS = {
    "mercado":          { nome: "Mercado", icone: "fas fa-shopping-basket" },
    "embutido":         { nome: "Embutido", icone: "fas fa-bacon" },
    "carnico":          { nome: "Carnico", icone: "fas fa-drumstick-bite" },
    "harina-levaduras": { nome: "Harina-Levaduras", icone: "fas fa-bread-slice" },
    "liquidos":         { nome: "Liquidos", icone: "fas fa-tint" },
    "aseo":             { nome: "Aseo", icone: "fas fa-soap" },
    "confituras":       { nome: "Confituras", icone: "fas fa-cookie" }
};

// Municipios reales de La Habana con costo de envio (en MN / CUP)
var MUNICIPIOS_HABANA = [
    { id: 'habana-vieja',        nome: 'Habana Vieja',                   costo: 200 },
    { id: 'centro-habana',       nome: 'Centro Habana',                  costo: 200 },
    { id: 'plaza',               nome: 'Plaza de la Revolucion',         costo: 250 },
    { id: 'cerro',               nome: 'Cerro',                          costo: 250 },
    { id: 'diez-de-octubre',     nome: 'Diez de Octubre',                costo: 250 },
    { id: 'playa',               nome: 'Playa',                          costo: 350 },
    { id: 'marianao',            nome: 'Marianao',                       costo: 400 },
    { id: 'la-lisa',             nome: 'La Lisa',                        costo: 450 },
    { id: 'boyeros',             nome: 'Boyeros',                        costo: 400 },
    { id: 'arroyo-naranjo',      nome: 'Arroyo Naranjo',                 costo: 400 },
    { id: 'san-miguel',          nome: 'San Miguel del Padron',          costo: 350 },
    { id: 'guanabacoa',          nome: 'Guanabacoa',                     costo: 400 },
    { id: 'regla',               nome: 'Regla',                          costo: 300 },
    { id: 'habana-del-este',     nome: 'Habana del Este',                costo: 450 },
    { id: 'cotorro',             nome: 'Cotorro',                        costo: 500 }
];

// Configuracion global de la tienda
var CONFIG_TIENDA = {
    tiempoEntrega: 4,       // Tiempo maximo de entrega en horas
    tiempoCancelacion: 4,   // Tiempo maximo para cancelar en horas
    recargoAdmin: false,    // Recargo administrativo desactivado
    numeroWhatsapp: '5355135487'
};

// Cargar configuracion guardada si existe
(function() {
    var datosGuardados = localStorage.getItem('cabrerasShopData');
    if (datosGuardados) {
        try {
            var datos = JSON.parse(datosGuardados);
            if (datos.MENU) MENU = datos.MENU;
            if (datos.CATEGORIAS) CATEGORIAS = datos.CATEGORIAS;
            if (datos.MUNICIPIOS_HABANA) MUNICIPIOS_HABANA = datos.MUNICIPIOS_HABANA;
            if (datos.CONFIG) CONFIG_TIENDA = datos.CONFIG;
        } catch (e) {
            console.error('Error cargando datos guardados:', e);
        }
    }
})();
