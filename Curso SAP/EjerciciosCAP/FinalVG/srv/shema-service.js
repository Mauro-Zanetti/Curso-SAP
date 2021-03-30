const cds = require('@sap/cds');
const axios = require('axios');
const https = require('https');
const agent = new https.Agent({rejectUnauthorized: false});
const { Orders, Products, Order_Details } = cds.entities;


// Notas en servicio


const descargar = (entidad) => {
    const response = axios.get(`https://services.odata.org/Experimental/Northwind/Northwind.svc/${entidad}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        httpsAgent: agent,
        rejectUnauthorized: false
    })
    return response.then((res) => res.data);
}

//-------------------------------------------XxxX-------------------------------------------//

async function cargar (entidad, info, texto) {
    try {
        await cds.run(INSERT.into(entidad).entries(info));
        console.log(`Terminado ${texto}`);
    } catch (err) {
        console.log(err);
        console.log("TERROR 10");
    }
}

//-------------------------------------------XxxX-------------------------------------------//

function cargarEntradaProductos(response, entrada){
    for (let res of response) {
        entrada.push({
            ProductID           : res.ProductID,
            ProductName         : res.ProductName,
            QuantityPerUnit     : res.QuantityPerUnit,
            UnitPrice           : res.UnitPrice,
            UnitsInStock        : res.UnitsInStock,
            UnitsOnOrder        : res.UnitsOnOrder
            // SupplierID          : res.SupplierID;
            // CategoryID          : res.CategoryID;
            // ReorderLevel        : res.ReorderLevel;
            // Discontinued        : res.Discontinued;
        });
    }
    return entrada;
}

//-------------------------------------------XxxX-------------------------------------------//

function cargarEntradaOrders(response, entrada){
    for (let res of response) {
        entrada.push({
            OrderID         : res.OrderID,
            ShipName        : res.ShipName,
            AuxID           : `${res.OrderDate} / ${res.ShipRegion}`
            // CustomerID          : res.CustomerID;
            // EmployeeID          : res.EmployeeID;
            // OrderDate           : res.OrderDate;
            // RequiredDate        : res.RequiredDate;
            // ShippedDate         : res.ShippedDate;
            // ShipVia             : res.ShipVia;
            // Freight             : res.Freight;
            // ShipAddress         : res.ShipAddress;
            // ShipCity            : res.ShipCity;
            // ShipRegion          : res.ShipRegion;
            // ShipPostalCode      : res.ShipPostalCode;
            // ShipCountry         : res.ShipCountry;
        });
    }
    return entrada;
}

//-------------------------------------------XxxX-------------------------------------------//

function cargarEntradaOrder_Details(response, entrada){
    for (let res of response) {
        entrada.push({
            ProductID_ProductID : res.ProductID,
            OrderID_OrderID     : res.OrderID,
            UnitPrice           : res.UnitPrice,
            Quantity            : res.Quantity,
            Discount            : res.Discount
        });
    }
    return entrada;
}


//-------------------------------------------XxxX-------------------------------------------//

function cargarEntrada(link, res, entrada){
    let cota = link.indexOf("?");
    if (cota !== -1) {
        link = link.slice(0, cota)
    }
    switch(link) {
        case "Products":
            entrada = cargarEntradaProductos(res, entrada);
            break;
        case "Orders":
            entrada = cargarEntradaOrders(res, entrada);
            break;
        case "Order_Details":
            entrada = cargarEntradaOrder_Details(res, entrada);
            break;
        default:
            console.log("A donde vas");
    }
    return entrada;
}

//-------------------------------------------XxxX-------------------------------------------//

async function precarga(entidad, link) {
    let entrada = [];
    let texto = link;
    do {
        await descargar(link)
            .then(async function (response) {
                entrada = cargarEntrada(link, response.value, entrada);
                link = response['@odata.nextLink'];
            })
            .catch(function (error) {
                console.log(error);
                console.log("TERROR2");
        });
    } while (link);
    await cargar(entidad, entrada, texto);
}

precarga(Products, "Products");
precarga(Orders, "Orders");
precarga(Order_Details, "Order_Details");

//-------------------------------------------XxxX-------------------------------------------//

module.exports = cds.service.impl(async (srv) => {

    async function getProducts(productID) {
        return await cds.run(
            SELECT.one(Products)
            .where({ ProductID : productID })
        );
    }

    //-------------------------------------------XxxX-------------------------------------------//

    async function getOrderDetails(productID, orderID) {
        return await cds.run(
            SELECT.one(Order_Details)
            .where({ ProductID_ProductID : productID, OrderID_OrderID : orderID })
        );
    }

    //-------------------------------------------XxxX-------------------------------------------//

    async function updateDatos(cantidad, productID, orderID) {
        await cds.run(
            UPDATE(Products)
            .with({ UnitsInStock: { '-=': cantidad}, UnitsOnOrder: { '+=': cantidad} })
            .where({ ProductID : productID })
        );
        await cds.run(
            UPDATE(Order_Details)
            .with({ Quantity: { '+=': cantidad}})
            .where({ ProductID_ProductID : productID, OrderID_OrderID : orderID })
        );
    }

    //-------------------------------------------XxxX-------------------------------------------//

    srv.on('ManejoStock', async (req)=>{
        try {
            const { productID, orderID, cantidad } = req.data;
            const stock = await getProducts(productID);
            const item = await getOrderDetails(productID, orderID);

            if (stock.length === 0 && item.length === 0) {                          // si no existe el producto
                return "No hay registro o no existe el producto o el tiket";

            } else if (stock.UnitsInStock - cantidad < 0) {                         // si hay mas en stock que ordenados pero se piden mas de los que hay
                return "No hay sufuciente, solo quedan: " + (stock.UnitsInStock);

            } else if (stock.UnitsInStock - cantidad >= 0) {                        // si quedan mas que los pedidos
                updateDatos(cantidad, productID, orderID);
                return "En stock: " + (stock.UnitsInStock - cantidad) + ", En Orden: " + (stock.UnitsOnOrder + cantidad) + ", Quantity: " + (item.Quantity + cantidad);

            } else {                                                                // talvez este de mas (esta por las dudas)
                return "Hubo algun otro error";
            }
        } catch(err) {
            console.log("TERROR: ", err);
        }
    });

})