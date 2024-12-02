import { useRequest } from "../request";

import { type DeleteUserReturn } from "@/model/dto/UserApi/DeleteUser";

export function deleteUser(id:number) {
    return useRequest<DeleteUserReturn>(`/users/${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    },true)
}