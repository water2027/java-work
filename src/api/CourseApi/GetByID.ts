import { useRequest } from '../request';

import {
  type CourseReturn,
} from '@/model/dto/CourseApi/Course';

export function GetCourseByID(id: number) {
  return useRequest<CourseReturn|null>(`/courses/${id}`);
}
