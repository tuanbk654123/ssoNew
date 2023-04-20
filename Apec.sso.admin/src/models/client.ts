export interface Client{
    ClientId: string;
    id: string;
    ClientName: string;
    ClientUri: string;
    AllowedScopes: [];
    RedirectUris: [];
}