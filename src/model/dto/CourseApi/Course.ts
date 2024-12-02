import { type ChatRoom } from "./ChatRoom"

export interface CourseSend {
    name:string
    description:string
    chatRoom: ChatRoom
}

export interface CourseReturn {
    id:number
    name:string
    description:string
    price:number
    credits:number
    teacherName:string
    startDate:Date
    endDate:Date
    hasExam:boolean
    examDate:Date
    location:string
    teachingSessions:number
}