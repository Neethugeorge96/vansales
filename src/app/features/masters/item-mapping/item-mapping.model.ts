import { Model } from "../../../shared/models/model";

export interface ItemMappingMasterViewModel extends Model {
      mappingCode : string;
      customerName :  string;
      baseItemName : string;
      mappedItemName : string;
}
