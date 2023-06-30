import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import { Config } from '@ionic/angular';
import { CustomPipe } from 'src/shared/pipes/custom.pipe';

@NgModule({

  imports: [
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true
    }),
    CommonModule,
    FormsModule,
    LandingPageRoutingModule
  ],
  declarations: [LandingPage,CustomPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingPageModule {}
