import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NodeDetailsPanel = ({ 
  selectedNode, 
  onClose, 
  onNavigate,
  className = '' 
}) => {
  if (!selectedNode) return null;

  const getNodeTypeIcon = (type) => {
    const icons = {
      skill: 'Zap',
      course: 'BookOpen',
      job: 'Briefcase',
      outcome: 'Target'
    };
    return icons?.[type] || 'Circle';
  };

  const getNodeTypeLabel = (type) => {
    const labels = {
      skill: 'Навык',
      course: 'Курс',
      job: 'Вакансия',
      outcome: 'Результат обучения'
    };
    return labels?.[type] || 'Элемент';
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(salary);
  };

  const renderSkillDetails = (node) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Спрос</span>
          </div>
          <div className="text-lg font-semibold text-foreground">{node?.demand}%</div>
          <div className="w-full bg-border rounded-full h-2 mt-2">
            <div 
              className="bg-success h-2 rounded-full" 
              style={{ width: `${node?.demand}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="DollarSign" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Зарплата</span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            {formatSalary(node?.salary)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">средняя по рынку</div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Уровень сложности</h4>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          node?.level === 'beginner' ? 'bg-success/10 text-success' :
          node?.level === 'intermediate'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
        }`}>
          {node?.level === 'beginner' ? 'Начальный' :
           node?.level === 'intermediate' ? 'Средний' : 'Продвинутый'}
        </span>
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Связанные курсы</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
            <span className="text-sm text-foreground">Основы Python</span>
            <Button variant="ghost" size="sm" className="text-xs">
              Перейти
            </Button>
          </div>
          <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
            <span className="text-sm text-foreground">Python для анализа данных</span>
            <Button variant="ghost" size="sm" className="text-xs">
              Перейти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourseDetails = (node) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Длительность</span>
          </div>
          <div className="text-lg font-semibold text-foreground">{node?.duration} ч</div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Star" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Рейтинг</span>
          </div>
          <div className="text-lg font-semibold text-foreground">{node?.rating}</div>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-1">
          <Icon name="Users" size={16} className="text-secondary" />
          <span className="text-sm font-medium text-foreground">Студентов</span>
        </div>
        <div className="text-lg font-semibold text-foreground">
          {node?.students?.toLocaleString('ru-RU')}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Получаемые навыки</h4>
        <div className="flex flex-wrap gap-2">
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">Python</span>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">Алгоритмы</span>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">ООП</span>
        </div>
      </div>
    </div>
  );

  const renderJobDetails = (node) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Зарплата</span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            {formatSalary(node?.salary)}
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Briefcase" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Вакансий</span>
          </div>
          <div className="text-lg font-semibold text-foreground">{node?.openings}</div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Опыт работы</h4>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          node?.experience === 'junior' ? 'bg-success/10 text-success' :
          node?.experience === 'middle'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
        }`}>
          {node?.experience === 'junior' ? 'Junior (0-2 года)' :
           node?.experience === 'middle' ? 'Middle (2-5 лет)' : 'Senior (5+ лет)'}
        </span>
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Требуемые навыки</h4>
        <div className="flex flex-wrap gap-2">
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">JavaScript</span>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">React</span>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">CSS</span>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">Git</span>
        </div>
      </div>
    </div>
  );

  const renderOutcomeDetails = (node) => (
    <div className="space-y-4">
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-1">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm font-medium text-foreground">Процент завершения</span>
        </div>
        <div className="text-lg font-semibold text-foreground">{node?.completion}%</div>
        <div className="w-full bg-border rounded-full h-2 mt-2">
          <div 
            className="bg-success h-2 rounded-full" 
            style={{ width: `${node?.completion}%` }}
          ></div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-foreground mb-2">Связанные курсы</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
            <span className="text-sm text-foreground">Продвинутый React</span>
            <Button variant="ghost" size="sm" className="text-xs">
              Перейти
            </Button>
          </div>
          <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
            <span className="text-sm text-foreground">Основы Python</span>
            <Button variant="ghost" size="sm" className="text-xs">
              Перейти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetails = () => {
    switch (selectedNode?.type) {
      case 'skill':
        return renderSkillDetails(selectedNode);
      case 'course':
        return renderCourseDetails(selectedNode);
      case 'job':
        return renderJobDetails(selectedNode);
      case 'outcome':
        return renderOutcomeDetails(selectedNode);
      default:
        return <div className="text-muted-foreground">Детали недоступны</div>;
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            selectedNode?.type === 'skill' ? 'bg-primary' :
            selectedNode?.type === 'course' ? 'bg-success' :
            selectedNode?.type === 'job'? 'bg-warning' : 'bg-secondary'
          }`}>
            <Icon 
              name={getNodeTypeIcon(selectedNode?.type)} 
              size={16} 
              color="white" 
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{selectedNode?.name}</h3>
            <p className="text-sm text-muted-foreground">{getNodeTypeLabel(selectedNode?.type)}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          iconName="X"
          className="p-2"
        />
      </div>
      {/* Content */}
      <div className="p-4">
        {renderDetails()}
      </div>
      {/* Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          {selectedNode?.type === 'course' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onNavigate('/course-recommendations')}
              iconName="ExternalLink"
              iconPosition="right"
            >
              Перейти к курсу
            </Button>
          )}
          {selectedNode?.type === 'skill' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('/course-recommendations')}
              iconName="BookOpen"
              iconPosition="left"
            >
              Найти курсы
            </Button>
          )}
          {selectedNode?.type === 'job' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('/skills-analytics')}
              iconName="BarChart3"
              iconPosition="left"
            >
              Аналитика
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
            iconPosition="left"
          >
            Поделиться
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeDetailsPanel;