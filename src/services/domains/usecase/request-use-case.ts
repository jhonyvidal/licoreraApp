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
import { CreateLocationRequest } from 'src/shared/domain/request/CreateLocation';
import { DeleteAddressResponse } from 'src/shared/domain/response/DeleteAddressResponse';
import { FavoriteLocationsRequest } from 'src/shared/domain/request/FavoriteLocations';
import { FavoriteLocationResponse } from 'src/shared/domain/response/FavoriteLocationResponse';

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
  
  getCampains(token: string): Observable<suggestedProducts> {
    return this._requestGateWay.getCampains(token);
  }

  getCampainsById(id: string): Observable<suggestedProducts> {
    return this._requestGateWay.getCampainsById(id);
  }

  getNewProducts(token: string): Observable<suggestedProducts> {
    return this._requestGateWay.getNewProducts(token);
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

  PostDelivery( data: any) : Observable <any> {
    return this._requestGateWay.PostDelivery(data);
  }

  GetInfo() : Observable <any> {
    return this._requestGateWay.GetInfo();
  }

  searchCode(data: any) : Observable <any> {
    return this._requestGateWay.searchCode(data);
  }


  // Api v2

  getPaymentMethodsV2(token: string) : Observable <PaymentMethodsGetResponse> {
    return this._requestGateWay.getPaymentMethodsV2(token);
  }

  postPaymentCreditCard(token: string, data: any) : Observable <PostPaymentMethodsResponse> {
    return this._requestGateWay.postPaymentCreditCard(token, data);
  }

  postPaymentPse(token: string, data: any) : Observable <PostPaymentMethodsResponse> {
    return this._requestGateWay.postPaymentPse(token, data);
  }

  getPaymentBanks(token: string) : Observable <PaymentMethodsGetResponse> {
    return this._requestGateWay.getPaymentBanks(token);
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

  getGoogleApi(token: string, params: string) {
    return this._requestGateWay.getGoogleApi(token,params);
  }

  getMeLocation(token: string) {
    return this._requestGateWay.getMeLocation(token);
  }

  postLocations(token: string, data: CreateLocationRequest) : Observable <PostPaymentMethodsResponse> {
    return this._requestGateWay.postLocations(token, data);
  }

  postFavoriteLocations(token: string, data: FavoriteLocationsRequest) : Observable <FavoriteLocationResponse> {
    return this._requestGateWay.postFavoriteLocations(token, data);
  }

  postOrder(token: string, data: any) : Observable <PostPaymentMethodsResponse> {
    return this._requestGateWay.postOrder(token, data);
  }

  updateOrder(token:string, idOrden:number, data:any): Observable <PostPaymentMethodsResponse> {
    return this._requestGateWay.updateOrder(token,idOrden,data);
  }

  getOrder(token: string, page:number) : Observable <PostPaymentMethodsResponse> {
    return this._requestGateWay.getOrder(token, page);
  }
  
  getCurrentOrder(token: string) : Observable <PostPaymentMethodsResponse> {
    return this._requestGateWay.getCurrentOrder(token);
  }
  
  cancelCurrentOrder(token: string) : Observable <PostPaymentMethodsResponse> {
    return this._requestGateWay.cancelCurrentOrder(token);
  }

  getOrderById(token: string, id:number) : Observable <PostPaymentMethodsResponse> {
    return this._requestGateWay.getOrderById(token,id);
  }

  deleteAddress(token: string, idAddress: string) : Observable <DeleteAddressResponse> {
    return this._requestGateWay.deleteAddress(token, idAddress);
  }

  deleteFavoriteLocations(token: string, idAddress: number) : Observable <FavoriteLocationResponse> {
    return this._requestGateWay.deleteFavoriteLocations(token, idAddress);
  }

}
