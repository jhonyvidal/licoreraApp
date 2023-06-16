import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestGateway } from '../gateway/request-gateway';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { PromotionsData } from 'src/shared/domain/response/PromotionsData';

@Injectable()
export class RequestUseCases {
  constructor( private _requestGateWay: RequestGateway) {}

  getBasicData (token:string) : Observable <BasicDataOut> {
    return this._requestGateWay.getBasicData(token);
  }

  getPromotions (token:string, promotionPage: number) : Observable <PromotionsData> {
    return this._requestGateWay.getPromotions(token, promotionPage);
  }

}
