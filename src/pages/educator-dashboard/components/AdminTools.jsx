import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdminTools = ({ className = '' }) => {
  const [selectedTool, setSelectedTool] = useState('reports');

  const tools = {
    reports: {
      title: 'Генерация отчетов',
      icon: 'FileText',
      description: 'Создание аналитических отчетов и экспорт данных'
    },
    cohorts: {
      title: 'Анализ когорт',
      icon: 'Users',
      description: 'Анализ групп студентов и их успеваемости'
    },
    integration: {
      title: 'Интеграции',
      icon: 'Link',
      description: 'Управление подключениями к LMS и внешним системам'
    },
    settings: {
      title: 'Настройки системы',
      icon: 'Settings',
      description: 'Конфигурация платформы и параметров обучения'
    }
  };

  const reportTemplates = [
    {
      id: 1,
      name: 'Отчет по трудоустройству',
      description: 'Статистика трудоустройства выпускников за период',
      type: 'employment',
      frequency: 'monthly',
      lastGenerated: '2024-09-20',
      format: ['PDF', 'Excel'],
      recipients: 3
    },
    {
      id: 2,
      name: 'Анализ эффективности курсов',
      description: 'Детальная аналитика по каждому курсу и программе',
      type: 'course_analytics',
      frequency: 'weekly',
      lastGenerated: '2024-09-22',
      format: ['PDF', 'PowerPoint'],
      recipients: 5
    },
    {
      id: 3,
      name: 'Рыночные тренды',
      description: 'Обзор изменений в требованиях рынка труда',
      type: 'market_trends',
      frequency: 'daily',
      lastGenerated: '2024-09-24',
      format: ['PDF', 'Email'],
      recipients: 8
    },
    {
      id: 4,
      name: 'Финансовая отчетность',
      description: 'Доходы и расходы по образовательным программам',
      type: 'financial',
      frequency: 'monthly',
      lastGenerated: '2024-09-15',
      format: ['Excel', 'PDF'],
      recipients: 2
    }
  ];

  const cohortAnalytics = [
    {
      id: 1,
      name: 'Веб-разработка 2024-1',
      students: 45,
      startDate: '2024-02-01',
      endDate: '2024-06-30',
      completion: 89,
      employment: 78,
      avgSalary: 85000,
      satisfaction: 4.2
    },
    {
      id: 2,
      name: 'Data Science 2024-1',
      students: 32,
      startDate: '2024-03-15',
      endDate: '2024-08-15',
      completion: 94,
      employment: 91,
      avgSalary: 105000,
      satisfaction: 4.6
    },
    {
      id: 3,
      name: 'Кибербезопасность 2024-1',
      students: 28,
      startDate: '2024-01-20',
      endDate: '2024-05-20',
      completion: 86,
      employment: 82,
      avgSalary: 95000,
      satisfaction: 4.3
    }
  ];

  const integrations = [
    {
      id: 1,
      name: 'Moodle LMS',
      type: 'lms',
      status: 'connected',
      lastSync: '2024-09-24 02:30',
      students: 1247,
      courses: 45,
      health: 'good'
    },
    {
      id: 2,
      name: 'HeadHunter API',
      type: 'job_market',
      status: 'connected',
      lastSync: '2024-09-24 03:15',
      vacancies: 15678,
      updates: 234,
      health: 'excellent'
    },
    {
      id: 3,
      name: 'Университетская система',
      type: 'university',
      status: 'warning',
      lastSync: '2024-09-23 18:45',
      students: 892,
      programs: 12,
      health: 'warning'
    },
    {
      id: 4,
      name: 'Система аналитики',
      type: 'analytics',
      status: 'error',
      lastSync: '2024-09-22 14:20',
      events: 0,
      errors: 3,
      health: 'error'
    }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      connected: {
        label: 'Подключено',
        color: 'bg-success text-success-foreground',
        icon: 'CheckCircle'
      },
      warning: {
        label: 'Предупреждение',
        color: 'bg-warning text-warning-foreground',
        icon: 'AlertTriangle'
      },
      error: {
        label: 'Ошибка',
        color: 'bg-error text-error-foreground',
        icon: 'XCircle'
      },
      disconnected: {
        label: 'Отключено',
        color: 'bg-muted text-muted-foreground',
        icon: 'Circle'
      }
    };
    return configs?.[status];
  };

  const handleGenerateReport = (reportId) => {
    console.log('Generating report:', reportId);
  };

  const handleViewCohort = (cohortId) => {
    console.log('Viewing cohort:', cohortId);
  };

  const handleTestIntegration = (integrationId) => {
    console.log('Testing integration:', integrationId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('ru-RU');
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleString('ru-RU');
  };

  return (
    <div className={`bg-card rounded-lg border border-border ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Административные инструменты</h2>
              <p className="text-sm text-muted-foreground">Управление системой и аналитика</p>
            </div>
          </div>
        </div>

        {/* Tool Selection */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(tools)?.map(([key, tool]) => (
            <button
              key={key}
              onClick={() => setSelectedTool(key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium nav-transition ${
                selectedTool === key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tool?.icon} size={16} />
              <span>{tool?.title}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {/* Reports Section */}
        {selectedTool === 'reports' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Шаблоны отчетов</h3>
              <Button variant="default" size="sm" iconName="Plus">
                Создать шаблон
              </Button>
            </div>
            <div className="space-y-4">
              {reportTemplates?.map((template) => (
                <div
                  key={template?.id}
                  className="border border-border rounded-lg p-4 hover:shadow-sm nav-transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{template?.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{template?.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Частота: {template?.frequency}</span>
                        <span>Последний: {formatDate(template?.lastGenerated)}</span>
                        <span>Получателей: {template?.recipients}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {template?.format?.map((format, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Настроить
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" iconName="Calendar">
                        Расписание
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Download"
                        onClick={() => handleGenerateReport(template?.id)}
                      >
                        Сгенерировать
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cohorts Section */}
        {selectedTool === 'cohorts' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Анализ когорт студентов</h3>
              <Button variant="outline" size="sm" iconName="Filter">
                Фильтры
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Когорта</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground">Студенты</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground">Завершение</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground">Трудоустройство</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground">Зарплата</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground">Оценка</th>
                    <th className="text-center py-3 px-4 font-medium text-foreground">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {cohortAnalytics?.map((cohort) => (
                    <tr key={cohort?.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-foreground">{cohort?.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(cohort?.startDate)} - {formatDate(cohort?.endDate)}
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4 text-foreground">{cohort?.students}</td>
                      <td className="text-center py-3 px-4">
                        <span className="text-success font-medium">{cohort?.completion}%</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-primary font-medium">{cohort?.employment}%</span>
                      </td>
                      <td className="text-center py-3 px-4 text-foreground">
                        {(cohort?.avgSalary / 1000)?.toFixed(0)}к ₽
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="flex items-center justify-center">
                          <Icon name="Star" size={14} className="text-warning mr-1" />
                          <span className="text-sm font-medium">{cohort?.satisfaction}</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Eye"
                          onClick={() => handleViewCohort(cohort?.id)}
                        >
                          Детали
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Integration Section */}
        {selectedTool === 'integration' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Интеграции системы</h3>
              <Button variant="default" size="sm" iconName="Plus">
                Добавить интеграцию
              </Button>
            </div>
            <div className="space-y-4">
              {integrations?.map((integration) => {
                const statusConfig = getStatusConfig(integration?.status);
                
                return (
                  <div
                    key={integration?.id}
                    className="border border-border rounded-lg p-4 hover:shadow-sm nav-transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Icon name="Link" size={20} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-foreground">{integration?.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.color}`}>
                              {statusConfig?.label}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Последняя синхронизация: {formatDateTime(integration?.lastSync)}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            {integration?.students && <span>Студенты: {integration?.students}</span>}
                            {integration?.courses && <span>Курсы: {integration?.courses}</span>}
                            {integration?.vacancies && <span>Вакансии: {integration?.vacancies}</span>}
                            {integration?.programs && <span>Программы: {integration?.programs}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <Button variant="ghost" size="sm" iconName="Settings">
                        Настроить
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="RefreshCw"
                          onClick={() => handleTestIntegration(integration?.id)}
                        >
                          Тест
                        </Button>
                        <Button variant="outline" size="sm" iconName="Activity">
                          Логи
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Settings Section */}
        {selectedTool === 'settings' && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Настройки системы</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">Общие настройки</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Автоматические обновления</span>
                      <Button variant="outline" size="sm">Включено</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Уведомления по email</span>
                      <Button variant="outline" size="sm">Настроить</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Резервное копирование</span>
                      <Button variant="outline" size="sm">Ежедневно</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">Безопасность</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Двухфакторная аутентификация</span>
                      <Button variant="outline" size="sm">Включить</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Аудит действий</span>
                      <Button variant="outline" size="sm">Активен</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Срок сессии</span>
                      <Button variant="outline" size="sm">8 часов</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTools;