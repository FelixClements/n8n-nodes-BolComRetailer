import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { bolcomShipmentsResourceOperations, bolcomShipmentsResourceFields } from './BolComShipmentsResourceDescription';

export class BolComShipments implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Bol.com Shipments API',
    name: 'bolComShipments',
    icon: 'file:bolcom.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with bol.com Shipments API',
    defaults: {
      name: 'Bol.com Shipments',
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
            name: 'Shipment',
            value: 'shipments',
          },
        ],
        default: 'shipments',
      },
      ...bolcomShipmentsResourceOperations,
      ...bolcomShipmentsResourceFields,
    ],
  };
}
