import { Schema, Document } from 'mongoose';
import { CategoryType, categorySchema } from './Category';
import { GetEntity } from './types';

export interface ICategories extends Document {
  login: string;
  records: CategoryType[];
}

export type CategoriesType = GetEntity<ICategories>;

export const categoriesSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  records: {
    type: [categorySchema],
    required: true,
  },
});
