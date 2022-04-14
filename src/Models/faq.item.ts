import { UserEntity } from './userEntity';
export class FaqItem {
    id?: string;
    title: string;
    question: string;
    answer: string;
    user:UserEntity;
  }