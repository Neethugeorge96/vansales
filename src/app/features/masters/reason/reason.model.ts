import { Model } from "../../../shared/models/model";

export interface ReasonCodeMaster extends Model {
 
    reasonCode :string;
    description : string;
    stockMovementTypeId : StockMovementType;
 
}


export enum StockMovementType {
    GoodReturn = 1,
    Scrap = 2,

}