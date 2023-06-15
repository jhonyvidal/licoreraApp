import { BaseResponse } from "../response/base-response";

export interface BasicDataOut extends BaseResponse {
  active: boolean,
  open:string,
  close:string,
  now:string
}