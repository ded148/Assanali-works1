import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsFilters = ({ filters, onFilterChange, onResetFilters }) => {
  const industries = [
    { value: 'all', label: 'Все отрасли' },
    { value: 'it', label: 'IT и разработка' },
    { value: 'finance', label: 'Финансы и банки' },
    { value: 'healthcare', label: 'Здравоохранение' },
    { value: 'education', label: 'Образование' },
    { value: 'manufacturing', label: 'Производство' },
    { value: 'retail', label: 'Розничная торговля' },
    { value: 'consulting', label: 'Консалтинг' }
  ];

  const educationLevels = [
    { value: 'all', label: 'Все уровни' },
    { value: 'bachelor', label: 'Бакалавриат' },
    { value: 'master', label: 'Магистратура' },
    { value: 'phd', label: 'Аспирантура' },
    { value: 'professional', label: 'Профессиональная подготовка' },
    { value: 'certification', label: 'Сертификация' }
  ];

  const regions = [
    { value: 'all', label: 'Все регионы' },
    { value: 'moscow', label: 'Москва' },
    { value: 'spb', label: 'Санкт-Петербург' },
    { value: 'novosibirsk', label: 'Новосибирск' },
    { value: 'ekaterinburg', label: 'Екатеринбург' },
    { value: 'kazan', label: 'Казань' },
    { value: 'nizhny', label: 'Нижний Новгород' },
    { value: 'chelyabinsk', label: 'Челябинск' }
  ];

  const timePeriods = [
    { value: '3m', label: 'Последние 3 месяца' },
    { value: '6m', label: 'Последние 6 месяцев' },
    { value: '1y', label: 'Последний год' },
    { value: '2y', label: 'Последние 2 года' },
    { value: 'custom', label: 'Настраиваемый период' }
  ];

  const hasActiveFilters = () => {
    return filters?.industry !== 'all' || 
           filters?.educationLevel !== 'all' || 
           filters?.region !== 'all' || 
           filters?.timePeriod !== '1y';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Фильтры аналитики</h3>
        </div>
        
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onResetFilters}
          >
            Сбросить фильтры
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Industry Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Отрасль
          </label>
          <select
            value={filters?.industry}
            onChange={(e) => onFilterChange('industry', e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {industries?.map(industry => (
              <option key={industry?.value} value={industry?.value}>
                {industry?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Education Level Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Уровень образования
          </label>
          <select
            value={filters?.educationLevel}
            onChange={(e) => onFilterChange('educationLevel', e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {educationLevels?.map(level => (
              <option key={level?.value} value={level?.value}>
                {level?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Регион
          </label>
          <select
            value={filters?.region}
            onChange={(e) => onFilterChange('region', e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {regions?.map(region => (
              <option key={region?.value} value={region?.value}>
                {region?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Time Period Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Период
          </label>
          <select
            value={filters?.timePeriod}
            onChange={(e) => onFilterChange('timePeriod', e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timePeriods?.map(period => (
              <option key={period?.value} value={period?.value}>
                {period?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Custom Date Range */}
      {filters?.timePeriod === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Дата начала
            </label>
            <input
              type="date"
              value={filters?.startDate || ''}
              onChange={(e) => onFilterChange('startDate', e?.target?.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Дата окончания
            </label>
            <input
              type="date"
              value={filters?.endDate || ''}
              onChange={(e) => onFilterChange('endDate', e?.target?.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Активные фильтры:</p>
          <div className="flex flex-wrap gap-2">
            {filters?.industry !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {industries?.find(i => i?.value === filters?.industry)?.label}
                <button
                  onClick={() => onFilterChange('industry', 'all')}
                  className="ml-2 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.educationLevel !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                {educationLevels?.find(l => l?.value === filters?.educationLevel)?.label}
                <button
                  onClick={() => onFilterChange('educationLevel', 'all')}
                  className="ml-2 hover:text-secondary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.region !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                {regions?.find(r => r?.value === filters?.region)?.label}
                <button
                  onClick={() => onFilterChange('region', 'all')}
                  className="ml-2 hover:text-accent/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.timePeriod !== '1y' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                {timePeriods?.find(p => p?.value === filters?.timePeriod)?.label}
                <button
                  onClick={() => onFilterChange('timePeriod', '1y')}
                  className="ml-2 hover:text-success/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsFilters;