/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ejercicio 1.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Simular lanzamiento de un dado, si el valor es menor a 3 mostrar mensaje A sino mostrar un mensaje B. 
El mensaje se debe insertar desde .js al elemento body del DOM.
*/


let dado = Math.floor(Math.random() * 6 + 1);
if (dado < 3) {
    document.getElementById("pantalla").innerHTML = "Mensaje A";
} else {
    document.getElementById("pantalla").innerHTML = "Mensaje B";
}


/*
<!DOCTYPE html>
<html>
<body>
    <p id="pantalla"></p>
    <script src="Ej1.js"></script>
</body>
</html>
*/