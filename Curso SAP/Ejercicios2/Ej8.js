/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ejercicio 8
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Crear un script que permita el ingreso de valores para cargar un array y espere 3 segundos por cada carga, 
debe utilizar Promise para procesar el resultado: error si no se cargó un valor en el array y un mensaje de 
ejecución correcta junto con los valores del array en caso contrario.
*/

function regresiva() {
    var arrayDeStr = [];
    var nuevo = "";
    var empty = false;
    var interval;
    new Promise (function(resolve, reject){
        interval = setInterval(function(){
            nuevo = prompt("OK: Ingresa un numero / Cancel: deja de repetir");

            if (nuevo){ //entra si se puso algo en la caja 
                arrayDeStr.push(nuevo);
            } else if (nuevo === "") { //si no se puso nada en la caja 
                empty = true;
            } else if (nuevo === null && !empty && arrayDeStr.length > 0) { //si se cancelo, si nunca se saltearon poner algo y si no cancelaron a la primera
                resolve(arrayDeStr);
                clearInterval(interval);
            } else if (nuevo === null && (empty || arrayDeStr.length === 0)) { //si se cancelo, si se saltearon poner algo o si cancelaron a la primera
                reject("Error");
            }
        }, 3000);
    })
    .then(function(valor){
        alert(arrayDeStr);
    })
    .catch(function(err){
        clearInterval(interval);
        alert(err);
    })
}

/*
<!DOCTYPE html>
<html>
    <body>
        <h1>Ejercicio 8</h1>
        <button onclick="regresiva()">Empezar</button>
        <p id="pantalla"></p>
        <script src="Ej8.js"></script>
    </body>
</html>
*/