import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserExchangesPageRoutingModule } from './user-exchanges-routing.module';

import { UserExchangesPage } from './user-exchanges.page';
import { ExchangeDatePipe } from 'src/shared/pipes/exchangeDate.pipe';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UserExchangesPageRoutingModule
  ],
  providers:[ExchangeDatePipe],
  declarations: [UserExchangesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserExchangesPageModule {}
