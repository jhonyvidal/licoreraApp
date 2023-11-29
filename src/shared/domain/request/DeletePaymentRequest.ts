export interface DeletePaymentMethodsRequest {
  token: string,
  franchise: string,
  mask: string,
}

export interface PostPaymentMethodsRequest {
  number: string,
  cvv: string,
  name: string,
  favorite: boolean,
  exp_month: string,
  exp_year: string,

  
}

