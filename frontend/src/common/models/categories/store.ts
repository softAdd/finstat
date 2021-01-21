import { createEffect, createEvent, createStore } from 'effector';
import { Categories, Category } from 'common/api/types/categories';

export const $categories = createStore<Categories | null>(null);
export const setCategories = createEvent<Categories | null>();

export const getCategoriesFx = createEffect<void, Categories>();
export const deleteCategoryFx = createEffect<Category['_id'], void>();
export const postCategoryFx = createEffect<Pick<Category, 'name' | 'type'>, void>();
