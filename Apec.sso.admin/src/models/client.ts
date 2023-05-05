export interface Client{
    clientId: string;
    id: string;
    description: string;
    clientName: string;
    clientUri: string;

    allowedGrantTypes: [];
    requireClientSecret: boolean;
    postLogoutRedirectUris: [];
    allowedCorsOrigins:  [];
    allowAccessTokensViaBrowser: boolean;

    redirectUris: [];
    allowedScopes: [];
}