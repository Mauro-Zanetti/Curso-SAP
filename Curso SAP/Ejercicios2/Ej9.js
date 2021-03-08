/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ejercicio 9.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Replicar el ejercicio 8 pero usando async/await para su solución.
*/

function decicion(){
    var arrayDeStr = [];
    var nuevo = "";
    var empty = false;
    return new Promise ((resolve, reject)=>{
        let interval = setInterval(()=>{
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
                clearInterval(interval);
            }
        }, 3000);
    })
}

async function regresiva() {
    try{
        let arr = await decicion();
        alert(arr);
    } catch (err){
        alert(err);
    }
}

/*
<!DOCTYPE html>
<html>
    <body>
        <h1>Ejercicio 9</h1>
        <button onclick="regresiva()">Empezar</button>
        <p id="pantalla"></p>
        <script src="Ej9.js"></script>
    </body>
</html>
*/