const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmarPregunta, mostrarListadoCompletado } = require('./helpers/inquirer');
const Tareas = require('./models/tareas')
console.clear()

const main = async() => { 
    let opcion = '';
    const listaTareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){ //cargar tareas
        //Establecer las tareas
        listaTareas.cargarTareasFromArray(tareasDB).getListado;
    }
    do{
        // Imprimir el menu
        opcion = await inquirerMenu();  
        switch (opcion) {
            case '1':   // Crear tarea
                const desc = await leerInput('Descripcion: ');
                break;
            case '2':  // Listar todas las tareas
                break;
            case '3': // marcar como completadas y pendientes 
                break;
            case '4': // Borrar tareas
                break;
            
        }
        await pausa();
    }while(opcion !== '0');
 }

 main();




