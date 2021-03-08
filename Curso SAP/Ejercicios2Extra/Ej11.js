/*
Ej 11

El cliente tiene una pastelería. Quiere ofrecer descuentos a las empresas que compran sus productos (en este caso, tortas) en cantidad.
Estos descuentos dependen de la cantidad de tortas compradas por cada empresa precargada en el sistema.
    Si una empresa compra más de 100 tortas, tienen un 10% de descuento en sus próximas compras.
    Si una empresa compra más de 500 tortas, tienen un 15% de descuento.
    Independientemente de cuántas tortas compre, si compra más de 10 tortas, recibe 1 torta extra cada 15 tortas compradas.

Al cliente le gustaría saber en cada pedido de las empresas que tiene precargadas cuánto debería cobrarles, teniendo en cuenta si tienen 
descuentos o no y si debería darle tortas extras y cuántas.

Requerimientos
    Hacer un programa que modele los descuentos y tortas extras.
    Utilizar los descuentos y tortas extras a la hora de hacer un pedido y que en base a ellos indique cuánto cobrarle a la empresa y cuántas tortas enviarle.
*/

var empresas = [
    {
        nombre: "microsoft",
        tortasComp: 200
    },
    {
        nombre: "google",
        tortasComp: 700
    },
    {
        nombre: "apple",
        tortasComp: 50
    }
];

function valiNum(x){
    let num = parseInt(x);
    if (!Number.isInteger(num) || num < 0) {
        throw new Error("Numero de tortas invalido");
    } else {
        return num;
    }
}

function tortasPorEmpresa(empNom) {
    for (let i = 0 ; i < 3 ; i++) {
        if (empresas[i].nombre === empNom.toLowerCase()) {
            return empresas[i].tortasComp;
        }
    }
    alert ("Empresa no registrada, se supondra 0 tortas compredas")
    return 0;
}

function descuento(empNom){
    let tortasCompradas = tortasPorEmpresa(empNom);
    if (tortasCompradas < 100) {
        return 0;
    } else if (tortasCompradas < 500) {
        return 0.1;
    } else {
        return 0.15;
    }
}

function calcular(tortas, desc) {
    let dineroTorta = 100;
    let tortasExtra = Math.floor(tortas / 15);
    let totalAPagar = tortas * dineroTorta - (tortas * dineroTorta * desc);
    document.getElementById("pantalla").innerHTML = "El total a pagar es: " + totalAPagar + "$ y se llevara: " + tortasExtra + " tortas extra";
}

function main(){
    try{
        let empresa = document.getElementById("empresaNom").value;
        let tortas = valiNum(document.getElementById("tortas").value);
        let desc = descuento(empresa);
        calcular(tortas, desc);
    } catch (err) {
        alert(err);
    }
}