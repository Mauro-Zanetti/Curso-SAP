using { miSuperLiga as my } from '../db/schema';

service api {

    entity Partidos     as projection on my.Partidos;
    entity Equipos      as projection on my.Equipos;
    entity Resultados   as projection on my.Resultados;
    entity Jugadores    as projection on my.Jugadores;
    entity Estadios     as projection on my.Estadios;
    entity Puntajes     as projection on my.Puntajes;

    entity VistaJugadores   as select from Jugadores{
        nombre,
        puntaje.gol,
        puntaje.partido.ID,
        puntaje.partido.arbitro,
        puntaje.partido.cantidadEspectadores,
        puntaje.partido.clasico,
        puntaje.partido.fecha,
        puntaje.partido.relator
    } where puntaje.gol > 2;

    entity VistaGoleada as select from Partidos {*,
        resultado.local,
        resultado.visitante
    } excluding {equipoLocal, equipoVisitante, estadio, resultado
    } where resultado.local - resultado.visitante > 2 or resultado.local - resultado.visitante < -2;

    entity VistaArquero as select from Jugadores {*,
        puntaje.salvada as puntaje_salvada
    } where posicion = 'Arquero' order by puntaje_salvada desc limit 1;//where puntaje.salvada

    entity VistaEstadioClasico as select from Estadios {*,
        partido.clasico as partido_clasico
    } where partido.clasico = true;

// Traer a una vista el jugador con mayor promedio de gol

    entity VistaMasPromedio as select from Jugadores {*,
        avg(puntaje.gol) as golPromedio : Decimal(6,3)
    }   group by ID, nombre
        order by golPromedio desc;



    entity VistaGolesLocales as select from Resultados {
        partido.equipoLocal.nombre as nombre,
        sum(local) as golesLoc : Integer
    } group by partido.equipoLocal.nombre;

    entity VistaGolesVisitante as select from Resultados {
        partido.equipoVisitante.nombre as nombre,
        sum(visitante) as golesVis : Integer
    } group by partido.equipoVisitante.nombre;
}