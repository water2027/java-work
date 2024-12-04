export interface User {
  id:number;
  username: string;
  email: string;
  password?:string
  profilePicture?: string; // 可选的头像字段
  role:string;
}
