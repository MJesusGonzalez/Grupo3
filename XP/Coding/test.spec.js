// Importar los módulos necesarios para las pruebas
import fs from 'fs';
import {guardarDB, leerDB} from './helpers/guardarArchivo.js';
import { Tareas } from './models/tareas.js';
import { Tarea } from './models/tarea.js';
import { jest } from '@jest/globals';
import colors from 'colors';



// Prueba para comprobar si se guarda correctamente en el archivo
describe('Prueba de la función guardarDB', () => {
  test('Debe guardar los datos correctamente en el archivo', () => {
    const archivo = './database/data.json'
    const datos = [{ id: '1', completado: false, descripcion: 'Tarea 1' }];
    guardarDB(datos);
    expect(fs.existsSync(archivo)).toBe(true); // verifica que el archivo existe
    const dataArchivo = JSON.parse(fs.readFileSync(archivo, { encoding: 'utf-8' }));
    expect(dataArchivo).toEqual(datos); //verifica si los datos guardados son correctos
  });
});

// Prueba para comprobar que los datos se lean correctamente
describe('Prueba de la funcion leerDB', () => {
  test('Debe leer los datos correctamente del archivo', () => {
    const archivo = './database/data.json';
    const datos = [{ id: '1', completado: false, descripcion: 'Tarea 1' }];
    fs.writeFileSync(archivo, JSON.stringify(datos));
    const resultado = leerDB();
    expect(resultado).toEqual(datos); // verifica que los datos leidos sean iguales a los guardados
  })
})


// Prueba para comprobar que se crea correctamente un objeto de la clase Tarea
describe('Prueba de creacion objeto de la clase Tarea', () => {
  test('Se debe crear un objeto de la clase Tarea', () => {
    const tarea = new Tarea("creacion de test");
    expect(tarea).toBeInstanceOf(Tarea);
  })
})

// Prueba para crear una tarea mediante el metodo de crearTarea de la clase Tarea
describe('Prueba de creacion de una tarea para el listado de la clase Tarea', () => {
  test('crearTarea agrega correctamente una tarea al listado', () => {
    const listaTareas = new Tareas();
    const descripcion = 'Tarea 1';
    listaTareas.crearTarea(descripcion);
    const tareasKeys = Object.keys(listaTareas.getListado);// Obtener las claves del listado de tareas
    expect(tareasKeys.length).toBe(1);// Verificar si se ha agregado una tarea al listado
    const primeraTarea = listaTareas.getListado[tareasKeys[0]];// Obtener la primera tarea del listado
    expect(primeraTarea.descripcion).toBe(descripcion);// Verificar si la descripción de la tarea coincide con la proporcionada
  })
})

// Prueba para listar las tareas creadas mediate el metodo listadoCompleto
describe('Prueba para listar tareas mediante el metodo listadoCompleto', () => {
  test('listadoCompleto lista correctamente las tareas creadas', () => {
    const listaTareas = new Tareas();
    listaTareas.crearTarea('Tarea 1');
    listaTareas.crearTarea('Tarea 2');
    listaTareas.crearTarea('Tarea 3');
    const listadoInicial = listaTareas.getListado;
    const consoleSpy = jest.spyOn(console, 'log');// Capturar la salida del método listadoCompleto
    listaTareas.listadoCompleto()
    listadoInicial.forEach((item, idx) => {
      const estado = (item.completado) ? 'Completada'.green : 'Pendiente'.red;
      //verifica que la funcion simulada(jest.spyOn) ha sido llamada n veces y si los argumentos pasados a la llamada coinciden con los argumentos proporcionados
      expect(consoleSpy).toHaveBeenNthCalledWith(idx + 1, ` ${colors.green(idx + 1 + '.')} ${item.descripcion} :: ${estado} `);
    })
    consoleSpy.mockRestore();//restaurar una función simulada a su implementación original.
  })
})


// Prueba para eliminar una Tarea mediante el metodo borrarTarea
describe('Prueba para eliminar una Tarea mediante el metodo borrarTarea', () => {
  const tareas = new Tareas();
  tareas.crearTarea('Tarea 1');
  tareas.crearTarea('Tarea 2');
  tareas.crearTarea('Tarea 3');

  test('Se debe eliminar una tarea existente', () => {
    const listadoInicial = tareas.getListado;
    const tareaId = listadoInicial[1].id; // Seleccionar el ID de una tarea existente
    tareas.borrarTarea(tareaId);
  
    const listadoActualizado = tareas.getListado;
    const tareaEliminada = listadoActualizado.find(tarea => tarea.id === tareaId);// se espera el valor undefined, por la eliminacion

    expect(listadoActualizado.length).toBe(listadoInicial.length - 1); // Se espera que el listado tenga una tarea menos
    expect(tareaEliminada).toBeUndefined(); // Se espera que la tarea borrada no esté en el listado
  });

  test('No debe hacer nada si se intenta borrar una tarea inexistente', () => {
    const listadoInicial = tareas.getListado;
    const tareaId = 35; // ID de una tarea que no existe
    tareas.borrarTarea(tareaId);
    const listadoActualizado = tareas.getListado;
    expect(listadoActualizado.length).toBe(listadoInicial.length); // Se espera que el listado no cambie
  });
});


//class Tareas {
//  listado;
//  constructor() {
//    this.listado = {};
//  }
//  borrarTarea(id=''){
//    if(this.listado[id]){
//        delete this.listado[id];
//    }
//}
//}
//class Tarea{
//  id ='';
//  descripcion='';
//  completado=null;
//  constructor(descripcion){
//      this.descripcion = descripcion;
//      this.id = 1111;
//      this.completado = false;
//  }
//}
//hacer prueba unitaria del metodo borrarTarea con jest js