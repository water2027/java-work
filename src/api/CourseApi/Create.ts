import { useRequest } from '../request';

import {
  type CourseSend,
  type CourseReturn,
} from '@/model/dto/CourseApi/Course';

export function CreateCourse(data: CourseSend) {
  return useRequest<CourseReturn|null>('/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
