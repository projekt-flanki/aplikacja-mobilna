export interface LoginPayload {
  password: string;
  email: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

export interface UserInfoPayload {
  email: string;
  username: string;
}

export interface NewEventPayload{
  name: string;
  
}