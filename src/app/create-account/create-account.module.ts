import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAccountPageRoutingModule } from './create-account-routing.module';

import { CreateAccountPage } from './create-account.page';
import { UserService } from 'src/store/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateAccountPageRoutingModule
  ],
  declarations: [CreateAccountPage],
  providers: [ UserService ]
})
export class CreateAccountPageModule {}
