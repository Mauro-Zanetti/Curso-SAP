/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ejercicio 6.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Construir un validador para un formulario de registro que, dado el HTML que se proporciona, valide cada uno de los campos cuando el usuario 
ha terminado de introducir datos en cada uno de ellos, es decir, al perder el foco. Si el campo no cumple las restricciones, se mostrará una 
alerta al usuario, pero se le permitirá seguir introduciendo datos en el resto de campos.

En el momento en el que el usuario envíe el formulario (evento submit), se validarán todos los campos y el formulario no se enviará si alguno 
de los campos no es válido. Las restricciones a cumplir son las siguientes:

•	El nombre, email y comentarios son campos obligatorios.
•	El campo email debe ser una dirección de email válida.
•	El texto introducido en el campo de comentarios no debe exceder los 50 caracteres.
•	El password debe tener una longitud mínima de 6 caracteres, y contener al menos una letra minúscula, una letra mayúscula y un dígito.

Utilizar el HTML: Nota: Modificar lo que sea necesario
*/
//    <script type="text/javascript" src="js/code.js"></script>
//  document.querySelector("input[name=tCP1]").value

function validarNom() {
    var nombre = document.getElementById("registro_nombre").value;
    if (nombre === "") {
        document.getElementById("idNom").innerHTML = "Completar el nombre";
        return false
    } else {
        document.getElementById("idNom").innerHTML = "";
        return true
    }
}

function validarApe() {
    var apellido = document.getElementById("registro_apellido").value;
    if (apellido === "") {
        document.getElementById("idApe").innerHTML = "Completar el apellido";
        return false
    } else {
        document.getElementById("idApe").innerHTML = "";
        return true
    }
}

function validarMail() {
    var email = document.getElementById("registro_email").value;
    if (email === "") {
        document.getElementById("idMail").innerHTML = "Completar el email";
    } else {
        var gmail = email.lastIndexOf("@gmail.com");
        var outlook = email.lastIndexOf("@outlook.com");
        var hotmail = email.lastIndexOf("@hotmail.com");
        var yahoo = email.lastIndexOf("@yahoo.com");
        if (gmail === -1 && outlook === -1 && hotmail === -1 && yahoo === -1) {
            document.getElementById("idMail").innerHTML = "Email invalido";
        } else {
            document.getElementById("idMail").innerHTML = "";
            return true
        }
    }
    return false
}

function validarPass() {
    let pass = document.getElementById("registro_password").value;
    if (pass === "") {
        document.getElementById("idPass").innerHTML = "Completar el password";
    } else if (pass.length < 6) {
        document.getElementById("idPass").innerHTML = "Debe tener al menos 6 caracteres";
    } else if (pass === pass.toUpperCase()) {
        document.getElementById("idPass").innerHTML = "Debe tener al menos una letra minuscula";
    } else if (pass === pass.toLowerCase()) {
        document.getElementById("idPass").innerHTML = "Debe tener al menos una letra mayuscula";
    } else if (pass.match(/\d+/) === null) {
        document.getElementById("idPass").innerHTML = "Debe tener al menos un numero";
    } else {
        document.getElementById("idPass").innerHTML = "";
        return true
    }
    return false
}

function validarCom() {
    var com = document.getElementById("registro_comentarios").value;
    if (com === "") {
        document.getElementById("idCom").innerHTML = "Completar los comentarios";
    } else if (com.length > 50){
        document.getElementById("idCom").innerHTML = "No debe exeder los 50 caracteres";
    } else {
        document.getElementById("idCom").innerHTML = "";
        return true
    }
    return false
}

function validarTodo() {
    var chek = document.getElementById("registro_condiciones").checked;
    if (!chek) {
        document.getElementById("idFinal").innerHTML = "Debe aceptar las condiciones";
    } else if (!(validarNom() && validarApe() && validarMail() && validarCom() && validarPass())) {
        document.getElementById("idFinal").innerHTML = "Debe estar todos los campos validos";
    } else {
        document.getElementById("idFinal").innerHTML = "";
        alert("The form was submitted");
        return true
    }
    return false
}

/*
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Ejercicio 21 - Validación de formularios</title>

    <style type="text/css">
    body {font-family: arial, helvetica;}
    form {
        width: 600px;
        margin: 20px auto 0 auto;
    }
    label {
        float: left;
        width: 200px;
        font-weight: bold;
    }
    label[for="registro_condiciones"] {
        float: none;
    }
    input[type="text"],
    input[type="password"],
    textarea {
        width: 360px;
    }
    input[type="checkbox"] {
        margin-left: 200px;
    }
    input[type="submit"] {
        margin: 20px 0 0 200px;
        display: block;
    }
    </style>
</head>

<body>
    <form action="servidor.php" method="POST" onsubmit="return validarTodo()" id="registro">
        <fieldset>
            <legend>Registro</legend>
            <label for="registro_nombre">Nombre:</label><input type="text" name="nombre" onfocusout="validarNom()" id="registro_nombre">
            <p id="idNom"></p>
            <label for="registro_apellidos">Apellido:</label><input type="text" name="apellido" onfocusout="validarApe()" id="registro_apellido">
            <p id="idApe"></p>
            <label for="registro_email">Email:</label><input type="text" name="email" onfocusout="validarMail()" id="registro_email">
            <p id="idMail"></p>
            <label for="registro_password">Password:</label><input type="password" name="password" onfocusout="validarPass()" id="registro_password">
            <p id="idPass"></p>
            <label for="registro_comentarios">Comentarios:</label><textarea name="comentarios" onfocusout="validarCom()" id="registro_comentarios" rows="10"></textarea>
            <p id="idCom"></p>
            <input type="checkbox" name="condiciones" id="registro_condiciones" value="1"><label for="registro_condiciones">Acepto las condiciones del servicio.</label>
            <p id="idFinal"></p>
            <input type="submit" value="Enviar">
        </fieldset>
    </form>
    <script type="text/javascript" src="Ej6.js"></script>
</body>
</html>
*/