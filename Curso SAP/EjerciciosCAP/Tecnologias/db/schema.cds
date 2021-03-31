using { cuid, managed } from '@sap/cds/common'; //Currency, managed, sap,
namespace myTecnologias; // myTecnologias-Tecnologias myTecnologias-Dificultades myTecnologias-Tecno_Dific


entity Tecnologias : cuid {
    nombre                      : String;
    dificultad                  : Association to many Tecno_Dific on dificultad.tec_dif = $self;
}

entity Dificultades : cuid {
    nivel                       : Integer enum {
        facil                       = 1;
        madio                       = 2;
        dificil                     = 3;
    };
    tecnologia                  : Association to many Tecno_Dific on tecnologia.dif_tec = $self;
}

entity Tecno_Dific : cuid {
    tec_dif                     : Association to Tecnologias;
    dif_tec                     : Association to Dificultades;
    proyecto_TD                 : Association to Proyectos;
}

entity Proyectos : cuid {
    nombre                      : String;
    costeDeProyecto             : Integer;
    tecDif                      : Association to many Tecno_Dific on tecDif.proyecto_TD = $self;
    cliente_Rel                 : Association to Clientes;
}

entity Clientes : cuid {
    nombre                      : String;
    proyecto                    : Association to many Proyectos on proyecto.cliente_Rel = $self;
}