import { Model } from "../../shared/models/model";

export interface stocktovanModel extends Model {
  stockInDate: string;
  routeNo: string;
  vanNumber: string;
  locationName: string;
  CreatedDate: string;
}


export interface StockInDetailsViewModel extends Model {
  stockInHeaderId: number;
  stockInCustomerId: number;
  customerCode: string;
  customerName: string;
  itemId: number;
  itemCode: string;
  quantity: number;
  batchNumber: string;
  productionDate: string;
  expiryDate: string;
  lotNumber: string;
}

export interface StockToVanViewModel extends Model{
  stockInDate: string,
    routeNo: string,
    vanNumber: string,
    locationCode: string,
    customerCode: string,
    itemCode: string,
    batchNumber: string,
    productionDate: string,
    expiryDate: string,
    lotNumber: string,
    quantity: string,
    systemRemarks: string

}

