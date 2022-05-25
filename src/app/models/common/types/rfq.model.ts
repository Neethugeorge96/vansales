import { Model } from 'src/app/shared/models/model';

export interface PRProcessInsert extends Model {
  id?: number,
  processDateTime: Date,
  description?: string,
  defaultItemClassificationType: number
}
  