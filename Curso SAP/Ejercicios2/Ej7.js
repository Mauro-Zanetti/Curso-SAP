/*
Ejercicio 7.

Crear un script que genere un numero al azar entre 0 y 2, debe utilizar Promise para procesar el 
resultado: un error si el numero generado es 0 y un mensaje de ejecución correcta en caso contrario.
*/

var numeroAzar = function() {
    var rng = Math.floor(Math.random() * 3);
    if (rng === 0){
        throw new Error("Numero generado es 0");
    }
    return "Ejecucion correcta"
}

new Promise (function(resolve, reject){
    setTimeout(function(){
        try {
            var todoBien = numeroAzar();
            resolve(todoBien);
        } catch (err) {
            reject(err)
        }
    }, 1000);
})
.catch(console.log)
.then(console.log)
