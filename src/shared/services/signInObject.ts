import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignInObjectService {
  private shareObject: any;

  constructor() {}

  setObjetoCompartido(obj: any) {
    this.shareObject = obj;
  }

  getObjetoCompartido() {
    return this.shareObject;
  }
}