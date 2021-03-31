using { myShop as my } from '../db/schema'; //as projection on
/*
service api  {

    entity Duenios as projection on my.Duenios{*};
    entity Tiendas as projection on my.Tiendas{*};
    entity Productos as projection on my.Productos{*};
    entity Precios as projection on my.Precios{*};
    entity Duenios_Tiendas as projection on my.Duenios_Tiendas{*};
    entity Tiendas_Productos_Stock as projection on my.Tiendas_Productos_Stock{*};
    entity Marcas as projection on my.Marcas{*};
    entity SubTipos as projection on my.SubTipos{*};
    entity Tipos as projection on my.Tipos{*};

    entity VistaTienda as select from Tiendas{
        nombre as nombre_de_tienda,
        duenio.duenio_tienda.nombre as nombre_de_duenio,
        productoT.producto_tienda.nombre as nombre_de_producto,
        productoT.producto_tienda.precio.costo as costo_de_producto
        //productoT.producto_tienda.precio.precio as costo_de_producto
    };

    entity VistaProductos as select from Productos {
        nombre                  as nombre_Producto,
        marca.nombre            as nombre_Marca,
        subTipo.tipo.nombre     as nombre_Tipo,
        subTipo.nombre          as nombre_SubTipo
    } where marca.nombre='LaSerenisima'; //excuding{}; tambien va aca

    entity VistaRangoPrecio as select from Productos{ //falta my.
        nombre          as nombre_Producto,
        precio.costo    as costo_Precio
    } where precio.costo < 600 and precio.costo > 400;

    action PrecioConj(marcaID : Integer, subtipoID : Integer, precioID : Integer) returns String;
    action ManejoStock(tienda : Integer, producto : Integer, cambio : Integer) returns String; // valor1 : Libros : nombre, valor2 : Libros : autor
}*/

@(path: '/GeneralService')
service genServise @(_requires : 'admin') {
    entity Duenios as projection on my.Duenios;
    @readonly
    entity Tiendas as projection on my.Tiendas;
}

@(path: '/AuthService')
service apiServise @(requires : 'authenticated-user') {
    entity Duenios as projection on my.Duenios;
    @readonly
    entity Tiendas as projection on my.Tiendas;
}

@(path: '/AdminService')
service authServise @(requires : 'admin') {
    entity Duenios as projection on my.Duenios;
    @readonly
    entity Tiendas as projection on my.Tiendas;
}

@(path: '/ScopeService')
service scopeServise @(requires : 'Scope') {
    entity Duenios as projection on my.Duenios;
    @readonly
    entity Tiendas as projection on my.Tiendas;
}