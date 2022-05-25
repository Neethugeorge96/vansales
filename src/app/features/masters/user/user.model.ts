import { Model } from "../../../shared/models/model";

export interface userMaster extends Model {
  employeeName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  branchName: string;
  userStatus: boolean;
  webAccess: boolean;
  mobileAccess: boolean;
  addCustomer: boolean;
  import: boolean;
  exportSalesDetails: boolean;
  exportRemainingStock: boolean;
  lineManagerId: string;
}
