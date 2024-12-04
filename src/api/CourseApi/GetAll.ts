import { useRequest } from '../request';

import { type CourseReturn } from '@/model/dto/CourseApi/Course';

export function GetAllCourse() {
  return useRequest<CourseReturn[]|null>('/courses');
}
