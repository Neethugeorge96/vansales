import { Model } from "../../../shared/models/model";

export interface DeviceMaster extends Model {
  serialNumber: string;
  isActive: boolean;
}
