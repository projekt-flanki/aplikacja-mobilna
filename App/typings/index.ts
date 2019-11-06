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
  profileImageBase64: string;
}

export interface NewEventPayload{
  name: string;
  location: string;
  date: string;
  description: string;
}

export interface EditEventPayload{
  id: string
  name: string;
  location: string;
  date: string;
  description: string;
}