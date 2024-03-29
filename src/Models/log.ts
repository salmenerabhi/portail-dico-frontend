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
    // Error, TBBT, Ref
		Error, TBBT_FNC,TBBT_GPC,TBBT_MENU, Ref, TBBT_FNC_Ref,TBBT_GPC_Ref,TBBT_MENU_Ref

  }