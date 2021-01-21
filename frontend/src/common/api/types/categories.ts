export type Category = {
  _id: string;
  name: string;
  type: 'income' | 'loss';
  default: boolean;
}

export type Categories = {
  _id: string;
  login: string;
  records: Category[];
}