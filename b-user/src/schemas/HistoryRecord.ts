import { Schema, Document } from 'mongoose';
import { GetEntity } from './types';

export interface IHistoryRecord extends Document {
  date: string;
  category: string;
  sum: number;
}

export type HistoryRecordType = GetEntity<IHistoryRecord>;

export const historyRecordSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
});
