import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationExplanation = ({ explanation, onConfigureAlgorithm, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const skillsGapData = [
    {
      skill: 'React.js',
      currentLevel: 60,
      targetLevel: 90,
      priority: 'high',
      courses: ['Продвинутый React', 'React Hooks и Context']
    },
    {
      skill: 'Node.js',
      currentLevel: 40,
      targetLevel: 85,
      priority: 'high',
      courses: ['Backend разработка на Node.js', 'Express.js и MongoDB']
    },
    {
      skill: 'TypeScript',
      currentLevel: 30,
      targetLevel: 80,
      priority: 'medium',
      courses: ['TypeScript для разработчиков', 'Продвинутый TypeScript']
    },
    {
      skill: 'Docker',
      currentLevel: 20,
      targetLevel: 70,
      priority: 'medium',
      courses: ['Контейнеризация с Docker', 'Docker и Kubernetes']
    }
  ];

  const careerAdvancement = {
    currentRole: 'Junior Frontend Developer',
    targetRole: 'Full Stack Developer',
    salaryIncrease: '45-60%',
    timeToAchieve: '6-9 месяцев',
    jobAvailability: 'Высокая'
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      high: 'Высокий',
      medium: 'Средний',
      low: 'Низкий'
    };
    return labels?.[priority] || priority;
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Объяснение рекомендаций</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onConfigureAlgorithm}
              iconName="Settings"
              iconPosition="left"
            >
              Настроить
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              className="md:hidden"
            />
          </div>
        </div>
      </div>
      <div className={`${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="p-4 space-y-6">
          {/* Career Advancement Section */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span>Карьерный рост</span>
            </h4>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Текущая позиция</p>
                  <p className="text-sm font-medium text-foreground">{careerAdvancement?.currentRole}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Целевая позиция</p>
                  <p className="text-sm font-medium text-foreground">{careerAdvancement?.targetRole}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Рост зарплаты</p>
                  <p className="text-sm font-medium text-success">{careerAdvancement?.salaryIncrease}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Время достижения</p>
                  <p className="text-sm font-medium text-foreground">{careerAdvancement?.timeToAchieve}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Gap Analysis */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span>Анализ пробелов в навыках</span>
            </h4>
            <div className="space-y-3">
              {skillsGapData?.map((skill, index) => (
                <div key={index} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">{skill?.skill}</span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-muted ${getPriorityColor(skill?.priority)}`}>
                        {getPriorityLabel(skill?.priority)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {skill?.currentLevel}% → {skill?.targetLevel}%
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Текущий уровень</span>
                      <span>Целевой уровень</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-warning to-success rounded-full relative">
                        <div 
                          className="h-full bg-warning rounded-full"
                          style={{ width: `${skill?.currentLevel}%` }}
                        />
                        <div 
                          className="absolute top-0 h-full w-1 bg-success"
                          style={{ left: `${skill?.targetLevel}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Рекомендуемые курсы:</p>
                    <div className="flex flex-wrap gap-1">
                      {skill?.courses?.map((course, courseIndex) => (
                        <span
                          key={courseIndex}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Relevance */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="BarChart3" size={16} className="text-secondary" />
              <span>Релевантность рынка</span>
            </h4>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="Briefcase" size={20} className="text-success" />
                  </div>
                  <p className="text-xs text-muted-foreground">Доступность вакансий</p>
                  <p className="text-sm font-medium text-foreground">{careerAdvancement?.jobAvailability}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="TrendingUp" size={20} className="text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Рост спроса</p>
                  <p className="text-sm font-medium text-foreground">+23% за год</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon name="DollarSign" size={20} className="text-warning" />
                  </div>
                  <p className="text-xs text-muted-foreground">Средняя зарплата</p>
                  <p className="text-sm font-medium text-foreground">120-180k ₽</p>
                </div>
              </div>
            </div>
          </div>

          {/* Algorithm Weights */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Sliders" size={16} className="text-accent" />
              <span>Веса алгоритма</span>
            </h4>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Потенциал зарплаты</span>
                  <span className="text-sm font-medium text-primary">40%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Доступность вакансий</span>
                  <span className="text-sm font-medium text-primary">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Соответствие навыкам</span>
                  <span className="text-sm font-medium text-primary">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Предпочтения обучения</span>
                  <span className="text-sm font-medium text-primary">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationExplanation;