import { INodeProperties } from 'n8n-workflow';

export const bolcomReturnsResourceOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['returns'],
      },
    },
    options: [
      {
        name: 'Create Return',
        value: 'createReturn',
        description: 'Create a return and automatically handle it',
        routing: {
          request: {
            method: 'POST',
            url: '/returns',
            body: {
              returnRequest: '={{ $parameter["returnRequest"] }}',
            },
            headers: {
              Authorization: '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
          },
        },
        action: 'Create a return and get its status',
      },
      {
        name: 'Get Return by ID',
        value: 'getReturnById',
        description: 'Get details on a specific return by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/returns/{{$parameter["returnId"]}}',
            headers: {
              Authorization: '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
          },
        },
        action: 'Get details on a specific return by return ID',
      },
    ],
    default: 'getReturnById',
  },
];

export const bolcomReturnsResourceFields: INodeProperties[] = [
  {
    displayName: 'Return ID',
    name: 'returnId',
    type: 'string',
    default: '',
    description: 'The ID of the return to retrieve',
    required: true,
    displayOptions: {
      show: {
        resource: ['returns'],
        operation: ['getReturnById'],
      },
    },
  },
  {
    displayName: 'Return Request Body',
    name: 'returnRequest',
    type: 'json',
    default: '',
    description: 'The body of the return request',
    required: true,
    displayOptions: {
      show: {
        resource: ['returns'],
        operation: ['createReturn'],
      },
    },
  },
];
