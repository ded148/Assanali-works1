import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgramEffectiveness = ({ className = '' }) => {
  const [selectedMetric, setSelectedMetric] = useState('employment');
  const [timeRange, setTimeRange] = useState('6months');

  const employmentData = [
    { month: 'Апр 2024', rate: 78, graduates: 45 },
    { month: 'Май 2024', rate: 82, graduates: 52 },
    { month: 'Июн 2024', rate: 85, graduates: 48 },
    { month: 'Июл 2024', rate: 88, graduates: 41 },
    { month: 'Авг 2024', rate: 91, graduates: 55 },
    { month: 'Сен 2024', rate: 89, graduates: 47 }
  ];

  const salaryData = [
    { program: 'Веб-разработка', avgSalary: 85000, medianSalary: 80000, graduates: 156 },
    { program: 'Data Science', avgSalary: 95000, medianSalary: 90000, graduates: 89 },
    { program: 'Кибербезопасность', avgSalary: 92000, medianSalary: 88000, graduates: 67 },
    { program: 'DevOps', avgSalary: 98000, medianSalary: 95000, graduates: 45 },
    { program: 'Мобильная разработка', avgSalary: 82000, medianSalary: 78000, graduates: 78 }
  ];

  const skillsAssessmentData = [
    { skill: 'Отлично', value: 35, color: '#10B981' },
    { skill: 'Хорошо', value: 42, color: '#3B82F6' },
    { skill: 'Удовлетворительно', value: 18, color: '#F59E0B' },
    { skill: 'Требует улучшения', value: 5, color: '#EF4444' }
  ];

  const programComparison = [
    {
      program: 'Веб-разработка',
      currentYear: 89,
      previousYear: 82,
      marketDemand: 95,
      satisfaction: 4.2
    },
    {
      program: 'Data Science',
      currentYear: 94,
      previousYear: 88,
      marketDemand: 98,
      satisfaction: 4.5
    },
    {
      program: 'Кибербезопасность',
      currentYear: 91,
      previousYear: 85,
      marketDemand: 92,
      satisfaction: 4.3
    },
    {
      program: 'DevOps',
      currentYear: 96,
      previousYear: 89,
      marketDemand: 97,
      satisfaction: 4.6
    }
  ];

  const metrics = {
    employment: {
      title: 'Трудоустройство выпускников',
      icon: 'TrendingUp',
      data: employmentData
    },
    salary: {
      title: 'Зарплатная статистика',
      icon: 'DollarSign',
      data: salaryData
    },
    skills: {
      title: 'Оценка навыков',
      icon: 'Award',
      data: skillsAssessmentData
    }
  };

  const formatSalary = (value) => {
    return `${(value / 1000)?.toFixed(0)}к ₽`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
              {selectedMetric === 'employment' && '%'}
              {selectedMetric === 'salary' && ' ₽'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Эффективность программ</h2>
              <p className="text-sm text-muted-foreground">Анализ результатов обучения</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter">
              Фильтры
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Отчет
            </Button>
          </div>
        </div>

        {/* Metric Selection */}
        <div className="flex items-center space-x-1">
          {Object.entries(metrics)?.map(([key, metric]) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium nav-transition ${
                selectedMetric === key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={metric?.icon} size={16} />
              <span>{metric?.title}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-success">89%</div>
            <div className="text-sm text-muted-foreground">Средняя трудоустройство</div>
            <div className="flex items-center justify-center mt-1">
              <Icon name="TrendingUp" size={12} className="text-success mr-1" />
              <span className="text-xs text-success">+7% к прошлому году</span>
            </div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">91к ₽</div>
            <div className="text-sm text-muted-foreground">Средняя зарплата</div>
            <div className="flex items-center justify-center mt-1">
              <Icon name="TrendingUp" size={12} className="text-success mr-1" />
              <span className="text-xs text-success">+12% к прошлому году</span>
            </div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-secondary">4.4</div>
            <div className="text-sm text-muted-foreground">Удовлетворенность</div>
            <div className="flex items-center justify-center mt-1">
              <Icon name="TrendingUp" size={12} className="text-success mr-1" />
              <span className="text-xs text-success">+0.3 к прошлому году</span>
            </div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-accent">435</div>
            <div className="text-sm text-muted-foreground">Выпускников</div>
            <div className="flex items-center justify-center mt-1">
              <Icon name="TrendingUp" size={12} className="text-success mr-1" />
              <span className="text-xs text-success">+18% к прошлому году</span>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-6">
          {selectedMetric === 'employment' && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Динамика трудоустройства</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={employmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="var(--color-success)" 
                      strokeWidth={3}
                      dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {selectedMetric === 'salary' && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Зарплаты по программам</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salaryData}>
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
                      tickFormatter={formatSalary}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="avgSalary" fill="var(--color-primary)" name="Средняя зарплата" />
                    <Bar dataKey="medianSalary" fill="var(--color-secondary)" name="Медианная зарплата" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {selectedMetric === 'skills' && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Распределение оценок навыков</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillsAssessmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ skill, value }) => `${skill}: ${value}%`}
                    >
                      {skillsAssessmentData?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Program Comparison Table */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Сравнение программ</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Программа</th>
                  <th className="text-center py-3 px-4 font-medium text-foreground">2024</th>
                  <th className="text-center py-3 px-4 font-medium text-foreground">2023</th>
                  <th className="text-center py-3 px-4 font-medium text-foreground">Рынок</th>
                  <th className="text-center py-3 px-4 font-medium text-foreground">Оценка</th>
                  <th className="text-center py-3 px-4 font-medium text-foreground">Действия</th>
                </tr>
              </thead>
              <tbody>
                {programComparison?.map((program, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium text-foreground">{program?.program}</td>
                    <td className="text-center py-3 px-4">
                      <span className="text-success font-medium">{program?.currentYear}%</span>
                    </td>
                    <td className="text-center py-3 px-4 text-muted-foreground">
                      {program?.previousYear}%
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${program?.marketDemand}%` }}
                          />
                        </div>
                        <span className="ml-2 text-sm text-muted-foreground">{program?.marketDemand}%</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center">
                        <Icon name="Star" size={14} className="text-warning mr-1" />
                        <span className="text-sm font-medium">{program?.satisfaction}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        Детали
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramEffectiveness;