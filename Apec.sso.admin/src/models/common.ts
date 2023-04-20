export interface PaginationParams{

    PageNumber:number;
    PageSize:number;
}

export interface LisResponse<T>{
    content: T[];
    pageIndex:number;
    totalItem:number;
}

export interface Respone{
    status: number;
    data :string;
}