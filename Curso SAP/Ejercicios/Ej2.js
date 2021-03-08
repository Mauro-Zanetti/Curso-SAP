//  Ejercicio 2 - Repetir el ejercicio anterior, ubicando 0 (ceros), en las posiciones pares y un valor que coincida con el índice en las posiciones impares.

let x = 10; // Numero del usuario
let v = [];

for (let i = 0; i < x; i++){
    if (i % 2 == 1) {
        v[i] = i;
    } else {
        v[i] = 0;
    }
}

for (let i = 0; i < x; i++){
    console.log(v[i]);
}