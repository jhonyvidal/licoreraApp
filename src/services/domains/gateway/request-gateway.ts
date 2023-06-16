import { Observable } from 'rxjs';
import { BasicDataOut } from 'src/shared/domain/response/BasicData';

export abstract class RequestGateway {

    abstract getBasicData(token:string): Observable<BasicDataOut>;
}


