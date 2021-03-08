alert("Bienvenido")

//  Funcion adicional para validar la entrada de un numero

function valiNum(x){
    let num = parseInt(x);
    if (!Number.isInteger(num) || num < 0 || num > 99999999) {
        return null
    } else {
        return num
    }
}

//  Valida la entrada del nombre

function validarNom() {
    var nombre = document.getElementById("regNom").value;
    if (nombre === "") {
        document.getElementById("idNom").innerHTML = "Completar el nombre";
        return false
    }else if (nombre.length > 30){
        document.getElementById("idNom").innerHTML = "No debe exeder los 30 caracteres";
    } else {
        document.getElementById("idNom").innerHTML = "";
        return true
    }
}

// Valida la entrada del mail

function validarMail() {
    var email = document.getElementById("regMail").value;
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

//  valida la entrada del DNI

function validarDNI() {
    var dni = document.getElementById("regDNI").value;
    if (dni === "") {
        document.getElementById("idDNI").innerHTML = "Completar el DNI";
    } else {
        let validadoDNI = valiNum(dni);
        if (validadoDNI !== null) {
            document.getElementById("idDNI").innerHTML = "";
            return true
        } else {
            document.getElementById("idDNI").innerHTML = "DNI Invalido";
        }
    }
    return false
}

//Valida la entrada de la facha de nacimiento

function validarFdN() {
    var fdn = document.getElementById("regFdN").value; //01-19-1996
    if (fdn === "") {
        document.getElementById("idFdN").innerHTML = "Completar la fecha de nacimiento";
    } else {
        var edad = getAge(fdn);
        if (edad > 17) {
            document.getElementById("idFdN").innerHTML = "";
            return true
        } else {
            document.getElementById("idFdN").innerHTML = "Es menor de edad o fecha ingrasada invalida";
        }
    }
    return false
}

//  Obtiene la edad del usuario

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//  Seccion de la compra del 1er producto

function comprarPlaca(){
    let placaBool;
    let placa = null;
    do{
        placaBool = confirm("Quiere comprar la placa de video?(500$)")
        if (placaBool) {
            placa = prompt("Cuantas placas de video quiere comprar?");
            placa = valiNum(placa);
        }
    } while (placaBool && placa === null);
    if (placa === null) {
        return 0;
    } else {
        return placa;
    }
}

//  Seccion de la compra del 2do producto

function comprarCpu(){
    let cpu = null;
    let cpuBool;
    do{
        cpuBool = confirm("Quiere comprar la CPU?(700$)")
        if (cpuBool) {
            cpu = prompt("Cuantas cpu quiere comprar?");
            cpu = valiNum(cpu);
        }
    } while (cpuBool && cpu === null);
    if (cpu === null) {
        return 0;
    } else {
        return cpu;
    }
}

//  Seccion de si quiere usar tarjeta y cuotas

function tarjetaCuotas(){
    let tarj = null;
    let tarjBool;
    do{
        tarjBool = confirm("Quiere pagar con tarjeta de credito?")
        if (tarjBool) {
            tarj = prompt("En cuanta cuotas?");
            tarj = valiNum(tarj);
        }
    } while (tarjBool && tarj === null);
    if (tarj === null) {
        return 0;
    } else {
        return tarj;
    }
}

//  Boton, valida todos los sectores y sigue con las compras
//  Nota: si lo terminaba hubiera separado una seccion de compras
//  Nota2: use muchos mensajes porque sino hubiera perdido mas tiempo pensando en el codigo html

function validar() {
    let compraPlaca;
    let compraCpu;
    let cuotas;
    if (!(validarNom() && validarDNI() && validarMail() && validarFdN())) { //validarNom() && validarDNI() && validarMail() && validarFdN()
        alert("Tiene algun campo no valido");
    } else {
        alert("Todo esta correcto");
        alert("Tenemos 2 productos en promocion: una placa de video, y una CPU");
        compraPlaca = comprarPlaca() * 500;
        compraCpu = comprarCpu() * 700;
        alert("Seria " + compraPlaca + "$ por las placas y " + compraCpu + "$ por las CPU, un total de: " + (compraPlaca + compraCpu) + "$");
        cuotas = tarjetaCuotas();
    }
}

/*
<!DOCTYPE html>
<html>
    <body>
        <h1>Tienda Online JS</h1>
        <label for="regNom">Nombre:</label><input type="text" name="nombre" onfocusout="validarNom()" id="regNom">
        <p id="idNom"></p>
        <label for="regMail">Email:</label><input type="text" name="email" onfocusout="validarMail()" id="regMail">
        <p id="idMail"></p>
        <label for="regDNI">DNI:</label><input type="text" name="dni" onfocusout="validarDNI()" id="regDNI">
        <p id="idDNI"></p>
        <label for="regFdN">Fecha de Nacimiento (MM-DD-YYYY):</label><input type="text" name="fecha_nacimiento" onfocusout="validarFdN()" id="regFdN">
        <p id="idFdN"></p>
        <button onclick="validar()">Aceptar</button>
        <script src="EjTest.js"></script>
    </body>
</html>
*/