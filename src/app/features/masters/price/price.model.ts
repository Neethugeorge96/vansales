import { Model } from "../../../shared/models/model";

export interface PriceListMasterViewModel extends Model {
  priceCode: string;
  priceListName: string;
  description: string;
  effectiveFrom: string;
  effectiveTo: string;
  currencyId: number;
  currency: string;
  isActive: boolean;
}
export interface PriceListDetails extends Model {
  itemId: number;
  itemCode: string;
  itemName: string;
  itemDescription: string;
  uOMMasterId: number;
  uOMName: string;
  price: number;
  discountPrice: number;
}
//uomName
