using { myFinal as my } from '../db/schema'; //as projection on

service api  {
    entity Orders           as projection on my.Orders;
    entity Products         as projection on my.Products;
    entity Order_Details    as projection on my.Order_Details;

    entity Vista as projection on Products{
        ProductName as nombre,
        order.UnitPrice as precioUnidad,
        order.Quantity as cantidad,
        order.Discount as descuento
    };

    action ManejoStock(product_ID : Integer, cantidad : Integer) returns String;
}

/*
Notas:

En postman para cada ejercicio:

1)  GET de la Vista

2)  GET de Orders para ver el AuxID

3)  POST de ManejoStock con:

{
    "product_ID": 1,
    "cantidad": 4
}

o el ID o cantidad deseada (en el js hay notas de las respuestas de ManejoStock)
*/