import { BaseResponse } from "../response/base-response";

export interface CategoriesOut extends BaseResponse {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string;
  deleted_at: string | null;
  image: string;
  color: string;
  banner: string;
}