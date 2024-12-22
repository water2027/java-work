import { type User } from "@/model/User"


export interface LoginReturn {
    user:User
    token:string
}

export interface LoginSend {
    email:string
    password:string
}
