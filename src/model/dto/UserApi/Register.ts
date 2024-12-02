export interface RegisterReturn {
    id: number
    username:string
    email:string
    role:string
}

export interface RegisterSend {
    username:string
    email:string
    password:string
    role:string
}