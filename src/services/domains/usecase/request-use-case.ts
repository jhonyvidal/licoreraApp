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
import { ClientPointsData } from 'src/shared/domain/response/ClientPointsData';
import { UpdateClientData } from 'src/shared/domain/request/UpdateClientData';
import { PaymentMethodsGetResponse } from 'src/shared/domain/response/PaymentMethodsGetResponse';
import { LoginV2Request } from 'src/shared/domain/request/LoginV2Request';
import { DeletePaymentMethodsRequest, PostPaymentMethodsRequest } from 'src/shared/domain/request/DeletePaymentRequest';
import { LoginV2Response } from 'src/shared/domain/response/LoginV2Response';
import { DeletePaymentResponse, PostPaymentMethodsResponse } from 'src/shared/domain/response/DeletePaymentResponse';
import { UserModel } from 'src/store/models/user-model';
import { LocationsResponse } from 'src/shared/domain/response/LocationsResponse';

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

  getClientPoints(userId: string) : Observable <ClientPointsData> {
    return this._requestGateWay.getClientPoints(userId);
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

  putClient(userid: string, data: UpdateClientData):Observable<ClientData> {
    return this._requestGateWay.putClient(userid, data);
  }

  // Api v2

  getPaymentMethodsV2(token: string) : Observable <PaymentMethodsGetResponse> {
    return this._requestGateWay.getPaymentMethodsV2(token);
  }

  getLocationsV2(token: string) : Observable <LocationsResponse> {
    return this._requestGateWay.getLocationsV2(token);
  }

  postLoginV2(data: LoginV2Request) : Observable <LoginV2Response> {
    return this._requestGateWay.postLoginV2(data);
  }

  postDeletePaymentMethods(token: string, data: DeletePaymentMethodsRequest) : Observable <DeletePaymentResponse> {
    return this._requestGateWay.postDeletePaymentMethods(token, data);
  }

  postPaymentMethods(token: string, data: PostPaymentMethodsRequest) : Observable <PostPaymentMethodsResponse> {
    return this._requestGateWay.postPaymentMethods(token, data);
  }

  getMe(token: string) : Observable <UserModel> {
    return this._requestGateWay.getMe(token);
  }

}
