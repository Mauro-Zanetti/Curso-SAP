/*
Un cliente quiere nos ha contado su caso y le gustaría que le propusiéramos una base de datos acorde a los que nos ha comentado y ver que tan eficaz es CAP, 
por lo cual nos comenta lo siguiente que hay que tener en cuenta.

1.	Nos comentan que quieren hacer una aplicación para poder gestionar proyectos y saber sobre que dificultad estarán para saber estimar el coste que deberán 
    decirles a sus clientes.
2.	Sabemos que usan las siguientes tecnologías HTML, CSS, Java, SAP UI5, JavaScript.
3.	Según la tecnología que escojan y el nivel de dificultad (BAJO, MEDIO Y ALTO) en el sistema será más complicado o menos complicado.
4.	Los niveles de dificultad serán de entre 1, 3 Y 5.
5.	Solo se podrá especificar una tecnología con un numero de cargas ()
6.	El Cliente quiere almacenar la información sobre sus clientes.
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  ADVERTENCIA
//  El codigo que sigue funciona pero se que no esta muy bien, y que se puede hacer mas legible, el miercoles
//  queria refinarlo preguntando y viendo la pagina de CAP para ver si lo puedo mejorar
//  
//  En postman:
//  POST en http://localhost:4004/api/Application
//  {
//      "tecnologia" : "HTML", 
//      "dificultad" : 1, 
//      "proyecto" : "Bank", 
//      "cliente" : "Gerardo"
//  }
//  y para verlo
//  http://localhost:4004/api/Clientes?$expand=proyecto($expand=tecDif($expand=tec_dif,dif_tec))
//  (tambien queria hacer una mejor vista)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const cds = require("@sap/cds");
const { Tecnologias, Dificultades, Tecno_Dific, Clientes, Proyectos } = cds.entities;


async function getTecnologias(nom) { //.from devuelve araay, .one devuelve 1 objeto (no seria nesesario usar [0])
    return await cds.run(
        SELECT.one(Tecnologias)
        .where({ nombre : nom })
    );
}

async function getDificultadesPorNiv(dif) {
    return await cds.run(
        SELECT.one(Dificultades)
        .where({ nivel : dif })
    );
}

async function getDificultadesPorID(difID) {
    return await cds.run(
        SELECT.one(Dificultades)
        .where({ ID : difID })
    );
}

async function getProyectos(nom) {
    return await cds.run(
        SELECT.one(Proyectos)
        .where({ nombre : nom })
    );
}

async function getClientes(nom) {
    return await cds.run(
        SELECT.one(Clientes)
        .where({ nombre : nom })
    );
}

async function getTecnoDific(nomID, proyectID) {
    return await cds.run(
        SELECT.one(Tecno_Dific)
        .where({ tec_dif_ID : nomID, proyecto_TD_ID : proyectID })
    );
}

async function crear(entidad, info, texto) {
    try {
        await cds.run(INSERT.into(entidad).entries(info));
        console.log(`Terminado ${texto}`);
    } catch (err) {
        console.log(err);
        console.log("TERROR 10");
    }
}

async function updateTecDif(tecDataID, proyecDataID, difDataID) {
    await cds.run(
        UPDATE(Tecno_Dific)
        .with({ dif_tec_ID: difDataID })
        .where({ tec_dif_ID : tecDataID, proyecto_TD_ID : proyecDataID })
    );
}

async function updateProyecto(nomID, cambio) {
    await cds.run(
        UPDATE(Proyectos)
        .with({ costeDeProyecto: { '+=': cambio} })
        .where({ nombre : nomID })
    );
}

module.exports = cds.service.impl(async (srv) => {

    srv.on('Application', async (req)=>{
        const { tecnologia, dificultad, proyecto, cliente } = req.data;
        try {
            const tecData = await getTecnologias(tecnologia);
            const difData = await getDificultadesPorNiv(dificultad);
            const proyecData = await getProyectos(proyecto);
            const cliData = await getClientes(cliente);
            
            if (!(tecData && difData && cliData && proyecto)) { //parametro de tecnologia, dificultad o proyecto incorrecto
                return "Datos incopletos o invalidos"
            } else if (proyecData && proyecData.cliente_Rel_ID !== cliData.ID) { //si el proyecto ya tiene un cliente
                return "Ese proyecto pertenece a otro cliente"
            } else if (!proyecData) { //crea proyecto
                //crear proyecto
                let entrada = {
                    nombre          : proyecto,
                    cliente_Rel_ID  : cliData.ID,
                    costeDeProyecto : dificultad
                };
                await crear(Proyectos, entrada, "Proyectos");
                const proyecData2 = await getProyectos(proyecto);
                // console.log(proyecData2);
                entrada = {
                    tec_dif_ID      : tecData.ID,
                    dif_tec_ID      : difData.ID,
                    proyecto_TD_ID  : proyecData2.ID
                };
                // console.log(entrada);
                await crear(Tecno_Dific, entrada, "Tecno_Dific");

                return "exito"
            } else { //si proyecto ya existe
                const tecDifData = await getTecnoDific(tecData.ID, proyecData.ID);
                console.log(tecDifData);
                console.log("tecDifData");
                if (!tecDifData) { //crear otro tecDif
                    let entrada = {
                        tec_dif_ID      : tecData.ID,
                        dif_tec_ID      : difData.ID,
                        proyecto_TD_ID  : proyecData.ID
                    };
                    console.log(entrada);
                    await crear(Tecno_Dific, entrada, "Tecno_Dific");
                    updateProyecto(proyecto, dificultad);
                    return "exito2";
                } else {    //update un tecDif
                    updateTecDif(tecData.ID, proyecData.ID, difData.ID);
                    const difData2 = await getDificultadesPorID(tecDifData.dif_tec_ID);
                    updateProyecto(proyecto, dificultad - difData2.nivel);
                    return "exito3";
                }
            }

        } catch(err) {
            console.log("TERROR: ", err);
        }
    });

})