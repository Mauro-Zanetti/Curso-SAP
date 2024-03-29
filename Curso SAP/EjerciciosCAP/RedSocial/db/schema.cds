using { cuid, managed, Country } from '@sap/cds/common'; //Currency, managed, sap,
namespace myRedSocial; // myRedSocial-Usuarios myRedSocial-Mensajes myRedSocial-Perfiles myRedSocial-Publicaciones myRedSocial-Comentarios

type CorreoElectronico {
    usuario                         : String(50);
    dominio                         : String(50);
    full                            : String(50);
}

//-------------------------------------------XxxX-------------------------------------------//

entity Usuarios : cuid, Usuario_Humano {
    @mandatory username             : String(50);
    @mandatory password             : String(50);
    estatus                         : Boolean;
    amigos                          : Integer;
    // datosPersona                    : Usuario_Humano;
    mensaje                         : Composition of many Mensajes on mensaje.usuario = $self;
    publicacion                     : Association to many Publicaciones on publicacion.usuario = $self;
    comentario                      : Association to many Comentarios on comentario.usuario = $self;
    perfil                          : Association to Perfiles;
}

//-------------------------------------------XxxX-------------------------------------------//

aspect Usuario_Humano {
    @mandatory nombre               : String(50);
    @mandatory apellido             : String(50);
    @mandatory paisDeOrigen         : String(3);
    // @mandatory paisDeOrigen         : Country; // ERROR 
    genero                          : Integer enum {
        femenino                        = 1;
        masculino                       = 2;
        otro                            = 3;
    };
    telefono                        : String(50);
    @mandatory fechaDeNacimiento    : Date;
    @mandatory email                : CorreoElectronico;
    // @mandatory email                : array of { //se puede usar structured type
    //     usuario                         : String(50);
    //     dominio                         : String(50);
    //     full                            : String(50);
    // };
}

//-------------------------------------------XxxX-------------------------------------------//

entity Mensajes : cuid {
    @mandatory nombreDeRemitente    : String(50);
    contenido                       : String(50);
    leido                           : Boolean;
    multimedia                      : array of {
        tipo                            : String(50);
        tamanio                         : Decimal(7,3);
    };
    usuario                         : Association to Usuarios;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Perfiles : cuid {
    titulo                          : String(50);
    descripcion                     : String(50);
    visualizaciones                 : Integer;
    categoria                       : Integer enum {
        carbon                          = 0;
        bronze                          = 1;
        plata                           = 2;
        oro                             = 3;
        diamante                        = 4;
    };
    usuario                         : Association to Usuarios;
    publicacion                     : Association to many Publicaciones on publicacion.perfil = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Publicaciones : cuid { //, managed {
    titulo                          : String(50) default 'titulo';
    cantDeVecesCompartido           : Integer;
    tipo                            : Integer enum {
        texto                           = 1;
        foto                            = 2;
        video                           = 3;
        url                             = 4;
    };
    vistaPrevia                     : Boolean;
    likes                           : Integer;
    usuario                         : Association to Usuarios;
    perfil                          : Association to Perfiles;
    comentario                      : Association to many Comentarios on comentario.publicacion = $self;
}

//-------------------------------------------XxxX-------------------------------------------//

entity Comentarios : cuid { //, managed {
    contenido                       : String(300);
    usuario                         : Association to Usuarios;
    publicacion                     : Association to Publicaciones;
}