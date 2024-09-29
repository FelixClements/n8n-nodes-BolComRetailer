import { INodeProperties } from 'n8n-workflow';

export const bolcomShipmentsResourceOperations: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                Shipments Operations                         */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['shipments'],
      },
    },
    options: [
      {
        name: 'Create Shipment',
        value: 'createShipment',
        description: 'Create a shipment for an order',
        routing: {
          request: {
            method: 'POST',
            url: '/shipments',
            body: {
              shipmentRequest: '={{ $parameter["shipmentRequest"] }}',
            },
            headers: {
              Authorization: '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
          },
        },
        action: 'Create a shipment',
      },
      {
        name: 'Create Shipping Label',
        value: 'createShippingLabel',
        description: 'Generate a shipping label for a shipment',
        routing: {
          request: {
            method: 'POST',
            url: '/shipping-labels',
            body: {
              shippingLabelRequest: '={{ $parameter["shippingLabelRequest"] }}',
            },
            headers: {
              Authorization: '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
          },
        },
        action: 'Create a shipping label',
      },
      {
        name: 'Get Shipment by ID',
        value: 'getShipmentById',
        description: 'Retrieve shipment details by shipment ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/shipments/{{$parameter["shipmentId"]}}',
            headers: {
              Authorization: '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
          },
        },
        action: 'Get shipment by ID',
      },
      {
        name: 'Get Shipment List',
        value: 'getShipmentList',
        description: 'Retrieve a list of all shipments (paginated)',
        routing: {
          request: {
            method: 'GET',
            url: '/shipments',
            qs: {
              page: '={{ $parameter["page"] || 1 }}', // default page is 1
              fulfilmentMethod: '={{ $parameter["fulfilmentMethod"] }}',
            },
            headers: {
              Authorization: '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
          },
        },
        action: 'Get shipment list paginated',
      },
      {
        name: 'Get Shipping Label by ID',
        value: 'getShippingLabelById',
        description: 'Get a shipping label by its ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/shipping-labels/{{$parameter["shippingLabelId"]}}',
            headers: {
              Authorization: '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
          },
        },
        action: 'Get a shipping label by ID',
      },
    ],
    default: 'getShipmentById',
  },
];

export const bolcomShipmentsResourceFields: INodeProperties[] = [
  // Fields for "Get Shipment by ID"
  {
    displayName: 'Shipment ID',
    name: 'shipmentId',
    type: 'string',
    default: '',
    description: 'The ID of the shipment to retrieve',
    required: true,
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['getShipmentById'],
      },
    },
  },

  // Fields for "Create Shipment"
  {
    displayName: 'Shipment Request Body',
    name: 'shipmentRequest',
    type: 'json',
    default: '',
    description: 'A JSON object representing the shipment request body',
    required: true,
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['createShipment'],
      },
    },
  },

  // Fields for "Get Shipment List"
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    description: 'The page of shipments to retrieve. Default is page 1.',
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['getShipmentList'],
      },
    },
  },
  {
    displayName: 'Fulfilment Method',
    name: 'fulfilmentMethod',
    type: 'options',
    options: [
      {
        name: 'FBR (Fulfilled by Retailer)',
        value: 'FBR',
      },
      {
        name: 'FBB (Fulfilled by Bol.com)',
        value: 'FBB',
      },
    ],
    default: 'FBR',
    description: 'The fulfilment method to filter the results. Either FBR (retailer) or FBB (bol.com).',
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['getShipmentList'],
      },
    },
  },

  // Fields for "Create Shipping Label"
  {
    displayName: 'Shipping Label Request Body',
    name: 'shippingLabelRequest',
    type: 'json',
    default: '',
    description: 'A JSON object representing the shipping label request body',
    required: true,
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['createShippingLabel'],
      },
    },
  },

  // Fields for "Get Shipping Label by ID"
  {
    displayName: 'Shipping Label ID',
    name: 'shippingLabelId',
    type: 'string',
    default: '',
    description: 'The ID of the shipping label to retrieve',
    required: true,
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['getShippingLabelById'],
      },
    },
  },
];
