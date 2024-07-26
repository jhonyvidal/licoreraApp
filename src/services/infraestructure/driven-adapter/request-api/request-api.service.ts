import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequestGateway } from 'src/services/domains/gateway/request-gateway';
import { ActiveResponse } from 'src/shared/domain/response/ActiveResponse';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { suggestedProducts } from 'src/shared/domain/response/suggestedProductResponse';
import { PromotionsData } from 'src/shared/domain/response/PromotionsData';
import { BaseApiService } from 'src/shared/infraestructure/base-api.service';
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
import { FavoriteLocationsRequest } from 'src/shared/domain/request/FavoriteLocations';
import { FavoriteLocationResponse } from 'src/shared/domain/response/FavoriteLocationResponse';
import { UserExchangeResponse } from 'src/shared/domain/response/UserExchangeResponse';

@Injectable()
export  class RequestApiService extends RequestGateway {

  constructor(private http: BaseApiService,private https: HttpClient) {super();}

  getIsActive(token: string): Observable<ActiveResponse> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('isActive',headers).pipe(
      map(response => {
        return response as ActiveResponse
      })
    )
  }

  getSuggestedProducts(token: string): Observable<suggestedProducts> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('suggestedProducts',headers).pipe(
      map(response => {
        return response as suggestedProducts
      })
    )
  }

  getProductSearch(token: string, inputSearched: string): Observable<ProductSearch> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('search?q=' + inputSearched,headers).pipe(
      map(response => {
        // console.log(response)
        return response as BasicDataOut
      })
    )
  }

  getPromotion(token: string): Observable<suggestedProducts> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('promotions',headers).pipe(
      map(response => {
        return response as suggestedProducts
      })
    )
  }

  getCampains(token: string): Observable<suggestedProducts> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('campaigns', headers).pipe(
      map(response => {
        return response as suggestedProducts
      })
    )
  }

  getCampainsById(id: string): Observable<suggestedProducts> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get(`campaigns/${id}`, headers).pipe(
      map(response => {
        return response as suggestedProducts
      })
    )
  }

  getNewProducts(token: string): Observable<suggestedProducts> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('newProducts',headers).pipe(
      map(response => {
        return response as suggestedProducts
      })
    )
  }

  getPromotions(token: string, promotionPage: number): Observable<PromotionsData> {
    const headers = new HttpHeaders(/*{'Authorization': 'Bearer '+ token}*/);
    return this.http.get('promotionProducts?page=' + promotionPage, headers).pipe(
      map(response => {
        // console.log(response)
        return response as PromotionsData
      })
    )
  }

  getRecommendedProducts(token: string): Observable<RecommendedProducts> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('suggestedProducts',headers).pipe(
      map(response => {
        // console.log(response)
        return response as BasicDataOut
      })
    )
  }

  getCategories(token:string):Observable<CategoriesOut> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('categories',headers).pipe(
      map(response => {
        // console.log(response)
        return response as CategoriesOut
      })
    )
  }

  getCategoriesByProduct(token:string, id:string, page:number):Observable<CategoriesByProductOut> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('categories/' + id + '/products?page=' + page, headers).pipe(
      map(response => {
        // console.log(response)
        return response as CategoriesByProductOut
      })
    )
  }

  getClient(token: string, userId: string):Observable<ClientData> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get('clients/' + userId, headers).pipe(
      map(response => {
        // console.log(response)
        return response as ClientData
      })
    )
  }

  getClientPoints(userId: string):Observable<ClientPointsData> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get(`clients/${userId}/points`, headers).pipe(
      map(response => {
        // console.log(response)
        return response as ClientPointsData
      })
    )
  }

  postLogin(token:string, email:string, password:string):Observable<LoginResponse> {
    const data = {
      email:email,
      password:password
    }
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.post('login', data , headers).pipe(
      map(response => {
        // console.log(response)
        return response as LoginResponse
      })
    )
  }

  postForgotPassword(token:string, email:string):Observable<LoginResponse> {
    const data = {
      email:email
    }
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.ResetPassword('https://applicorera3jjjs.com/clients/rememberPassword', data , headers).pipe(
      map(response => {
        // console.log(response)
        return response as LoginResponse
      })
    )
  }

  postCreateAccount(token:string, data:CreateAccountRequest):Observable<LoginResponse> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.post('clients', data , headers).pipe(
      map(response => {
        // console.log(response)
        return response as LoginResponse
      })
    )
  }

  postDevices(data:any):Observable<LoginResponse> {
    return this.http.post('devices', data ).pipe(
      map(response => {
        // console.log(response)
        return response as LoginResponse
      })
    )
  }

  putClient(userId: string, data: UpdateClientData):Observable<ClientData> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.put(`clients/${userId}`, data).pipe(
      map(response => {
        // console.log(response)
        return response as ClientData
      })
    )
  }

  GetInfo():Observable<any> {
    const headers = new HttpHeaders(
      // {'Authorization': 'Bearer '+ token}
      );
    return this.http.get(`tresjotasInfo`).pipe(
      map(response => {
        // console.log(response)
        return response as any
      })
    )
  }

  searchCode(data:any):Observable<any> {
    return this.http.post(`searchCode`,data).pipe(
      map(response => {
        // console.log(response)
        return response as any
      })
    )
  }

  // Api v2
  getPaymentMethodsV2(token: string):Observable<PaymentMethodsGetResponse> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.getV2('api/v2/me/paymentMethods', headers).pipe(
      map(response => {
        return response as PaymentMethodsGetResponse
      })
    )
  }

  getLocationsV2(token: string):Observable<LocationsResponse> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.getV2('api/v2/me/locations', headers).pipe(
      map(response => {
        return response as LocationsResponse
      })
    )
  }

  postLoginV2(data: LoginV2Request): Observable<LoginV2Response> {
    return this.http.postV2('api/v2/login', data).pipe(
      map(response => {
        // console.log(response)
        return response as LoginV2Response
      })
    )
  }

  getPaymentBanks(token: string): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.getV2('api/v2/payments/banks',headers).pipe(
      map(response => {
        // console.log(response)
        return response as any
      })
    )
  }

  
  postPaymentCreditCard(token: string, data: PostPaymentMethodsRequest): Observable<PostPaymentMethodsResponse> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.postV2('api/v2/payments/creditCard', data, headers).pipe(
      map(response => {
        // console.log(response)
        return response as PostPaymentMethodsResponse
      })
    )
  }

  postPaymentPse(token: string, data: PostPaymentMethodsRequest): Observable<PostPaymentMethodsResponse> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.postV2('api/v2/payments/pse', data, headers).pipe(
      map(response => {
        // console.log(response)
        return response as PostPaymentMethodsResponse
      })
    )
  }

  postDeletePaymentMethods(token: string, data: DeletePaymentMethodsRequest): Observable<DeletePaymentResponse> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.postDelete('api/v2/me/paymentMethods/remove', data, headers).pipe(
      map(response => {
        // console.log(response)
        return response as DeletePaymentResponse
      })
    )
  }

  postPaymentMethods(token: string, data: PostPaymentMethodsRequest): Observable<PostPaymentMethodsResponse> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.postPaymentMethods('api/v2/me/paymentMethods/add', data, headers).pipe(
      map(response => {
        // console.log(response)
        return response as PostPaymentMethodsResponse
      })
    )
  }

  getMe(token: string):Observable<UserModel> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
      );
    return this.http.getV2('api/v2/me', headers).pipe(
      map(response => {
        // console.log(response)
        return response as UserModel
      })
    )
  }

  getGoogleApi(token: string, param:string):Observable<UserModel> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.getV2(`api/v2/locations/google/${param}`,headers).pipe(
      map(response => {
        // console.log(response)
        return response as UserModel
      })
    )
  }

  getGoogleReverseApi(token:string, latitude: number, longitude: number):Observable<UserModel> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.getV2(`api/v2/locations/google/${latitude}/${longitude}`,headers).pipe(
      map(response => {
        // console.log(response)
        return response as UserModel
      })
    )
  }

  getMeLocation(token: string):Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.getV2('api/v2/me/locations',headers).pipe(
      map(response => {
        // console.log(response)
        return response as UserModel
      })
    )
  }

  getConfirmation(token: string,id:number):Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.getV2(`api/v2/payments/confirmation/${id}`,headers).pipe(
      map(response => {
        // console.log(response)
        return response as UserModel
      })
    )
  }

  postLocations(token: string, data: CreateLocationRequest): Observable<any> {
    console.log("inter token:",token)
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.postV2('api/v2/locations', data, headers).pipe(
      map(response => {
        // console.log(response)
        return response as any
      })
    )
  }

  postFavoriteLocations(token: string, data: FavoriteLocationsRequest): Observable<FavoriteLocationResponse> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.postV2('api/v2/me/locations', data, headers).pipe(
      map(response => {
        // console.log(response)
        return response as FavoriteLocationResponse
      })
    )
  }
  

  PostDelivery(data:any): Observable<any> {
    return this.http.post('orders/deliveryValue', data).pipe(
      map(response => {
        // console.log(response)
        return response as any
      })
    )
  }

  postOrder(token:string,data:any): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.postV2('api/v2/orders', data, headers).pipe(
      map(response => {
        // console.log(response)
        return response as any
      })
    )
  }

  updateOrder(token:string,idOrden:number, data:any): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.putv2(`api/v2/orders/${idOrden}`, data, headers).pipe(
      map(response => {
        // console.log(response)
        return response as any
      })
    )
  }

  getOrder(token:string,page:number): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.getV2('api/v2/clients/orders?page=' + page, headers).pipe(
      map(response => {
        // console.log(response)
        return response as any
      })
    )
  }

  getCurrentOrder(token:string): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.getV2('api/v2/clients/orders/current', headers).pipe(
      map(response => {
        // console.log(response)
        return response as any
      })
    )
  }

  cancelCurrentOrder(token:string): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.getV2('api/v2/clients/orders/current/cancel', headers).pipe(
      map(response => {
        // console.log(response)
        return response as any
      })
    )
  }

  getOrderById(token:string, id:number): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.getV2(`api/v2/clients/orders/${id}`, headers).pipe(
      map(response => {
        // console.log(response)
        return response as any
      })
    )
  }

  deleteAddress(token:string, idAddress: string): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.deleteAddress(`api/v2/locations/${idAddress}`, headers).pipe(
      map(response => {
        return response as any
      })
    )
  }

  deleteFavoriteLocations(token: string, idAddress: number): Observable<FavoriteLocationResponse> {
    const headers = new HttpHeaders(
      {
        'Authorization': token
      }
    );
    return this.http.deleteFavoriteLocations(`api/v2/me/locations/${idAddress}`, headers).pipe(
      map(response => {
        return response as FavoriteLocationResponse
      })
    )
  }

  getUserExchangeProducts(token: string, page: string): Observable<UserExchangeResponse> {
    const headers = new HttpHeaders(
      {'Authorization': 'Bearer '+ token}
      );
    return this.http.getV2('api/v2/me/exchanges?page=' + page,headers).pipe(
      map(response => {
        // console.log(response)
        return response as BasicDataOut
      })
    )
  }

}
