import { INodeProperties } from 'n8n-workflow';

export const bolcomOrdersResourceOperations: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                Orders Operations                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['orders'],
      },
    },
    options: [
      {
        name: 'Get Orders',
        value: 'getOrders',
        description: 'Retrieve a list of orders by page',
        routing: {
          request: {
            method: 'GET',
            url: '/retailer/orders',
            qs: {
              page: '={{ $parameter["page"] || 1 }}',
              fulfilmentMethod: '={{ $parameter["fulfilmentMethod"] }}'
						},
            headers: {
              Authorization: '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
          },
        },
        action: 'Fetch list of orders',
      },
      {
        name: 'Get Order by ID',
        value: 'getOrderById',
        description: 'Retrieve a specific order by its ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/retailer/orders/{{$parameter["orderId"]}}',
            headers: {
              Authorization: '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
          },
        },
        action: 'Fetch details of a specific order by ID',
      },
      {
        name: 'Cancel Order Item',
        value: 'cancelOrderItem',
        description: 'Cancel a specific order item by its ID',
        routing: {
          request: {
            method: 'PUT',
            url: '=/retailer/orders/{{$parameter["orderId"]}}/items/{{$parameter["orderItemId"]}}/cancellation',
            body: {
              cancellationReason: '={{ $parameter["cancellationReason"] }}',
            },
            headers: {
              Authorization: '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
            },
          },
        },
        action: 'Cancel a specific order item',
      },
    ],
    default: 'getOrders',
  },
];

export const bolcomOrdersResourceFields: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*           Fields for "Get Orders" operation (pagination & filters)          */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 1,
    description: 'The page of orders to retrieve. Default is page 1.',
    displayOptions: {
      show: {
        resource: ['orders'],
        operation: ['getOrders'],
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
    description: 'The fulfilment method (FBR for retailer, FBB for bol.com)',
    displayOptions: {
      show: {
        resource: ['orders'],
        operation: ['getOrders'],
      },
    },
  },
  {
    displayName: 'Order ID',
    name: 'orderId',
    type: 'string',
    default: '',
    description: 'Optional order ID to filter the orders',
    displayOptions: {
      show: {
        resource: ['orders'],
        operation: ['getOrders', 'getOrderById'],
      },
    },
  },

  /* -------------------------------------------------------------------------- */
  /*           Field for "Cancel Order Item" operation                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Order ID',
    name: 'orderId',
    type: 'string',
    default: '',
    description: 'The ID of the order the item belongs to',
    required: true,
    displayOptions: {
      show: {
        resource: ['orders'],
        operation: ['cancelOrderItem'],
      },
    },
  },
  {
    displayName: 'Order Item ID',
    name: 'orderItemId',
    type: 'string',
    default: '',
    description: 'The ID of the order item to cancel',
    required: true,
    displayOptions: {
      show: {
        resource: ['orders'],
        operation: ['cancelOrderItem'],
      },
    },
  },
  {
    displayName: 'Cancellation Reason',
    name: 'cancellationReason',
    type: 'string',
    default: '',
    description: 'The reason for cancelling the order item (e.g., "Out of stock", "Customer request")',
    required: true,
    displayOptions: {
      show: {
        resource: ['orders'],
        operation: ['cancelOrderItem'],
      },
    },
  },
];
