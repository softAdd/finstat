import { useRef } from 'react';

export const dateToCommonFormat = (inputDate: string) => {
  return inputDate.split('-').reverse().join('.');
}

export const dateToInputFormat = (commonDate: string) => {
  return commonDate.split('.').reverse().join('-');
}

export const useCurrentInputDate = () => {
  const { current: now } = useRef(new Date());
  const { current: day } = useRef(now.getDate());
  const { current: month } = useRef(now.getMonth() + 1);
  const { current: year } = useRef(now.getFullYear());
  return `${year}-${month <= 9 ? '0' + month : month}-${day}` as string;
}