/*
A partir del siguiente array que se proporciona: var valores = [true, 5, false, "hola", "adios", 2];

1-  Determinar cual de los dos elementos de texto es mayor
2-  Determinar el resultado de las cinco operaciones matemáticas realizadas con los dos elementos numéricos + - * /
*/

var valores = [true, 5, false, "hola", "adios", 2];

if (valores[3].length > valores[4].length) {
    console.log(valores[3], "- tiene mas letras");
} else if (valores[3].length < valores[4].length){
    console.log(valores[4], "- tiene mas letras");
} else {
    console.log("ambos tienen la misma cantidad de letras");
}

console.log(valores[1], "+", valores[5], "=", valores[1] + valores[5]);
console.log(valores[1], "-", valores[5], "=", valores[1] - valores[5]);
console.log(valores[1], "*", valores[5], "=", valores[1] * valores[5]);

if (valores[5] !== 0){
    console.log(valores[1], "/", valores[5], "=", valores[1] / valores[5]);
} else {
    console.log("No se puede dividir por 0");
}
