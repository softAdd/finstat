import { CategoriesModel, CategoryModel } from '../models';
import { CategoryType } from '../schemas/Category';

export const createCategories = async (login: string) => {
  const defaultCategories = [
    CategoryModel.create({ name: 'Raiffeisen, доход', type: 'income', default: true }),
    CategoryModel.create({ name: 'Raiffeisen, трата', type: 'loss', default: true }),
  ]
  return CategoriesModel.create({ login, records: await Promise.all(defaultCategories) });
}

export const findCategories = (login: string) => {
  return CategoriesModel.findOne({ login }).lean().exec();
}

export const pushCategory = async (login: string, category: CategoryType) => {
  const categories = await CategoriesModel.findOne({ login });
  categories?.records.push(category);
  await categories?.save();
}

export const removeCategory = async (login: string, _id: string) => {
  // @ts-ignore
  await CategoriesModel.updateOne({ login }, { $pull: { records: { _id } } });
}
