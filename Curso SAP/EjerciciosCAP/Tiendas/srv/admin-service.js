const cds = require("@sap/cds");
const { Tiendas_Productos_Stock, Productos, Precios, Tiendas, Duenios_Tiendas } = cds.entities;

module.exports = cds.service.impl(async (srv) => {

    //-------------------------------------------XxxX-------------------------------------------//

    srv.on('PrecioConj', async (req)=>{
        try {
            const { marcaID, subtipoID, precioID } = req.data;
            console.log(marcaID, subtipoID, precioID);
            
            const precio = await cds.run(
                SELECT.from(Precios)
                .where({ ID : precioID })
            );
            
            if (marcaID === null && precio.length !== 0) {
                
                const produc = await cds.run(
                    SELECT.from(Productos)
                    .where({ subTipo_ID : subtipoID })
                );
                // console.log(produc);
                // console.log(produc.length);
                if (produc.length !== 0) {
                    await cds.run(
                        UPDATE(Productos)
                        .with({ precio_ID : precioID})
                        .where({ subTipo_ID : subtipoID })
                    );
                    return "actualizado subtipo";
                } else {
                    return "no hay registro de algun producto de este subtipo";
                }
                
            } else if (subtipoID === null && precio.length !== 0) {
                
                const produc = await cds.run(
                    SELECT.from(Productos)
                    .where({ marca_ID : marcaID })
                );
                // console.log(produc);
                // console.log(produc.length);
                if (produc.length !== 0) {
                    await cds.run(
                        UPDATE(Productos)
                        .with({ precio_ID : precioID})
                        .where({ marca_ID : marcaID })
                    );
                    return "actualizado marca";
                } else {
                    return "no hay registro de algun producto de esta marca";
                }
                
            } else if (precio.length === 0) {
                console.log("ingrese null");
                return "no hay registro del precio";
    
            } else {
                console.log("ingrese null");
                return "Ingrese null en el conjunto por el que no va a buscar";
            }
        } catch(err) {
            console.log("TERROR: ", err);
        }
    });

    //-------------------------------------------XxxX-------------------------------------------//

    srv.after('CREATE','Duenios', async (data, req)=>{
        try {
            console.log("Despues de crear");
            let url = parseInt(req._.req.query.Tiendas);
            // console.log(url);
            // console.log(data.ID);
    
            const tienda = await cds.run(
                SELECT.from(Tiendas)
                .where({ ID : url })
            );
            
            if (tienda.length !== 0) {
    
                const dueniosTiendas = {
                    duenio_tienda_ID : data.ID,
                    tienda_duenio_ID : url
                };
                // console.log(dueniosTiendas);
                await cds.run(INSERT.into(Duenios_Tiendas).entries(dueniosTiendas));
            } else {
                console.log("No se conecto a ninguna tienda porque no existe una con el ID enviado");
            }
        } catch(err) {
            console.log("TERROR: ", err);
        }
    });

    //-------------------------------------------XxxX-------------------------------------------//

    srv.on('ManejoStock', async (req)=>{
        try {
            const { tienda, producto, cambio } = req.data;
            // console.log(tienda, producto, cambio);
    
            const stock = await cds.run(
                SELECT.from(Tiendas_Productos_Stock)
                .where({ tienda_producto_ID : tienda, producto_tienda_ID : producto })
            );
            // console.log(stock);
            // console.log(stock[0].cantidad);
            // console.log(stock.length);
            // console.log(stock[0].cantidad + cambio);
    
            if (stock.length === 0) {
                return "no hay registro de stock";
    
            } else if (stock[0].cantidad + cambio < stock[0].max && stock[0].cantidad + cambio > stock[0].min) {
    
                await cds.run(
                    UPDATE(Tiendas_Productos_Stock)
                    .with({ cantidad: { '+=': cambio}})
                    .where({ tienda_producto_ID : tienda, producto_tienda_ID : producto })
                );
                return "todo bien";
    
            } else {
                return "no se puede hacer la transaccion (fuera de limite) [disponible: " + stock[0].cantidad 
                + " | max|min: " + stock[0].max + "|" + stock[0].min + " | cambio intencionado :" + cambio + "]";
            }
        } catch(err) {
            console.log("TERROR: ", err);
        }
    });

})