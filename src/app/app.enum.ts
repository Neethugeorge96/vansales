export enum APP_CONSTANT {
  PLANT_API = "Plant/GetAll",
  SEGMENT_API = "/ItemSegment/GetAll",
  WAREHOUSE_API = "Warehouse/GetAll",
  BUYER_API = "Buyer/GetAll",
  PURCHASE_OFFICE_API = "PurchaseOffice/GetAll",
  PROJECTS_API = "Project/GetAll",
  ADDRESS_API = "Address/GetAll",
  DEPARTMENT_API = "Department/GetAll",
  SUPPLIER_API="finance/Supplier/GetAll",
  PO_GROUP="PurchaseOrderGroup/GetAll",
  DELIVERY_TERM_GETALL="DeliveryTerm/GetAll/",
  ADDRESS_GETALL="Address/GetAll"
}
export enum CONSOLE_API {
  COUNTRY_GET = "console/Country/GetAll/Lite",
  STATE_GET = "console/State/GetAll/Lite/",
  CITY_GET = "console/City/GetAll/Lite/",
  CURRENCY_GET="console/Currency/GetAll/Lite",
  ITEM_GETALL = "console/Item/GetAll",
  FINANCE_SUPPLIER_GETALL = 'finance/Supplier/GetAll',
  ITEM_CLASS_GETALL = "console/ItemClass/GetAll",
  FINANCE_SUPPLIER_GETALL_RFQ = 'finance/Supplier/GetAll/RFQSuppliers'
}
export enum LOCATION {
  GETALL = "Location/GetAll",
  GETBYID = "Location/Get/",
  INSERT = "Location/Insert",
  DELETE = "Location/Delete/",
  UPDATE = "Location/Update",
  GETALL_LOCATION = "Location/GetAllLocation"
}
export enum BUYER {
  GETALL = "Buyer/GetAll",
  GETALL_BUYER = "Buyer/GetBuyer"
}
export enum PLANT {
  GETALL = "Plant/GetAllPlant",
}
export enum PROJECT {
  GETALL_PROJECT = "Project/GetProject",
}
export enum ADDRESS {
  GETALL = "Address/GetAll",
  GETBYID = "Address/Get/",
  INSERT = "Address/Insert",
  DELETE = "Address/Delete/",
  UPDATE = "Address/Update",
}
export enum REGION {
  GETALL = "Region/GetAll",
  GETBYID = "Region/Get/",
  INSERT = "Region/Insert",
  DELETE = "Region/Delete/",
  UPDATE = "Region/Update",
}
export enum PURCHASE_OFFICE {
  PURCHASE_OFFICE_GETALL = "PurchaseOffice/GetAll",
  PURCHASE_OFFICE_GETBYID = "PurchaseOffice/Get/",
  PURCHASE_OFFICE_INSERT = "PurchaseOffice/Insert",
  PURCHASE_OFFICE_DELETE = "PurchaseOffice/Delete/",
  PURCHASE_OFFICE_UPDATE = "PurchaseOffice/Update",
}
export enum UOM_CONVERSION_RATIO {
  UOM_CONVERSION_RATIO_GETALL = "Item/Uom/Conversion/GetAll/",
  UOM_CONVERSION_RATIO_INSERT = "Item/Uom/Conversion/Insert",
  UOM_CONVERSION_RATIO_DELETE = "Item/Uom/Conversion/Delete/",
  UOM_CONVERSION_RATIO_UPDATE = "Item/Uom/Conversion/Update",
}
export enum PURCHASE_REQUEST{
  GETALL_APPROVED="PurchaseRequest/GetAll/Approved",
  PURCHASE_REQUEST_GETALL="PurchaseRequest/GetAll",
  PURCHASE_REQUEST_GET="PurchaseRequest/Get/",
  PURCHASE_REQUEST_LINE_ITEM="PurchaseRequest/Line/GetAll/",
  PURCHASE_REQUEST_DELETE="PurchaseRequest/Delete/",
  PURCHASE_REQUEST_DETAILS="PurchaseRequest/GetPrDetails/",
  PURCHASE_REQUEST_INSERT_HEADERANDLINE="PurchaseRequest/Insert/HeaderAndLine",
  PURCHASE_REQUEST_UPDATE="PurchaseRequest/Line/Item/Update",
  PURCHASE_REQUEST_NUMBER_UPDATE="PurchaseRequest/Update/PurchaseReqestNumber/",
  PURCHASE_REQUEST_BASICDETAILS="PurchaseRequest/Update/PurchaseRequest/BasicDetails"
}
export enum SUPPLIER_QUOTES{
  GETALL="SupplierQuote/GetAll",
  GETALL_OPEN="SupplierQuote/GetAll/OpenSupplierQuotes",
  GETALL_CLOSED="SupplierQuote/GetAll/CompletedSupplierQuotes",
  GET_BY_ID="SupplierQuote/Get/",
  GET_BY_SUPPLIER_ID="SupplierQuote/Get/SupplierQuotesById/",
  INSERT="SupplierQuote/Insert",
  SUPPLIER_INSERT="SupplierQuote/InsertSupplierQuote",
  UPDATE="SupplierQuote/Update",
  COMPLETE="SupplierQuote/Complete/",
  ADDITIONAL_COST="SupplierQuote/AddtionalCost/Update",
  TERMS_N_CONDITIONS="SupplierQuote/TermsNConditions/Update",
  DELETE="SupplierQuote/Delete/",
  LINE_UPDATE="SupplierQuote/Line/Update",
  SLAB_ITEM_INSERT="SupplierQuote/Item/Discount/Insert",
  SLAB_NEW_ITEM_INSERT="SupplierQuote/NewItem/Discount/Insert",
  SLAB_ITEM_UPDATE="SupplierQuote/Item/Discount/Update",
  SLAB_NEW_ITEM_UPDATE="SupplierQuote/NewItem/Discount/Update",
  SLAB_ITEM_DELETE="SupplierQuote/Item/Discount/Delete/",
  SLAB_NEW_ITEM_DELETE="SupplierQuote/NewItem/Discount/Delete/",
  LINE_GETALL="SupplierQuote/Line/GetAll/",
  LINE_BY_ID="SupplierQuote/Line/Get/",
  SLAB_ITEM_GETALL="SupplierQuote/Item/Discount/GetAll/",
  SLAB_NEW_ITEM_GETALL="SupplierQuote/NewItem/Discount/GetAll/",
  SLAB_GET_BY_ID_ITEM="SupplierQuote/Item/Discount/Get/",
  SLAB_GET_BY_ID_NEW_ITEM="SupplierQuote/NewItem/Discount/Get/",
  REVISE="SupplierQuote/Revise",
  REVISE_HISTORY="SupplierQuote/GetAll/SupplierQuotesForReviseHistory/",
  PAYMENT_TERMS_INSERT="SupplierQuote/PaymentTerms",
  PAYMENT_TERMS_UPDATE="SupplierQuote/PaymentTerms/Update",
  PAYMENT_TERMS_DELETE="SupplierQuote/PaymentTerms/Delete/",
  PAYMENT_TERMS_GET="SupplierQuote/Get/PaymentTerms/",
}

