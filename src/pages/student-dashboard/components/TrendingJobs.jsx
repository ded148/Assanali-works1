import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingJobs = ({ className = '' }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const jobs = [
    {
      id: 1,
      title: "Frontend React разработчик",
      company: "Яндекс",
      location: "Москва",
      type: "Полная занятость",
      experience: "1-3 года",
      salary: {
        min: 120000,
        max: 200000,
        currency: "₽"
      },
      skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
      matchScore: 92,
      postedDate: "2024-09-20",
      deadline: "2024-10-20",
      description: "Разработка пользовательских интерфейсов для веб-приложений с использованием современных технологий",
      benefits: ["ДМС", "Обучение", "Гибкий график"],
      remote: true,
      logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      title: "Python разработчик",
      company: "Сбер",
      location: "Санкт-Петербург",
      type: "Полная занятость",
      experience: "2-4 года",
      salary: {
        min: 150000,
        max: 250000,
        currency: "₽"
      },
      skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
      matchScore: 88,
      postedDate: "2024-09-19",
      deadline: "2024-10-15",
      description: "Разработка backend сервисов для банковских приложений",
      benefits: ["ДМС", "Корпоративное обучение", "Бонусы"],
      remote: false,
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Mail.ru Group",
      location: "Москва",
      type: "Полная занятость",
      experience: "1-2 года",
      salary: {
        min: 130000,
        max: 220000,
        currency: "₽"
      },
      skills: ["Python", "Pandas", "Scikit-learn", "SQL", "Jupyter"],
      matchScore: 75,
      postedDate: "2024-09-18",
      deadline: "2024-10-25",
      description: "Анализ пользовательских данных и создание ML моделей для рекомендательных систем",
      benefits: ["ДМС", "Спорт", "Питание"],
      remote: true,
      logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      title: "DevOps инженер",
      company: "Тинькофф",
      location: "Москва",
      type: "Полная занятость",
      experience: "2-5 лет",
      salary: {
        min: 180000,
        max: 300000,
        currency: "₽"
      },
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
      matchScore: 65,
      postedDate: "2024-09-17",
      deadline: "2024-10-30",
      description: "Автоматизация процессов разработки и развертывания приложений",
      benefits: ["ДМС", "Высокая ЗП", "Обучение"],
      remote: true,
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop"
    },
    {
      id: 5,
      title: "Mobile разработчик (React Native)",
      company: "Ozon",
      location: "Москва",
      type: "Полная занятость",
      experience: "1-3 года",
      salary: {
        min: 140000,
        max: 230000,
        currency: "₽"
      },
      skills: ["React Native", "JavaScript", "iOS", "Android", "Redux"],
      matchScore: 82,
      postedDate: "2024-09-16",
      deadline: "2024-10-18",
      description: "Разработка мобильных приложений для iOS и Android платформ",
      benefits: ["ДМС", "Скидки", "Обучение"],
      remote: false,
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop"
    },
    {
      id: 6,
      title: "UI/UX дизайнер",
      company: "Wildberries",
      location: "Москва",
      type: "Полная занятость",
      experience: "1-2 года",
      salary: {
        min: 100000,
        max: 180000,
        currency: "₽"
      },
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
      matchScore: 70,
      postedDate: "2024-09-15",
      deadline: "2024-10-22",
      description: "Проектирование пользовательских интерфейсов для e-commerce платформы",
      benefits: ["ДМС", "Творческая среда", "Гибкий график"],
      remote: true,
      logo: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=100&h=100&fit=crop"
    }
  ];

  const filters = [
    { id: 'all', label: 'Все вакансии', count: jobs?.length },
    { id: 'remote', label: 'Удаленная работа', count: jobs?.filter(job => job?.remote)?.length },
    { id: 'high-match', label: 'Высокое соответствие', count: jobs?.filter(job => job?.matchScore >= 80)?.length },
    { id: 'junior', label: 'Junior уровень', count: jobs?.filter(job => job?.experience?.includes('1-'))?.length }
  ];

  const getFilteredJobs = () => {
    let filtered = [...jobs];

    switch (selectedFilter) {
      case 'remote':
        filtered = filtered?.filter(job => job?.remote);
        break;
      case 'high-match':
        filtered = filtered?.filter(job => job?.matchScore >= 80);
        break;
      case 'junior':
        filtered = filtered?.filter(job => job?.experience?.includes('1-'));
        break;
      default:
        break;
    }

    // Sorting
    switch (sortBy) {
      case 'salary':
        filtered?.sort((a, b) => b?.salary?.max - a?.salary?.max);
        break;
      case 'date':
        filtered?.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'relevance':
      default:
        filtered?.sort((a, b) => b?.matchScore - a?.matchScore);
        break;
    }

    return filtered;
  };

  const formatSalary = (salary) => {
    const min = (salary?.min / 1000)?.toFixed(0);
    const max = (salary?.max / 1000)?.toFixed(0);
    return `${min}—${max}k ${salary?.currency}`;
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 80) return 'text-warning bg-warning/10';
    if (score >= 70) return 'text-primary bg-primary/10';
    return 'text-muted-foreground bg-muted';
  };

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'вчера';
    if (diffDays <= 7) return `${diffDays} дн. назад`;
    return date?.toLocaleDateString('ru-RU');
  };

  const filteredJobs = getFilteredJobs();

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Актуальные вакансии</h2>
          <p className="text-sm text-muted-foreground">
            Подходящие позиции на основе ваших навыков и карьерных целей
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="relevance">По соответствию</option>
            <option value="salary">По зарплате</option>
            <option value="date">По дате</option>
          </select>
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={16} className="mr-2" />
            Фильтры
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => setSelectedFilter(filter?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium nav-transition ${
              selectedFilter === filter?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <span>{filter?.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedFilter === filter?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-background text-muted-foreground'
            }`}>
              {filter?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs?.map((job) => (
          <div
            key={job?.id}
            className="bg-background border border-border rounded-lg p-4 hover:shadow-md nav-transition"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start space-x-4 mb-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={job?.logo}
                      alt={job?.company}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-semibold text-foreground text-lg">{job?.title}</h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job?.matchScore)} mt-2 sm:mt-0`}>
                        {job?.matchScore}% соответствие
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Building" size={14} />
                        <span>{job?.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span>{job?.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{job?.experience}</span>
                      </div>
                      {job?.remote && (
                        <div className="flex items-center space-x-1 text-primary">
                          <Icon name="Wifi" size={14} />
                          <span>Удаленно</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {job?.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-3 sm:mb-0">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="DollarSign" size={16} className="text-success" />
                        <span className="font-semibold text-foreground">{formatSalary(job?.salary)}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Опубликовано {getDaysAgo(job?.postedDate)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job?.skills?.slice(0, 4)?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {job?.skills?.length > 4 && (
                        <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md">
                          +{job?.skills?.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Bookmark" size={16} />
                    </Button>
                    <Button size="sm">
                      Откликнуться
                    </Button>
                  </div>
                </div>

                {job?.benefits && job?.benefits?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <Icon name="Gift" size={14} className="text-muted-foreground" />
                      <div className="flex flex-wrap gap-2">
                        {job?.benefits?.map((benefit, index) => (
                          <span
                            key={index}
                            className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredJobs?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Вакансии не найдены</h3>
          <p className="text-muted-foreground mb-4">
            Попробуйте изменить фильтры или обновить свои навыки
          </p>
          <Button variant="outline">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Сбросить фильтры
          </Button>
        </div>
      )}
      {/* Load More */}
      {filteredJobs?.length > 0 && (
        <div className="text-center mt-6">
          <Button variant="outline">
            Показать больше вакансий
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrendingJobs;