export interface CourseInfo {
  id: number;
  name: string;
  teacher: string;
  score: number;
  start: Date;
  end: Date;
  isExam: boolean;
  examTime?: Date;
  location: string;
  time: string;
  backgroundImage?: string;
}
