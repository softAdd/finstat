import { Document as MongooseDoc } from 'mongoose';

export type GetEntity<SchemaInterface = any> = Omit<SchemaInterface, keyof MongooseDoc>;