//  Ejercicio 4 - Dado el arreglo de números del punto 3, mostrar por pantalla el valor máximo y su posición.

let x = [10,24,36,7,98,11,14,20];
let mi = 0;
let max = x[mi];

for (let i = 1; i < x.length; i++){
    if (max < x[i]) {
        max = x[i];
        mi = i;
    }
}
console.log(x[mi], ";",mi);