export enum PURCHASE_REQUEST_PROCESS{
  PURCHASE_REQUEST_PROCESS_INSERT = "PurchaseRequest/Process/Start",
  PURCHASE_REQUEST_LINE_GETALLBYPRDATETIME = "PurchaseRequestLine/GetAllPrByDateTime/",
  PURCHASE_REQUEST_PROCESS_GETALL = "PurchaseRequest/Process/GetAll",
  PURCHASE_REQUEST_PROCESS_DELETE = "PurchaseRequest/Process/Delete/",
  PURCHASE_REQUEST_PROCESS_CANCEL = "PurchaseRequest/Process/Cancel/",
  PURCHASE_REQUEST_PROCESS_GET = "PurchaseRequest/Process/Get/",
  PURCHASE_REQUEST_PROCESS_LINE_GETALL = "PurchaseRequest/Process/Line/GetAll/",
  PURCHASE_REQUEST_PROCESS_COMPLETE_CREATE_BUCKETS = "PurchaseRequest/Process/CompleteCreateBuckets/",
  PURCHASE_REQUEST_PROCESS_COMPLETE_ATTACH_SUPPLIERS = "PurchaseRequest/Process/CompleteAttachSuppliers/",
  PURCHASE_REQUEST_PROCESS_LINE_DELETE_UNPROCESSED = "PurchaseRequest/Process/"
}


