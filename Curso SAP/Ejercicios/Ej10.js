/*
Definir una función que muestre información sobre una cadena de texto que se le pasa como argumento. 
A partir de la cadena que se le pasa, la función determina si esa cadena está formada sólo por mayúsculas, 
sólo por minúsculas o por una mezcla de ambas.
*/

//

function minusculasMayusculas(texto){
    minuscula = false;
    mayuscula = false;
    for (let i = 0; i < texto.length; i++) {
        if (texto[i].toLowerCase() !== texto[i].toUpperCase()) {
            if (texto[i] === texto[i].toUpperCase()){
                mayuscula = true;
            } else {
                minuscula = true;
            }
        }
    }
    if (minuscula && mayuscula){
        return "Tiene mayusculas y minusculas"
    } else if (mayuscula) {
        return "Solo tiene mayusculas"
    } else if (minuscula) {
        return "Solo tiene minusculas"
    } else {
        return "Esta vacio o solo tiene simmbolos"
    }
}

console.log(minusculasMayusculas("Hola!"))