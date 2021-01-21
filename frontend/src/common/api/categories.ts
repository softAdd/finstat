import axios from 'common/axios';
import { Categories, Category } from './types/categories';

export const GET_CATEGORIES_URL = '/api/categories';
export const getCategories = () => axios.get<Categories>('/api/categories');

export const postCategory = (category: Pick<Category, 'name' | 'type'>) =>
  axios.post('/api/categories', category);

export const deleteCategory = (id: Category['_id']) =>
  axios.delete(`/api/categories/${id}`);
