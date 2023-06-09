import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private sqlite: SQLite) {}

  // CREATE - Agregar un producto
  agregarProducto(nombre: string) {
    this.sqlite.create({
      name: 'mydatabase.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO productos (nombre) VALUES (?)', [nombre])
        .then(() => console.log('Producto agregado'))
        .catch((error) => console.error('Error al agregar el producto', error));
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // READ - Obtener todos los productos
  obtenerProductos() {
    this.sqlite.create({
      name: 'mydatabase.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM productos', [])
        .then((data) => {
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              console.log('Producto:', data.rows.item(i));
            }
          }
        })
        .catch((error) => console.error('Error al obtener los productos', error));
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // UPDATE - Actualizar un producto
  actualizarProducto(id: number, nuevoNombre: string) {
    this.sqlite.create({
      name: 'mydatabase.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('UPDATE productos SET nombre = ? WHERE id = ?', [nuevoNombre, id])
        .then(() => console.log('Producto actualizado'))
        .catch((error) => console.error('Error al actualizar el producto', error));
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // DELETE - Eliminar un producto
  eliminarProducto(id: number) {
    this.sqlite.create({
      name: 'mydatabase.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM productos WHERE id = ?', [id])
        .then(() => console.log('Producto eliminado'))
        .catch((error) => console.error('Error al eliminar el producto', error));
    })
    .catch((error) => {
      console.error(error);
    });
  }

}
