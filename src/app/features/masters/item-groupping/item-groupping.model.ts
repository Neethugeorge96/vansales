import { Model } from "../../../shared/models/model";

export interface ItemGroupings extends Model {
  code: string;
  name: string;
  itemId: any;
}
