import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CurriculumRecommendations = ({ className = '' }) => {
  const [selectedPriority, setSelectedPriority] = useState('all');

  const recommendations = [
    {
      id: 1,
      title: 'Добавить модуль "Машинное обучение с Python"',
      description: 'Высокий спрос на ML-специалистов. 847 вакансий за последний месяц требуют навыки машинного обучения.',
      priority: 'high',
      category: 'new_content',
      impact: 'Увеличение трудоустройства на 23%',
      timeline: '2-3 недели',
      skills: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas'],
      marketDemand: 847,
      salaryIncrease: '15-25%'
    },
    {
      id: 2,
      title: 'Обновить курс "Веб-разработка"',
      description: 'Добавить современные фреймворки React 18 и Next.js. Текущий контент устарел на 18 месяцев.',
      priority: 'high',
      category: 'update_content',
      impact: 'Соответствие 89% вакансий',
      timeline: '1-2 недели',
      skills: ['React 18', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      marketDemand: 623,
      salaryIncrease: '10-20%'
    },
    {
      id: 3,
      title: 'Расширить модуль "Кибербезопасность"',
      description: 'Включить темы по защите облачных инфраструктур и DevSecOps практикам.',
      priority: 'medium',
      category: 'expand_content',
      impact: 'Покрытие 67% новых требований',
      timeline: '3-4 недели',
      skills: ['AWS Security', 'Docker Security', 'CI/CD Security'],
      marketDemand: 412,
      salaryIncrease: '12-18%'
    },
    {
      id: 4,
      title: 'Добавить практикум по DevOps',
      description: 'Создать hands-on лабораторные работы с Kubernetes и микросервисами.',
      priority: 'medium',
      category: 'new_content',
      impact: 'Практические навыки для 78% позиций',
      timeline: '4-5 недель',
      skills: ['Kubernetes', 'Docker', 'Jenkins', 'Terraform'],
      marketDemand: 356,
      salaryIncrease: '20-30%'
    },
    {
      id: 5,
      title: 'Обновить модуль "Базы данных"',
      description: 'Добавить NoSQL базы данных и работу с большими данными.',
      priority: 'low',
      category: 'update_content',
      impact: 'Расширение компетенций на 34%',
      timeline: '2-3 недели',
      skills: ['MongoDB', 'Redis', 'Elasticsearch', 'Apache Spark'],
      marketDemand: 289,
      salaryIncrease: '8-15%'
    }
  ];

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

  const categoryConfig = {
    new_content: {
      label: 'Новый контент',
      icon: 'Plus',
      color: 'text-primary'
    },
    update_content: {
      label: 'Обновление',
      icon: 'RefreshCw',
      color: 'text-secondary'
    },
    expand_content: {
      label: 'Расширение',
      icon: 'Expand',
      color: 'text-accent'
    }
  };

  const filteredRecommendations = selectedPriority === 'all' 
    ? recommendations 
    : recommendations?.filter(rec => rec?.priority === selectedPriority);

  const handleImplement = (recommendationId) => {
    console.log('Implementing recommendation:', recommendationId);
  };

  const handleViewDetails = (recommendationId) => {
    console.log('Viewing details for:', recommendationId);
  };

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Рекомендации по учебному плану</h2>
              <p className="text-sm text-muted-foreground">На основе анализа рынка труда</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Download">
            Экспорт
          </Button>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Приоритет:</span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setSelectedPriority('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium nav-transition ${
                selectedPriority === 'all' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Все
            </button>
            {Object.entries(priorityConfig)?.map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedPriority(key)}
                className={`px-3 py-1 rounded-md text-xs font-medium nav-transition ${
                  selectedPriority === key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {config?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {filteredRecommendations?.map((recommendation) => {
            const priorityInfo = priorityConfig?.[recommendation?.priority];
            const categoryInfo = categoryConfig?.[recommendation?.category];

            return (
              <div
                key={recommendation?.id}
                className="border border-border rounded-lg p-4 hover:shadow-sm nav-transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`${categoryInfo?.color} mt-1`}>
                      <Icon name={categoryInfo?.icon} size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-foreground">{recommendation?.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo?.color}`}>
                          {priorityInfo?.label}
                        </span>
                        <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                          {categoryInfo?.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {recommendation?.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-foreground">
                      {recommendation?.marketDemand}
                    </div>
                    <div className="text-xs text-muted-foreground">Вакансий</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-success">
                      {recommendation?.salaryIncrease}
                    </div>
                    <div className="text-xs text-muted-foreground">Рост зарплаты</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-foreground">
                      {recommendation?.timeline}
                    </div>
                    <div className="text-xs text-muted-foreground">Время внедрения</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-sm font-semibold text-primary">
                      {recommendation?.impact}
                    </div>
                    <div className="text-xs text-muted-foreground">Влияние</div>
                  </div>
                </div>
                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Ключевые навыки:</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendation?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => handleViewDetails(recommendation?.id)}
                  >
                    Подробнее
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Calendar"
                    >
                      Запланировать
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="CheckCircle"
                      onClick={() => handleImplement(recommendation?.id)}
                    >
                      Внедрить
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRecommendations?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Нет рекомендаций с выбранным приоритетом
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumRecommendations;