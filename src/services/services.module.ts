import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder } from '@angular/forms';
import { RequestGateway } from './domains/gateway/request-gateway';
import { RequestApiService } from './infraestructure/driven-adapter/request-api/request-api.service';
import { RequestUseCases } from './domains/usecase/request-use-case';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[
  ],
  providers:[
    FormBuilder,
    RequestUseCases,
    {provide: RequestGateway, useClass: RequestApiService}
  ]
})
export class ServicesModule { }
