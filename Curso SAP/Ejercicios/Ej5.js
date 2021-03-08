//  Ejercicio 5 - Dado el siguiente arreglo de números x = [10,24,36,7,98,11,14,20,98,14,10], mostrar por pantalla el valor máximo y 
//  la cantidad de veces que se repite.

let x = [10,24,36,7,98,11,14,20,98,14,10];
let mi = 0;
let max = x[mi];
let cont = 1;

for (let i = 1; i < x.length; i++){
    if (max < x[i]) {
        max = x[i];
        mi = i;
        cont = 1;
    }else if (max == x[i]) {
        cont++;
    }
}
console.log(x[mi], ";",cont);