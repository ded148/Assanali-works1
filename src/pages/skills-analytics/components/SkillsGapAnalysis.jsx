import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const SkillsGapAnalysis = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('gap');

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'technical', label: 'Технические' },
    { value: 'soft', label: 'Гибкие навыки' },
    { value: 'management', label: 'Управленческие' },
    { value: 'creative', label: 'Креативные' }
  ];

  const sortOptions = [
    { value: 'gap', label: 'По разрыву' },
    { value: 'demand', label: 'По спросу' },
    { value: 'supply', label: 'По предложению' },
    { value: 'name', label: 'По названию' }
  ];

  const getGapLevel = (gap) => {
    if (gap >= 50) return { level: 'critical', color: 'text-error', bg: 'bg-error/10', label: 'Критический' };
    if (gap >= 30) return { level: 'high', color: 'text-warning', bg: 'bg-warning/10', label: 'Высокий' };
    if (gap >= 15) return { level: 'medium', color: 'text-secondary', bg: 'bg-secondary/10', label: 'Средний' };
    return { level: 'low', color: 'text-success', bg: 'bg-success/10', label: 'Низкий' };
  };

  const getGapIcon = (gap) => {
    if (gap >= 50) return 'AlertTriangle';
    if (gap >= 30) return 'AlertCircle';
    if (gap >= 15) return 'Info';
    return 'CheckCircle';
  };

  const filteredData = data?.filter(item => selectedCategory === 'all' || item?.category === selectedCategory)?.sort((a, b) => {
      switch (sortBy) {
        case 'gap':
          return b?.gap - a?.gap;
        case 'demand':
          return b?.marketDemand - a?.marketDemand;
        case 'supply':
          return b?.educationSupply - a?.educationSupply;
        case 'name':
          return a?.skill?.localeCompare(b?.skill);
        default:
          return 0;
      }
    });

  const criticalGaps = filteredData?.filter(item => item?.gap >= 50);
  const averageGap = filteredData?.reduce((sum, item) => sum + item?.gap, 0) / filteredData?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Анализ разрывов в навыках
          </h3>
          <p className="text-sm text-muted-foreground">
            Сравнение рыночного спроса с образовательным предложением
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories?.map(category => (
              <option key={category?.value} value={category?.value}>
                {category?.label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <span className="text-sm font-medium text-foreground">Критические разрывы</span>
          </div>
          <p className="text-2xl font-bold text-error">{criticalGaps?.length}</p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Средний разрыв</span>
          </div>
          <p className="text-2xl font-bold text-primary">{averageGap?.toFixed(1)}%</p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-foreground">Всего навыков</span>
          </div>
          <p className="text-2xl font-bold text-secondary">{filteredData?.length}</p>
        </div>
      </div>
      {/* Skills List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredData?.map((item, index) => {
          const gapInfo = getGapLevel(item?.gap);
          
          return (
            <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getGapIcon(item?.gap)} 
                    size={20} 
                    className={gapInfo?.color} 
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{item?.skill}</h4>
                    <span className="text-xs text-muted-foreground capitalize">
                      {item?.category === 'technical' ? 'Технический' :
                       item?.category === 'soft' ? 'Гибкий навык' :
                       item?.category === 'management' ? 'Управленческий' :
                       item?.category === 'creative' ? 'Креативный' : item?.category}
                    </span>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${gapInfo?.bg} ${gapInfo?.color}`}>
                  {gapInfo?.label} ({item?.gap}%)
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Рыночный спрос</span>
                    <span className="text-xs font-medium text-foreground">{item?.marketDemand}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item?.marketDemand}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Образовательное предложение</span>
                    <span className="text-xs font-medium text-foreground">{item?.educationSupply}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item?.educationSupply}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Разрыв</span>
                    <span className={`text-xs font-medium ${gapInfo?.color}`}>{item?.gap}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        item?.gap >= 50 ? 'bg-error' :
                        item?.gap >= 30 ? 'bg-warning' :
                        item?.gap >= 15 ? 'bg-secondary' : 'bg-success'
                      }`}
                      style={{ width: `${Math.min(item?.gap, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              {item?.recommendations && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Рекомендации:</p>
                  <p className="text-sm text-foreground">{item?.recommendations}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {filteredData?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Навыки не найдены для выбранной категории</p>
        </div>
      )}
    </div>
  );
};

export default SkillsGapAnalysis;