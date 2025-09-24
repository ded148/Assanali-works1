import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedCourses = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: "Машинное обучение для начинающих",
      provider: "МГУ",
      duration: "8 недель",
      level: "Начальный",
      marketRelevance: 95,
      skills: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      description: "Изучите основы машинного обучения с практическими примерами",
      rating: 4.8,
      studentsCount: 2847,
      price: "Бесплатно",
      category: "ai",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Веб-разработка на React",
      provider: "МФТИ",
      duration: "12 недель",
      level: "Средний",
      marketRelevance: 88,
      skills: ["React", "JavaScript", "HTML", "CSS"],
      description: "Создавайте современные веб-приложения с использованием React",
      rating: 4.7,
      studentsCount: 1923,
      price: "₽15,000",
      category: "web",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Анализ данных в Python",
      provider: "ВШЭ",
      duration: "6 недель",
      level: "Начальный",
      marketRelevance: 92,
      skills: ["Python", "Matplotlib", "Seaborn", "Jupyter"],
      description: "Освойте анализ и визуализацию данных для принятия решений",
      rating: 4.9,
      studentsCount: 3156,
      price: "₽8,500",
      category: "data",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Кибербезопасность: Основы",
      provider: "ИТМО",
      duration: "10 недель",
      level: "Средний",
      marketRelevance: 85,
      skills: ["Network Security", "Cryptography", "Ethical Hacking"],
      description: "Изучите принципы защиты информационных систем",
      rating: 4.6,
      studentsCount: 1456,
      price: "₽12,000",
      category: "security",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "DevOps и облачные технологии",
      provider: "СПбГУ",
      duration: "14 недель",
      level: "Продвинутый",
      marketRelevance: 90,
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      description: "Автоматизация развертывания и управления приложениями",
      rating: 4.8,
      studentsCount: 987,
      price: "₽18,000",
      category: "devops",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "UX/UI Дизайн",
      provider: "Skillbox",
      duration: "16 недель",
      level: "Начальный",
      marketRelevance: 82,
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      description: "Создавайте удобные и красивые пользовательские интерфейсы",
      rating: 4.5,
      studentsCount: 2341,
      price: "₽22,000",
      category: "design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop"
    }
  ];

  const categories = [
    { id: 'all', label: 'Все курсы', icon: 'BookOpen' },
    { id: 'ai', label: 'ИИ и ML', icon: 'Brain' },
    { id: 'web', label: 'Веб-разработка', icon: 'Globe' },
    { id: 'data', label: 'Анализ данных', icon: 'BarChart3' },
    { id: 'security', label: 'Безопасность', icon: 'Shield' },
    { id: 'devops', label: 'DevOps', icon: 'Server' },
    { id: 'design', label: 'Дизайн', icon: 'Palette' }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses?.filter(course => course?.category === selectedCategory);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Начальный':
        return 'bg-success/10 text-success';
      case 'Средний':
        return 'bg-warning/10 text-warning';
      case 'Продвинутый':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRelevanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Рекомендованные курсы</h2>
          <p className="text-sm text-muted-foreground">
            Персонализированные рекомендации на основе ваших целей и рыночных трендов
          </p>
        </div>
        <Button variant="outline" size="sm" className="mt-4 sm:mt-0">
          <Icon name="Settings" size={16} className="mr-2" />
          Настроить
        </Button>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium nav-transition ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={category?.icon} size={14} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses?.map((course) => (
          <div
            key={course?.id}
            className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg nav-transition group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={course?.image}
                alt={course?.title}
                className="w-full h-full object-cover group-hover:scale-105 nav-transition"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              <div className="absolute top-3 right-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course?.level)}`}>
                  {course?.level}
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <div className="bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-foreground">
                  {course?.price}
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{course?.provider}</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="text-xs text-muted-foreground">{course?.rating}</span>
                </div>
              </div>

              <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                {course?.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {course?.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>{course?.duration}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Users" size={12} />
                  <span>{course?.studentsCount?.toLocaleString('ru-RU')}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Актуальность</span>
                  <span className={`text-xs font-medium ${getRelevanceColor(course?.marketRelevance)}`}>
                    {course?.marketRelevance}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      course?.marketRelevance >= 90 ? 'bg-success' :
                      course?.marketRelevance >= 80 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${course?.marketRelevance}%` }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Навыки:</p>
                <div className="flex flex-wrap gap-1">
                  {course?.skills?.slice(0, 3)?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {course?.skills?.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md">
                      +{course?.skills?.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  Записаться
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="BookmarkPlus" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredCourses?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Курсы не найдены</h3>
          <p className="text-muted-foreground">
            Попробуйте выбрать другую категорию или сбросить фильтры
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendedCourses;