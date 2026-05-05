/**
 * D'Mima - Datos Compartidos
 * Este archivo contiene los datos de configuracion que son compartidos
 * entre la tienda (index.html) y el panel de control (admin.html)
 * Generado desde el Panel de Control: 5/5/2026, 3:16:08
 */

// Numero de WhatsApp para pedidos (sin el +)
var CELULAR_EMPRESA = '5363282554';

// Direccion de la tienda
var MEU_ENDERECO = null;

// Municipios de La Habana con costo de envio (en MN / CUP)
var MUNICIPIOS_HABANA = [
    { id: 'Guanabacoa', nome: 'Guanabacoa (Nalón - Mikito - Hata - Roble)', costo: 1000 },
    { id: 'centro-habana', nome: 'Centro Habana', costo: 2000 },
    { id: 'Guanabacoa', nome: 'Guanabacoa (Calzada vieja)', costo: 500 },
    { id: 'cerro', nome: 'Cerro', costo: 250 },
    { id: 'diez-de-octubre', nome: 'Diez de Octubre', costo: 2500 },
    { id: 'playa', nome: 'Playa', costo: 350 },
    { id: 'Guanabacoa', nome: 'Guanabacoa (Reparto Chiva)', costo: 400 },
    { id: 'Guanabacoa', nome: 'Guanabacoa (Parque - Roble)', costo: 700 },
    { id: 'Guanabacoa', nome: 'Guanabacoa Machaco - Mikito', costo: 700 },
    { id: 'Guanabacoa', nome: 'Reparto Mañana', costo: 450 },
    { id: 'san-miguel', nome: 'San Miguel del Padrón', costo: 2500 },
    { id: 'guanabacoa ', nome: 'Guanabacoa (Semáforo-Machaco)', costo: 500 },
    { id: 'regla', nome: 'Regla', costo: 200 },
    { id: 'habana-del-este', nome: 'Habana del Este (Bahía)', costo: 1000 },
    { id: 'Guanabacoa', nome: 'Guanabacoa (Habana nueva)', costo: 300 },
    { id: 'Vedado', nome: 'Vedado', costo: 2500 },
    { id: 'Villa Panamericana', nome: 'Villa Panamericana', costo: 1500 },
    { id: 'Reparto Camilo Cienfuegos', nome: 'Reparto Camilo Cienfuegos', costo: 2000 }
];

// Metadata de las categorias: nombre visible, icono y clave interna
var CATEGORIAS = {
    "burgers": { nome: "Mercado", icone: "fas fa-store" },
    "pizzas": { nome: "Quesos y Embutidos", icone: "fas fa-bacon" },
    "churrasco": { nome: "Carnico", icone: "fas fa-drumstick-bite" },
    "steaks": { nome: "Harinas y Levaduras", icone: "fas fa-bread-slice" },
    "bebidas": { nome: "Liquidos", icone: "fas fa-tint" },
    "sobremesas": { nome: "Aseo", icone: "fas fa-soap" },
    "outros": { nome: "Confituras", icone: "fas fa-candy-cane" },
    "Condimentos": { nome: "Salsas, condimentos y sazones", icone: "fas fa-pepper-hot" },
    "Granos y Pastas": { nome: "Granos y Pastas", icone: "fas fa-seedling" }
};

// Metodos de pago disponibles en la tienda
var METODOS_PAGO = [
    {
        "id": "efectivo",
        "nombre": "Pago en efectivo",
        "icono": "fas fa-money-bill-wave",
        "descripcion": "Paga al momento de recibir",
        "habilitado": true
    },
    {
        "id": "transferencia",
        "nombre": "Pago por transferencia",
        "icono": "fas fa-university",
        "descripcion": "Transferencia bancaria",
        "habilitado": false
    }
];

// Informacion del punto de recogida
var PUNTO_RECOGIDA = {
    "nombre": "D'Mima - Tienda de Alimentos",
    "direccion": "Calle Perdomo #425 entre Maceo y Adrian, Regla, La Habana.",
    "horario": "Lun a Sab, 9:00 AM - 7:00 PM",
    "nota": "Te contactaremos por telefono cuando tu pedido este listo para recoger."
};