export enum REQUEST_BUCKET {
  GETALL = "RequestForQuoteBucket/GetAll/",
  GETALL_READY_FOR_QUOTE = "RequestForQuoteBucket/GetAll/ReadyForQuote",
  GETALL_SUPPLIER_QUOTE_RECEIVED = "RequestForQuoteBucket/GetAll/SupplierQuoteReceived",
  GETALL_READY_FOR_COMPARE = "RequestForQuoteBucket/GetAll/ReadyForCompare",
  GETALL_SUPPLIER_QUOTE_COMPARED = "RequestForQuoteBucket/GetAll/SupplierQuoteCompared",
  SUPPLIER_BASED_ON_BUCKET = "RequestForQuoteBucket/Supplier/GetAll/",
  REQUEST_FOR_QUOTE_BUCKET = "RequestForQuoteBucket/",
  REQUEST_FOR_QUOTE_GET = "RequestForQuoteBucket/Get/",
  PURCHASE_REQUEST_GETALL = "PurchaseRequest/GetAll",
  PURCHASE_REQUEST_LINE_ITEM = "PurchaseRequestLine/GetByPurchaseId/",
  GETALL_BUCKET_SUPPLIER = "RequestForQuoteBucket/Supplier/Get/",
  REQUEST_BUCKET_INSERT = "RequestForQuoteBucket/Insert",
  REQUEST_BUCKET_LINE_INSERT = "RequestForQuoteBucket/Line/Insert",
  REQUEST_BUCKET_LINE_DELETE = "RequestForQuoteBucket/Line/Delete",
  REQUEST_BUCKET_LINES_GETALL = "RequestForQuoteBucket/Line/GetAll/",
  REQUEST_BUCKET_UPDATE_STATUS ="RequestForQuoteBucket/UpdateStatus",
  REQUEST_BUCKET_CONSOLE_FINANCE_SUPPLIER_GETALL = "finance/Supplier/GetAll/Lite",
  REQUEST_BUCKET_SUPPLIER_DELETE = "RequestForQuoteBucket/Supplier/Delete",
  REQUEST_BUCKET_SUPPLIER_INSERT = "RequestForQuoteBucket/Supplier/Insert",
  REQUEST_BUCKET_SUPPLIER_INSERT_ALL = "RequestForQuoteBucket/Supplier/Insert/All",
  REQUEST_BUCKET_REPORTINFO_UPDATE = "RequestForQuoteBucket/Reportinfo/Update",
  REQUEST_BUCKET_DETAILS_UPDATE = "RequestForQuoteBucket/Details/Update",
  REQUEST_BUCKET_SUPPLIER_REPORTINFO_UPDATE = "RequestForQuoteBucket/Supplier/Reportinfo/Update",
  REQUEST_BUCKET_SUPPLIER_LINE_GETALL = "RequestForQuoteBucket/Supplier/Line/GetAll/",
  REQUEST_BUCKET_SUPPLIER_LINE_INSERT = "RequestForQuoteBucket/Supplier/Line/Insert",
  REQUEST_BUCKET_SUPPLIER_LINE_DELETE = "RequestForQuoteBucket/Supplier/Line/Delete",
  REQUEST_BUCKET_DELETE = "RequestForQuoteBucket/Delete/",  
  REQUEST_BUCKET_GETALL_OPEN_PRLINES = "RequestForQuoteBucket/GetAllOpenPrLines",  
  REQUEST_BUCKET_GET_RFQBYSTATUS = "RequestForQuoteBucket/GetRfqByStatus",
  REQUEST_BUCKET_SUPPLIER_DETAILS_UPDATE = "RequestForQuoteBucket/Supplier/BidDetails/Update",  
  REQUEST_BUCKET_SUPPLIER_DETAILS_GET= "RequestForQuoteBucket/Supplier/GetBidData/",  
  REQUEST_BUCKET_SUPPLIER_LINE_INSERT_ALL = "RequestForQuoteBucket/Supplier/RFQLine/Insert",
}

