using { Currency, cuid } from '@sap/cds/common'; //?$expand=productoT($expand=producto_tienda($expand=precio))
namespace myShop;

/*
Action para actualizar precios por conjunto de productos

Cuando creo un dueño por url le paso las tiendas para q cree la relación

Control de stock de productos: action q retira cantidades de productos y agrega cantidad, con id y cantidad. Los productos 
tendrán un min y máximo q disparara alerta al llegar a los mismos.
*/



/*
aspect Price {
    value : Decimal(10, 3);
}

entity Cronometrajes : cuid, Price {
    //key ID      : Integer;
    tiempo      : Segundos;
    dinero      : Price;
}
*/


//-------------------------------------------XxxX-------------------------------------------//

entity Duenios { //: cuid {
    key ID  : Integer;
    nombre  : String(50);
    edad    : Integer;
    tiendaD : Association to many Duenios_Tiendas on tiendaD.duenio_tienda = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Duenios_Tiendas {
    key duenio_tienda : Association to Duenios;
    key tienda_duenio : Association to Tiendas;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Tiendas { //: cuid {
    key ID      : Integer;
    nombre      : String(50);
    direccion   : String(50);
    duenio      : Association to many Duenios_Tiendas on duenio.tienda_duenio = $self;
    productoT   : Association to many Tiendas_Productos_Stock on productoT.tienda_producto = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Tiendas_Productos_Stock {
    cantidad            : Integer;
    max                 : Integer;
    min                 : Integer;
    key tienda_producto : Association to Tiendas;
    key producto_tienda : Association to Productos;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Productos { //: cuid {
    key ID      : Integer;
    nombre      : String(50);
    precio      : Association to Precios;
    marca       : Association to Marcas;
    subTipo     : Association to SubTipos;
    tiendaP     : Association to many Tiendas_Productos_Stock on tiendaP.producto_tienda = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Marcas {
    key ID      : Integer;
    nombre      : String(50);
    producto    : Association to many Productos on producto.marca = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

entity SubTipos {
    key ID      : Integer;
    nombre      : String(50);
    tipo        : Association to Tipos;
    producto    : Association to many Productos on producto.subTipo = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Tipos {
    key ID      : Integer;
    nombre      : String(50);
    subtipo     : Association to many SubTipos on subtipo.tipo = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

// type Currency : Association to sap.common.Currencies;


// aspect MiCurrency {
//     valor       : Decimal;
//     currency    : Currency;
// }

entity Precios { //: cuid {
    key ID      : Integer;
    //precio    : MiCurrency;
    costo       : Integer;
    moneda      : String(50);
    productoP   : Association to many Productos on productoP.precio = $self;
}