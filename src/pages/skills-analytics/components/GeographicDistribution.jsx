import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GeographicDistribution = ({ data }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getRegionColor = (demandLevel) => {
    if (demandLevel >= 80) return 'bg-success';
    if (demandLevel >= 60) return 'bg-warning';
    if (demandLevel >= 40) return 'bg-secondary';
    return 'bg-error';
  };

  const getRegionTextColor = (demandLevel) => {
    if (demandLevel >= 80) return 'text-success';
    if (demandLevel >= 60) return 'text-warning';
    if (demandLevel >= 40) return 'text-secondary';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Географическое распределение
        </h3>
        <p className="text-sm text-muted-foreground">
          Спрос на навыки и уровень зарплат по регионам России
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Section */}
        <div className="relative">
          <div className="bg-muted rounded-lg p-4 h-80 flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Карта России - распределение спроса на навыки"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=55.7558,37.6176&z=3&output=embed"
              className="rounded-lg"
            />
          </div>
          
          <div className="absolute bottom-6 left-6 bg-popover border border-border rounded-lg p-3 shadow-modal">
            <h4 className="text-sm font-medium text-foreground mb-2">Легенда</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span className="text-muted-foreground">Высокий спрос (80%+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full" />
                <span className="text-muted-foreground">Средний спрос (60-79%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full" />
                <span className="text-muted-foreground">Умеренный спрос (40-59%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full" />
                <span className="text-muted-foreground">Низкий спрос (&lt;40%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Data */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {data?.map((region, index) => (
            <div
              key={index}
              className={`p-4 border border-border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                selectedRegion === index ? 'bg-muted/50 border-primary' : 'bg-card hover:bg-muted/30'
              }`}
              onClick={() => setSelectedRegion(selectedRegion === index ? null : index)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${getRegionColor(region?.demandLevel)} rounded-full`} />
                  <h4 className="font-medium text-foreground">{region?.name}</h4>
                </div>
                <Icon 
                  name={selectedRegion === index ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Спрос:</span>
                  <span className={`ml-2 font-medium ${getRegionTextColor(region?.demandLevel)}`}>
                    {region?.demandLevel}%
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Вакансии:</span>
                  <span className="ml-2 font-medium text-foreground">
                    {region?.vacancies?.toLocaleString('ru-RU')}
                  </span>
                </div>
              </div>

              {selectedRegion === index && (
                <div className="mt-4 pt-4 border-t border-border animate-slide-down">
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Средняя зарплата:</span>
                      <span className="font-medium text-foreground">
                        {formatCurrency(region?.averageSalary)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Топ навык:</span>
                      <span className="font-medium text-foreground">{region?.topSkill}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Рост спроса:</span>
                      <span className={`font-medium ${
                        region?.growthRate > 0 ? 'text-success' : 'text-error'
                      }`}>
                        {region?.growthRate > 0 ? '+' : ''}{region?.growthRate}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeographicDistribution;