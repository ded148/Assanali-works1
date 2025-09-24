import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  searchQuery, 
  onSearchChange,
  isCollapsed,
  onToggleCollapse,
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = [
    { value: 'all', label: 'Все категории' },
    { value: 'programming', label: 'Программирование' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'ai', label: 'Искусственный интеллект' },
    { value: 'analytics', label: 'Аналитика данных' },
    { value: 'database', label: 'Базы данных' },
    { value: 'development', label: 'Разработка' }
  ];

  const levelOptions = [
    { value: 'all', label: 'Все уровни' },
    { value: 'beginner', label: 'Начальный' },
    { value: 'intermediate', label: 'Средний' },
    { value: 'advanced', label: 'Продвинутый' }
  ];

  const salaryOptions = [
    { value: 'all', label: 'Любая зарплата' },
    { value: '0-80000', label: 'До 80 000 ₽' },
    { value: '80000-120000', label: '80 000 - 120 000 ₽' },
    { value: '120000-160000', label: '120 000 - 160 000 ₽' },
    { value: '160000-999999', label: 'Свыше 160 000 ₽' }
  ];

  const demandOptions = [
    { value: 'all', label: 'Любой спрос' },
    { value: 'high', label: 'Высокий (80%+)' },
    { value: 'medium', label: 'Средний (60-80%)' },
    { value: 'low', label: 'Низкий (<60%)' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      category: 'all',
      level: 'all',
      salaryRange: 'all',
      demand: 'all'
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
    onSearchChange('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters?.category !== 'all') count++;
    if (localFilters?.level !== 'all') count++;
    if (localFilters?.salaryRange !== 'all') count++;
    if (localFilters?.demand !== 'all') count++;
    if (searchQuery) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  if (isCollapsed) {
    return (
      <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Фильтры</span>
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            iconName="ChevronDown"
            className="p-2"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Фильтры и поиск</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs"
            >
              Сбросить
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            iconName="ChevronUp"
            className="p-2"
          />
        </div>
      </div>
      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Search */}
        <div>
          <Input
            type="search"
            placeholder="Поиск навыков, курсов, вакансий..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Quick Filters */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Быстрые фильтры</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange('category', 'programming')}
              className={`px-3 py-1 text-xs rounded-full border nav-transition ${
                localFilters?.category === 'programming' ?'bg-primary text-primary-foreground border-primary' :'bg-muted text-muted-foreground border-border hover:bg-muted/80'
              }`}
            >
              Программирование
            </button>
            <button
              onClick={() => handleFilterChange('category', 'ai')}
              className={`px-3 py-1 text-xs rounded-full border nav-transition ${
                localFilters?.category === 'ai' ?'bg-primary text-primary-foreground border-primary' :'bg-muted text-muted-foreground border-border hover:bg-muted/80'
              }`}
            >
              ИИ
            </button>
            <button
              onClick={() => handleFilterChange('salaryRange', '120000-160000')}
              className={`px-3 py-1 text-xs rounded-full border nav-transition ${
                localFilters?.salaryRange === '120000-160000' ?'bg-primary text-primary-foreground border-primary' :'bg-muted text-muted-foreground border-border hover:bg-muted/80'
              }`}
            >
              120-160k ₽
            </button>
            <button
              onClick={() => handleFilterChange('demand', 'high')}
              className={`px-3 py-1 text-xs rounded-full border nav-transition ${
                localFilters?.demand === 'high' ?'bg-primary text-primary-foreground border-primary' :'bg-muted text-muted-foreground border-border hover:bg-muted/80'
              }`}
            >
              Высокий спрос
            </button>
          </div>
        </div>

        {/* Detailed Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Категория"
            options={categoryOptions}
            value={localFilters?.category}
            onChange={(value) => handleFilterChange('category', value)}
          />

          <Select
            label="Уровень сложности"
            options={levelOptions}
            value={localFilters?.level}
            onChange={(value) => handleFilterChange('level', value)}
          />

          <Select
            label="Диапазон зарплат"
            options={salaryOptions}
            value={localFilters?.salaryRange}
            onChange={(value) => handleFilterChange('salaryRange', value)}
          />

          <Select
            label="Спрос на рынке"
            options={demandOptions}
            value={localFilters?.demand}
            onChange={(value) => handleFilterChange('demand', value)}
          />
        </div>

        {/* Filter Summary */}
        {activeFiltersCount > 0 && (
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-2">Активные фильтры</h4>
            <div className="flex flex-wrap gap-2">
              {localFilters?.category !== 'all' && (
                <span className="inline-flex items-center space-x-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  <span>{categoryOptions?.find(opt => opt?.value === localFilters?.category)?.label}</span>
                  <button
                    onClick={() => handleFilterChange('category', 'all')}
                    className="hover:bg-primary/20 rounded"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {localFilters?.level !== 'all' && (
                <span className="inline-flex items-center space-x-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  <span>{levelOptions?.find(opt => opt?.value === localFilters?.level)?.label}</span>
                  <button
                    onClick={() => handleFilterChange('level', 'all')}
                    className="hover:bg-primary/20 rounded"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {localFilters?.salaryRange !== 'all' && (
                <span className="inline-flex items-center space-x-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  <span>{salaryOptions?.find(opt => opt?.value === localFilters?.salaryRange)?.label}</span>
                  <button
                    onClick={() => handleFilterChange('salaryRange', 'all')}
                    className="hover:bg-primary/20 rounded"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center space-x-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  <span>"{searchQuery}"</span>
                  <button
                    onClick={() => onSearchChange('')}
                    className="hover:bg-primary/20 rounded"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;