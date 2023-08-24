export interface CreateAccountRequest {
    id: number;
    name: string;
    last_name: string | null;
    email: string;
    password: string | null;
    uuid: string;
    birthday: string;
    cellphone: string;
    social_id:number
  }