/*
Ejercicio 7 – Dado el siguiente array datos1 = [“Fido”,”Gomez”,26,15000.78,true] y datos2 = [“Gervasio”,”Fernandez”,32,28.550,false]
Determinar:
• ¿Cuál de los dos personajes es más viejo?
• ¿Cuál de los dos personajes está casado?
• Si Fido recibirá un aumento equivalente al 12.5% del sueldo de Gervasio, cuanto será el monto a cobrar?
*/

let datos1 = ["Fido","Gomez",26,15000.78,true];
let datos2 = ["Gervasio","Fernandez",32,28.550,false];

if (datos1[2] > datos2[2]) {
    console.log(datos1[0], datos1[1], "es mas viejo");
} else if (datos1[2] < datos2[2]) {
    console.log(datos2[0], datos2[1], "es mas viejo");
} else {
    console.log("Tienen la misma edad");
}

if (datos1[4]) {
    console.log(datos1[0], datos1[1], "esta casado");
} else {
    console.log(datos1[0], datos1[1], "no esta casado");
}
if (datos2[4]) {
    console.log(datos2[0], datos2[1], "esta casado");
} else {
    console.log(datos2[0], datos2[1], "no esta casado");
}

let aumento = datos2[3] * 0.125;
console.log("El monto a cobrar de", datos1[0], datos1[1], "sera de:", datos1[3] + aumento)