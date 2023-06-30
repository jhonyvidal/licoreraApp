import { Observable } from 'rxjs';
import { ActiveResponse } from 'src/shared/domain/response/ActiveResponse';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { suggestedProducts } from 'src/shared/domain/response/suggestedProductResponse';
import { PromotionsData } from 'src/shared/domain/response/PromotionsData';

export abstract class RequestGateway {

    abstract getIsActive (token:string) : Observable <ActiveResponse>;
    abstract getSuggestedProducts (token:string) : Observable <suggestedProducts>;
    abstract getPromotion(token: string): Observable<suggestedProducts> ;
    abstract getPromotions(token:string, promotionPage?: number): Observable<PromotionsData>;
}


