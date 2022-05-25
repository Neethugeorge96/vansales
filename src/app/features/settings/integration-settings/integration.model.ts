import { Model } from "../../../shared/models/model";

export interface IntegrationSettings extends Model {
  name: string;
  URL: string;
  Version: string;
  CompanyId: string;
  XAPIKey: string;
}
