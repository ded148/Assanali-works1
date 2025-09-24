import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AlgorithmConfigModal = ({ isOpen, onClose, onSave }) => {
  const [weights, setWeights] = useState({
    salaryPotential: 40,
    jobAvailability: 30,
    skillsMatch: 20,
    learningPreferences: 10
  });

  const [preferences, setPreferences] = useState({
    preferFreeContent: false,
    preferRussianLanguage: true,
    preferShortCourses: false,
    preferCertifiedCourses: true,
    considerPrerequisites: true,
    prioritizePopularCourses: false
  });

  if (!isOpen) return null;

  const handleWeightChange = (key, value) => {
    const numValue = parseInt(value);
    const otherKeys = Object.keys(weights)?.filter(k => k !== key);
    const otherTotal = otherKeys?.reduce((sum, k) => sum + weights?.[k], 0);
    const remaining = 100 - numValue;
    
    if (remaining >= 0 && otherTotal > 0) {
      const ratio = remaining / otherTotal;
      const newWeights = { ...weights, [key]: numValue };
      
      otherKeys?.forEach(k => {
        newWeights[k] = Math.round(weights?.[k] * ratio);
      });
      
      // Adjust for rounding errors
      const total = Object.values(newWeights)?.reduce((sum, val) => sum + val, 0);
      if (total !== 100) {
        const diff = 100 - total;
        const firstOtherKey = otherKeys?.[0];
        newWeights[firstOtherKey] += diff;
      }
      
      setWeights(newWeights);
    }
  };

  const handlePreferenceChange = (key, checked) => {
    setPreferences(prev => ({ ...prev, [key]: checked }));
  };

  const handleSave = () => {
    onSave({ weights, preferences });
    onClose();
  };

  const resetToDefaults = () => {
    setWeights({
      salaryPotential: 40,
      jobAvailability: 30,
      skillsMatch: 20,
      learningPreferences: 10
    });
    setPreferences({
      preferFreeContent: false,
      preferRussianLanguage: true,
      preferShortCourses: false,
      preferCertifiedCourses: true,
      considerPrerequisites: true,
      prioritizePopularCourses: false
    });
  };

  const weightLabels = {
    salaryPotential: 'Потенциал зарплаты',
    jobAvailability: 'Доступность вакансий',
    skillsMatch: 'Соответствие навыкам',
    learningPreferences: 'Предпочтения обучения'
  };

  const preferenceLabels = {
    preferFreeContent: 'Предпочитать бесплатный контент',
    preferRussianLanguage: 'Предпочитать русский язык',
    preferShortCourses: 'Предпочитать короткие курсы',
    preferCertifiedCourses: 'Предпочитать курсы с сертификатами',
    considerPrerequisites: 'Учитывать требования к курсам',
    prioritizePopularCourses: 'Приоритет популярным курсам'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Settings" size={20} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Настройка алгоритма рекомендаций</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="p-2"
            aria-label="Закрыть"
          />
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-8">
            {/* Algorithm Weights */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Sliders" size={18} className="text-primary" />
                <span>Веса факторов рекомендации</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Настройте важность различных факторов при формировании рекомендаций. 
                Общая сумма должна составлять 100%.
              </p>
              
              <div className="space-y-4">
                {Object.entries(weights)?.map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">
                        {weightLabels?.[key]}
                      </label>
                      <span className="text-sm text-primary font-medium">{value}%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => handleWeightChange(key, e?.target?.value)}
                        className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => handleWeightChange(key, e?.target?.value)}
                        className="w-16 px-2 py-1 text-sm border border-border rounded-md bg-input text-foreground"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Общая сумма:</span>
                  <span className={`font-medium ${
                    Object.values(weights)?.reduce((sum, val) => sum + val, 0) === 100 
                      ? 'text-success' :'text-error'
                  }`}>
                    {Object.values(weights)?.reduce((sum, val) => sum + val, 0)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Learning Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Heart" size={18} className="text-primary" />
                <span>Предпочтения обучения</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Выберите ваши предпочтения для более персонализированных рекомендаций.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(preferences)?.map(([key, checked]) => (
                  <Checkbox
                    key={key}
                    label={preferenceLabels?.[key]}
                    checked={checked}
                    onChange={(e) => handlePreferenceChange(key, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Algorithm Explanation */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Info" size={18} className="text-primary" />
                <span>Как работает алгоритм</span>
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <Icon name="Target" size={16} className="text-primary mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Потенциал зарплаты:</span>
                    <span className="ml-1">Учитывает среднюю зарплату для навыков, получаемых в курсе</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Briefcase" size={16} className="text-primary mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Доступность вакансий:</span>
                    <span className="ml-1">Анализирует количество открытых позиций на рынке труда</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-primary mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Соответствие навыкам:</span>
                    <span className="ml-1">Сравнивает ваши текущие навыки с требованиями курса</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="User" size={16} className="text-primary mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">Предпочтения обучения:</span>
                    <span className="ml-1">Учитывает ваши личные предпочтения и стиль обучения</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={resetToDefaults}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Сбросить к умолчанию
            </Button>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Отмена
              </Button>
              <Button
                variant="default"
                onClick={handleSave}
                iconName="Save"
                iconPosition="left"
                disabled={Object.values(weights)?.reduce((sum, val) => sum + val, 0) !== 100}
              >
                Сохранить настройки
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmConfigModal;