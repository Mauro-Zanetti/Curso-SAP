using { myTecnologias as my } from '../db/schema';

service api {

    entity Tecnologias  as projection on my.Tecnologias;
    entity Dificultades as projection on my.Dificultades;
    entity Clientes     as projection on my.Clientes;
    entity Tecno_Dific  as projection on my.Tecno_Dific;
    entity Proyectos    as projection on my.Proyectos;


    // entity VistaTodo        as select from Proyectos{
    //     cliente_Rel.nombre as cliente,
    //     nombre
    //     // costeDeProyecto as costo,
    //     // tecDif.dif_tec.nivel as nivel,
    //     // tecDif.tec_dif.nombre as tech
    // } group by cliente_Rel.nombre union select from Tecno_Dific {
    //     
    // };

    action Application(tecnologia : String, dificultad : Integer, proyecto : String, cliente : String) returns String;
}