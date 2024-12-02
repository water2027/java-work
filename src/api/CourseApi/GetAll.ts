import { useRequest } from "../request";

import { type CourseReturn } from "@/model/dto/CourseApi/Course";

export function GetAll() {
    return useRequest<CourseReturn[]>('/courses')
}