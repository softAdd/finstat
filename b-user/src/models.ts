import { jwtMongoConnection, categoriesMongoConnection, historyMongoConnection } from './connections';
import { IAuthorizedJwt, authorizedJwtSchema } from './schemas/AuthorizedJwt';
import { IHistory, historySchema } from './schemas/History';
import { IHistoryRecord, historyRecordSchema } from './schemas/HistoryRecord';
import { ICategories, categoriesSchema } from './schemas/Categories';
import { ICategory, categorySchema } from './schemas/Category';

export const AuthorizedJwtModel = jwtMongoConnection.model<IAuthorizedJwt>('AuthorizedJwt', authorizedJwtSchema);
export const HistoryModel =  historyMongoConnection.model<IHistory>('History', historySchema);
export const HistoryRecordModel = historyMongoConnection.model<IHistoryRecord>('HistoryRecord', historyRecordSchema);
export const CategoriesModel = categoriesMongoConnection.model<ICategories>('Categories', categoriesSchema);
export const CategoryModel = categoriesMongoConnection.model<ICategory>('Category', categorySchema);
