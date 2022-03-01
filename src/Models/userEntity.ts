import {Role} from "./Role";
import {FileDB} from "./FileDB";
import {Site} from "./Site";
export class UserEntity{
  id:string;
 firstName:string;
 lastName:string;
 email:string;
 password:string;
 creationDate:Date;
 role :Role;
 site : Site
 image :FileDB;

}