export enum COST {
  GETALL = "LandingCost/GetAll",
  GET_BY_ID = "LandingCost/Get/",
  INSERT = "LandingCost/Insert",
  UPDATE = "LandingCost/Update",
  DELETE = "LandingCost/Delete/",
  GETALL_COST = "LandingCost/GetAll/CostPrize"
}
export enum ITEM_MASTER{
  ITEM_SEGMENT_GETALL="ItemSegment/GetAll",
  ITEM_FAMILY_GETALL="ItemFamily/GetAll",
  ITEM_CLASS_GETALL="ItemClass/GetAll",
  ITEM_COMMODITY_GETALL="ItemCommodity/GetAll",
  ITEM_GETALL="Item/GetAll",
  ITEM_GET_ID="Item/Config/Get/",
  ITEM_GET_IDS="Item/Get/",
  ITEM_GET_DETAILS_IDS= "Item/Get/ItemDetails/",
  ITEM_COMMODITY_INSERT="ItemCommodity/Insert",
  ITEM_COMMODITY_UPDATE="ItemCommodity/Update",
  ITEM_COMMODITY_CONFIG_INSERT="ItemCommodity/Config/BasicDetail/Insert",
  ITEM_COMMODITY_CONFIG_UPDATE="ItemCommodity/Config/BasicDetail/Update",
  TRACKING_CONTROL_COMMODITY="ItemCommodity/Config/Tracking/Update",
  ITEM_COMMODITY_BASIC_GET="ItemCommodity/Get/",
  ITEM_COMMODITY_CONFIG_GET="ItemCommodity/Config/Get/",
  ITEM_COMMODITY_DELETE="ItemCommodity/Delete/",
  ITEM_ATTRIBUTE_GETALL = 'ItemAttribute/GetAll/'
}
export enum ITEM_SPEC{
  ITEM_SPEC_INSERT="ItemCommoditySpecification/Insert",
  ITEM_SPEC_GETALL="ItemCommoditySpecification/GetAll/",
  ITEM_SPEC_UPDATE="ItemCommoditySpecification/Update",
  ITEM_SPEC_DELETE="ItemCommoditySpecification/Delete",
}
export enum ADDITIONAL_COST{​​​​​​​​
 CONSOLE_CURRENCY="console/Currency/GetAll/Lite",
  GETALL = "SupplierQuote/LandingCost/GetAll/",
  GET_BY_ID = "SupplierQuote/LandingCost/Get/",
  INSERT = "SupplierQuote/LandingCost/Insert",
  UPDATE = "SupplierQuote/LandingCost/Update",
  DELETE = "SupplierQuote/LandingCost/Delete/",
}​​​​​​​​
export enum PLANT_MASTER{
  CONSOLE_COMPANY="console/Company/GetAll/Lite",
  ADDRESS_API = "Address/GetAll",
  LOCATION_API="Location/GetAll",
  BRANCH_API="console/Branch/GetAll/Lite/",
  PLANT_INSERT="Plant/Insert",
  PLANT_GET="Plant/Get/",
  PLANT_UPDATE="Plant/Update",
  PLANT_GETALL="Plant/GetAll"
}
export enum APPROVED_SUPPLIER{
  ITEMFAMILY_SUPPLIER_GETALL="ItemFamily/Config/Supplier/GetAll/",
  ITEMFAMILY_SUPPLIER_INSERT="ItemFamily/Config/Supplier/Insert",
  ITEMFAMILY_SUPPLIER_UPDATE="ItemFamily/Config/Supplier/Update/",
  ITEMFAMILY_SUPPLIER_DELETE="ItemFamily/Config/Supplier/Delete/",
  ITEMCLASS_SUPPLIER_GETALL="ItemClass/Config/Supplier/GetAll/",
  ITEMCLASS_SUPPLIER_INSERT="ItemClass/Config/Supplier/Insert",
  ITEMCLASS_SUPPLIER_UPDATE="ItemClass/Config/Supplier/Update/",
  ITEMCLASS_SUPPLIER_DELETE="ItemClass/Config/Supplier/Delete/",
  ITEMMASTER_SUPPLIER_GETALL="Item/Config/Supplier/GetAll/",
  ITEMMASTER_SUPPLIER_INSERT="Item/Config/Supplier/Insert",
  ITEMMASTER_SUPPLIER_UPDATE="Item/Config/Supplier/Update/",
  ITEMMASTER_SUPPLIER_DELETE="Item/Config/Supplier/Delete/",
  ITEMCOMMODITY_SUPPLIER_GETALL="ItemCommodity/Config/Supplier/GetAll/",
  ITEMCOMMODITY_SUPPLIER_INSERT="ItemCommodity/Config/Supplier/Insert",
  ITEMCOMMODITY_SUPPLIER_UPDATE="Item/Config/Supplier/Update/",
  ITEMCOMMODITY_SUPPLIER_DELETE="Item/Config/Supplier/Delete/"
}
export enum UOM{
  GETALL="Uom/GetAll",
}

