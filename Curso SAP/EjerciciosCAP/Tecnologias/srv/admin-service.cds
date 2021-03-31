using { myTecnologias as my } from '../db/schema';

service api {

    entity Tecnologias  as projection on my.Tecnologias;
    entity Dificultades as projection on my.Dificultades;
    entity Clientes     as projection on my.Clientes;
    entity Tecno_Dific  as projection on my.Tecno_Dific;
    entity Proyectos    as projection on my.Proyectos;


    entity VistaTodo        as select from Proyectos{
        cliente_Rel.nombre      as Cliente,
        nombre                  as Proyecto,
        costeDeProyecto         as Costo,
        tecDif.tec_dif.nombre   as Tech,
        tecDif.dif_tec.nivel    as Nivel
    };

    // entity VistaTodo as select Proyectos.nombre, alias.ID from Proyectos
    // left join Tecno_Dific alias on Proyectos.ID = alias.proyecto_TD.ID;

    // entity VistaTodo as select from Clientes 
    // left join Proyectos on Clientes.ID = Proyectos.cliente_Rel;


    // SELECT Books.title, author.name from Books
    // LEFT JOIN Authors author ON author.ID = Books.author_ID;

    action Application(tecnologia : String, dificultad : Integer, proyecto : String, cliente : String) returns String;
}