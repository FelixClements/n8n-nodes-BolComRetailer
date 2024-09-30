import { INodeProperties } from "n8n-workflow";

// Defining operations for the Returns resource
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
        description: 'Create a return and handle it automatically with handling result',
        routing: {
          request: {
            method: 'POST',
            url: '/retailer/returns',
            headers: {
              'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
            body: {
							orderItemId: '={{$parameter["orderItemId"]}}',
							quantityReturned: '={{$parameter["quantityReturned"]}}',
							handlingResult: '={{$parameter["handlingResult"]}}'
						},
          },
        },
        action: 'Create a return',
      },
      {
        name: 'Get Return by Return ID',
        value: 'getReturn',
        description: 'Retrieve a return based on return ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/retailer/returns/{{$parameter["returnId"]}}',
            headers: {
              'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
          },
        },
        action: 'Retrieve a return by return id',
      },
      {
        name: 'Handle Return by RMA ID',
        value: 'handleReturn',
        description: 'Handle a return by the RMA (Return Merchandise Authorization) ID',
        routing: {
          request: {
            method: 'PUT',
            url: '=/retailer/returns/{{$parameter["rmaId"]}}',
            headers: {
              'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
            body: {
							handlingResult: '={{$parameter["handlingResult"]}}',
							quantityReturned: '={{$parameter["quantityReturned"]}}'
            },
          },
        },
        action: 'Handle a return by RMA ID',
      },
      {
        name: 'Get List of Returns',
        value: 'getReturns',
        description: 'Retrieve a paginated list of multi-item returns, either handled or unhandled',
        routing: {
          request: {
            method: 'GET',
            url: '/retailer/returns',
            headers: {
              'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
            qs: {
              handled: '={{ $parameter["handled"] }}',
              fulfilmentMethod: '={{ $parameter["fulfilmentMethod"] }}',
            },
          },
        },
        action: 'Retrieve a paginated list of returns',
      },
    ],
    default: 'getReturns',
  },
];

// Defining fields for each operation
export const bolcomReturnsResourceFields: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                createReturn                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'OrderItem ID',
    name: 'orderItemId',
    type: 'string',
    default: '',
    description: 'The OrderItem ID of the Order',
    required: true,
    displayOptions: {
      show: {
        resource: ['returns'],
        operation: ['getReturn','createReturn'],
      },
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                getReturn                                   */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Return ID',
    name: 'returnId',
    type: 'string',
    default: '',
    description: 'The Return ID to retrieve the return',
    required: true,
    displayOptions: {
      show: {
        resource: ['returns'],
        operation: ['getReturn'],
      },
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                handleReturn                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'RMA ID',
    name: 'rmaId',
    type: 'string',
    default: '',
    description: 'The RMA (Return Merchandise Authorization) ID for handling the return',
    required: true,
    displayOptions: {
      show: {
        resource: ['returns'],
        operation: ['handleReturn'],
      },
    },
  },
  {
    displayName: 'Return Handling Result',
    name: 'HandlingResult',
    type: 'options',
    options: [
      { name: 'RETURN RECEIVED', value: 'RETURN_RECEIVED' },
      { name: 'EXCHANGE PRODUCT', value: 'EXCHANGE_PRODUCT' },
    ],
    default: 'RETURN_RECEIVED',
    description: 'The handling result for the return',
    required: true,
    displayOptions: {
      show: {
        resource: ['returns'],
        operation: ['handleReturn','createReturn'],
      },
    },
  },
  {
    displayName: 'Quantity Returned',
    name: 'quantityReturned',
    type: 'string',
    default: '',
    description: 'Quantity of Returned items',
    required: true,
    displayOptions: {
      show: {
        resource: ['returns'],
        operation: ['handleReturn','createReturn'],
      },
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                            getListOfReturns                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    typeOptions: {
      minValue: 1,
    },
    default: 1,
    description: 'The page number to fetch, with a page size of 50',
    displayOptions: {
      show: {
        resource: ['returns'],
        operation: ['getReturns'],
      },
    },
  },
  {
    displayName: 'Handled',
    name: 'handled',
    type: 'boolean',
    default: false,
    description: 'Whether to Filter returns by their handled status',
    displayOptions: {
      show: {
        resource: ['returns'],
        operation: ['getReturns'],
      },
    },
  },
  {
    displayName: 'Fulfilment Method',
    name: 'fulfilmentMethod',
    type: 'options',
    options: [
      { name: 'Fulfilled by Retailer (FBR)', value: 'FBR' },
      { name: 'Fulfilled by Bol.com (FBB)', value: 'FBB' },
    ],
    default: 'FBB',
    description: 'Filter returns by fulfilment method: Fulfilled by Retailer (FBR) or Fulfilled by Bol.com (FBB)',
    displayOptions: {
      show: {
        resource: ['returns'],
        operation: ['getReturns'],
      },
    },
  },
];
