import React from 'react';
import Icon from '../../../components/AppIcon';

const GraphStats = ({ 
  data, 
  filters, 
  searchQuery,
  className = '' 
}) => {
  // Mock data for demonstration
  const mockData = {
    nodes: [
      { id: 'python', type: 'skill', category: 'programming', demand: 95, salary: 120000 },
      { id: 'javascript', type: 'skill', category: 'programming', demand: 90, salary: 110000 },
      { id: 'react', type: 'skill', category: 'frontend', demand: 85, salary: 115000 },
      { id: 'machine-learning', type: 'skill', category: 'ai', demand: 88, salary: 140000 },
      { id: 'python-basics', type: 'course', category: 'programming', students: 1250 },
      { id: 'react-advanced', type: 'course', category: 'frontend', students: 890 },
      { id: 'frontend-dev', type: 'job', category: 'development', salary: 110000, openings: 245 },
      { id: 'data-scientist', type: 'job', category: 'analytics', salary: 135000, openings: 89 }
    ],
    links: []
  };

  const currentData = data || mockData;

  const filterData = (data, filters, searchQuery) => {
    let filteredNodes = data?.nodes;
    
    if (filters?.category && filters?.category !== 'all') {
      filteredNodes = filteredNodes?.filter(node => node?.category === filters?.category);
    }
    
    if (searchQuery) {
      filteredNodes = filteredNodes?.filter(node =>
        node?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        node?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }
    
    return { nodes: filteredNodes, links: data?.links };
  };

  const filteredData = filterData(currentData, filters, searchQuery);

  const getStatsByType = (type) => {
    return filteredData?.nodes?.filter(node => node?.type === type);
  };

  const skillNodes = getStatsByType('skill');
  const courseNodes = getStatsByType('course');
  const jobNodes = getStatsByType('job');
  const outcomeNodes = getStatsByType('outcome');

  const getAverageSalary = (nodes) => {
    const salaries = nodes?.filter(node => node?.salary)?.map(node => node?.salary);
    if (salaries?.length === 0) return 0;
    return Math.round(salaries?.reduce((sum, salary) => sum + salary, 0) / salaries?.length);
  };

  const getHighDemandSkills = () => {
    return skillNodes?.filter(skill => skill?.demand && skill?.demand >= 80)?.length;
  };

  const getTotalJobOpenings = () => {
    return jobNodes?.reduce((total, job) => total + (job?.openings || 0), 0);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('ru-RU')?.format(num);
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(salary);
  };

  const stats = [
    {
      id: 'skills',
      label: 'Навыки',
      value: skillNodes?.length,
      icon: 'Zap',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: `${getHighDemandSkills()} с высоким спросом`
    },
    {
      id: 'courses',
      label: 'Курсы',
      value: courseNodes?.length,
      icon: 'BookOpen',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: `${courseNodes?.reduce((sum, course) => sum + (course?.students || 0), 0)} студентов`
    },
    {
      id: 'jobs',
      label: 'Вакансии',
      value: jobNodes?.length,
      icon: 'Briefcase',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: `${formatNumber(getTotalJobOpenings())} открытых позиций`
    },
    {
      id: 'outcomes',
      label: 'Результаты',
      value: outcomeNodes?.length,
      icon: 'Target',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'Образовательные программы'
    }
  ];

  const insights = [
    {
      id: 'avg-salary',
      label: 'Средняя зарплата',
      value: formatSalary(getAverageSalary([...skillNodes, ...jobNodes])),
      trend: '+12%',
      trendUp: true,
      icon: 'DollarSign'
    },
    {
      id: 'high-demand',
      label: 'Навыки в тренде',
      value: getHighDemandSkills(),
      trend: '+3',
      trendUp: true,
      icon: 'TrendingUp'
    },
    {
      id: 'connections',
      label: 'Связей в графе',
      value: currentData?.links?.length || 0,
      trend: 'Стабильно',
      trendUp: null,
      icon: 'Network'
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat) => (
          <div key={stat?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
                <p className="text-sm font-medium text-foreground">{stat?.label}</p>
                <p className="text-xs text-muted-foreground truncate">{stat?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Insights */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Аналитика</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights?.map((insight) => (
            <div key={insight?.id} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={insight?.icon} size={16} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-foreground">{insight?.value}</span>
                  {insight?.trendUp !== null && (
                    <span className={`text-xs px-1 py-0.5 rounded ${
                      insight?.trendUp 
                        ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                    }`}>
                      {insight?.trend}
                    </span>
                  )}
                  {insight?.trendUp === null && (
                    <span className="text-xs text-muted-foreground">{insight?.trend}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{insight?.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Filter Summary */}
      {(filters?.category !== 'all' || searchQuery) && (
        <div className="bg-muted/50 border border-border rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              Показано {filteredData?.nodes?.length} из {currentData?.nodes?.length} элементов
            </span>
          </div>
          {searchQuery && (
            <p className="text-xs text-muted-foreground mt-1">
              Поиск: "{searchQuery}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GraphStats;