export interface Client{
    clientId: string;
    id: string;
    description: string;
    clientName: string;
    clientUri: string;

    allowedGrantTypes: string[];
    requireClientSecret?: boolean;
    postLogoutRedirectUris: string[];
    allowedCorsOrigins:  string[];
    allowAccessTokensViaBrowser?: boolean;

    redirectUris: string[];
    allowedScopes: string[];
}