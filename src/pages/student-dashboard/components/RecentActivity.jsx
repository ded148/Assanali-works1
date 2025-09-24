import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ className = '' }) => {
  const [selectedTab, setSelectedTab] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'course_completed',
      title: 'Завершен курс "Основы React"',
      description: 'Получен сертификат с оценкой 95%',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      category: 'learning'
    },
    {
      id: 2,
      type: 'skill_gained',
      title: 'Новый навык: TypeScript',
      description: 'Добавлен в ваш профиль навыков',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      icon: 'Award',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      category: 'skills'
    },
    {
      id: 3,
      type: 'job_match',
      title: 'Новая подходящая вакансия',
      description: 'Frontend разработчик в Яндекс (92% соответствие)',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      icon: 'Briefcase',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      category: 'jobs'
    },
    {
      id: 4,
      type: 'course_started',
      title: 'Начат курс "Node.js для начинающих"',
      description: 'Прогресс: 15% (2 из 12 модулей)',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'Play',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      category: 'learning'
    },
    {
      id: 5,
      type: 'assessment_completed',
      title: 'Пройдена оценка навыков',
      description: 'Обновлен профиль компетенций по JavaScript',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: 'Target',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      category: 'skills'
    },
    {
      id: 6,
      type: 'recommendation_received',
      title: 'Новые рекомендации курсов',
      description: '5 курсов по машинному обучению добавлены в рекомендации',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: 'Lightbulb',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      category: 'recommendations'
    },
    {
      id: 7,
      type: 'milestone_reached',
      title: 'Достигнута веха обучения',
      description: 'Завершен модуль "Frontend основы" в пути Fullstack разработчика',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      icon: 'Flag',
      color: 'text-success',
      bgColor: 'bg-success/10',
      category: 'learning'
    },
    {
      id: 8,
      type: 'job_applied',
      title: 'Отклик на вакансию',
      description: 'Подана заявка на позицию Junior Frontend Developer',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      icon: 'Send',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      category: 'jobs'
    }
  ];

  const tabs = [
    { id: 'all', label: 'Все', count: activities?.length },
    { id: 'learning', label: 'Обучение', count: activities?.filter(a => a?.category === 'learning')?.length },
    { id: 'skills', label: 'Навыки', count: activities?.filter(a => a?.category === 'skills')?.length },
    { id: 'jobs', label: 'Вакансии', count: activities?.filter(a => a?.category === 'jobs')?.length },
    { id: 'recommendations', label: 'Рекомендации', count: activities?.filter(a => a?.category === 'recommendations')?.length }
  ];

  const getFilteredActivities = () => {
    if (selectedTab === 'all') return activities;
    return activities?.filter(activity => activity?.category === selectedTab);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} мин назад`;
    } else if (hours < 24) {
      return `${hours} час${hours > 1 ? 'а' : ''} назад`;
    } else if (days === 1) {
      return 'вчера';
    } else {
      return `${days} дн. назад`;
    }
  };

  const filteredActivities = getFilteredActivities();

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Последняя активность</h2>
          <p className="text-sm text-muted-foreground">
            Ваши недавние достижения и обновления
          </p>
        </div>
        <Button variant="outline" size="sm" className="mt-4 sm:mt-0">
          <Icon name="History" size={16} className="mr-2" />
          Вся история
        </Button>
      </div>
      {/* Activity Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setSelectedTab(tab?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium nav-transition ${
              selectedTab === tab?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <span>{tab?.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedTab === tab?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-background text-muted-foreground'
            }`}>
              {tab?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities?.map((activity) => (
          <div
            key={activity?.id}
            className="flex items-start space-x-4 p-3 bg-background rounded-lg border border-border hover:shadow-sm nav-transition"
          >
            <div className={`w-10 h-10 ${activity?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon name={activity?.icon} size={18} className={activity?.color} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-foreground text-sm">{activity?.title}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {formatTimestamp(activity?.timestamp)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{activity?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {filteredActivities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Нет активности</h3>
          <p className="text-muted-foreground">
            В этой категории пока нет записей
          </p>
        </div>
      )}
      {/* Show More Button */}
      {filteredActivities?.length > 5 && (
        <div className="text-center mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm">
            Показать больше активности
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;