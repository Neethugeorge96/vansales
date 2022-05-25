import { Model } from "src/app/shared/models/model";

export interface assignmentMaster extends Model {
  routeName: string;
  vanNumber: string;
  employeeName: string;
  validFrom: string;
  validTo: string;
  assignmentDate: string;
}
