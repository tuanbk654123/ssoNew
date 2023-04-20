export interface SearchUserDto{
    username?: string;
    email?: string;
    phonenumber?:string;
    isActive?: boolean;
    PageNumber:number;
    PageSize:number;
}