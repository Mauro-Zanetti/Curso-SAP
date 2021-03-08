/*
Ejercicio 6 – Dados los siguientes arreglos:
X = [“a”,”l”,”f”,”a”];
Y = [“a”,”l”,”f”,”a”,”j”,”o”,”r”]
Crear un bloque de código que permita determinar si:
• Ambos arreglos son iguales
• Cuál de los dos es más largo
• Cuantas letras tienen en común
*/

let x = ["a", "l", "f", "a"];
let y = ["a", "l", "f", "a", "j", "o", "r"];
let igu = true;
let minl = 0;
cont = 0;

if (x.length == y.length) {
    for (let i = 0; i < x.length; i++){
        if (x[i] != y[i]) {
            igu = false;
        }
    }
} else {
    igu = false;
}

if (igu) {
    console.log("Son iguales");
} else {
    console.log("No son iguales");
}

if (x.length > y.length) {
    console.log("X es mas largo");
    minl = y.length;
} else if (x.length < y.length){
    console.log("Y es mas largo");
    minl = x.length;
} else {
    console.log("Tienen la misma longitud");
    minl = y.length;
}

for (let i = 0; i < minl; i++){
    if (x[i] == y[i]) {
        cont++;
    }
}

console.log("Teinen",cont, "letras en comun");