import { useRequest } from "../request";

import { type CourseSend, type CourseReturn } from "@/model/dto/CourseApi/Course";

export function Update(id:number, data:CourseSend){
    return useRequest<CourseReturn>(`/courses/${id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}