import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EpaycoResponseRouting } from './epayco_response.routing';
import { EpaycoResponse } from './epayco_response';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EpaycoResponseRouting,
    MaskitoModule
  ],
  declarations: [EpaycoResponse]
})
export class EpaycoResponseModule {}
