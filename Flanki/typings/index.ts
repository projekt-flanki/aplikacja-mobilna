export interface LoginPayload {
  password: string;
  email: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  profileImageBase64: string;
}

export interface UserInfoPayload {
  email: string;
  username: string;
}

export interface NewEventPayload{
  name: string;
  
}