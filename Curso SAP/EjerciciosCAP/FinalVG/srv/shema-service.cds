using { myFinal as my } from '../db/schema';

@(path: '/GeneralService')
service genServise @(_requires : 'admin') {
    entity Orders           as projection on my.Orders;
    entity Products         as projection on my.Products;
    entity Order_Details    as projection on my.Order_Details;

    entity Vista as projection on Products{
        ProductName as nombre,
        relOrder.UnitPrice as precioUnidad,
        relOrder.Quantity as cantidad,
        relOrder.Discount as descuento
    };

    action ManejoStock(productID : Integer, orderID : Integer, cantidad : Integer) returns String;
}

@(path: '/AuthService')
service apiServise @(requires : 'authenticated-user') {
    entity Orders           as projection on my.Orders;
    entity Products         as projection on my.Products;
    entity Order_Details    as projection on my.Order_Details;
}

@(path: '/ScopeService')
service scopeServise @(requires : 'Scope') {
    entity Orders           as projection on my.Orders;
    entity Products         as projection on my.Products;
    entity Order_Details    as projection on my.Order_Details;
}

// @(path: '/AdminService')
// service authServise @(requires : 'admin') {
//     entity Books as select from my.Books;
//     @readonly
//     entity Authors as select from my.Authors;
// }

/*
Notas:

En postman para cada ejercicio:

0) La carga de datos esta en server.js

1)  GET de la Vista

2)  GET de Orders para ver el AuxID

3)  POST de ManejoStock con:

{
    "productID": 1,
    "orderID": 10285,
    "cantidad": 3
}

(en el js hay notas de las respuestas de ManejoStock)
*/