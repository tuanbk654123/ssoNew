export interface UserLogin{
     name: string;
    // preferred_username: string;
    // sub: string;
    access_token: string;
    expires_at: number;
    id_token: string;

    profile:{
        auth_time: string;
        scope: string;
        name: string;
        UserName: string;
    }
}