import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ className = '' }) => {
  const stats = [
    {
      id: 'courses',
      title: 'Активные курсы',
      value: '3',
      change: '+1',
      changeType: 'positive',
      icon: 'BookOpen',
      color: 'bg-primary',
      description: 'Курсы в процессе изучения'
    },
    {
      id: 'skills',
      title: 'Освоенные навыки',
      value: '24',
      change: '+5',
      changeType: 'positive',
      icon: 'Award',
      color: 'bg-success',
      description: 'Подтвержденные компетенции'
    },
    {
      id: 'progress',
      title: 'Общий прогресс',
      value: '65%',
      change: '+12%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'bg-warning',
      description: 'До достижения цели'
    },
    {
      id: 'matches',
      title: 'Подходящие вакансии',
      value: '18',
      change: '+3',
      changeType: 'positive',
      icon: 'Briefcase',
      color: 'bg-secondary',
      description: 'Новые возможности'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md nav-transition"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${stat?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} color="white" />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(stat?.changeType)}`}>
              <Icon name={getChangeIcon(stat?.changeType)} size={14} />
              <span className="font-medium">{stat?.change}</span>
            </div>
          </div>
          
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm font-medium text-foreground">{stat?.title}</p>
          </div>
          
          <p className="text-xs text-muted-foreground">{stat?.description}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;