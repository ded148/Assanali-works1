import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracking = ({ className = '' }) => {
  const [selectedPath, setSelectedPath] = useState('current');

  const learningPaths = [
    {
      id: 'current',
      title: 'Fullstack разработчик',
      description: 'Путь к становлению полноценным веб-разработчиком',
      progress: 65,
      totalCourses: 8,
      completedCourses: 5,
      estimatedCompletion: '3 месяца',
      nextMilestone: 'Backend разработка',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      currentCourse: 'Основы Node.js и Express'
    },
    {
      id: 'alternative',
      title: 'Data Scientist',
      description: 'Специализация в области анализа данных и машинного обучения',
      progress: 25,
      totalCourses: 10,
      completedCourses: 2,
      estimatedCompletion: '6 месяцев',
      nextMilestone: 'Статистический анализ',
      skills: ['Python', 'Pandas', 'Scikit-learn', 'SQL'],
      currentCourse: 'Математика для Data Science'
    }
  ];

  const currentPath = learningPaths?.find(path => path?.id === selectedPath);

  const milestones = [
    {
      id: 1,
      title: 'Frontend основы',
      status: 'completed',
      completedAt: '15.08.2024',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 2,
      title: 'React разработка',
      status: 'completed',
      completedAt: '02.09.2024',
      skills: ['React', 'JSX', 'Hooks']
    },
    {
      id: 3,
      title: 'Backend разработка',
      status: 'current',
      progress: 40,
      skills: ['Node.js', 'Express', 'API']
    },
    {
      id: 4,
      title: 'Базы данных',
      status: 'upcoming',
      estimatedStart: '15.10.2024',
      skills: ['MongoDB', 'SQL', 'Database Design']
    },
    {
      id: 5,
      title: 'DevOps основы',
      status: 'upcoming',
      estimatedStart: '01.11.2024',
      skills: ['Docker', 'CI/CD', 'AWS']
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'current':
        return { icon: 'Clock', color: 'text-warning' };
      case 'upcoming':
        return { icon: 'Circle', color: 'text-muted-foreground' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 border-success/20';
      case 'current':
        return 'bg-warning/10 border-warning/20';
      case 'upcoming':
        return 'bg-muted border-border';
      default:
        return 'bg-muted border-border';
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Прогресс обучения</h2>
          <p className="text-sm text-muted-foreground">
            Отслеживайте свой путь к достижению карьерных целей
          </p>
        </div>
        <Button variant="outline" size="sm" className="mt-4 sm:mt-0">
          <Icon name="Target" size={16} className="mr-2" />
          Изменить цель
        </Button>
      </div>
      {/* Learning Path Selector */}
      <div className="flex space-x-2 mb-6">
        {learningPaths?.map((path) => (
          <button
            key={path?.id}
            onClick={() => setSelectedPath(path?.id)}
            className={`flex-1 p-4 rounded-lg border nav-transition text-left ${
              selectedPath === path?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <h3 className="font-medium text-foreground mb-1">{path?.title}</h3>
            <p className="text-xs text-muted-foreground mb-2">{path?.description}</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full nav-transition"
                  style={{ width: `${path?.progress}%` }}
                />
              </div>
              <span className="text-xs font-medium text-foreground">{path?.progress}%</span>
            </div>
          </button>
        ))}
      </div>
      {/* Current Path Details */}
      <div className="bg-background rounded-lg border border-border p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <div className="mb-4 lg:mb-0">
            <h3 className="font-semibold text-foreground mb-1">{currentPath?.title}</h3>
            <p className="text-sm text-muted-foreground">{currentPath?.description}</p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-center">
              <p className="font-medium text-foreground">{currentPath?.completedCourses}/{currentPath?.totalCourses}</p>
              <p className="text-xs text-muted-foreground">Курсы</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">{currentPath?.estimatedCompletion}</p>
              <p className="text-xs text-muted-foreground">До завершения</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Текущий курс</h4>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={20} color="white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{currentPath?.currentCourse}</p>
                <p className="text-xs text-muted-foreground">В процессе изучения</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Следующий этап</h4>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                <Icon name="Target" size={20} color="white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{currentPath?.nextMilestone}</p>
                <p className="text-xs text-muted-foreground">Следующий модуль</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-foreground mb-2">Изучаемые навыки</h4>
          <div className="flex flex-wrap gap-2">
            {currentPath?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Milestones Timeline */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Этапы обучения</h3>
        <div className="space-y-4">
          {milestones?.map((milestone, index) => {
            const statusConfig = getStatusIcon(milestone?.status);
            return (
              <div
                key={milestone?.id}
                className={`relative p-4 rounded-lg border ${getStatusBg(milestone?.status)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`mt-1 ${statusConfig?.color}`}>
                    <Icon name={statusConfig?.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="font-medium text-foreground">{milestone?.title}</h4>
                      <div className="text-xs text-muted-foreground mt-1 sm:mt-0">
                        {milestone?.status === 'completed' && `Завершено ${milestone?.completedAt}`}
                        {milestone?.status === 'current' && `Прогресс: ${milestone?.progress}%`}
                        {milestone?.status === 'upcoming' && `Начало: ${milestone?.estimatedStart}`}
                      </div>
                    </div>
                    
                    {milestone?.status === 'current' && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Прогресс</span>
                          <span className="text-xs font-medium text-foreground">{milestone?.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-warning h-2 rounded-full nav-transition"
                            style={{ width: `${milestone?.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {milestone?.skills?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Connection line */}
                {index < milestones?.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-4 bg-border" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;