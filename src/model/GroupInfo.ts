import { type User } from './User';
export interface GroupInfo {
    id: number;
    name: string;
    description: string;
    members: number;
    created: string;
    creator: User;
    status: number;
}