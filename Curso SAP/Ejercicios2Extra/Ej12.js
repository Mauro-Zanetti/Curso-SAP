/*
Crear un programa para gestionar usuarios.
El programa debe venir ya con una lista de usuarios precargados, con los siguientes datos:

    ID      NOMBRE      TELEFONO        EMAIL
    0       Carla       1545628984      carla@gmail.com
    1       Pedro       1545251245      pedro@gmail.com
    2       Lucas       1523357849      lucas@gmail.com
    3       Ana         15789456        ana@gmail.com

Debe tener un menú que permita realizar las siguientes operaciones (con su respectivo flujo):

Buscar un usuario:
    Debe pedir seleccionar por qué dato se va a buscar: id, nombre, celular o email.
    A continuación debe pedir ingresar el valor que se va a buscar.
    Si el usuario existe debe mostrar la información del usuario con todos sus datos.
    Si el usuario no existe debe mostrar un mensaje informándolo.
    A continuación debe pedir si se desea realizar nuevamente el procedimiento:
        Si la respuesta es afirmativa, debe volver a realizar el procedimiento
        Si la respuesta es negativa, debe llevar al menú de operaciones

Listar todos los usuarios:
    Debe mostrar un listado con todos los usuarios y todos sus datos:
        Id
        Nombre
        Teléfono
        Email
    Luego debe llevar al menú de operaciones.

Salir del programa:
    Debe preguntar si desea confirmar la operación:
        Si la respuesta es afirmativa debe mostrar un mensaje de despedida y salir del programa
        Si la respuesta es negativa debe volver al menú de operaciones

Todos los mensajes que se requieran son libres (pueden poner lo que mejor les parezca).
Se deben validar los datos que se ingresan. Por ejemplo, si en vez de ingresar un número de celular se ingresa un dato no válido, como una palabra. 
Si se ingresa una opción incorrecta, el programa nos debe avisar del hecho, y debe tomar una acción por defecto (por ejemplo, volver al menú).
*/

var usuarios = [
    {
        id: 0,
        nombre: "Carla",
        telefono: 1545628984,
        email: "carla@gmail.com"
    },
    {
        id: 1,
        nombre: "Pedro",
        telefono: 1545251245,
        email: "pedro@gmail.com"
    },
    {
        id: 2,
        nombre: "Lucas",
        telefono: 1523357849,
        email: "lucas@gmail.com"
    },
    {
        id: 3,
        nombre: "Ana",
        telefono: 15789456,
        email: "ana@gmail.com"
    },
];

var tipoDeBusquedaGlob = 0;
var salidaDelPrograma = false;
var enlistado = 0;

function extraValidarNumero(x){
    let num = parseInt(x);
    if (!Number.isInteger(num) || num < 0 || num >= 9999999999) {
        return null;
    } else {
        return num;
    }
}

function busquedaPorID(idIngresado) {
    for (let i = 0 ; i < usuarios.length ; i++) {
        if (idIngresado === usuarios[i].id) {
            return usuarios[i].id;
        }
    }
    document.getElementById("menuSalida_text").innerHTML = "El usuario no existe"
    return null;
}

function busquedaPorNombre(nombreIngresado) {
    for (let i = 0 ; i < usuarios.length ; i++) {
        if (nombreIngresado === usuarios[i].nombre) {
            return usuarios[i].id;
        }
    }
    document.getElementById("menuSalida_text").innerHTML = "El usuario no existe"
    return null;
}

function busquedaPorTelefono(telefonoIngresado) {
    for (let i = 0 ; i < usuarios.length ; i++) {
        if (telefonoIngresado === usuarios[i].telefono) {
            return usuarios[i].id;
        }
    }
    document.getElementById("menuSalida_text").innerHTML = "El usuario no existe"
    return null;
}

function busquedaPorEmail(emailIngresado) {
    for (let i = 0 ; i < usuarios.length ; i++) {
        if (emailIngresado === usuarios[i].email) {
            return usuarios[i].id;
        }
    }
    document.getElementById("menuSalida_text").innerHTML = "El usuario no existe"
    return null;
}

function buscar(datoBuscar, tipoDeBusqueda) {
    let idBuscado;
    switch(tipoDeBusqueda) {
        case 0:
            idBuscado = busquedaPorID(datoBuscar);
            break;
        case 1:
            idBuscado = busquedaPorNombre(datoBuscar);
            break;
        case 2:
            idBuscado = busquedaPorTelefono(datoBuscar);
            break;
        case 3:
            idBuscado = busquedaPorEmail(datoBuscar);
            break;
        default:
            alert("No se que paso4");
    }
    return idBuscado;
}

// los metodos de validacion no son perfectos

function validarNombre(nombre) {
    if (nombre === "" || nombre.length > 30) {
        return -1;
    } else {
        return nombre;
    }
}

function validarMail(email) {
    let gmail = email.lastIndexOf("@gmail.com");
    let outlook = email.lastIndexOf("@outlook.com");
    let hotmail = email.lastIndexOf("@hotmail.com");
    let yahoo = email.lastIndexOf("@yahoo.com");
    if (email === "" || (gmail === -1 && outlook === -1 && hotmail === -1 && yahoo === -1)) {
        return -1;
    } else {
        return email;
    }
}

function validarID(id) {
    let validadoID = extraValidarNumero(id);
    if (validadoID === null) { //|| validadoID > 99
        return -1;
    } else {
        return validadoID;
    }
}

