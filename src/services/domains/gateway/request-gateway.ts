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
import { CreateAccountRequest } from 'src/shared/domain/request/createAccount';
import { ClientData } from 'src/shared/domain/response/ClientResponse';

export abstract class RequestGateway {

    abstract getIsActive (token:string) : Observable <ActiveResponse>;
    abstract getSuggestedProducts (token:string) : Observable <suggestedProducts>;
    abstract getPromotion(token: string): Observable<suggestedProducts> ;
    abstract getPromotions(token:string, promotionPage: number): Observable<PromotionsData>;
    abstract getProductSearch(token:string, inputSearched: string): Observable<ProductSearch>;
    abstract getRecommendedProducts(token:string): Observable<RecommendedProducts>;
    abstract getCategories(token:string): Observable<CategoriesOut>;
    abstract getCategoriesByProduct(token:string, id:string, page:number): Observable<CategoriesByProductOut>;
    abstract getClient(token: string, userId:string): Observable<ClientData>;
    abstract postLogin(token:string, email:string, password:string) : Observable <LoginResponse> ;
    abstract postForgotPassword(token:string, email:string):Observable<LoginResponse>;
    abstract postCreateAccount(token:string, data:CreateAccountRequest):Observable<LoginResponse>;
    
}


