import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ChartWrapper } from './ChartWrapper';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { HistoryRecord } from 'common/api/types/history';
import { TFunction } from 'i18next';

const caclChartData = (records: HistoryRecord[], t: TFunction) => {
  let income = 0;
  let loss = 0;

  records.forEach(({ sum }) => {
    if (sum > 0) {
      income += sum;
    } else {
      loss -= sum;
    }
  });
  
  return [
    {
      name: t('Income'),
      value: Math.round(income),
      fill: '#82ca9d',
    },
    {
      name: t('Expense'),
      value: Math.round(loss),
      fill: '#8884d8',
    }
  ];
}

export const PieIncomeLoss: FC<{ records: HistoryRecord[] }> = ({ records }) => {
  const { t } = useTranslation();
  const chartData = caclChartData(records, t);
  
  return (
    <ChartWrapper>
      <PieChart width={730} height={270}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          fill="#82ca9d"
          paddingAngle={3}
          innerRadius={50}
          // @ts-ignore
          label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
          labelLine={false}
          isAnimationActive={false}
        >
          {chartData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
        </Pie>
        <Tooltip isAnimationActive={false} />
        <Legend verticalAlign="top" align="right" layout="vertical" />
      </PieChart>
    </ChartWrapper>
  )
}