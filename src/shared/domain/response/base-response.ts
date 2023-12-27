export interface BaseResponse {
  data: any;
  message: any;
  success: boolean;
  statusCode?:number
  error?:any
}
