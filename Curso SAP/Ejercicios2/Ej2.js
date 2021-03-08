/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ejercicio 2.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Realizar la lógica para una web de venta de coches: Si el coche a la venta es un Ford Fiesta (Código: 11450 Precio $1.350.344), 
el descuento es del 5%. Si el coche a la venta es un Ford Focus (Código: 11451 Precio $1.750.502, el descuento es del 10%. 
El usuario ingresa el articulo o su código y el sistema saca el descuento, el valor total y el código correspondiente por pantalla.
*/

var autos = [
    {
        nombre: "Ford Fiesta",
        codigo: 11450,
        precio: 1350344,
        descuento: 0.05
    },
    {
        nombre: "Ford Focus",
        codigo: 11451,
        precio: 1750502,
        descuento: 0.1
    }
];

function infoDeAutos(input){
    if (isNaN(input)){
        for (let i = 0; i < autos.length; i++){
            if (input === autos[i].nombre) {
                return String(autos[i].descuento * 100) + "% / " + String(autos[i].precio) + " / " + String(autos[i].codigo)
            }
        }
    } else {
        for (let i = 0; i < autos.length; i++){
            if (input === autos[i].codigo) {
                return String(autos[i].descuento * 100) + "% / " + String(autos[i].precio) + " / " + String(autos[i].codigo)
            }
        }
    }
}

document.getElementById("pantalla").innerHTML = infoDeAutos("Ford Fiesta");


/*
<!DOCTYPE html>
<html>
<body>
    <p id="pantalla"></p>
    <script src="Ej2.js"></script>
</body>
</html>
*/