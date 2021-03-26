const cds = require('@sap/cds');
const axios = require('axios');             // npm install axios
const https = require('https');             // npm install https
const agent = new https.Agent({rejectUnauthorized: false});
const { Orders, Products, Order_Details } = cds.entities; //Short


// Notas en servicio


async function cargar (entidad, info, texto) {
    try {
        await cds.run(INSERT.into(entidad).entries(info));
        console.log(`Terminado ${texto}`);
    } catch (err) {
        console.log(err);
        console.log("TERROR1");
    }
}

axios.get('https://services.odata.org/Experimental/Northwind/Northwind.svc/Products', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    httpsAgent: agent,
    rejectUnauthorized: false
    })
    .then(async function (response) {
        // handle success
        const respuestas = response.data.value;
        let entrada = [];
        for (let res of respuestas) {
            entrada.push({
                ProductID           : res.ProductID,
                ProductName         : res.ProductName,
                QuantityPerUnit     : res.QuantityPerUnit,
                UnitPrice           : res.UnitPrice,
                UnitsInStock        : res.UnitsInStock,
                UnitsOnOrder        : res.UnitsOnOrder,
            });
        }
        cargar(Products, entrada, "Products");
        
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        console.log("TERROR2");
    })
    .then(function () {
        // always executed
});


axios.get('https://services.odata.org/Experimental/Northwind/Northwind.svc/Orders', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    httpsAgent: agent,
    rejectUnauthorized: false
    })
    .then(async function (response) {
        // handle success
        const respuestas = response.data.value;
        let entrada = [];
        let aux = "";
        for (let res of respuestas) {
            if (res.ShipRegion === null) {
                aux = String(res.OrderDate) + " / desconocido";
            } else {
                aux = String(res.OrderDate) + " / " + res.ShipRegion;
            }
            entrada.push({
                OrderID         : res.OrderID,
                AuxID           : aux
            });
        }
        cargar(Orders, entrada, "Orders");
        
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        console.log("TERROR2");
    })
    .then(function () {
        // always executed
});



axios.get('https://services.odata.org/Experimental/Northwind/Northwind.svc/Order_Details', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    httpsAgent: agent,
    rejectUnauthorized: false
    })
    .then(async function (response) {
        // handle success
        const respuestas = response.data.value;
        let entrada = [];
        for (let res of respuestas) {
            if (res.ProductID < 21 && res.OrderID < 10448) {
                entrada.push({
                    ProductID_ProductID : res.ProductID,
                    OrderID_OrderID     : res.OrderID,
                    UnitPrice           : res.UnitPrice,
                    Quantity            : res.Quantity,
                    Discount            : res.Discount
                });
            }
        }
        cargar(Order_Details, entrada, "Order_Details");
        
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        console.log("TERROR2");
    })
    .then(function () {
        // always executed
});


module.exports = cds.service.impl(async (srv) => {

    srv.on('ManejoStock', async (req)=>{
        try {
            const { product_ID, cantidad } = req.data;
            const stock = await cds.run(
                SELECT.from(Products)
                .where({ ProductID : product_ID })
            );
            // console.log(stock[0].ProductName);
            if (stock.length === 0) {                                                               // si no existe el producto
                return "No hay registro de stock o no existe el producto";
    
            } else if (stock[0].UnitsInStock - stock[0].UnitsOnOrder <= 0) {                        // si hay mas ordenados que en stock (o quedan 0)

                return "No disponible, ya se habian ordenado mas que lo disponible";

            } else if (stock[0].UnitsInStock - stock[0].UnitsOnOrder - cantidad < 0) {              // si hay mas en stock que ordenados pero se piden mas de los que hay
                
                return "No hay sufuciente, solo quedan: " + (stock[0].UnitsInStock - stock[0].UnitsOnOrder);

            } else if (stock[0].UnitsInStock - stock[0].UnitsOnOrder - cantidad >= 0) {             // si quedan mas que los pedidos

                await cds.run(
                    UPDATE(Products)
                    .with({ UnitsInStock: { '-=': cantidad}})
                    .where({ ProductID : product_ID })
                );
                return "Aceptado, solo quedan: " + (stock[0].UnitsInStock - stock[0].UnitsOnOrder - cantidad);

            } else {                                                                                // talvez este de mas
                return "No se puede hacer la transaccion";
            }
        } catch(err) {
            console.log("TERROR: ", err);
        }
    });
})