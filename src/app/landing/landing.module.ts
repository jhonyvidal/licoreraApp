import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import { Config } from '@ionic/angular';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({

  imports: [
    SharedModule,
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true
    }),
    CommonModule,
    FormsModule,
    LandingPageRoutingModule
  ],
  declarations: [LandingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingPageModule {}
