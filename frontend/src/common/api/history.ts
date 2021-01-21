import axios from 'common/axios';
import { History, HistoryRecord } from './types/history';

export const GET_HISTORY_URL = '/api/history';
export const getHistory = () => axios.get<History>(GET_HISTORY_URL);

export const postHistoryRecord = (record: Omit<HistoryRecord, '_id'> ) => axios.post('/api/history', record);

export const deleteHistoryRecord = (id: HistoryRecord['_id']) => axios.delete(`/api/history/${id}`);
