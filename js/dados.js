// Factor de conversion: 1 kg = 2.20462 lb
var CONVERSION_LB_KG = 2.20462;

var MENU = {
    "churrasco": [
        {
            "id": "carne-de-res",
            "img": "./img/cardapio/Carnico/carne-res.jpg",
            "name": "Carne de Res",
            "dsc": "Carne de res fresca de primera calidad, los paquetes vienen por más de 2Lb",
            "price": 1650,
            "unit": "lb"
        },
        {
            "id": "pollo-entero",
            "img": "./img/cardapio/carnes/pollo.jpg",
            "name": "Pollo Entero",
            "dsc": "Pollo fresco listo para cocinar",
            "price": 320,
            "unit": "lb"
        },
        {
            "id": "cerdo-pierna",
            "img": "./img/cardapio/carnes/cerdo.jpg",
            "name": "Pierna de Cerdo",
            "dsc": "Pierna de cerdo fresca",
            "price": 380,
            "unit": "lb"
        },
        {
            "id": "ribs-brisket-and-burnt-ends",
            "img": "./img/cardapio/Carnico/Higado de pollo.jpg",
            "name": "Higado de pollo",
            "dsc": "Higado de pollo",
            "price": 780,
            "unit": "unidad"
        },
        {
            "id": "woodford-reserve-mint-julep-syrup",
            "img": "./img/cardapio/Carnico/Hígado de res.jpg",
            "name": "Hígado de res",
            "dsc": "Hígado de res",
            "price": 900,
            "unit": "unidad"
        },
        {
            "id": "guys-caliente-margaritas-for-12",
            "img": "./img/cardapio/Carnico/Carton de huevo.webp",
            "name": "Carton de huevo",
            "dsc": "Carton de huevo",
            "price": 2850,
            "unit": "unidad"
        },
        {
            "id": "sea-salted-caramel-swirl-cheesecake",
            "img": "./img/cardapio/Carnico/Huevos Sueltos de Gallina.webp",
            "name": "Huevos Sueltos de Gallina",
            "dsc": "Huevos Sueltos de Gallina",
            "price": 100,
            "unit": "unidad"
        }
    ],
    "burgers": [
        {
            "id": "the-gramercy-tavern-burger-4-pack",
            "img": "./img/cardapio/Mercado/aseite sublime.jpg",
            "name": "Aceite 900Ml",
            "dsc": "Aceite Sublime del gordo",
            "price": 1190,
            "unit": "unidad"
        },
        {
            "id": "shake-shack-shackburger-8-pack",
            "img": "./img/cardapio/Mercado/aceituna con hueso.jpg",
            "name": "Aceituna Verde Con Hueso",
            "dsc": "Aceituna Verde Con Hueso",
            "price": 1000,
            "unit": "unidad"
        },
        {
            "id": "gotts-cheeseburger-kit-for-4",
            "img": "./img/cardapio/Mercado/Adobo con pimienta.jpg",
            "name": "Adobo con pimienta",
            "dsc": "Adobo con pimienta",
            "price": 1800,
            "unit": "unidad"
        },
        {
            "id": "le-big-matt-kit-for-6",
            "img": "./img/cardapio/Mercado/Ajo_troceado_BADIA.jpg",
            "name": "Ajo_troceado_BADIA.jpg",
            "dsc": "Ajo troceado BADIA",
            "price": 880,
            "unit": "unidad"
        },
        {
            "id": "shake-shack-shackburger-16-pack",
            "img": "./img/cardapio/Mercado/Arroz Guayanés.jpg",
            "name": "Arroz Guayanés por libra",
            "dsc": "Arroz Guayanés por libra",
            "price": 290,
            "unit": "lb"
        },
        {
            "id": "shake-shack-shackburger-16-packkk",
            "img": "./img/cardapio/Mercado/Paquete de Arroz (1kg).jpg",
            "name": "Paquete de Arroz (1kg)",
            "dsc": "Paquete de Arroz (1kg)",
            "price": 620,
            "unit": "kg"
        },
        {
            "id": "double-stack-burger-kit-for-4",
            "img": "./img/cardapio/Mercado/Atun en Aceite 140 gramos.webp",
            "name": "Atun en Aceite 140 gramos",
            "dsc": "Atun en Aceite 140 gramos",
            "price": 450,
            "unit": "unidad"
        },
        {
            "id": "goldbelly-burger-bash-pack",
            "img": "./img/cardapio/Mercado/Azucar 1KG Energy.webp",
            "name": "Azucar 1KG",
            "dsc": "Azucar 1KG",
            "price": 690,
            "unit": "kg"
        },
        {
            "id": "burger-au-poivre-kit-4-pack",
            "img": "./img/cardapio/Mercado/Café SELLO ROJO.webp",
            "name": "Café Sello Rojo",
            "dsc": "Café SELLO ROJO",
            "price": 1850,
            "unit": "unidad"
        },
        {
            "id": "goldbelly-burger-blend-4-lbs",
            "img": "./img/cardapio/Mercado/CAFÉ CANDADO.webp",
            "name": "Café Candado",
            "dsc": "CAFÉ CANDADO",
            "price": 1900,
            "unit": "unidad"
        },
        {
            "id": "gotts-complete-cheeseburger-kit-for-8",
            "img": "./img/cardapio/Mercado/CAFÉ PILÓN.webp",
            "name": "Café Pilón",
            "dsc": "Café Pilón",
            "price": 1850,
            "unit": "unidad"
        },
        {
            "id": "complete",
            "img": "./img/cardapio/Mercado/Mayonesa Celorio (500ML).webp",
            "name": "Mayonesa Celorio (500ML)",
            "dsc": "Mayonesa Celorio (500ML)",
            "price": 1650,
            "unit": "unidad"
        },
        {
            "id": "1",
            "img": "./img/cardapio/Mercado/Chícharos verdes Del campo.webp",
            "name": "Chícharos verdes Del campo (500g)",
            "dsc": "Chícharos verdes Del campo (500g)",
            "price": 650,
            "unit": "unidad"
        },
        {
            "id": "15259-german-chocolate-killer-brownie-tin-pack",
            "img": "./img/cardapio/Mercado/Coditos Doga 500g.jpg",
            "name": "Coditos Doga 500g",
            "dsc": "Coditos Doga 500g",
            "price": 300,
            "unit": "unidad"
        },
        {
            "id": "jacques-world-famous-chocolate-chip-cookies",
            "img": "./img/cardapio/Mercado/COMINO_MOLIDO.jpg",
            "name": "Comino Molido",
            "dsc": " COMINO MOLIDO",
            "price": 800,
            "unit": "unidad"
        },
        {
            "id": "brooklyn-blackout-cookie-brownie-combo-pack-2-tins",
            "img": "./img/cardapio/Mercado/Paquete de espaguetis.webp",
            "name": "Paquete de espaguetis",
            "dsc": "Paquete de espaguetis",
            "price": 300,
            "unit": "unidad"
        },
        {
            "id": "best-seller-cupcake-dozen",
            "img": "./img/cardapio/Mercado/Frijoles blancos Del Campo (500g).jpg",
            "name": "Frijoles blancos Del Campo (500g)",
            "dsc": "Frijoles blancos Del Campo (500g)",
            "price": 820,
            "unit": "unidad"
        },
        {
            "id": "choose-your-own-ice-cream-donuts-6-pack",
            "img": "./img/cardapio/Mercado/Frijoles Colorados.jpg",
            "name": "Frijoles Colorados",
            "dsc": "Frijoles Colorados",
            "price": 375,
            "unit": "lb"
        },
        {
            "id": "005-kings-carolina-oink-sampler",
            "img": "./img/cardapio/Mercado/Frijol Negro Rainha.webp",
            "name": "Frijol Negro 1Kg Paquete",
            "dsc": "Frijol Negro Rainha",
            "price": 750,
            "unit": "unidad"
        },
        {
            "id": "garbanzos-del-campo-500g",
            "img": "./img/cardapio/Mercado/Garbanzos del campo 500g.webp",
            "name": "Garbanzos del campo 500g",
            "dsc": "Garbanzos del campo 500g",
            "price": 700,
            "unit": "unidad"
        },
        {
            "id": "gelatina-de-diferentes-sabores",
            "img": "./img/cardapio/Mercado/Caja de 3 Gelatinas.webp",
            "name": "Gelatina de diferentes sabores",
            "dsc": "Gelatina de piña",
            "price": 280,
            "unit": "unidad"
        }
    ],
    "sobremesas": [
        {
            "id": "luigis-original-cannoli-pie",
            "img": "./img/cardapio/Aseo/Detergente Marwa 400g.webp",
            "name": "Detergente Marwa 400g",
            "dsc": "Detergente Marwa 400g",
            "price": 450,
            "unit": "unidad"
        },
        {
            "id": "sea-salted-caramel-swirl-cheesecake",
            "img": "./img/cardapio/Aseo/Detergente Líquido KAPITAL.jpg",
            "name": "Detergente Líquido KAPITAL 750G",
            "dsc": "Detergente Líquido KAPITAL 750G",
            "price": 740,
            "unit": "unidad"
        }
    ],
    "bebidas": [],
    "outros": [
        {
            "id": "15259-german-chocolate-killer-brownie-tin-pack",
            "img": "./img/cardapio/outros/Vitamina C (jarabe).jpg",
            "name": "Vitamina C (jarabe)",
            "dsc": "German Chocolate Killer Brownie®",
            "price": 700,
            "unit": "unidad"
        },
        {
            "id": "jacques-world-famous-chocolate-chip-cookies",
            "img": "./img/cardapio/outros/VITAMINA-C-GOTAS-100-MG--COASP_L.jpg",
            "name": "Vitamina C (gotas)",
            "dsc": "Jacques' World Famous Chocolate Chip Cookies - 6 Pack",
            "price": 600,
            "unit": "unidad"
        },
        {
            "id": "luigis-original-cannoli-pie",
            "img": "./img/cardapio/outros/Vitamina C.jpg",
            "name": "Vitamina C",
            "dsc": "Original Cannoli Pie",
            "price": 250,
            "unit": "unidad"
        },
        {
            "id": "brooklyn-blackout-cookie-brownie-combo-pack-2-tins",
            "img": "./img/cardapio/outros/aceite-higado-de-bacalao-x10-tabletas-1.jpg",
            "name": "Aceite Higado de Bacalao",
            "dsc": "Brooklyn Blackout Cookie + Brownie Combo Pack - 2 Tins",
            "price": 150,
            "unit": "unidad"
        },
        {
            "id": "best-seller-cupcake-dozen",
            "img": "./img/cardapio/outros/Óvulos Clotrimazol.jpg",
            "name": "Ovulos Clotrimazol",
            "dsc": "Best Seller Cupcake Dozen",
            "price": 90,
            "unit": "unidad"
        },
        {
            "id": "choose-your-own-ice-cream-donuts-6-pack",
            "img": "./img/cardapio/outros/Óvulos Clotrimazol+nistatina.jpg",
            "name": "Ovulos Metronidazol + Nistatina",
            "dsc": "Choose Your Own Ice Cream Donuts - 6 Pack",
            "price": 90,
            "unit": "unidad"
        },
        {
            "id": "Amitriptilina",
            "img": "./img/cardapio/outros/Amitriptilina 25 mg.jpg",
            "name": "Amitriptilina 25 mg",
            "dsc": "Jewish Classics Dessert Pack",
            "price": 420,
            "unit": "unidad"
        },
        {
            "id": "super",
            "img": "./img/cardapio/outros/super b-complex.jpg",
            "name": "Super B-Complex (pomo)",
            "dsc": "Jewish Classics Dessert Pack",
            "price": 600,
            "unit": "unidad"
        },
        {
            "id": "super1",
            "img": "./img/cardapio/outros/mentol muscle rub.jpg",
            "name": "Mentol Muscle Rub (crema)",
            "dsc": "Jewish Classics Dessert Pack",
            "price": 700,
            "unit": "unidad"
        },
        {
            "id": "super2",
            "img": "./img/cardapio/outros/Prednisolona.jpg",
            "name": "Prednisolona",
            "dsc": "Choose Your Own Deep Dish Pizza - 3 Pack",
            "price": 300,
            "unit": "unidad"
        },
        {
            "id": "17481-jewish-dessert-3-pack",
            "img": "./img/cardapio/Confituras/Galletas Crokantinas.webp",
            "name": "Galletas Crokantinas ",
            "dsc": "Galletas Crokantinas Paquete entero",
            "price": 1250,
            "unit": "unidad"
        },
        {
            "id": "dessert-bar-care-package",
            "img": "./img/cardapio/Confituras/Paquetico de Galletas de Soda Crokantinas.jpeg",
            "name": "Galletas sueltas de Soda Crokantinas",
            "dsc": "Galletas sueltas de Soda Crokantinas",
            "price": 190,
            "unit": "unidad"
        }
    ],
    "pizzas": [
        {
            "id": "2-lou-malnatis-deep-dish-pizzas",
            "img": "./img/cardapio/Arinas y Levaduras/NAC-HARINA-260121-01.webp",
            "name": "Harina por libra",
            "dsc": "Harina por libra",
            "price": 350,
            "unit": "lb"
        },
        {
            "id": "23699-choose-your-own-thin-crust-pizza-4-pack",
            "img": "./img/cardapio/antiinflamatorios/paracetamol.jpg",
            "name": "Paracetamol",
            "dsc": "Choose Your Own Thin Crust Pizza - 4 Pack",
            "price": 200,
            "unit": "unidad"
        },
        {
            "id": "choose-your-own-new-haven-style-pizza-6-pack",
            "img": "./img/cardapio/antiinflamatorios/IBUPROFENO-MK-TAB-800MG-CJAX-30UND-81001065-1.jpg",
            "name": "Ibuprofeno",
            "dsc": "New Haven-Style Pizza - 6 Pack (Choose Your Own)",
            "price": 200,
            "unit": "unidad"
        },
        {
            "id": "6-lou-malnatis-deep-dish-pizzas",
            "img": "./img/cardapio/antiinflamatorios/Paracetamol (jarabe).jpg",
            "name": "Paracetamol (jarabe)",
            "dsc": "6 Lou Malnati's Deep Dish Pizzas",
            "price": 800,
            "unit": "unidad"
        },
        {
            "id": "wood-fired-pizzas-best-seller-4-pack",
            "img": "./img/cardapio/antiinflamatorios/Ibuprofeno (jarabe).jpg",
            "name": "Ibuprofeno (jarabe)",
            "dsc": "Wood Fired Pizzas Best Seller - 4 Pack",
            "price": 800,
            "unit": "unidad"
        },
        {
            "id": "hong-kong-boba-tea-kit-for-6",
            "img": "./img/cardapio/Quesos y Embutidos/QUESO-GOUDA-VIMA.webp",
            "name": "Queso Gouda Vima 3Kg Aprox.",
            "dsc": "Queso Gouda Vima 3Kg Aprox.",
            "price": 14500,
            "unit": "unidad"
        }
    ],
    "steaks": [
        {
            "id": "california-reserve-filet-mignon-steaks-gift-box",
            "img": "./img/cardapio/Antidepresivos/ENALAPRIL-MALEATO-20MG-CAJA-POR-20-TABLETAS-CON-BLISTER.jpg",
            "name": "Enalapril",
            "dsc": "California Reserve Filet Mignon Steaks Gift Box",
            "price": 200,
            "unit": "unidad"
        },
        {
            "id": "steaks-and-cakes-date-night-dinner-for-2",
            "img": "./img/cardapio/Antidepresivos/Captopril.png",
            "name": "Captopril",
            "dsc": "Steaks and Cakes Date Night Dinner for 2",
            "price": 200,
            "unit": "unidad"
        },
        {
            "id": "Prime-holiday-steak-sampler-for-10-12",
            "img": "./img/cardapio/Antidepresivos/Furosemida.jpg",
            "name": "Furosemida",
            "dsc": "Chef Matt's Steak Sampler for 10-12",
            "price": 220,
            "unit": "unidad"
        }
    ]
}
