const cds = require('@sap/cds')
// const { precarga } = require('./srv/handeler');
// bootstrap algo

module.exports = cds.server;

cds.on('bootstrap', ()=>{
    // console.log("Paso por bootstrap")
});

cds.on('served', ()=> {
    // console.log("paso por served")
    const { Orders, Products, Order_Details } = cds.entities;
    const { precarga } = require('./srv/precarga.js');

    precarga(Products, "Products");
    precarga(Orders, "Orders");
    precarga(Order_Details, "Order_Details");
});