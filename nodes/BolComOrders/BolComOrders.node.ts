import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { bolcomOrdersResourceOperations, bolcomOrdersResourceFields } from './BolComOrdersResourceDescription';

export class BolComOrders implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Bol.com Orders API',
    name: 'bolComOrders',
    icon: 'file:bolcom.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with bol.com Orders API',
    defaults: {
      name: 'Bol.com Orders',
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
      baseURL: 'https://api.bol.com/',
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
            name: 'Order',
            value: 'orders',
          },
        ],
        default: 'orders',
      },
      ...bolcomOrdersResourceOperations,
      ...bolcomOrdersResourceFields,
    ],
  };
}
