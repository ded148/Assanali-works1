import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProgramEffectiveness = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState('employment');
  const [viewMode, setViewMode] = useState('chart');

  const metrics = [
    { value: 'employment', label: 'Трудоустройство', color: '#10B981' },
    { value: 'satisfaction', label: 'Удовлетворенность', color: '#6366F1' },
    { value: 'skillsMatch', label: 'Соответствие навыков', color: '#F59E0B' },
    { value: 'salaryGrowth', label: 'Рост зарплаты', color: '#EF4444' }
  ];

  const getMetricConfig = (metric) => {
    return metrics?.find(m => m?.value === metric) || metrics?.[0];
  };

  const formatValue = (value, metric) => {
    switch (metric) {
      case 'employment': case'satisfaction': case'skillsMatch':
        return `${value}%`;
      case 'salaryGrowth':
        return `+${value}%`;
      default:
        return value;
    }
  };

  const getPerformanceLevel = (value, metric) => {
    let threshold;
    switch (metric) {
      case 'employment':
        threshold = { excellent: 85, good: 70, fair: 50 };
        break;
      case 'satisfaction':
        threshold = { excellent: 90, good: 75, fair: 60 };
        break;
      case 'skillsMatch':
        threshold = { excellent: 80, good: 65, fair: 45 };
        break;
      case 'salaryGrowth':
        threshold = { excellent: 25, good: 15, fair: 5 };
        break;
      default:
        threshold = { excellent: 80, good: 60, fair: 40 };
    }

    if (value >= threshold?.excellent) return { level: 'excellent', color: 'text-success', bg: 'bg-success/10' };
    if (value >= threshold?.good) return { level: 'good', color: 'text-primary', bg: 'bg-primary/10' };
    if (value >= threshold?.fair) return { level: 'fair', color: 'text-warning', bg: 'bg-warning/10' };
    return { level: 'poor', color: 'text-error', bg: 'bg-error/10' };
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      const metricConfig = getMetricConfig(selectedMetric);
      
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: metricConfig?.color }}
              />
              <span className="text-sm text-muted-foreground">{metricConfig?.label}:</span>
              <span className="text-sm font-medium text-foreground">
                {formatValue(data?.[selectedMetric], selectedMetric)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Студентов: {data?.students?.toLocaleString('ru-RU')}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const averageValue = data?.reduce((sum, item) => sum + item?.[selectedMetric], 0) / data?.length;
  const topProgram = data?.reduce((max, item) => item?.[selectedMetric] > max?.[selectedMetric] ? item : max);
  const improvementNeeded = data?.filter(item => {
    const performance = getPerformanceLevel(item?.[selectedMetric], selectedMetric);
    return performance?.level === 'poor' || performance?.level === 'fair';
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Эффективность программ
          </h3>
          <p className="text-sm text-muted-foreground">
            Анализ результативности образовательных программ по ключевым показателям
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {metrics?.map(metric => (
              <option key={metric?.value} value={metric?.value}>
                {metric?.label}
              </option>
            ))}
          </select>

          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                viewMode === 'chart' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              График
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                viewMode === 'table' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Таблица
            </button>
          </div>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Средний показатель</span>
          </div>
          <p className="text-2xl font-bold text-primary">
            {formatValue(averageValue?.toFixed(1), selectedMetric)}
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Award" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Лучшая программа</span>
          </div>
          <p className="text-sm font-bold text-success truncate">{topProgram?.program}</p>
          <p className="text-lg font-bold text-success">
            {formatValue(topProgram?.[selectedMetric], selectedMetric)}
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Требуют улучшения</span>
          </div>
          <p className="text-2xl font-bold text-warning">{improvementNeeded?.length}</p>
        </div>
      </div>
      {/* Chart View */}
      {viewMode === 'chart' && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="program" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => formatValue(value, selectedMetric)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={selectedMetric}
                fill={getMetricConfig(selectedMetric)?.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {/* Table View */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Программа</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Студентов</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">
                  {getMetricConfig(selectedMetric)?.label}
                </th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Уровень</th>
              </tr>
            </thead>
            <tbody>
              {data?.sort((a, b) => b?.[selectedMetric] - a?.[selectedMetric])?.map((item, index) => {
                  const performance = getPerformanceLevel(item?.[selectedMetric], selectedMetric);
                  
                  return (
                    <tr key={index} className="border-b border-border hover:bg-muted/30">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-foreground">{item?.program}</p>
                          <p className="text-xs text-muted-foreground">{item?.faculty}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {item?.students?.toLocaleString('ru-RU')}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-foreground">
                          {formatValue(item?.[selectedMetric], selectedMetric)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${performance?.bg} ${performance?.color}`}>
                          {performance?.level === 'excellent' ? 'Отлично' :
                           performance?.level === 'good' ? 'Хорошо' :
                           performance?.level === 'fair' ? 'Удовлетворительно' : 'Требует улучшения'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProgramEffectiveness;