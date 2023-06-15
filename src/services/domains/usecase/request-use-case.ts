import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestGateway } from '../gateway/request-gateway';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';

@Injectable()
export class RequestUseCases {
  constructor( private _requestGateWay: RequestGateway) {}

  getBasicData (token:string) : Observable <BasicDataOut> {
    return this._requestGateWay.getBasicData(token);
  }

}
