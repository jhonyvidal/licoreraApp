import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareObjectService {
  private shareObject: any;

  constructor() {}

  setObjetoCompartido(obj: any) {
    this.shareObject = obj;
  }

  getObjetoCompartido() {
    return this.shareObject;
  }
}