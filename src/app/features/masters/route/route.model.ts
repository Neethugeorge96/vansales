import { Model } from "../../../shared/models/model";

export interface routeMaster extends Model {
  routeNo: string;
  routeName: string;
  branchName: string;
  isActive: boolean;
}
