import { Model } from "./model";

export interface Document extends Model {
    name: string;
    path: string;
    extension: string;
} 