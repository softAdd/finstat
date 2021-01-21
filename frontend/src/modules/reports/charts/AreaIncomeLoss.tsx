import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChartWrapper } from './ChartWrapper';
import { AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip, Legend } from 'recharts';
import { HistoryRecord } from 'common/api/types/history';
import { sortByDateAsc } from './utils';

type ChartItem = {
  date: string;
  income: number;
  loss: number;
  maxValue: number;
}

const calcChartData = (records: HistoryRecord[]) => {
  const result: ChartItem[] = [];
  const recordsCopy = records.slice();

  records.forEach(({ date: recordDate }) => {
    const indexesForRemove: number[] = [];
    const dateRecord: ChartItem = {
      date: recordDate,
      income: 0,
      loss: 0,
      maxValue: 0,
    };

    recordsCopy.forEach(({ date: currentDate, sum }, index) => {
      if (currentDate === recordDate) {
        if (sum > 0) {
          dateRecord.income += sum;
        }
        if (sum < 0) {
          dateRecord.loss -= sum;
        }
        indexesForRemove.push(index);
      }
    });
    dateRecord.maxValue = Math.max(dateRecord.income, dateRecord.loss)
    result.push(dateRecord);
    // delete used dates from array
    indexesForRemove.forEach((index) => recordsCopy.splice(index, 1));
  });

  return sortByDateAsc(result) as ChartItem[];
}

export const AreaIncomeLoss: FC<{ records: HistoryRecord[] }> = memo(({ records }) => {
  const { t } = useTranslation();
  const chartData = calcChartData(records);

  return (
    <ChartWrapper>
      <AreaChart
        data={chartData}
        width={730}
        height={270}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="loss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis dataKey="maxValue" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip isAnimationActive={false} />
        <Area type="monotone" name={t('Income')} dataKey="income" stroke="#82ca9d" fillOpacity={1} fill="url(#income)" isAnimationActive={false} />
        <Area type="monotone" name={t('Expense')} dataKey="loss" stroke="#8884d8" fillOpacity={1} fill="url(#loss)" isAnimationActive={false} />
        <Legend verticalAlign="top" align="right" />
      </AreaChart>
    </ChartWrapper>
  )
});