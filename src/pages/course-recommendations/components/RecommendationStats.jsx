import React from 'react';
import Icon from '../../../components/AppIcon';

const RecommendationStats = ({ stats, className = '' }) => {
  const defaultStats = {
    totalRecommendations: 24,
    highRelevance: 8,
    mediumRelevance: 12,
    lowRelevance: 4,
    averageRelevance: 78,
    freeCoursesCount: 6,
    paidCoursesCount: 18,
    averagePrice: 15420,
    averageDuration: 8,
    skillsCovered: 45,
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000)
  };

  const currentStats = { ...defaultStats, ...stats };

  const formatLastUpdated = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) {
      return `${hours} час${hours > 1 ? 'а' : ''} назад`;
    } else {
      return `${minutes} мин назад`;
    }
  };

  const getRelevanceColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <span>Статистика рекомендаций</span>
        </h3>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="RefreshCw" size={12} />
          <span>Обновлено {formatLastUpdated(currentStats?.lastUpdated)}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="BookOpen" size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{currentStats?.totalRecommendations}</p>
          <p className="text-xs text-muted-foreground">Всего курсов</p>
        </div>

        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Target" size={20} className="text-success" />
          </div>
          <p className={`text-2xl font-bold ${getRelevanceColor(currentStats?.averageRelevance)}`}>
            {currentStats?.averageRelevance}%
          </p>
          <p className="text-xs text-muted-foreground">Средняя релевантность</p>
        </div>

        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Clock" size={20} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-foreground">{currentStats?.averageDuration}</p>
          <p className="text-xs text-muted-foreground">Средняя длительность (нед.)</p>
        </div>

        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Award" size={20} className="text-secondary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{currentStats?.skillsCovered}</p>
          <p className="text-xs text-muted-foreground">Навыков покрыто</p>
        </div>
      </div>
      <div className="space-y-4">
        {/* Relevance Distribution */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Распределение по релевантности</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm text-muted-foreground">Высокая (80%+)</span>
              </div>
              <span className="text-sm font-medium text-foreground">{currentStats?.highRelevance}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-sm text-muted-foreground">Средняя (60-79%)</span>
              </div>
              <span className="text-sm font-medium text-foreground">{currentStats?.mediumRelevance}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-sm text-muted-foreground">Низкая (&lt;60%)</span>
              </div>
              <span className="text-sm font-medium text-foreground">{currentStats?.lowRelevance}</span>
            </div>
          </div>
        </div>

        {/* Price Distribution */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Распределение по стоимости</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Gift" size={14} className="text-success" />
                <span className="text-sm text-muted-foreground">Бесплатные курсы</span>
              </div>
              <span className="text-sm font-medium text-foreground">{currentStats?.freeCoursesCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="CreditCard" size={14} className="text-primary" />
                <span className="text-sm text-muted-foreground">Платные курсы</span>
              </div>
              <span className="text-sm font-medium text-foreground">{currentStats?.paidCoursesCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={14} className="text-warning" />
                <span className="text-sm text-muted-foreground">Средняя стоимость</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {currentStats?.averagePrice?.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Рекомендации обновляются каждые 6 часов</span>
            <button className="flex items-center space-x-1 hover:text-foreground nav-transition">
              <Icon name="RefreshCw" size={12} />
              <span>Обновить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationStats;