import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { bolcomReturnsResourceOperations, bolcomReturnsResourceFields } from './BolComReturnsResourceDescription';

export class BolComReturns implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Bol.com Returns API',
    name: 'bolComReturns',
    icon: 'file:bolcom.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with bol.com Returns API',
    defaults: {
      name: 'Bol.com Returns',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'bolComOAuth2Api',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.bol.com/retailer-demo',
      headers: {
        'Accept': 'application/vnd.retailer.v10+json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Return',
            value: 'returns',
          },
        ],
        default: 'returns',
      },
      ...bolcomReturnsResourceOperations,
      ...bolcomReturnsResourceFields,
    ],
  };
}
