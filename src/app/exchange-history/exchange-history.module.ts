import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangeHistoyrPageRoutingModule } from './exchange-history-routing.module';

import { ExchangeHistoyrPage } from './exchange-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangeHistoyrPageRoutingModule
  ],
  declarations: [ExchangeHistoyrPage]
})
export class ExchangeHistoyrPageModule {}
