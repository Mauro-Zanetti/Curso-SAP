/*
Realizar un programa para web (Con interfaz Gráfica), en el cual el alumno introduce sus datos al ingresar:
    -Nombre, DNI, Fecha de nacimiento, teléfono, email, numero de legajo, Curso.
    -Validar si el alumno pertenece al Curso, si el alumno cumple con el rango de edad para el curso seleccionado, si el alumno es mayor de 18, 
    validar largo de teléfono (10) y email (50), si el número de legajo es correcto con el DNI (Numero de Legajo se forma con: “A” + curso + DNI + “2021”)
Ingresar notas y su valor ponderado (como cuando un examen vale un 30% y otro examen el 70%).

Materias:
    -Química (Aprobado 10%)
    -Matemática (Aprobado 20%)
    -Ciencias Sociales (Aprobado 5%)
    -Física (Aprobado 10%)
    -Historia (Aprobado 5%)
    -Biología (Aprobado 20%)
    -Informática (Aprobado 30%)
    -Idiomas (Aprobado 30%)

Se debe permitir:

Buscar un alumno:
    -Debe podir seleccionar por qué dato se va a buscar: DNI, nombre, celular o email.
    -A continuación, debe poder ingresar el valor que se va a buscar.
    -Si el alumno existe debe mostrar la información del alumno con todos sus datos.
    -Si el alumno no existe debe mostrar un mensaje informándolo.
    -A continuación, debe pedir si se desea realizar nuevamente el procedimiento:
        -Si la respuesta es afirmativa, debe volver a realizar el procedimiento
        -Si la respuesta es negativa, debe llevar al menú de operaciones

Listar todos los alumno:
    -Debe mostrar un listado con todos los usuarios y todos sus datos:
        -Legajo
        -Curso
        -DNI
        -Nombre
        -Fecha Nacimiento
        -Teléfono
        -Email
    -Luego debe llevar al menú de operaciones.

Debe poder mostrar un listado por materia con los alumnos aprobados y desaprobados según selección. Además un mensaje advirtiendo si el alumno paso de Año (Debe tener un porcentaje total mayor o igual al 100% )

Salir del programa:
    -Debe preguntar si desea confirmar la operación:
        -Si la respuesta es afirmativa debe mostrar un mensaje de despedida y salir del programa
        -Si la respuesta es negativa debe volver al menú de operaciones
*/