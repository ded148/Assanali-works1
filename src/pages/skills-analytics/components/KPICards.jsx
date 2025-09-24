import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICards = ({ kpiData }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatPercentage = (value) => {
    return `${value?.toFixed(1)}%`;
  };

  const getChangeIcon = (change) => {
    if (change > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (change < 0) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  const cards = [
    {
      title: 'Средняя зарплата',
      value: formatCurrency(kpiData?.averageSalary),
      change: kpiData?.salaryChange,
      icon: 'DollarSign',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary'
    },
    {
      title: 'Трудоустройство выпускников',
      value: formatPercentage(kpiData?.employmentRate),
      change: kpiData?.employmentChange,
      icon: 'Users',
      bgColor: 'bg-success/10',
      iconColor: 'text-success'
    },
    {
      title: 'Соответствие навыков',
      value: formatPercentage(kpiData?.skillsAlignment),
      change: kpiData?.alignmentChange,
      icon: 'Target',
      bgColor: 'bg-secondary/10',
      iconColor: 'text-secondary'
    },
    {
      title: 'Активные вакансии',
      value: kpiData?.activeVacancies?.toLocaleString('ru-RU'),
      change: kpiData?.vacanciesChange,
      icon: 'Briefcase',
      bgColor: 'bg-accent/10',
      iconColor: 'text-accent'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => {
        const changeInfo = getChangeIcon(card?.change);
        
        return (
          <div key={index} className="bg-card border border-border rounded-lg p-6 card-elevation">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={card?.icon} size={24} className={card?.iconColor} />
              </div>
              <div className={`flex items-center space-x-1 ${changeInfo?.color}`}>
                <Icon name={changeInfo?.icon} size={16} />
                <span className="text-sm font-medium">
                  {Math.abs(card?.change)?.toFixed(1)}%
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {card?.title}
              </h3>
              <p className="text-2xl font-bold text-foreground">
                {card?.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;