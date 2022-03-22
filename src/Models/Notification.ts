import { TypeNotif } from './TypeNotif';
import { UserEntity } from './userEntity';
export class Notification {
    id?: string;
    
    delaimax: Date;
    type: TypeNotif;
    user:UserEntity;
  }