export enum ITEM{
  UOM_CONVERSION_GETALL="Item/Uom/Conversion/GetAll/",
  NEW_ITEM_GET="NewItem/Uom/Conversion/GetAll/",
}

export enum DELIVERY_TERM{
  DELIVERY_TERM_GETALL="DeliveryTerm/GetAll/",
}
export enum SUPPLIER_QC{
  GETALL="SupplierQuote/Compare/GetAll",
  DELETE="SupplierQuote/Compare/Delete/",
}
export enum PURCHASE_ORDER{
  PURCHASE_ORDER_GETALL="PurchaseOrder/GetAll/",
  PURCHASE_ORDER_GET="PurchaseOrder/Get/",
  PURCHASE_ORDER_DELETE="PurchaseOrder/Delete/",
  PURCHASE_ORDER_INSERT="PurchaseOrder/Insert/",
  PURCHASE_ORDER_UPDATE="PurchaseOrder/Update/",
  PURCHASE_ORDER_LINE_GETALL="PurchaseOrder/Line/GetAll/",
  PURCHASE_ORDER_LINE_ITEMCONTROL_UPDATE="PurchaseOrder/Line/ItemControl/Update/",
  PURCHASE_ORDER_DETAILS="PurchaseOrder/PurchaseOrder/GetAllDetails/",
  PURCHASE_ACKNOWLEDGED_GET="PurchaseAcknowledgement/GetAllPoAcknowledgedById/",
  PURCHASE_ORDER_BY_SUPPLIER="PurchaseOrder/GetAll/Approved/",
  PURCHASE_ORDER_LINE_BY_ORDERID_RECEIPTID="PurchaseOrder/Line/GetAll/",
  PURCHASE_ORDER_TERMS="PurchaseOrder/TermsNConditions/Update",
  PURCHASE_ORDER_GET_PAYMENT_TERMS="PurchaseOrder/Get/PaymentTerms/",
  PURCHASE_ORDER_PAYMENT_TERMS_INSERT="PurchaseOrder/PaymentTerms",
  PURCHASE_ORDER_PAYMENT_TERMS_UPDATE="PurchaseOrder/PaymentTerms/Update",
  PURCHASE_ORDER_PAYMENT_CREDIT_TERMS="PurchaseOrder/Get/CreditTerms/",
}

export enum INSPECTION_MASTER{
  INSPECTION_MASTER_GETALL="Inspection/GetAll/",
}
export enum PO_GROUP{
  PO_GROUP_GETALL="PurchaseOrderGroup/GetAll",
  PO_GROUP_INSERT="PurchaseOrderGroup/Insert",
  PO_GROUP_GETBYID="PurchaseOrderGroup/Get/",
  PO_GROUP_UPDATE="PurchaseOrderGroup/Update",
  PO_GROUP_DELETE="PurchaseOrderGroup/Delete/"
}

