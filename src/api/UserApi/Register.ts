import { useRequest } from "../request";

import { type RegisterReturn, type RegisterSend } from "@/model/dto/UserApi/Register";

export function register(data:RegisterSend) {
    return useRequest<RegisterReturn>('/users/register',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    },false)
}