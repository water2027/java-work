import { useRequest } from '../request';

import {
  type CourseSend,
  type CourseReturn,
} from '@/model/dto/CourseApi/Course';

export function UpdateCourse(id: number, data: CourseSend) {
  return useRequest<CourseReturn|null>(`/courses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
