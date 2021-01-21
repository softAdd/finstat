import { HistoryRecord } from "common/api/types/history";

type SortableObject = {
  [key: string]: unknown;
  date: string;
}

const parseDate = (date: string) => Date.parse(date.split('.').reverse().join('-'));

export const sortByDateAsc = (records: SortableObject[]) => records.sort(({ date: dateA }, { date: dateB }) => {
  return parseDate(dateA) - parseDate(dateB);
});

export const filterMoreThanDate = (minDate: string, records: HistoryRecord[]) => {
  return records.filter((record) => Date.parse(minDate) <= parseDate(record.date));
}

export const filterLessThanDate = (maxDate: string, records: HistoryRecord[]) => {
  return records.filter((record) => Date.parse(maxDate) >= parseDate(record.date));
}