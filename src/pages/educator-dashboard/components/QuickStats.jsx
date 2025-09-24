import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ className = '' }) => {
  const stats = [
    {
      id: 1,
      title: 'Активные курсы',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: 'BookOpen',
      color: 'bg-primary',
      description: 'Курсы в процессе обучения'
    },
    {
      id: 2,
      title: 'Студенты',
      value: '1,247',
      change: '+89',
      changeType: 'positive',
      icon: 'Users',
      color: 'bg-secondary',
      description: 'Активных студентов'
    },
    {
      id: 3,
      title: 'Трудоустройство',
      value: '89%',
      change: '+7%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'bg-success',
      description: 'Выпускников за 6 месяцев'
    },
    {
      id: 4,
      title: 'Средняя зарплата',
      value: '91к ₽',
      change: '+12%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'bg-accent',
      description: 'Зарплата выпускников'
    },
    {
      id: 5,
      title: 'Рекомендации',
      value: '23',
      change: '+5',
      changeType: 'neutral',
      icon: 'AlertTriangle',
      color: 'bg-warning',
      description: 'Требуют внимания'
    },
    {
      id: 6,
      title: 'Удовлетворенность',
      value: '4.4',
      change: '+0.3',
      changeType: 'positive',
      icon: 'Star',
      color: 'bg-primary',
      description: 'Оценка студентов'
    }
  ];

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-sm nav-transition"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${stat?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              </div>
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(stat?.changeType)}`}>
              <Icon name={getChangeIcon(stat?.changeType)} size={14} />
              <span className="text-sm font-medium">{stat?.change}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{stat?.description}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;