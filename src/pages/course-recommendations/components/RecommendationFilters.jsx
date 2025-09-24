import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const RecommendationFilters = ({ filters, onFiltersChange, onReset, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const careerPathOptions = [
    { value: 'all', label: 'Все направления' },
    { value: 'web-development', label: 'Веб-разработка' },
    { value: 'data-science', label: 'Наука о данных' },
    { value: 'mobile-development', label: 'Мобильная разработка' },
    { value: 'devops', label: 'DevOps' },
    { value: 'cybersecurity', label: 'Кибербезопасность' },
    { value: 'ai-ml', label: 'ИИ и машинное обучение' },
    { value: 'ui-ux', label: 'UI/UX дизайн' },
    { value: 'blockchain', label: 'Блокчейн' }
  ];

  const skillLevelOptions = [
    { value: 'all', label: 'Любой уровень' },
    { value: 'beginner', label: 'Начинающий' },
    { value: 'intermediate', label: 'Средний' },
    { value: 'advanced', label: 'Продвинутый' },
    { value: 'expert', label: 'Эксперт' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Любая продолжительность' },
    { value: 'short', label: 'До 4 недель' },
    { value: 'medium', label: '1-3 месяца' },
    { value: 'long', label: '3-6 месяцев' },
    { value: 'extended', label: 'Более 6 месяцев' }
  ];

  const certificationOptions = [
    { value: 'all', label: 'Все типы' },
    { value: 'certificate', label: 'Сертификат' },
    { value: 'diploma', label: 'Диплом' },
    { value: 'degree', label: 'Степень' },
    { value: 'professional', label: 'Профессиональная сертификация' }
  ];

  const providerOptions = [
    { value: 'all', label: 'Все провайдеры' },
    { value: 'coursera', label: 'Coursera' },
    { value: 'edx', label: 'edX' },
    { value: 'udemy', label: 'Udemy' },
    { value: 'stepik', label: 'Stepik' },
    { value: 'netology', label: 'Нетология' },
    { value: 'skillbox', label: 'Skillbox' },
    { value: 'geekbrains', label: 'GeekBrains' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleCheckboxChange = (key, checked) => {
    onFiltersChange({ ...filters, [key]: checked });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.careerPath && filters?.careerPath !== 'all') count++;
    if (filters?.skillLevel && filters?.skillLevel !== 'all') count++;
    if (filters?.duration && filters?.duration !== 'all') count++;
    if (filters?.certification && filters?.certification !== 'all') count++;
    if (filters?.provider && filters?.provider !== 'all') count++;
    if (filters?.freeOnly) count++;
    if (filters?.withCertificate) count++;
    if (filters?.russianLanguage) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Фильтры</h3>
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
                onClick={onReset}
                className="text-muted-foreground hover:text-foreground"
              >
                Сбросить
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              className="md:hidden"
            >
              {isExpanded ? 'Скрыть' : 'Показать'}
            </Button>
          </div>
        </div>
      </div>
      <div className={`p-4 space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select
            label="Направление карьеры"
            options={careerPathOptions}
            value={filters?.careerPath || 'all'}
            onChange={(value) => handleFilterChange('careerPath', value)}
            className="w-full"
          />

          <Select
            label="Уровень навыков"
            options={skillLevelOptions}
            value={filters?.skillLevel || 'all'}
            onChange={(value) => handleFilterChange('skillLevel', value)}
            className="w-full"
          />

          <Select
            label="Продолжительность"
            options={durationOptions}
            value={filters?.duration || 'all'}
            onChange={(value) => handleFilterChange('duration', value)}
            className="w-full"
          />

          <Select
            label="Тип сертификации"
            options={certificationOptions}
            value={filters?.certification || 'all'}
            onChange={(value) => handleFilterChange('certification', value)}
            className="w-full"
          />

          <Select
            label="Провайдер"
            options={providerOptions}
            value={filters?.provider || 'all'}
            onChange={(value) => handleFilterChange('provider', value)}
            className="w-full"
          />
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Дополнительные параметры</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Checkbox
              label="Только бесплатные курсы"
              checked={filters?.freeOnly || false}
              onChange={(e) => handleCheckboxChange('freeOnly', e?.target?.checked)}
            />
            <Checkbox
              label="С сертификатом"
              checked={filters?.withCertificate || false}
              onChange={(e) => handleCheckboxChange('withCertificate', e?.target?.checked)}
            />
            <Checkbox
              label="На русском языке"
              checked={filters?.russianLanguage || false}
              onChange={(e) => handleCheckboxChange('russianLanguage', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationFilters;