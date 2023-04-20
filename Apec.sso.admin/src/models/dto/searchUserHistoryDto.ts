export interface searchUserHistoryDto{
    userName?: string;
    ip?: string;
    fromDate:string;
    toDate:string;
    pageNumber:number;
    pageSize:number;
}