import { Schema, Document } from 'mongoose';
import { HistoryRecordType, historyRecordSchema } from './HistoryRecord';
import { GetEntity } from './types';

export interface IHistory extends Document {
  login: string;
  records: HistoryRecordType[];
}

export type HistoryType = GetEntity<IHistory>;

export const historySchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  records: {
    type: [historyRecordSchema],
    required: true,
  },
});
