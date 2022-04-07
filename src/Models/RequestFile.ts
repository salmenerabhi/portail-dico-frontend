import { UserEntity } from './userEntity';
export class RequestFile {
    id?: string;
    name: string;
    ecu: string;
    echeanceRC: Date;
    echeanceRD: Date;
    fileType:FileType;
    marque: Marque;
    cible: Cible;
    fonctionnalite:Fonctionnalite;
    langue: Langue;
    state: State;
    checklist:Infos[];
    commentaire: string;
    user:UserEntity;
    select:any;
  }

  export enum FileType{
    Approximation, Demande
  }

  export enum Marque{
    Renault,Peugeot,Citroen,BMW,Volkswagen,Hyundai,Mazda,Toyota,Suzuki,Audi
  }

  export enum Cible{
    II_2019_pack
  }

  export enum Fonctionnalite{
    DEFAULT,MPM,MENU,FNC,TA
  }

  export enum Langue{
    FR,EN,DE
  }

  export enum State{
    unstarted,
    in_progress,
    rejected,
    finished
  }

  export class Infos{
   infos:string;
   state:boolean;
  }
