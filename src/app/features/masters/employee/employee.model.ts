import { Model } from "../../../shared/models/model";

export interface EmployeeMasterViewModel extends Model {

  employeeCode: number;
  employeeName: string;
  designation: string;
  target: number;
  incentive: number;
  achievement: number;
  email: string;
  mobileNumber: string;
  isActive: boolean;
 
}