export enum TRANSPORT_ADVISES{
 PURSHASE_ORDER_GETALL="TransportAdvise/GetAllPurchaseOrder",
 TRANSPORT_ADVISED_GETALL="TransportAdvise/GetAllTransportAdvised",
 TRANSPORT_ADVISED_GETBYID="TransportAdvise/GetTransportAdvisedById/",
 TRANSPORT_ADVISE_INSERT = "TransportAdvise/Insert",
 TRANSPORT_ADVISE_UPDATE = "TransportAdvise/Update",
 TRANSPORT_ADVISE_LINE_GETALL = "TransportAdvise/GetAllTransportAdvisedLineItemsAsync/",
}
export enum SHIPMENT_ADVISE{
  SHIPMENT_ADVISE_GETALL_SHIPMENT_ADVISED="ShipmentAdvise/GetShipmentAdvised",
  SHIPMENT_ADVISE_GETALL_PO="ShipmentAdvise/GetAllPurchaseOrder",
  SHIPMENT_ADVISE_GETBYID="ShipmentAdvise/Get/",
  SHIPMENT_ADVISE_UPDATE="ShipmentAdvise/Update",
  SHIPMENT_ADVISE_INSERT="ShipmentAdvise/Insert",
  SHIPMENT_ADVISE_GETSHIPMENT="ShipmentAdvise/GetShipmentAdvisedById/",
  SHIPMENT_GTTALLADVISELINEITEM_ASYNC="ShipmentAdvise/GetAllShipmentAdvisedLineItemsAsync/purchaseorderid?purchaseorderid="
}
export enum GOODRECEIPT{
  GETALL="GoodsReceipt/GetAll",
  GETBYID="GoodsReceipt/Get/",
  INSERT="GoodsReceipt/Draft/Insert",
  UPDATE="GoodsReceipt/Create/",
  DELETE="GoodsReceipt​/Delete​/",
  GEt_GRN_DETAILS ="GoodsReceipt/GetGrnDetails/",
  GET_GRN_BY_STATUS="GoodsReceipt/GetGrnByStatus",
  GRN_BY_PO="GoodsReceipt/GetAllApprovedGRNBasedOnPO/"
}
export enum GOODRECEIPTLINE{
  GETALL="GoodsReceipt/Line/GetAll/",
  GETBYID="GoodsReceipt/Line/Get/",
  INSERT="GoodsReceipt/Line/Insert",
  UPDATE="GoodsReceipt/Line/Update",
  DELETE="GoodsReceipt/Line/Delete/",
}

export enum GOODS_RECEIPT_LOT{
  GETALL="GoodsReceipt/Line/Lot/GetAll/",
  GETBYID="GoodsReceipt/Line/Lot/Get/",
  DELETE="GoodsReceiptLot/Delete​/", 
  GETALL_WARRANTY="GoodsReceipt/Line/Lot/GetAllWarranty/",
  DELETE_WARRANTY="GoodsReceipt/Line/Lot/Delete/",
}

export enum LOT {
  GETALL="Lot/GetAll",
  GETBYID="Lot/Get/",
  LOT_UPDATE="Lot/Update",
  LOT_UPDATE_WARRANTY="Lot/Update/Warranty",
  LOT_DELETE_WARRANTY="Lot/Delete/Warranty",
  LOT_GET_WARRANTY="Lot/GetWarrantyDetails"
}
export enum PRINTRECEIVABLES{
  GETALL_PO="GoodsReceipt/GetAll/PurchaseOrderForGRN",
  GET_HEADER_DETAILS="GoodsReceipt/Get/GRPurchaseOrderHeader/",
  GET_ITEM_DETAILS="GoodsReceipt/Get/GRNItemwiseDetails/",
  PURCHASE_ORDER_UPCOMING_DELIVERY_SCHEDULE="GoodsReceipt/Get/PurchaseOrderUpcomingDeliverySchedule/",
}

export enum LOT_SERIAL {
  GETALLBY_LOTID="LotSerial/GetAll/",
  GETBYID="LotSerial/Get/",
  INSERT="LotSerial/Insert",
  UPDATE="LotSerial/Update"
}

export enum WAREHOUSE {
  GETBYID="LotSerial/Get/",
  INSERT="Item/Config/Warehouse/Insert",
  UPDATE="Item/Config/Warehouse/Update",
  UPDATE_INVENTORY="Item/Config/Warehouse/UpdateInventory",
  GETALL_WAREHOUSE = "Warehouse/GetAllWarehouse"
}

export enum GOODS_RECEIPT_COSTING_SHEET {
  UPDATE="CostingSheet/GoodsReceipt/Estimated/Insert/",
  GETALL ="CostingSheet/GoodsReceipt/Estimated/GetAll/",
  GET_LINE_COSTING_DETAILS = "CostingSheet/GoodsReceipt/Estimated/GetLineCostingDetails/",
  COSTING_GRN_ESTIMATED_PROCESSGRN="CostingSheet/GoodsReceipt/Estimated/ProcessGrn/",
  COSTING_GRN_ITEM_GETALL_GRN_DETAILS="CostingSheet/GoodsReceipt/Item/GetAllGrnDetails/"
}

