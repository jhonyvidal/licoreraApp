import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserExchangesPageRoutingModule } from './user-exchanges-routing.module';

import { UserExchangesPage } from './user-exchanges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserExchangesPageRoutingModule
  ],
  declarations: [UserExchangesPage]
})
export class UserExchangesPageModule {}
