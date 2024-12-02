import type { ReturnData } from '../ReturnData';

export interface RegisterReturn {
    id: number
    username:string
    email:string
    role:string
}

export interface FullRegisterReturn extends ReturnData<RegisterReturn|null>{}

export interface RegisterSend {
    username:string
    email:string
    password:string
    role:string
}