export enum TERMS_AND_CONDITION {
  GETALL ="TermsAndConditionsMaster/GetAll",
  GET_BY_ID ="TermsAndConditionsMaster/Get/",
}

export enum MATCH_AND_APPROVE {
  GETALL_MATERIAL_COST="MatchandApprove/GetAllMaterialCost/",
  GETALL_LANDED_COST="MatchandApprove/GetAllLandedCost/",
  INSERT_MATERIAL="MatchandApprove/InsertMaterialCostAsync",
  INSERT_LANDED="MatchandApprove/InsertLandedCostAsync",
  UPDATE="MatchandApprove/Update",
  GELALL_INVOICE_DETAILS="MatchandApprove/GetAllInvoiceDetails/",
  GELALL_GRN_INVOICE_DETAILS="MatchandApprove/GetAllGRNInvoiceDetails/",
  MATERIAL_APPROVE="MatchandApprove/MaterialInvoiceApprove?invoiceId=",
  NEW_LINE="MatchandApprove/Reconcile/AddNewLine",
  RECONCILE_UPDATE="MatchandApprove/Reconcile/Update",
  LANDING_RECONCILE_UPDATE="MatchandApprove/Reconcile/LandingCostReconcile?",
  PROCESSED_GRN="MatchandApprove/Invoice/FetchAllApprovedGrns",
  GRN_MATERIAL_DETAILS="MatchandApprove/ActualCosting/GetGrnInvoiceDetails/",
  GRN_LANDING_DETAILS="MatchandApprove/ActualCosting/GetInvoiceLandingDetails/"

}
export enum FINANCE_SUPPLIER {
  GETALL_PURCHASE_INVOICES="finance/PurchaseInvoice/GetAll",
  GETALL_PURCHASE_INVOICES_OPEN="finance/PurchaseInvoice/GetAllApprovedPurchaseOrderInvoices",
  GET_PURCHASE_ORDER_DETAILS="finance/PurchaseInvoice/GetPurchaseOrderDetails/",
  UPDATE_STATUS="finance/PurchaseInvoice/UpdateStatus"
}

export enum ACTUAL_COSTING {
  GET="ActualCostingSheet/Reconcile/Get/",
  UPDATE="ActualCostingSheet/Reconcile/Update",
  INSERT="ActualCostingSheet/LandingCostReconcileInsert",
  CONFIG_INSERT="ActualCostingSheet/reconcileInsert/",
  NEW_LINE="ActualCostingSheet/Reconcile/AddNewLine",
  APPROVE="ActualCostingSheet/MatchAndApprove/ApproveLandingCost",
  LANDING_COST_GET="ActualCostingSheet/ActualCostingLandingCost/Get/",
  LANDING_COST_UPDATE="ActualCostingSheet/Reconcile/LandingCostReconcile",
}
export enum ITEM_HISTORY {
  ITEM_HISTORY_GET_ID="ItemHistory/Get/",
}

export enum PURCHASE_RETURN {
  GETALL="PurchaseReturn/GetAll",
  INSERT="PurchaseReturn/Insert",
  UPDATE="PurchaseReturn/Update",
  LINE_ITEM_INSERT="PurchaseReturn/Insert/LineItem",
  GET_BY_ID="PurchaseReturn/Get/",
  GET_LINE_GRN="PurchaseReturn/Get/",
  DELETE="PurchaseReturn/Delete/",
  GET_LINE="PurchaseReturn/Get/PurchaseReturnLine/",
  DELETE_LINE="PurchaseReturn/Delete/PurchaseReturnLine/",
  UPDATE_LINE="PurchaseReturn/Update/PurchaseReturnLine",
  INSERT_LINE="PurchaseReturn/Insert/LineItem",
  UPDATE_RETURN_ID="PurchaseReturn/Update/PurchaseReturnNumber?purchaseReturnId="
}

