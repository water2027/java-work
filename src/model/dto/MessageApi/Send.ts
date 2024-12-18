export interface MessageSend {
    chatRoomId:number
    userId:number
    content:string
    messageType:string
}

export interface MessageReturn {
    id:number
    chatRoomId:number
    userId:number
    content:string
    messageType:string
    createdAt:string
}
