import { Observable } from 'rxjs';
import { ActiveResponse } from 'src/shared/domain/response/ActiveResponse';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { suggestedProducts } from 'src/shared/domain/response/suggestedProductResponse';
import { ProductSearch } from 'src/shared/domain/response/ProductSearch';
import { PromotionsData } from 'src/shared/domain/response/PromotionsData';
import { RecommendedProducts } from 'src/shared/domain/response/RecommendedProducts';

export abstract class RequestGateway {

    abstract getIsActive (token:string) : Observable <ActiveResponse>;
    abstract getSuggestedProducts (token:string) : Observable <suggestedProducts>;
    abstract getPromotion(token: string): Observable<suggestedProducts> ;
    abstract getPromotions(token:string, promotionPage: number): Observable<PromotionsData>;
    abstract getProductSearch(token:string, inputSearched: string): Observable<ProductSearch>;
    // abstract getRecommendedProducts(token:string): Observable<RecommendedProducts>;

}


