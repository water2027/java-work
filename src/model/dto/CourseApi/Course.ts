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
    chatRoom: ChatRoom
}