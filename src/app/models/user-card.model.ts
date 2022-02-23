export interface UserModel {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp: string;
  photo: string;
}

export interface CreateUserRequestModel {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: File;
}
