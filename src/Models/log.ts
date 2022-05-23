import { Fonctionnalite, Target } from "./RequestFile";

export class Logs {
    id?: string;
    numero: string;
    infos: string;
    description: string;
    date: Date;
    filename:string;
    phrase: string;
    cible: Target;
    fonctionnalite:Fonctionnalite;
    type: LogType;
    creationDate:Date;
 
  }

  export enum LogType{
    Error, TBBT, Ref
  }