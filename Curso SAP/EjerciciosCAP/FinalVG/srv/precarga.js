const cds = require('@sap/cds');
const axios = require('axios');
const https = require('https');
const agent = new https.Agent({rejectUnauthorized: false});


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

module.exports = {
    precarga: async function (entidad, link) {
        let entrada = [];
        let texto = link;
        do {
            await descargar(link)
                .then(async function (response) {
                    entrada = cargarEntrada(link, response.value, entrada);
                    link = response['@odata.nextLink'];
                    // console.log(link);
                })
                .catch(function (error) {
                    console.log(error);
                    console.log("TERROR2");
            });
        } while (link);
        await cargar(entidad, entrada, texto);
    }
}