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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const cds = require("@sap/cds");
const { Tecnologias, Dificultades, Tecno_Dific, Clientes, Proyectos } = cds.entities;

//-------------------------------------------XxxX-------------------------------------------//

// const tecData = await getTecnologias(tecnologia);

// async function getTecnologias(nom) {
//     return await cds.run(
//         SELECT.one(Tecnologias)
//         .where({ nombre : nom })
//     );
// }

// const tecData = await getInfo(Tecnologias, { nombre : tecnologia });

async function getInfo(entidad, objCampo) {
    return await cds.run(
        SELECT.one(entidad)
        .where(objCampo)
    );
}

//-------------------------------------------XxxX-------------------------------------------//

async function crear(entidad, info, texto) {
    try {
        await cds.run(INSERT.into(entidad).entries(info));
        // console.log(`Terminado ${texto}`);
    } catch (err) {
        console.log(err);
        console.log("TERROR 10");
    }
}

//-------------------------------------------XxxX-------------------------------------------//

async function updateTecDif(tecDataID, proyecDataID, difDataID) {
    await cds.run(
        UPDATE(Tecno_Dific)
        .with({ dif_tec_ID: difDataID })
        .where({ tec_dif_ID : tecDataID, proyecto_TD_ID : proyecDataID })
    );
}

//-------------------------------------------XxxX-------------------------------------------//

async function updateProyecto(nomID, cambio) {
    await cds.run(
        UPDATE(Proyectos)
        .with({ costeDeProyecto: { '+=': cambio} })
        .where({ nombre : nomID })
    );
}

//-------------------------------------------XxxX-------------------------------------------//

async function crearTecno_Dific(tecData, difData, proyecData) {
    let entrada = {
        tec_dif_ID: tecData.ID,
        dif_tec_ID: difData.ID,
        proyecto_TD_ID: proyecData.ID
    };
    await crear(Tecno_Dific, entrada, "Tecno_Dific");
}

//-------------------------------------------XxxX-------------------------------------------//

async function crearProyecto(proyecto, cliData, dificultad) {
    let entrada = {
        nombre: proyecto,
        cliente_Rel_ID: cliData.ID,
        costeDeProyecto: dificultad
    };
    await crear(Proyectos, entrada, "Proyectos");
}

//-------------------------------------------XxxX-------------------------------------------//

module.exports = cds.service.impl(async (srv) => {

    srv.on('Application', async (req)=>{
        const { tecnologia, dificultad, proyecto, cliente } = req.data;
        //{ Tecnologias, Dificultades, Tecno_Dific, Clientes, Proyectos }
        try {
            const tecData = await getInfo(Tecnologias, { nombre : tecnologia });
            const difData = await getInfo(Dificultades, { nivel : dificultad });
            const proyecData = await getInfo(Proyectos, { nombre : proyecto });
            const cliData = await getInfo(Clientes, { nombre : cliente });
            
            if (!(tecData && difData && cliData && proyecto)) { //parametro de tecnologia, dificultad o proyecto incorrecto
                return "Datos incopletos o invalidos"

            } else if (proyecData && proyecData.cliente_Rel_ID !== cliData.ID) { //si el proyecto ya tiene un cliente
                return "Ese proyecto pertenece a otro cliente"

            } else if (!proyecData) { //si no existe un proyecto con el nobre dado
                //crearProyecto y crearTecno_Dific
                await crearProyecto(proyecto, cliData, dificultad);
                await crearTecno_Dific(tecData, difData, await getInfo(Proyectos, { nombre : proyecto }) );
                return "Proyecto creado"

            } else { //si proyecto ya existe
                const tecDifData = await getInfo(Tecno_Dific, { tec_dif_ID : tecData.ID, proyecto_TD_ID : proyecData.ID });

                if (!tecDifData) { //si la tecnologia dada no esta en el proyecto dado
                    //crear otro tecDif (y actualizar proyecto)
                    await crearTecno_Dific(tecData, difData, proyecData);
                    await updateProyecto(proyecto, dificultad);
                    return "Se agrago una nueva tecnologia al proyecto";

                } else { //si la tecnologia dada esta en el proyecto dado
                    //update el tecDif (y actualizar proyecto)
                    await updateTecDif(tecData.ID, proyecData.ID, difData.ID);
                    const auxDifData = await getInfo(Dificultades, { ID : tecDifData.dif_tec_ID });
                    await updateProyecto(proyecto, dificultad - auxDifData.nivel);
                    return "Se actualizo el nivel de la tecnologia";

                }
            }
        } catch(err) {
            console.log("TERROR: ", err);
        }
    });
})