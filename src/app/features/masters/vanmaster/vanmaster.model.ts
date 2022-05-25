import { Model } from "../../../shared/models/model";

export interface VanMaster extends Model {
    vanNumber: string;
    vanRegNumber: string;
    vanModel: string;
    capacity: number;
    color: string;
  
}

