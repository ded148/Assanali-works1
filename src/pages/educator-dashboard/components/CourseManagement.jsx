import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseManagement = ({ className = '' }) => {
  const [selectedTab, setSelectedTab] = useState('active');

  const courses = [
    {
      id: 1,
      title: 'Основы веб-разработки',
      status: 'active',
      students: 156,
      completion: 78,
      lastUpdated: '2024-09-20',
      modules: 12,
      duration: '16 недель',
      rating: 4.2,
      nextDeadline: '2024-09-28',
      instructor: 'Петров А.И.',
      progress: {
        completed: 8,
        inProgress: 3,
        pending: 1
      }
    },
    {
      id: 2,
      title: 'Машинное обучение с Python',
      status: 'active',
      students: 89,
      completion: 65,
      lastUpdated: '2024-09-22',
      modules: 15,
      duration: '20 недель',
      rating: 4.5,
      nextDeadline: '2024-09-30',
      instructor: 'Иванова М.С.',
      progress: {
        completed: 6,
        inProgress: 4,
        pending: 5
      }
    },
    {
      id: 3,
      title: 'Кибербезопасность',
      status: 'draft',
      students: 0,
      completion: 0,
      lastUpdated: '2024-09-18',
      modules: 10,
      duration: '12 недель',
      rating: 0,
      nextDeadline: null,
      instructor: 'Сидоров В.П.',
      progress: {
        completed: 3,
        inProgress: 2,
        pending: 5
      }
    },
    {
      id: 4,
      title: 'DevOps практики',
      status: 'completed',
      students: 67,
      completion: 100,
      lastUpdated: '2024-08-15',
      modules: 14,
      duration: '18 недель',
      rating: 4.3,
      nextDeadline: null,
      instructor: 'Козлов Д.А.',
      progress: {
        completed: 14,
        inProgress: 0,
        pending: 0
      }
    },
    {
      id: 5,
      title: 'Мобильная разработка',
      status: 'active',
      students: 78,
      completion: 45,
      lastUpdated: '2024-09-21',
      modules: 13,
      duration: '17 недель',
      rating: 4.1,
      nextDeadline: '2024-10-05',
      instructor: 'Морозова Е.В.',
      progress: {
        completed: 4,
        inProgress: 3,
        pending: 6
      }
    }
  ];

  const tabs = [
    { key: 'active', label: 'Активные', count: courses?.filter(c => c?.status === 'active')?.length },
    { key: 'draft', label: 'Черновики', count: courses?.filter(c => c?.status === 'draft')?.length },
    { key: 'completed', label: 'Завершенные', count: courses?.filter(c => c?.status === 'completed')?.length }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      active: {
        label: 'Активный',
        color: 'bg-success text-success-foreground',
        icon: 'Play'
      },
      draft: {
        label: 'Черновик',
        color: 'bg-warning text-warning-foreground',
        icon: 'Edit'
      },
      completed: {
        label: 'Завершен',
        color: 'bg-muted text-muted-foreground',
        icon: 'CheckCircle'
      }
    };
    return configs?.[status];
  };

  const filteredCourses = selectedTab === 'all' 
    ? courses 
    : courses?.filter(course => course?.status === selectedTab);

  const handleEditCourse = (courseId) => {
    console.log('Editing course:', courseId);
  };

  const handleViewAnalytics = (courseId) => {
    console.log('Viewing analytics for course:', courseId);
  };

  const handleManageStudents = (courseId) => {
    console.log('Managing students for course:', courseId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Не установлен';
    const date = new Date(dateString);
    return date?.toLocaleDateString('ru-RU');
  };

  const getProgressColor = (completion) => {
    if (completion >= 80) return 'bg-success';
    if (completion >= 60) return 'bg-primary';
    if (completion >= 40) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Управление курсами</h2>
              <p className="text-sm text-muted-foreground">Редактирование и мониторинг курсов</p>
            </div>
          </div>
          <Button variant="default" size="sm" iconName="Plus">
            Создать курс
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.key}
              onClick={() => setSelectedTab(tab?.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium nav-transition ${
                selectedTab === tab?.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <span>{tab?.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                selectedTab === tab?.key
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {filteredCourses?.map((course) => {
            const statusConfig = getStatusConfig(course?.status);

            return (
              <div
                key={course?.id}
                className="border border-border rounded-lg p-4 hover:shadow-sm nav-transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name="BookOpen" size={20} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{course?.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.color}`}>
                          {statusConfig?.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={14} />
                          <span>{course?.students} студентов</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{course?.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="BookOpen" size={14} />
                          <span>{course?.modules} модулей</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="User" size={14} />
                          <span>{course?.instructor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => handleEditCourse(course?.id)}
                    >
                      Редактировать
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="BarChart3"
                      onClick={() => handleViewAnalytics(course?.id)}
                    >
                      Аналитика
                    </Button>
                  </div>
                </div>
                {/* Progress and Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Прогресс курса</span>
                      <span className="text-sm text-muted-foreground">{course?.completion}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(course?.completion)}`}
                        style={{ width: `${course?.completion}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-foreground">Модули</span>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span>{course?.progress?.completed} готово</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-warning rounded-full" />
                        <span>{course?.progress?.inProgress} в работе</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-muted rounded-full" />
                        <span>{course?.progress?.pending} ожидает</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium text-foreground">Рейтинг</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5]?.map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={14}
                            className={star <= Math.floor(course?.rating) ? 'text-warning' : 'text-muted'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{course?.rating}/5</span>
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Обновлен: {formatDate(course?.lastUpdated)}</span>
                    {course?.nextDeadline && (
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>Дедлайн: {formatDate(course?.nextDeadline)}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {course?.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Users"
                        onClick={() => handleManageStudents(course?.id)}
                      >
                        Студенты
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              Нет курсов в категории "{tabs?.find(t => t?.key === selectedTab)?.label}"
            </p>
            <Button variant="outline" size="sm" iconName="Plus">
              Создать первый курс
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;