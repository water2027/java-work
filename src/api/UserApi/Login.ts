import { useRequest } from "../request";

import { type LoginReturn, type LoginSend } from "@/model/dto/UserApi/Login";

export function login(data:LoginSend) {
    return useRequest<LoginReturn>('/users/login',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    },false)
}