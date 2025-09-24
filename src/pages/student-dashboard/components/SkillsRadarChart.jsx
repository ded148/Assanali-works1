import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsRadarChart = ({ className = '' }) => {
  const [selectedProfile, setSelectedProfile] = useState('fullstack');

  const skillProfiles = {
    fullstack: {
      title: 'Fullstack разработчик',
      description: 'Универсальный веб-разработчик',
      data: [
        { skill: 'Frontend', current: 85, target: 90, market: 88 },
        { skill: 'Backend', current: 70, target: 85, market: 82 },
        { skill: 'Базы данных', current: 60, target: 80, market: 75 },
        { skill: 'DevOps', current: 45, target: 70, market: 78 },
        { skill: 'Тестирование', current: 55, target: 75, market: 70 },
        { skill: 'UI/UX', current: 40, target: 60, market: 65 }
      ]
    },
    datascientist: {
      title: 'Data Scientist',
      description: 'Специалист по анализу данных',
      data: [
        { skill: 'Python', current: 75, target: 90, market: 92 },
        { skill: 'Статистика', current: 60, target: 85, market: 88 },
        { skill: 'ML/AI', current: 50, target: 80, market: 85 },
        { skill: 'SQL', current: 70, target: 85, market: 80 },
        { skill: 'Визуализация', current: 65, target: 75, market: 70 },
        { skill: 'Big Data', current: 30, target: 70, market: 75 }
      ]
    },
    mobile: {
      title: 'Mobile разработчик',
      description: 'Разработчик мобильных приложений',
      data: [
        { skill: 'React Native', current: 80, target: 90, market: 85 },
        { skill: 'iOS/Swift', current: 45, target: 75, market: 80 },
        { skill: 'Android/Kotlin', current: 40, target: 70, market: 78 },
        { skill: 'UI/UX Mobile', current: 70, target: 85, market: 82 },
        { skill: 'API Integration', current: 75, target: 80, market: 75 },
        { skill: 'App Store', current: 35, target: 60, market: 65 }
      ]
    }
  };

  const currentProfile = skillProfiles?.[selectedProfile];

  const getSkillGap = (current, target) => {
    const gap = target - current;
    if (gap <= 10) return { level: 'low', color: 'text-success', label: 'Близко к цели' };
    if (gap <= 25) return { level: 'medium', color: 'text-warning', label: 'Требует внимания' };
    return { level: 'high', color: 'text-error', label: 'Критический разрыв' };
  };

  const getOverallProgress = () => {
    const totalCurrent = currentProfile?.data?.reduce((sum, item) => sum + item?.current, 0);
    const totalTarget = currentProfile?.data?.reduce((sum, item) => sum + item?.target, 0);
    return Math.round((totalCurrent / totalTarget) * 100);
  };

  const getTopSkills = () => {
    return currentProfile?.data?.sort((a, b) => b?.current - a?.current)?.slice(0, 3);
  };

  const getSkillsToImprove = () => {
    return currentProfile?.data?.map(skill => ({ ...skill, gap: skill?.target - skill?.current }))?.sort((a, b) => b?.gap - a?.gap)?.slice(0, 3);
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Анализ навыков</h2>
          <p className="text-sm text-muted-foreground">
            Сравнение текущих компетенций с целевыми требованиями рынка
          </p>
        </div>
        <Button variant="outline" size="sm" className="mt-4 sm:mt-0">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Обновить
        </Button>
      </div>
      {/* Profile Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(skillProfiles)?.map(([key, profile]) => (
          <button
            key={key}
            onClick={() => setSelectedProfile(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium nav-transition ${
              selectedProfile === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            {profile?.title}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-background rounded-lg border border-border p-4">
          <div className="mb-4">
            <h3 className="font-semibold text-foreground mb-1">{currentProfile?.title}</h3>
            <p className="text-sm text-muted-foreground">{currentProfile?.description}</p>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={currentProfile?.data}>
                <PolarGrid stroke="rgb(var(--color-border))" />
                <PolarAngleAxis 
                  dataKey="skill" 
                  tick={{ fontSize: 12, fill: 'rgb(var(--color-muted-foreground))' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: 'rgb(var(--color-muted-foreground))' }}
                />
                <Radar
                  name="Текущий уровень"
                  dataKey="current"
                  stroke="rgb(var(--color-primary))"
                  fill="rgb(var(--color-primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="Целевой уровень"
                  dataKey="target"
                  stroke="rgb(var(--color-success))"
                  fill="rgb(var(--color-success))"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Radar
                  name="Рыночные требования"
                  dataKey="market"
                  stroke="rgb(var(--color-warning))"
                  fill="rgb(var(--color-warning))"
                  fillOpacity={0.1}
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills Analysis */}
        <div className="space-y-4">
          {/* Overall Progress */}
          <div className="bg-background rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Общий прогресс</h3>
              <span className="text-2xl font-bold text-primary">{getOverallProgress()}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full nav-transition"
                style={{ width: `${getOverallProgress()}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              До достижения целевого уровня
            </p>
          </div>

          {/* Top Skills */}
          <div className="bg-background rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3">Сильные стороны</h3>
            <div className="space-y-2">
              {getTopSkills()?.map((skill, index) => (
                <div key={skill?.skill} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-success">{index + 1}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{skill?.skill}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                        className="bg-success h-2 rounded-full"
                        style={{ width: `${skill?.current}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground w-8">{skill?.current}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills to Improve */}
          <div className="bg-background rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3">Области для развития</h3>
            <div className="space-y-3">
              {getSkillsToImprove()?.map((skill) => {
                const gapInfo = getSkillGap(skill?.current, skill?.target);
                return (
                  <div key={skill?.skill} className="border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{skill?.skill}</span>
                      <span className={`text-xs ${gapInfo?.color}`}>{gapInfo?.label}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        Текущий: {skill?.current}% → Цель: {skill?.target}%
                      </span>
                      <span className="text-xs font-medium text-error">
                        Разрыв: {skill?.gap}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full relative"
                        style={{ width: `${(skill?.current / skill?.target) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1">
              <Icon name="BookOpen" size={16} className="mr-2" />
              Найти курсы
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="Target" size={16} className="mr-2" />
              Изменить цели
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsRadarChart;