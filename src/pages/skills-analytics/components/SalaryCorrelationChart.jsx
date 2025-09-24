import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalaryCorrelationChart = ({ data }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground mb-2">{data?.skill}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between space-x-4">
              <span className="text-muted-foreground">Спрос:</span>
              <span className="font-medium text-foreground">{data?.demand}</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-muted-foreground">Зарплата:</span>
              <span className="font-medium text-foreground">{formatCurrency(data?.salary)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    const getColor = (demand) => {
      if (demand >= 80) return '#10B981'; // success
      if (demand >= 60) return '#F59E0B'; // warning
      return '#EF4444'; // error
    };

    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={getColor(payload?.demand)}
        stroke="white"
        strokeWidth={2}
        className="cursor-pointer hover:r-8 transition-all duration-200"
      />
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Корреляция зарплаты и спроса
        </h3>
        <p className="text-sm text-muted-foreground">
          Соотношение между уровнем спроса на навыки и средней заработной платой
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              type="number"
              dataKey="demand"
              name="Спрос"
              unit=""
              domain={[0, 100]}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Уровень спроса (%)', position: 'insideBottom', offset: -10 }}
            />
            <YAxis
              type="number"
              dataKey="salary"
              name="Зарплата"
              unit="₽"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={formatCurrency}
              label={{ value: 'Средняя зарплата (₽)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              name="Навыки"
              data={data}
              fill="#1E40AF"
              shape={<CustomDot />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full" />
          <span className="text-muted-foreground">Высокий спрос (80%+)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded-full" />
          <span className="text-muted-foreground">Средний спрос (60-79%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-error rounded-full" />
          <span className="text-muted-foreground">Низкий спрос (&lt;60%)</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryCorrelationChart;