//  Ejercicio 3 - Dado el siguiente arreglo de números x = [10,24,36,7,98,11,14,20], mostrar por pantalla el valor máximo.

let x = [10,24,36,7,98,11,14,20];
let max = x[0];

for (let i = 1; i < x.length; i++){
    if (max < x[i]) {
        max = x[i];
    }
}
console.log(max);