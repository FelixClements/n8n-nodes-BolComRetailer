import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class bolComOAuth2Api implements ICredentialType {
	name = 'bolComOAuth2Api';
	extends = ['oAuth2Api']; // This indicates it extends the default OAuth2 credentials in n8n
	displayName = 'Bol.com OAuth2 API';
	documentationUrl = 'https://api.bol.com/retailer/public/Retailer-API/authentication.html';
	properties: INodeProperties[] = [
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',  // Use a hidden field because this is already predefined for OAuth2 flows, no need for the user to input manually.
			default: 'https://login.bol.com/token?grant_type=client_credentials',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',  // Same as above, it's predefined so hidden.
			default: 'https://login.bol.com/token?grant_type=client_credentials',
		},
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'hidden',  // Generally APIs return the same base URL for requests.
			default: 'https://login.bol.com/',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',  // Bol.com OAuth doesn't require a scope in their flow.
			default: 'retailer',  // Standard offline scope for refreshing tokens automatically.
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			description: 'Client ID for your OAuth app (obtained from Bol.com)',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Client Secret for your OAuth app (obtained from Bol.com)',
			required: true,
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'headers',  // Defines how credentials are sent. In this case, it expects to send tokens in the body (not headers).
		},
	];
}
