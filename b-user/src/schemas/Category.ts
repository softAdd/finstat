import { Schema, Document as MongooseDocument } from 'mongoose';
import { GetEntity } from './types';

export interface ICategory extends MongooseDocument {
  name: string;
  type: 'income' | 'loss';
  default: boolean;
}

export type CategoryType = GetEntity<ICategory>;

export const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  default: {
    type: Boolean,
    required: true,
  }
});