function validarTelefono(telefono) {
    let validadoTelefono = extraValidarNumero(telefono);
    if (validadoTelefono === null || validadoTelefono < 10000000) {
        return -1;
    } else {
        return validadoTelefono;
    }
}

function validar(datoBuscar, tipoDeBusqueda) {
    let validacion;
    switch(tipoDeBusqueda) {
        case 0:
            validacion = validarID(datoBuscar);
            break;
        case 1:
            validacion = validarNombre(datoBuscar);
            break;
        case 2:
            validacion = validarTelefono(datoBuscar);
            break;
        case 3:
            validacion = validarMail(datoBuscar);
            break;
        default:
            alert("No se que paso2");
    }
    return validacion;
}

function listar() {
    document.getElementById("mostrarUsuario_id").innerHTML = "ID: " + usuarios[enlistado].id;
    document.getElementById("mostrarUsuario_nom").innerHTML = "Nombre: " + usuarios[enlistado].nombre;
    document.getElementById("mostrarUsuario_tel").innerHTML = "Telefono: " + usuarios[enlistado].telefono;
    document.getElementById("mostrarUsuario_email").innerHTML = "Email: " + usuarios[enlistado].email;
    enlistado++;
}

//-------------------------------------------Botones-------------------------------------------//

function menuOperaciones() {

    document.getElementById("menuOperaciones").style.display = "none";

    if(document.getElementById("menuOperaciones_busqueda").checked){
        document.getElementById("menuBusqueda").style.display = "block";

    } else if (document.getElementById("menuOperaciones_listar").checked) {
        document.getElementById("mostrarUsuario").style.display = "block";
        document.getElementById("mostrarUsuario_sig").style.display = "block";
        enlistado = 0;
        listar();

    } else if (document.getElementById("menuOperaciones_salir").checked) {
        document.getElementById("menuSalida").style.display = "block";
        salidaDelPrograma = true;

    } else {
        alert("No se que paso1");
    }
}

function menuBusqueda() {

    document.getElementById("menuBusqueda").style.display = "none";

    if(document.getElementById("menuBusqueda_id").checked){
        tipoDeBusquedaGlob = 0;
        document.getElementById("busquedaPorX_input").placeholder = "ID";

    } else if (document.getElementById("menuBusqueda_nom").checked) {
        tipoDeBusquedaGlob = 1;
        document.getElementById("busquedaPorX_input").placeholder = "Nombre";

    } else if (document.getElementById("menuBusqueda_tel").checked) {
        tipoDeBusquedaGlob = 2;
        document.getElementById("busquedaPorX_input").placeholder = "Telefono";

    } else if (document.getElementById("menuBusqueda_email").checked) {
        tipoDeBusquedaGlob = 3;
        document.getElementById("busquedaPorX_input").placeholder = "Email";

    } else {
        alert("No se que paso3");
    }

    document.getElementById("busquedaPorX").style.display = "block";
}

function busquedaPorX() {
    document.getElementById("busquedaPorX").style.display = "none";

    let datoBuscar = document.getElementById("busquedaPorX_input").value;
    document.getElementById("busquedaPorX_input").value = "";

    let idEncontrado = null;
    let datoValidado = validar(datoBuscar, tipoDeBusquedaGlob);

    if (datoValidado !== -1) {
        idEncontrado = buscar(datoValidado, tipoDeBusquedaGlob);
        if (idEncontrado !== null) {
            document.getElementById("mostrarUsuario").style.display = "block";
            document.getElementById("mostrarUsuario_con").style.display = "block";

            document.getElementById("mostrarUsuario_id").innerHTML = "ID: " + usuarios[idEncontrado].id;
            document.getElementById("mostrarUsuario_nom").innerHTML = "Nombre: " + usuarios[idEncontrado].nombre;
            document.getElementById("mostrarUsuario_tel").innerHTML = "Telefono: " + usuarios[idEncontrado].telefono;
            document.getElementById("mostrarUsuario_email").innerHTML = "Email: " + usuarios[idEncontrado].email;
        } else {
            document.getElementById("menuSalida_text").innerHTML = "El usuario no existe";
            document.getElementById("menuSalida").style.display = "block";
            salidaDelPrograma = false;
        }
    } else {
        document.getElementById("menuSalida_text").innerHTML = "Valor invalido";
        document.getElementById("menuSalida").style.display = "block";
        salidaDelPrograma = false;
    }
}

function continuar() {
    document.getElementById("mostrarUsuario").style.display = "none";
    document.getElementById("mostrarUsuario_con").style.display = "none";
    document.getElementById("menuSalida_text").innerHTML = "";
    document.getElementById("menuSalida").style.display = "block";
    salidaDelPrograma = false;
}

function siguiente() {
    if (!(enlistado < usuarios.length)) {
        document.getElementById("mostrarUsuario").style.display = "none";
        document.getElementById("mostrarUsuario_sig").style.display = "none";
        document.getElementById("menuOperaciones").style.display = "block";
    } else {
        listar();
    }

}

function menuSalida() {
    document.getElementById("menuSalida").style.display = "none";
    if (!salidaDelPrograma && document.getElementById("menuSalida_continuar").checked) {
        document.getElementById("menuBusqueda").style.display = "block";
    } else if ((!salidaDelPrograma && !document.getElementById("menuSalida_continuar").checked) || 
                (salidaDelPrograma && document.getElementById("menuSalida_continuar").checked)) {
        document.getElementById("menuOperaciones").style.display = "block";
    } else {
        alert("Salir del programa");
    }
}