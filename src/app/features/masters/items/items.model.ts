import { Model } from "../../../shared/models/model";

export interface Items extends Model {
  itemCode: string;
  itemName: string;
  description: string;
  uom: string;
  isBatchItem: boolean;
  storageTypeId: number;
  itemDefaultPrice: number;
  sequenceNumber: number;
  vatPercentage: number;
}
