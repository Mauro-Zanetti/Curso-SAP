/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ejercicio 3.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Un alumno desea saber ¿cuál será su calificación final en una materia específica?, dicha calificación se compone de los siguientes porcentajes:
•	55% del promedio de las tres calificaciones parciales.
•	30% de la calificación del examen final.
•	15% de la calificación de un trabajo final.
*/

//document.getElementByName("tCP1").innerHTML
//document.getElementById("demor").innerHTML = "Hewo";
//document.getElementsByName("tCP1")[0].value = "kol"; //.innerHTML = "Hello"; .value = "kol"; .textContent = "Hello"; .outerHTML = "Hello"; Solo funciona .value
//document.querySelector("input[name=tCP1]").value;

function calcular(){
    let parcProm = (parseInt(document.querySelector("input[name=tCP1]").value)
            + parseInt(document.querySelector("input[name=tCP2]").value) 
            + parseInt(document.querySelector("input[name=tCP3]").value))/3;
    let exFinal = parseInt(document.querySelector("input[name=tEF]").value);
    let trFinal = parseInt(document.querySelector("input[name=tTF]").value);

    document.querySelector("input[name=tPro]").value = parcProm;
    document.querySelector("input[name=tPar]").value = parcProm * 0.55;
    document.querySelector("input[name=tPEF]").value = exFinal * 0.3;
    document.querySelector("input[name=tPTF]").value = trFinal * 0.15;
    document.querySelector("input[name=tCF]").value = parcProm * 0.55 + exFinal * 0.3 + trFinal * 0.15;
}

/*
<html>
    <head>
        <title>Ejercicio 03</title>
        <script language="JavaScript" type="text/javascript" src="Ej3.js"></script>
    </head>
    <body>
        <form name="f1">
            <table bgcolor="#85C1E9">
                <caption>CALIFICACION FINAL SAPUI5 Y CAP</caption>
                <tr>
                    <td align="right">CALIF. PARC. 1: </td>
                    <td><input type="text" name="tCP1" size="4" /></td>
                    <td align="right">CALIF. PARC. 2: </td>
                    <td><input type="text" name="tCP2" size="4" /></td>
                    <td align="right">CALIF. PARC. 3: </td>
                    <td><input type="text" name="tCP3" size="4" /></td>
                </tr>
                <tr>
                    <td align="right">EXAM. FINAL: </td>
                    <td><input type="text" name="tEF" size="4" /></td>
                    <td align="right">TRAB. FINAL: </td>
                    <td><input type="text" name="tTF" size="4" /></td>
                    <td colspan="2" align="center"><input type="button" value="Calcular" onclick="calcular()" /></td>
                </tr>
                <tr>
                    <td colspan="6"><hr /></td>
                </tr>
                <tr>
                    <td align="right">Promedio parciales : </td>
                    <td><input type="text" name="tPro" size="5" /></td>
                    <td align="right">Porcentaje del promedio : </td>
                    <td><input type="text" name="tPar" size="5" /></td>
                    <td align="right">Porcentaje del examen : </td>
                    <td><input type="text" name="tPEF" size="5" /></td>
                </tr>
                <tr>
                    <td align="right">Porcentaje del trabajo : </td>
                    <td><input type="text" name="tPTF" size="5" /></td>
                    <td align="right">Calificación final : </td>
                    <td><input type="text" name="tCF" size="5" /></td>
                </tr>
            </table>
        </form>
    </body>
</html>
*/