import mongoose from 'mongoose';

const MONGO_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';

const DB_USERS = process.env.DB_USERS || 'users';
const DB_HISTORY = process.env.DB_HISTORY || 'history';
const DB_CATEGORIES = process.env.DB_CATEGORIES || 'categories';

const USERS_DB_URL = `${MONGO_URL}/${DB_USERS}`;
const HISTORY_DB_URL = `${MONGO_URL}/${DB_HISTORY}`;
const CATEGORIES_DB_URL = `${MONGO_URL}/${DB_CATEGORIES}`;

const CONNECTION_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

export const jwtMongoConnection = mongoose.createConnection(USERS_DB_URL, CONNECTION_OPTIONS);
export const historyMongoConnection = mongoose.createConnection(HISTORY_DB_URL, CONNECTION_OPTIONS);
export const categoriesMongoConnection = mongoose.createConnection(CATEGORIES_DB_URL, CONNECTION_OPTIONS);
