import { BaseResponse } from "src/shared/domain/response/base-response";

export interface InfoModel  extends BaseResponse {
    socialNetworks: socialNetworks;
    whatsapp: whatsapp;
    minimumOrderAmount: string;
    minimumAmountForPoints: string;
    telephones:telephones;
    email: string;
    minimumOrderValueFree: string;
    maximumDeliveryValueFree: string;
    height:number;
    isWelcome:boolean;
}
interface socialNetworks {
    instagram:string;
    facebook:string;
}

interface whatsapp{
    whatsapp1:string;
    whatsapp2:string;
}

interface telephones{
    main:string;
    secondary:string;
}