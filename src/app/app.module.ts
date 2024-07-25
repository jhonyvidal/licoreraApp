import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SQLiteService } from 'src/store/services/sqlite.service';
import { InitializeAppService } from 'src/store/services/initialize.app.service';
import { DbnameVersionService } from 'src/store/services/dbname-version.service';
import { ServicesModule } from 'src/services/services.module';
import { ConfigService } from 'src/store/services/config.service';
import { DepartmentEmployeesService } from 'src/store/services/department-employees.service';
import { AuthorPostsService } from 'src/store/services/author-posts.service';
import { register } from 'swiper/element/bundle';

register();
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthInterceptor } from 'src/services/interceptors/interceptor';
import { BaseApiService } from 'src/shared/infraestructure/base-api.service';

export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true
    }), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ServicesModule,
    FormsModule],
  providers: [
    SQLiteService, 
    InitializeAppService,
    DepartmentEmployeesService,
    ConfigService,
    AuthorPostsService,
    DbnameVersionService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    BaseApiService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

