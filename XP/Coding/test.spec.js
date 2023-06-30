// Importar los módulos necesarios para las pruebas
import fs from 'fs';
import {guardarDB, leerDB} from './helpers/guardarArchivo.js';
import * as menu from './helpers/menu.js';
import { Tareas } from './models/tareas.js';
import { Tarea } from './models/tarea.js';

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

// Prueba para comprobar que se crea correctamente un objeto de la clase Tareas 

//describe('Prueba de creacion objeto de la clase Tareas', () => {
//  test('Se debe crear un objeto de la clase Tareas', () => {
//    const listaTareas = new Tareas();
//    expect(tarea).toBeInstanceOf(Tarea);
//  })
//})