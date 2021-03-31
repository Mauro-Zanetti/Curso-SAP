using { cuid, managed } from '@sap/cds/common'; //Currency, managed, sap,
namespace miSuperLiga;

type Fecha : Date;

//-------------------------------------------XxxX-------------------------------------------//

entity Partidos : cuid {
    cantidadEspectadores: Integer;
    arbitro             : String;
    relator             : String;
    fecha               : Fecha;
    clasico             : Boolean;
    equipoLocal         : Association to Equipos;
    equipoVisitante     : Association to Equipos;
    estadio             : Association to Estadios;
    resultado           : Composition of Resultados;
    puntaje             : Association to many Puntajes on puntaje.partido = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Equipos : cuid {
    nombre              : String;
    division            : String;
    puntos              : Integer;
    cantidadJugadores   : Integer;
    presupuesto         : Decimal(7,3);
    estadio             : Association to Estadios;
    jugador             : Composition of many Jugadores on jugador.equipo = $self;
    partido             : Association to many Partidos on partido.equipoLocal = $self or partido.equipoVisitante = $self; //and talvez no funciona si no se usa csv
    // partidoL            : Association to many Partidos on partidoL.equipoLocal = $self;
    // partidoV            : Association to many Partidos on partidoV.equipoVisitante = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Resultados : cuid {
    local               : Integer;
    visitante           : Integer;
    partido             : Association to Partidos;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Jugadores : cuid {
    nombre              : String;
    valorMercado        : Integer;
    apodo               : String;
    posicion            : String;
    pais                : String;
    numeroRemera        : Integer;
    equipo              : Association to Equipos;
    puntaje             : Association to many Puntajes on puntaje.jugador = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Estadios : cuid {
    nombre              : String;
    direccion           : String;
    capacidad           : Integer;
    partido             : Composition of many Partidos on partido.estadio = $self;
    equipo              : Composition of many Equipos on equipo.estadio = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Puntajes : cuid {
    gol                 : Integer;
    asistencia          : Integer;
    salvada             : Integer;
    partido             : Association to Partidos;
    jugador             : Association to Jugadores;
}