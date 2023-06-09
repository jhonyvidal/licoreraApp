import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private sqlite: SQLite) {}

  crearTabla() {
    this.sqlite.create({
      name: 'mydatabase.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS productos(id INTEGER PRIMARY KEY, nombre TEXT)', [])
        .then(() => console.log('Tabla creada'))
        .catch((error) => console.error('Error al crear la tabla', error));
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

