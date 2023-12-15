import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObserveObjectService {
  private shareObjectSubject: Subject<any> = new Subject<any>();
  shareObject$: Observable<any> = this.shareObjectSubject.asObservable();

  constructor() {}

  setObjetoCompartido(obj: any) {
    this.shareObjectSubject.next(obj);
  }

  getObjetoCompartido() {
    return this.shareObjectSubject; // O puedes devolver la última emisión directamente
  }
}