export enum REJECTION_ADVISE {
  REJECTION_ADVISE_GETALL_OPEN="RejectionAdvise/GetAll/OpenRejectionAdvise",
  REJECTION_ADVISE_GETALL_ALL="RejectionAdvise/GetAll/RejectionAdviseAsync",
  REASON_FOR_REJECTION="RejectionAdvise/GetAll/ReasonForRejection",
  REJECTION_ADVISE_LINES_GRNID ="RejectionAdvise/GetAll/RejectedLineItems/goodsreceiptid?goodsreceiptid=",
  REJECTION_ADVISE_REASON_UPDATE ="RejectionAdvise/UpdateReasonforRejectionAdvise",
  REJECTION_ADVISE_REASON_LINE_UPDATE ="RejectionAdvise/UpdateRejectedReasonforLineItems",
  REJECTION_ADVISE_HEADER_DATA ="RejectionAdvise/GetAll/RejectionAdviseHeaderData?rejectionAdviseId="
}

export enum PURCHASE_CONTRACT{
  PURCHASE_CONTRACT_GETALL="PurchaseContract/GetAll",
  PURCHASE_CONTRACT_GETALL_LINES="PurchaseContract/GetByContractIdAsync/",
  PURCHASE_CONTRACT_GET="PurchaseContract/Get/",
  PURCHASE_CONTRACT_GET_LINE="PurchaseContract/GetLine/",
  PURCHASE_CONTRACT_DELETE="PurchaseOrder/Delete/",
  PURCHASE_CONTRACT_INSERT="PurchaseContract/Insert",
  PURCHASE_CONTRACT_INSERT_LINE="PurchaseContract/InsertLine",
  PURCHASE_CONTRACT_UPDATE="PurchaseContract/UpdatePurchaseContractUpdate",
  PURCHASE_CONTRACT_LINE_UPDATE="PurchaseContract/UpdatePurchaseContractLine",
  PURCHASE_CONTRACT_DELIVERY_SCHEDULE_LINE_GETALL="PurchaseContract/GetPurchaseContractDelivery/",
  PURCHASE_CONTRACT_DELIVERY_SCHEDULE_LINE_DELETE="PurchaseContract/DeletePurchaseContractDelivery?id=",
  PURCHASE_CONTRACT_DELIVERY_SCHEDULE_LINE_INSERT="PurchaseContract/PurchaseContractDeliveryInsert",
  PURCHASE_CONTRACT_DELIVERY_SCHEDULE_LINE_UPDATE="PurchaseContract/UpdatePurchaseContractDelivery",
  PURCHASE_CONTRACT_COSTING_GETALL="PurchaseContract/GetPurchaseContractCost/",
  PURCHASE_CONTRACT_COSTING_INSERT="PurchaseContract/PurchaseContractCostInsert",
  PURCHASE_CONTRACT_COSTING_UPDATE="PurchaseContract/UpdatePurchaseContractCost",
  PURCHASE_CONTRACT_COSTING_DELETE="PurchaseContract/DeletePurchaseContractCost?id=",
  PURCHASE_CONTRACT_DELIVERY_TERMS_UPDATE="PurchaseContract/UpdateDeliveryTerms",
}

export enum DELIVERY_ORDERS{
 GETALL="DeliveryOrder/GetAll",
 GETALL_OPEN="DeliveryOrder/GetDeliveryOrderStatus",
 GET_BY_ID="DeliveryOrder/Get/",
 GETALL_LINES="DeliveryOrder/GetAllLines/",
 UPDATE="DeliveryOrder/UpdateDeliveyOrder",
 CREATE_PURCHASE_RETURN_DO="DeliveryOrder/CreatePurchaseReturnDeliveryOrderAsync?purchaseRetunId=",
 UPDATE_STATUS="DeliveryOrder/UpdateDeliveyStatus?deliveryOrderId=",
 GET_DELIVERY_ORDER_DETAILS="DeliveryOrder/GetDeliveryOrderDetails/",
 GET_DELIVERY_ORDER_LINE_DETAILS="DeliveryOrder/GetDeliveryOrderLineDetails/",
}
export enum WAREHOUSE{
  GETALL="Warehouse/GetAll",
}
export enum QUALITY_INSPECTION{
  GETALL="QualityInspection/GetAll",
  GET_BY_ID="QualityInspection/Get/",
  GET_LINEDETAILS="QualityInspection/GetLineDetails/"
}


