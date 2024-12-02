import  { type UserInfo } from './UserInfo'


export interface LoginReturn {
    user:UserInfo
    token:string
}

export interface LoginSend {
    email:string
    password:string
}