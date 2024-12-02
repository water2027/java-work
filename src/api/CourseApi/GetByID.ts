import { useRequest } from "../request";

import { type CourseSend, type CourseReturn } from "@/model/dto/CourseApi/Course";

export function GetByID(id:number) {
    return useRequest<CourseReturn>(`/courses/${id}`)
}