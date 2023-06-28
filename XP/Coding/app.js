console.clear()

const main = async() => { 
    let opcion ='';
    do{
        // Imprimir el menu
        opcion = await inquirerMenu();  
        switch (opcion) {
            case '1':   // Crear tarea
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




