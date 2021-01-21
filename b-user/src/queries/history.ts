import { HistoryModel } from '../models';
import { HistoryRecordType } from '../schemas/HistoryRecord';

export const createUserHistory = (login: string) => {
  return HistoryModel.create({ login, records: [] });
}

export const findUserHistory = (login: string) => {
  return HistoryModel.findOne({ login }).lean().exec();
}

export const addHistoryRecord = async (login: string, record: HistoryRecordType) => {
  await HistoryModel.updateOne({ login }, { $push: { records: record } }).exec(); 
}

export const addHistoryRecords = async (login: string, records: HistoryRecordType[]) => {
  await HistoryModel.updateOne({ login }, { $push: { records: { $each: records } } }).exec(); 
}

export const removeHistoryRecord = async (login: string, _id: string) => {
  // @ts-ignore
  await HistoryModel.updateOne({ login }, { $pull: { records: { _id } } });
}
