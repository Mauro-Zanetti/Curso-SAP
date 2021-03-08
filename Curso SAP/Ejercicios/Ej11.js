/*
El factorial de un número entero n es una operación matemática que consiste en multiplicar todos los factores n x (n-1) x (n-2) x ... x 1. 
Así, el factorial de 5 (escrito como 5!) es igual a: 5! = 5 x 4 x 3 x 2 x 1 = 120

Utilizando la estructura for, crear un script que calcule el factorial de un número entero.
*/

// isNaN(x) || 

function factorial(x) {
    if (!Number.isInteger(parseInt(x)) || x < 0) {
        return "Numero no valido"
    } else {
        let total = 1;
        for (let i = x; i > 0; i--) {
            total = total * i;
        }
        return total
    }
}

console.log(factorial("sdfwsf"))