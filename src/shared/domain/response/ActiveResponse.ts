import { BaseResponse } from "./base-response";

export interface ActiveResponse extends BaseResponse {
    data: {
      active: boolean;
      open: {
        date: string;
        timezone_type: number;
        timezone: string;
      };
      close: {
        date: string;
        timezone_type: number;
        timezone: string;
      };
      now: {
        date: string;
        timezone_type: number;
        timezone: string;
      };
    };
}