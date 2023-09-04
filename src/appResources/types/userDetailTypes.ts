export interface LoginI {
  msisdn: string;
  user_name: string;
  password: string;
  user_role: number;
  user_status: number;
}

export interface GenerateTokenI {
  msisdn: string
  user_name: string
  password: string
}
