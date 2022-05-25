import { Model } from "../../../app/shared/models/model";

export interface ForecastEntryHeaderViewModel extends Model{

  employeeName : string,
  routeNo : string,
  vanNo :string,
  entryDate :Date,
  forecastDate : Date,
}


export interface ForecastEntryDetailsViewModel extends Model {
  id :number,
  forecastEntryHeaderId :number,
  customerName : string,
  itemName : string,
  uomName :string,
  quantity : number,
  remarks : string

}
