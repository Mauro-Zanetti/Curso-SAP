/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ejercicio 4.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Supongamos que se desea invertir una cantidad X de pesos en un sistema de ahorro que otorga el 33.5% Anual de interés efectivo, 
realice un programa que informe ¿cuál es el interés en pesos que se va a ganar por mes? y ¿cuál es el total que debe recibirse por 3 meses?
*/

function calcular() {
    var x = document.getElementById("texto").value;
    document.getElementById("pantalla").innerHTML = x * (0.335 / 12);
    document.getElementById("pantalla2").innerHTML = x * (0.335 / 4);
}

/*
<!DOCTYPE html>
<html>
    <body>
        <h1>Ejercicio 4</h1>
        <input type="text" id="texto" value="">
        <button onclick="calcular()">Aceptar</button>
        <p id="pantalla"></p>
        <p id="pantalla2"></p>
        <script src="Ej4.js"></script>
    </body>
</html>
*/

