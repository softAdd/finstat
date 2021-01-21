export type HistoryRecord = {
  _id: string;
  date: string;
  category: string;
  sum: number;
}

export type History = {
  _id: string;
  login: string;
  records: HistoryRecord[];
}