import { UserEntity } from './userEntity';
export class FaqItem {
    id?: string;
    
    question: string;
    answer: string;
    user:UserEntity;
  }