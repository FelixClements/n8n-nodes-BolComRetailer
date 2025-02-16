import { INodeProperties } from "n8n-workflow";

// Defining operations for the Shipments resource
export const bolcomShipmentsResourceOperations: INodeProperties[] = [
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
        name: 'Cancel Shipment',
        value: 'cancelShipment',
        description: 'Cancel a shipment by shipment ID',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/shipments/{{$parameter["shipmentId"]}}',
            headers: {
              'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}'
            },
          },
        },
        action: 'Cancel a shipment',
      },
      {
        name: 'Create Shipment',
        value: 'createShipment',
        description: 'Create a shipment for one item',
        routing: {
          request: {
            method: 'POST',
            url: '/shipments',
            body: {
							orderItems: [
								{
									orderItemId: '={{ $parameter["orderItemId"] }}',
									quantity: '={{ $parameter["quantity"] }}',
								}
							],
							transport:
								{
									transporterCode: '={{ $parameter["transporterCode"] }}',
									trackAndTrace: '={{ $parameter["trackAndTrace"] }}',
								}
            },
            headers: {
              'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}'
            },
          },
        },
        action: 'Create a new shipment',
      },
			{
        name: 'Get Invoice Requests',
        value: 'getInvoicerequests',
        description: 'Retrieve a paginated list of Invoice Requests',
        routing: {
          request: {
            method: 'GET',
            url: '/shipments/invoices/requests',
            qs: {
              page: '={{ $parameter["page"] }}',
              state: '={{ $parameter["state"] }}',
            },
            headers: {
              'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}'
            },
          },
        },
        action: 'Retrieve a list of invoice requests',
      },
      {
        name: 'Get Shipment By Shipment ID',
        value: 'getShipment',
        description: 'Retrieve a shipment by its shipment ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/shipments/{{$parameter["shipmentId"]}}',
            headers: {
              'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}'
            },
          },
        },
        action: 'Retrieve a shipment by its ID',
      },
      {
        name: 'Get Shipments',
        value: 'getShipments',
        description: 'Retrieve a paginated list of shipments',
        routing: {
          request: {
            method: 'GET',
            url: '/shipments',
            qs: {
              page: '={{ $parameter["page"] }}',
              fulfilmentMethod: '={{ $parameter["fulfilmentMethod"] }}',
            },
            headers: {
              'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}'
            },
          },
        },
        action: 'Retrieve a list of shipments',
      },
      {
        name: 'Upload Invoice for Shipment',
        value: 'uploadInvoiceForShipment',
        description: 'Upload an invoice for the specified shipment by shipment ID',
        routing: {
          request: {
            method: 'POST',
            url: '=/shipments/invoices/{{$parameter["shipmentId"]}}',
            body: {
              invoice: '={{ $parameter["invoice"] }}',
            },
            headers: {
              'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}',
              'Content-Type': 'application/json',
            },
          },
        },
        action: 'Upload invoice for a shipment',
      },
    ],
    default: 'createShipment',
  },
];


// Defining fields for each operation
export const bolcomShipmentsResourceFields: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                createShipment                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Order ID',
    name: 'orderItemId',
    type: 'string',
    default: '',
    description: 'The ID of the order for which to create a shipment',
    required: true,
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['createShipment'],
      },
    },
  },
  {
    displayName: 'Transporter Code',
    name: 'transporterCode',
    type: 'string',
    default: '',
    description: 'The code of the transporter (only required if shipping without a purchased label)',
		required: true,
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['createShipment'],
      },
    },
  },
  {
    displayName: 'Track and Trace Code',
    name: 'trackAndTrace',
    type: 'string',
    default: '',
    description: 'The track and trace code provided by the transporter',
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['createShipment'],
      },
    },
  },
	{
    displayName: 'Shipping Label ID Code',
    name: 'shippingLabelId',
    type: 'string',
    default: '',
    description: 'The Shipping Label ID code provided by the transporter',
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['createShipment'],
      },
    },
  },
	{
    displayName: 'Quantity of Items Shipped',
    name: 'quantity',
    type: 'string',
    default: '',
    description: 'The quantity of items in the Shipmend',
		required: true,
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['createShipment'],
      },
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                getShipments                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    typeOptions: {
      minValue: 1,
    },
    default: 1,
    description: 'The page to get with a page size of 50',
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['getShipments','getInvoicerequests'],
      },
    },
  },
  {
    displayName: 'Fulfilment Method',
    name: 'fulfilmentMethod',
    type: 'options',
    options: [
      { name: 'FBR (Fulfilled by Retailer)', value: 'FBR' },
      { name: 'FBB (Fulfilled by Bol.com)', value: 'FBB' },
    ],
    default: 'FBR',
    description: 'The fulfilment method for the shipments',
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['getShipments'],
      },
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                getShipment                                  */
  /* -------------------------------------------------------------------------- */
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
        operation: ['getShipment'],
      },
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                                cancelShipment                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Shipment ID',
    name: 'shipmentId',
    type: 'string',
    default: '',
    description: 'The ID of the shipment to cancel',
    required: true,
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['cancelShipment'],
      },
    },
  },
  /* -------------------------------------------------------------------------- */
  /*                            InvoiceForShipment                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Shipment ID',
    name: 'shipmentId',
    type: 'string',
    default: '',
    description: 'The ID of the shipment associated with the invoice',
    required: true,
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['uploadInvoiceForShipment'],
      },
    },
  },
  {
    displayName: 'Invoice',
    name: 'invoice',
    type: 'string',
    default: '',
    description: 'The invoice file to upload (binary format)',
    required: true,
    typeOptions: {
      multipleValues: false,
    },
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['uploadInvoiceForShipment'],
      },
    },
  },
	{
    displayName: 'Invoice Status',
    name: 'state',
    type: 'options',
    options: [
      { name: 'OPEN', value: 'OPEN' },
      { name: 'UPLOAD_ERROR', value: 'UPLOAD_ERROR' },
			{ name: 'ALL', value: 'ALL' },
    ],
    default: 'OPEN',
    description: 'To filter on invoice request state',
    displayOptions: {
      show: {
        resource: ['shipments'],
        operation: ['getInvoicerequests'],
      },
    },
  },
];

