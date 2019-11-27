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
  rating: number;
}

export interface NewEventPayload{
  name: string;
  latitude: number;
  longitude: number;
  date: string;
  description: string;
}

export interface EditEventPayload extends NewEventPayload{
  id: string;
  ownerIds: string[];
}
export interface AssignEventPayload{
  eventId: string;
}

export interface TeamWinPayload extends AssignEventPayload{
  teamNumber: Number;
}

export interface EventUserDetails {
  email :string;
  id: string;
  points: number;
  rating: string;
  username: string;
}

export interface EventDetailsPayload extends NewEventPayload{
  id: string;
  result: string;
  owners: EventUserDetails[];
  firstTeam: EventUserDetails[];
  secondTeam: EventUserDetails[];
}