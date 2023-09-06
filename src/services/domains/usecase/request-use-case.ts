import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestGateway } from '../gateway/request-gateway';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { ActiveResponse } from 'src/shared/domain/response/ActiveResponse';
import { suggestedProducts } from 'src/shared/domain/response/suggestedProductResponse';
import { PromotionsData } from 'src/shared/domain/response/PromotionsData';
import { ProductSearch } from 'src/shared/domain/response/ProductSearch';
import { RecommendedProducts } from 'src/shared/domain/response/RecommendedProducts';
import { CategoriesOut } from 'src/shared/domain/response/Categories';
import { CategoriesByProductOut } from 'src/shared/domain/response/CategoriesByProduct';
import { LoginResponse } from 'src/shared/domain/response/LoginResponse';
import { CreateAccountRequest } from 'src/shared/domain/request/createAccount';
import { ClientData } from 'src/shared/domain/response/ClientResponse';

@Injectable()
export class RequestUseCases {
  constructor( private _requestGateWay: RequestGateway) {}

  getIsActive (token:string) : Observable <ActiveResponse> {
    return this._requestGateWay.getIsActive(token);
  }

  getSuggestedProducts (token:string) : Observable <suggestedProducts> {
    return this._requestGateWay.getSuggestedProducts(token);
  }

  getPromotion(token: string): Observable<suggestedProducts> {
    return this._requestGateWay.getPromotion(token);
  }

  getPromotions (token:string, promotionPage: number) : Observable <PromotionsData> {
    return this._requestGateWay.getPromotions(token, promotionPage);
  }

  getProductSearch (token:string, inputSearched: string) : Observable <ProductSearch> {
    return this._requestGateWay.getProductSearch(token, inputSearched);
  }

  getRecommendedProducts (token:string) : Observable <RecommendedProducts> {
    return this._requestGateWay.getRecommendedProducts(token);
  }

  getCategories (token:string) : Observable <CategoriesOut> {
    return this._requestGateWay.getCategories(token);
  }

  getCategoriesByProduct(token:string, id:string, page:number) : Observable <CategoriesByProductOut> {
    return this._requestGateWay.getCategoriesByProduct(token, id, page);
  }

  getClient(token: string, userId: string) : Observable <ClientData> {
    return this._requestGateWay.getClient(token, userId);
  }

  postLogin(token:string, email:string, password:string) : Observable <LoginResponse> {
    return this._requestGateWay.postLogin(token, email, password);
  }
  
  postForgotPassword(token:string, email:string):Observable<LoginResponse> {
    return this._requestGateWay.postForgotPassword(token, email);
  }

  postCreateAccount(token:string,  data:CreateAccountRequest):Observable<LoginResponse> {
    return this._requestGateWay.postCreateAccount(token, data);
  }
}
