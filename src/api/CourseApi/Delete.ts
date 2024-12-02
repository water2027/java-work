import { useRequest } from "../request";

export function DeleteCourse(id:number){
    return useRequest<null>(`/courses/${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}