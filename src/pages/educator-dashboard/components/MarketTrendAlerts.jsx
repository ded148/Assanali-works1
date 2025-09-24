import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarketTrendAlerts = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const alerts = [
    {
      id: 1,
      title: 'Резкий рост спроса на AI/ML специалистов',
      description: 'За последние 30 дней количество вакансий с требованием навыков машинного обучения выросло на 47%. Рекомендуется расширить программу по Data Science.',
      category: 'high_demand',
      priority: 'high',
      impact: 'curriculum',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      metrics: {
        growth: '+47%',
        vacancies: 1247,
        avgSalary: '120-180к ₽'
      },
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn'],
      actionRequired: true
    },
    {
      id: 2,
      title: 'Снижение интереса к PHP разработке',
      description: 'Количество вакансий PHP разработчиков сократилось на 23% за квартал. Стоит пересмотреть актуальность курса веб-разработки на PHP.',
      category: 'declining',
      priority: 'medium',
      impact: 'curriculum',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      metrics: {
        growth: '-23%',
        vacancies: 342,
        avgSalary: '60-90к ₽'
      },
      skills: ['PHP', 'Laravel', 'Symfony'],
      actionRequired: true
    },
    {
      id: 3,
      title: 'Новые требования к кибербезопасности',
      description: 'Появились новые стандарты безопасности в облачных технологиях. 78% вакансий теперь требуют знание AWS Security и Zero Trust архитектуры.',
      category: 'new_requirements',
      priority: 'high',
      impact: 'content_update',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      metrics: {
        growth: '+78%',
        vacancies: 456,
        avgSalary: '100-150к ₽'
      },
      skills: ['AWS Security', 'Zero Trust', 'Cloud Security'],
      actionRequired: true
    },
    {
      id: 4,
      title: 'Рост популярности TypeScript',
      description: 'TypeScript становится стандартом для фронтенд разработки. 89% новых вакансий JavaScript разработчиков требуют знание TypeScript.',
      category: 'emerging_tech',
      priority: 'medium',
      impact: 'content_update',
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      metrics: {
        growth: '+89%',
        vacancies: 892,
        avgSalary: '80-120к ₽'
      },
      skills: ['TypeScript', 'React', 'Next.js'],
      actionRequired: false
    },
    {
      id: 5,
      title: 'Изменения в требованиях к DevOps',
      description: 'Kubernetes стал обязательным требованием для 94% DevOps позиций. Рекомендуется углубить практическую часть курса.',
      category: 'skill_shift',
      priority: 'high',
      impact: 'practical_focus',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      metrics: {
        growth: '+94%',
        vacancies: 567,
        avgSalary: '110-160к ₽'
      },
      skills: ['Kubernetes', 'Docker', 'Helm', 'Istio'],
      actionRequired: true
    }
  ];

  const categories = {
    all: { label: 'Все уведомления', icon: 'Bell', count: alerts?.length },
    high_demand: { label: 'Высокий спрос', icon: 'TrendingUp', count: alerts?.filter(a => a?.category === 'high_demand')?.length },
    declining: { label: 'Снижение спроса', icon: 'TrendingDown', count: alerts?.filter(a => a?.category === 'declining')?.length },
    new_requirements: { label: 'Новые требования', icon: 'AlertCircle', count: alerts?.filter(a => a?.category === 'new_requirements')?.length },
    emerging_tech: { label: 'Новые технологии', icon: 'Zap', count: alerts?.filter(a => a?.category === 'emerging_tech')?.length },
    skill_shift: { label: 'Изменения навыков', icon: 'RefreshCw', count: alerts?.filter(a => a?.category === 'skill_shift')?.length }
  };

  const priorityConfig = {
    high: {
      label: 'Высокий',
      color: 'bg-error text-error-foreground',
      icon: 'AlertTriangle'
    },
    medium: {
      label: 'Средний',
      color: 'bg-warning text-warning-foreground',
      icon: 'Clock'
    },
    low: {
      label: 'Низкий',
      color: 'bg-success text-success-foreground',
      icon: 'Info'
    }
  };

  const impactConfig = {
    curriculum: {
      label: 'Учебный план',
      icon: 'BookOpen',
      color: 'text-error'
    },
    content_update: {
      label: 'Обновление контента',
      icon: 'Edit',
      color: 'text-warning'
    },
    practical_focus: {
      label: 'Практические занятия',
      icon: 'Code',
      color: 'text-primary'
    }
  };

  const filteredAlerts = selectedCategory === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.category === selectedCategory);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 24) {
      return `${hours} час${hours > 1 ? 'а' : ''} назад`;
    } else {
      return `${days} день${days > 1 ? 'я' : ''} назад`;
    }
  };

  const handleDismissAlert = (alertId) => {
    console.log('Dismissing alert:', alertId);
  };

  const handleTakeAction = (alertId) => {
    console.log('Taking action for alert:', alertId);
  };

  const handleViewDetails = (alertId) => {
    console.log('Viewing details for alert:', alertId);
  };

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Рыночные тренды</h2>
              <p className="text-sm text-muted-foreground">Актуальные изменения в требованиях</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Settings">
              Настройки
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Отчет
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(categories)?.map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium nav-transition ${
                selectedCategory === key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={category?.icon} size={14} />
              <span>{category?.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                selectedCategory === key
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {category?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {filteredAlerts?.map((alert) => {
            const priorityInfo = priorityConfig?.[alert?.priority];
            const impactInfo = impactConfig?.[alert?.impact];

            return (
              <div
                key={alert?.id}
                className={`border rounded-lg p-4 hover:shadow-sm nav-transition ${
                  alert?.actionRequired ? 'border-warning bg-warning/5' : 'border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`${impactInfo?.color} mt-1`}>
                      <Icon name={impactInfo?.icon} size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{alert?.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo?.color}`}>
                          {priorityInfo?.label}
                        </span>
                        {alert?.actionRequired && (
                          <span className="px-2 py-1 bg-warning text-warning-foreground rounded-full text-xs font-medium">
                            Требует действий
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {alert?.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(alert?.timestamp)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => handleDismissAlert(alert?.id)}
                      className="p-1"
                    />
                  </div>
                </div>
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className={`text-lg font-bold ${
                      alert?.metrics?.growth?.startsWith('+') ? 'text-success' : 'text-error'
                    }`}>
                      {alert?.metrics?.growth}
                    </div>
                    <div className="text-xs text-muted-foreground">Изменение</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-foreground">
                      {alert?.metrics?.vacancies}
                    </div>
                    <div className="text-xs text-muted-foreground">Вакансий</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">
                      {alert?.metrics?.avgSalary}
                    </div>
                    <div className="text-xs text-muted-foreground">Зарплата</div>
                  </div>
                </div>
                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Ключевые навыки:</p>
                  <div className="flex flex-wrap gap-2">
                    {alert?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Impact Info */}
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name={impactInfo?.icon} size={14} className={impactInfo?.color} />
                  <span className="text-sm text-muted-foreground">
                    Влияние на: <span className="font-medium text-foreground">{impactInfo?.label}</span>
                  </span>
                </div>
                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => handleViewDetails(alert?.id)}
                  >
                    Подробнее
                  </Button>
                  <div className="flex items-center space-x-2">
                    {alert?.actionRequired && (
                      <Button
                        variant="default"
                        size="sm"
                        iconName="CheckCircle"
                        onClick={() => handleTakeAction(alert?.id)}
                      >
                        Принять меры
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Calendar"
                    >
                      Запланировать
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAlerts?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Нет уведомлений в выбранной категории
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketTrendAlerts;