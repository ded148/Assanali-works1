import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsHeader = ({ onExportReport, onRefreshData, lastUpdated }) => {
  const formatLastUpdated = (date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Аналитика навыков</h1>
          <p className="text-muted-foreground">
            Анализ трендов рынка труда и разрывов в навыках для принятия образовательных решений
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Последнее обновление: {formatLastUpdated(lastUpdated)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onRefreshData}
          >
            Обновить данные
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExportReport}
          >
            Экспорт отчета
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;