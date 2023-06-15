import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SQLiteService } from 'src/store/services/sqlite.service';
import { DepartmentEmployeesService } from 'src/store/services/department-employees.service';
import { InitializeAppService } from 'src/store/services/initialize.app.service';
import { DbnameVersionService } from 'src/store/services/dbname-version.service';
import { ServicesModule } from 'src/services/services.module';

export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,ServicesModule],
  providers: [
    SQLiteService, 
    InitializeAppService,
    DepartmentEmployeesService,
    DbnameVersionService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

