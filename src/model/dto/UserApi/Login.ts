import  { type ReturnData } from '../ReturnData';
import  { type UserInfo } from './UserInfo'


export interface LoginReturn {
    user:UserInfo
    token:string
}

export interface FullLoginReturn extends ReturnData<LoginReturn|null> {}
export interface LoginSend {
    email:string
    password:string
}