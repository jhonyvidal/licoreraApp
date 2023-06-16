import { Observable } from 'rxjs';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';
import { PromotionsData } from 'src/shared/domain/response/PromotionsData';

export abstract class RequestGateway {

    abstract getBasicData(token:string): Observable<BasicDataOut>;
    abstract getPromotions(token:string, promotionPage: number): Observable<PromotionsData>;
}


