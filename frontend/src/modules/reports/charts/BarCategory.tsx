import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChartWrapper } from './ChartWrapper';
import { Category } from 'common/api/types/categories';
import { HistoryRecord } from 'common/api/types/history';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar
} from 'recharts';
import { sortByDateAsc } from './utils';

type ChartItem = {
  date: string;
  amount: number;
}

const calcChartData = (category: Category, records: HistoryRecord[]) => {
  const recordsByCategory: ChartItem[] = [];

  records.forEach((record) => {
    if (record.category !== category.name) {
      return;
    }

    if (record.sum < 0 && category.type === 'income') {
      return;
    }

    if (record.sum > 0 && category.type === 'loss') {
      return;
    }
    
    recordsByCategory.push({
      date: record.date,
      amount: record.sum < 0 ? record.sum * -1 : record.sum,
    })
  });
  
  return sortByDateAsc(recordsByCategory) as ChartItem[];
}

export const BarCategory: FC<{ records: HistoryRecord[]; category: Category }> = memo(({ category, records }) => {
  const { t } = useTranslation();
  const chartData = calcChartData(category, records);

  return (
    <ChartWrapper title={`${t('Chart')}: ${category.name}`}>
      <BarChart width={730} height={270} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip isAnimationActive={false} />
        <Bar
          dataKey="amount"
          name={category.type === 'income' ? t('Income') : t('Expense')}
          fill={category.type === 'income' ? '#82ca9d' : '#8884d8'}
          isAnimationActive={false}
        />
      </BarChart>
    </ChartWrapper>
  )
});