import { UserEntity } from './userEntity';
export class RequestFile {
    id?: string;
    name: string;
    ecu: string;
    echeanceRC: Date;
    echeanceRD: Date;
    fileType:FileType;
    marque: Brand;
    cible: Target;
    fonctionnalite:Fonctionnalite;
    langue: Langue;
    state: State;
    checklist:Infos[];
    commentaire: string;
    nombrephrase:number;
    user:UserEntity;
    select:any;
  }

  export enum FileType{
    Approximation, Demande
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
    finished,
    to_verify,
    verified
  }

  export class Infos{
   infos:string;
   state:boolean;
  }

  export class Brand{
    marque:string;
    actions:any;
   }

   export class Target{
    cible:string;
   }
