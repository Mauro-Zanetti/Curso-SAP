const cds = require('@sap/cds');
const { Products, Order_Details } = cds.entities;

// Notas en servicio

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