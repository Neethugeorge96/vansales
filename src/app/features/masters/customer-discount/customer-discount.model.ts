import { Model } from "../../../shared/models/model";

export interface CustomerDiscountViewModel extends Model {

  discountCode : string,
  customerName :string,
  discountPercentage :number,
  IsActive :boolean,
  IsItemWiseDiscount : boolean
}
export interface PriceListDetails extends Model{
  itemId : number,
  itemCode : string,
  itemName :string,
  itemDescription : string,
  uOMMasterId : number,
  uOMName :string,
  price :number
}
