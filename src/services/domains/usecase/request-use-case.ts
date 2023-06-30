import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestGateway } from '../gateway/request-gateway';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { ActiveResponse } from 'src/shared/domain/response/ActiveResponse';
import { suggestedProducts } from 'src/shared/domain/response/suggestedProductResponse';
import { PromotionsData } from 'src/shared/domain/response/PromotionsData';

@Injectable()
export class RequestUseCases {
  constructor( private _requestGateWay: RequestGateway) {}

  getBasicData (token:string) : Observable <BasicDataOut> {
    return this._requestGateWay.getBasicData(token);
  }

  getIsActive (token:string) : Observable <ActiveResponse> {
    return this._requestGateWay.getIsActive(token);
  }

  getSuggestedProducts (token:string) : Observable <suggestedProducts> {
    return this._requestGateWay.getSuggestedProducts(token);
  }

  getPromotions2(token: string): Observable<suggestedProducts> {
    return this._requestGateWay.getPromotions(token);
  }
  
  getPromotions (token:string, promotionPage: number) : Observable <PromotionsData> {
    return this._requestGateWay.getPromotions(token, promotionPage);
  }

}
