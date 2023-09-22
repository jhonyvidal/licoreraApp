export interface DeletePaymentMethodsRequest {
  id: number | undefined
}

export interface PostPaymentMethodsRequest {
  number: string,
  cvv: string,
  expirationDate: string,
  name: string,
  favorite: boolean
}

