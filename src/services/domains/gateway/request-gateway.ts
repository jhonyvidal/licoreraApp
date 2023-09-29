import { Observable } from 'rxjs';
import { ActiveResponse } from 'src/shared/domain/response/ActiveResponse';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { suggestedProducts } from 'src/shared/domain/response/suggestedProductResponse';
import { ProductSearch } from 'src/shared/domain/response/ProductSearch';
import { PromotionsData } from 'src/shared/domain/response/PromotionsData';
import { RecommendedProducts } from 'src/shared/domain/response/RecommendedProducts';
import { CategoriesOut } from 'src/shared/domain/response/Categories';
import { CategoriesByProductOut } from 'src/shared/domain/response/CategoriesByProduct';
import { LoginResponse } from 'src/shared/domain/response/LoginResponse';
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

export abstract class RequestGateway {

    abstract getIsActive (token:string) : Observable <ActiveResponse>;
    abstract getSuggestedProducts (token:string) : Observable <suggestedProducts>;
    abstract getPromotion(token: string): Observable<suggestedProducts> ;
    abstract getCampains(token: string): Observable<suggestedProducts> ;
    abstract getNewProducts(token: string): Observable<suggestedProducts> ;
    abstract getPromotions(token:string, promotionPage: number): Observable<PromotionsData>;
    abstract getProductSearch(token:string, inputSearched: string): Observable<ProductSearch>;
    abstract getRecommendedProducts(token:string): Observable<RecommendedProducts>;
    abstract getCategories(token:string): Observable<CategoriesOut>;
    abstract getCategoriesByProduct(token:string, id:string, page:number): Observable<CategoriesByProductOut>;
    abstract getClient(token: string, userId:string): Observable<ClientData>;
    abstract getClientPoints(userId:string): Observable<ClientPointsData>;
    abstract postLogin(token:string, email:string, password:string) : Observable <LoginResponse>;
    abstract postForgotPassword(token:string, email:string):Observable<LoginResponse>;
    abstract postCreateAccount(token:string, data:CreateAccountRequest):Observable<LoginResponse>;
    abstract putClient(userId: string, data: UpdateClientData):Observable<ClientData>;

    // Api v2
    abstract getPaymentMethodsV2(token: string): Observable<PaymentMethodsGetResponse>;
    abstract getLocationsV2(token: string): Observable<LocationsResponse>;
    abstract postLoginV2(data: LoginV2Request) : Observable <LoginV2Response>;
    abstract postDeletePaymentMethods(token: string, data: DeletePaymentMethodsRequest) : Observable <DeletePaymentResponse>;
    abstract postPaymentMethods(token: string, data: PostPaymentMethodsRequest) : Observable <PostPaymentMethodsResponse>;
    abstract getMe(token: string): Observable<UserModel>;
}


