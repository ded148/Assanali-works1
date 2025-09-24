import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickActions from '../../components/ui/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import RecommendationFilters from './components/RecommendationFilters';
import CourseCard from './components/CourseCard';
import RecommendationExplanation from './components/RecommendationExplanation';
import CoursePreviewModal from './components/CoursePreviewModal';
import AlgorithmConfigModal from './components/AlgorithmConfigModal';
import RecommendationStats from './components/RecommendationStats';

const CourseRecommendations = () => {
  const navigate = useNavigate();
  const [userRole] = useState('student');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    careerPath: 'all',
    skillLevel: 'all',
    duration: 'all',
    certification: 'all',
    provider: 'all',
    freeOnly: false,
    withCertificate: false,
    russianLanguage: false
  });

  const mockCourses = [
    {
      id: 1,
      title: 'Полный курс по React.js и современной веб-разработке',
      description: `Изучите React.js с нуля до продвинутого уровня. Курс включает современные подходы к разработке, 
      работу с хуками, контекстом, Redux Toolkit и многое другое. Создайте несколько реальных проектов.`,
      provider: 'Skillbox',
      difficulty: 'intermediate',
      duration: 12,
      price: 24990,
      rating: 4.8,
      studentsCount: 15420,
      relevanceScore: 92,
      certificate: true,
      skills: ['React.js', 'JavaScript', 'HTML/CSS', 'Redux', 'TypeScript', 'Git'],
      prerequisites: ['Базовые знания JavaScript', 'Понимание HTML/CSS'],
      isBookmarked: false
    },
    {
      id: 2,
      title: 'Python для анализа данных и машинного обучения',
      description: `Комплексный курс по Python для Data Science. Изучите pandas, numpy, matplotlib, scikit-learn. 
      Работайте с реальными датасетами и создавайте модели машинного обучения.`,
      provider: 'Coursera',
      difficulty: 'beginner',
      duration: 16,
      price: 0,
      rating: 4.7,
      studentsCount: 28350,
      relevanceScore: 88,
      certificate: true,
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Jupyter'],
      prerequisites: [],
      isBookmarked: true
    },
    {
      id: 3,
      title: 'DevOps инженер: от основ до продакшена',
      description: `Станьте DevOps инженером с нуля. Изучите Docker, Kubernetes, CI/CD, мониторинг, 
      облачные платформы. Получите практический опыт работы с реальными проектами.`,
      provider: 'Нетология',
      difficulty: 'advanced',
      duration: 24,
      price: 89990,
      rating: 4.9,
      studentsCount: 8920,
      relevanceScore: 85,
      certificate: true,
      skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform', 'Monitoring'],
      prerequisites: ['Опыт работы с Linux', 'Базовые знания сетей'],
      isBookmarked: false
    },
    {
      id: 4,
      title: 'UI/UX дизайн: создание пользовательских интерфейсов',
      description: `Изучите принципы UI/UX дизайна, работу с Figma, создание прототипов, 
      пользовательское тестирование. Создайте портфолио из реальных проектов.`,
      provider: 'GeekBrains',
      difficulty: 'beginner',
      duration: 8,
      price: 19990,
      rating: 4.6,
      studentsCount: 12680,
      relevanceScore: 82,
      certificate: true,
      skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'Usability Testing'],
      prerequisites: [],
      isBookmarked: false
    },
    {
      id: 5,
      title: 'Мобильная разработка на React Native',
      description: `Создавайте кроссплатформенные мобильные приложения с React Native. 
      Изучите навигацию, работу с API, публикацию в App Store и Google Play.`,
      provider: 'Udemy',
      difficulty: 'intermediate',
      duration: 10,
      price: 7990,
      rating: 4.5,
      studentsCount: 9450,
      relevanceScore: 79,
      certificate: false,
      skills: ['React Native', 'JavaScript', 'Mobile Development', 'API Integration', 'Redux'],
      prerequisites: ['Знание React.js', 'Базовые знания JavaScript'],
      isBookmarked: false
    },
    {
      id: 6,
      title: 'Кибербезопасность: защита информационных систем',
      description: `Комплексный курс по информационной безопасности. Изучите методы защиты, 
      анализ уязвимостей, этичный хакинг, соответствие стандартам безопасности.`,
      provider: 'Stepik',
      difficulty: 'advanced',
      duration: 20,
      price: 0,
      rating: 4.8,
      studentsCount: 6780,
      relevanceScore: 76,
      certificate: true,
      skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Incident Response', 'Compliance'],
      prerequisites: ['Знание сетевых технологий', 'Опыт работы с Linux'],
      isBookmarked: true
    }
  ];

  const [courses, setCourses] = useState(mockCourses);
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);

  const sortOptions = [
    { value: 'relevance', label: 'По релевантности' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'price-low', label: 'По цене (возрастание)' },
    { value: 'price-high', label: 'По цене (убывание)' },
    { value: 'duration', label: 'По продолжительности' },
    { value: 'popularity', label: 'По популярности' }
  ];

  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, searchQuery, sortBy, courses]);

  const applyFiltersAndSort = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...courses];

      // Apply search filter
      if (searchQuery?.trim()) {
        filtered = filtered?.filter(course =>
          course?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          course?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          course?.skills?.some(skill => skill?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
        );
      }

      // Apply filters
      if (filters?.careerPath && filters?.careerPath !== 'all') {
        // Mock filtering by career path
        filtered = filtered?.filter(course => {
          const pathSkills = {
            'web-development': ['React.js', 'JavaScript', 'HTML/CSS'],
            'data-science': ['Python', 'Pandas', 'NumPy'],
            'mobile-development': ['React Native', 'Mobile Development'],
            'devops': ['Docker', 'Kubernetes', 'AWS'],
            'ui-ux': ['Figma', 'Prototyping', 'Design Systems'],
            'cybersecurity': ['Network Security', 'Penetration Testing']
          };
          return course?.skills?.some(skill => 
            pathSkills?.[filters?.careerPath]?.includes(skill)
          );
        });
      }

      if (filters?.skillLevel && filters?.skillLevel !== 'all') {
        filtered = filtered?.filter(course => course?.difficulty === filters?.skillLevel);
      }

      if (filters?.duration && filters?.duration !== 'all') {
        filtered = filtered?.filter(course => {
          switch (filters?.duration) {
            case 'short': return course?.duration <= 4;
            case 'medium': return course?.duration > 4 && course?.duration <= 12;
            case 'long': return course?.duration > 12 && course?.duration <= 24;
            case 'extended': return course?.duration > 24;
            default: return true;
          }
        });
      }

      if (filters?.freeOnly) {
        filtered = filtered?.filter(course => course?.price === 0);
      }

      if (filters?.withCertificate) {
        filtered = filtered?.filter(course => course?.certificate);
      }

      // Apply sorting
      filtered?.sort((a, b) => {
        switch (sortBy) {
          case 'relevance':
            return b?.relevanceScore - a?.relevanceScore;
          case 'rating':
            return b?.rating - a?.rating;
          case 'price-low':
            return a?.price - b?.price;
          case 'price-high':
            return b?.price - a?.price;
          case 'duration':
            return a?.duration - b?.duration;
          case 'popularity':
            return b?.studentsCount - a?.studentsCount;
          default:
            return 0;
        }
      });

      setFilteredCourses(filtered);
      setIsLoading(false);
    }, 500);
  };

  const handleEnroll = (courseId) => {
    console.log('Enrolling in course:', courseId);
    // Mock enrollment logic
    alert('Перенаправление на страницу записи на курс...');
  };

  const handleBookmark = (courseId, isBookmarked) => {
    setCourses(prev =>
      prev?.map(course =>
        course?.id === courseId ? { ...course, isBookmarked } : course
      )
    );
  };

  const handlePreview = (courseId) => {
    const course = courses?.find(c => c?.id === courseId);
    setSelectedCourse(course);
    setIsPreviewOpen(true);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFiltersReset = () => {
    setFilters({
      careerPath: 'all',
      skillLevel: 'all',
      duration: 'all',
      certification: 'all',
      provider: 'all',
      freeOnly: false,
      withCertificate: false,
      russianLanguage: false
    });
  };

  const handleConfigureAlgorithm = () => {
    setIsConfigOpen(true);
  };

  const handleSaveAlgorithmConfig = (config) => {
    console.log('Saving algorithm config:', config);
    // Mock save logic
    alert('Настройки алгоритма сохранены!');
  };

  const getStatsData = () => {
    return {
      totalRecommendations: filteredCourses?.length,
      highRelevance: filteredCourses?.filter(c => c?.relevanceScore >= 80)?.length,
      mediumRelevance: filteredCourses?.filter(c => c?.relevanceScore >= 60 && c?.relevanceScore < 80)?.length,
      lowRelevance: filteredCourses?.filter(c => c?.relevanceScore < 60)?.length,
      averageRelevance: Math.round(
        filteredCourses?.reduce((sum, c) => sum + c?.relevanceScore, 0) / filteredCourses?.length
      ),
      freeCoursesCount: filteredCourses?.filter(c => c?.price === 0)?.length,
      paidCoursesCount: filteredCourses?.filter(c => c?.price > 0)?.length,
      averagePrice: Math.round(
        filteredCourses?.filter(c => c?.price > 0)?.reduce((sum, c) => sum + c?.price, 0) / 
        filteredCourses?.filter(c => c?.price > 0)?.length
      ),
      averageDuration: Math.round(
        filteredCourses?.reduce((sum, c) => sum + c?.duration, 0) / filteredCourses?.length
      ),
      skillsCovered: [...new Set(filteredCourses.flatMap(c => c.skills))]?.length
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} />
      <main className="pt-nav">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <NavigationBreadcrumbs className="mb-4" />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Рекомендации курсов
                </h1>
                <p className="text-muted-foreground">
                  Персонализированные рекомендации на основе ваших целей и анализа рынка труда
                </p>
              </div>
              <QuickActions userRole={userRole} />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters and Stats */}
            <div className="xl:col-span-1 space-y-6">
              <RecommendationFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleFiltersReset}
              />
              <RecommendationStats stats={getStatsData()} />
            </div>

            {/* Main Content */}
            <div className="xl:col-span-2 space-y-6">
              {/* Search and Sort Controls */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="search"
                      placeholder="Поиск курсов по названию, описанию или навыкам..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Select
                      options={sortOptions}
                      value={sortBy}
                      onChange={setSortBy}
                      className="w-48"
                    />
                    <div className="flex items-center space-x-1 border border-border rounded-lg p-1">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        iconName="Grid3X3"
                        className="p-2"
                        aria-label="Сетка"
                      />
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        iconName="List"
                        className="p-2"
                        aria-label="Список"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-semibold text-foreground">
                    Найдено курсов: {filteredCourses?.length}
                  </h2>
                  {isLoading && (
                    <Icon name="Loader2" size={16} className="text-primary animate-spin" />
                  )}
                </div>
                {filteredCourses?.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Средняя релевантность: {Math.round(
                      filteredCourses?.reduce((sum, c) => sum + c?.relevanceScore, 0) / filteredCourses?.length
                    )}%
                  </div>
                )}
              </div>

              {/* Course List */}
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3]?.map((i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-muted rounded w-full mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : filteredCourses?.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Курсы не найдены
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Попробуйте изменить параметры поиска или фильтры
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleFiltersReset}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ? 'grid-cols-1' : 'grid-cols-1'
                }`}>
                  {filteredCourses?.map((course) => (
                    <CourseCard
                      key={course?.id}
                      course={course}
                      onEnroll={handleEnroll}
                      onBookmark={handleBookmark}
                      onPreview={handlePreview}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar - Explanation */}
            <div className="xl:col-span-1">
              <RecommendationExplanation
                explanation={{
                  title: "Как работают рекомендации",
                  factors: [
                    "Ваши цели и интересы",
                    "Анализ рынка труда",
                    "Рейтинги курсов",
                    "Отзывы студентов"
                  ],
                  description: "Алгоритм учитывает ваш профиль, актуальные требования работодателей и качество курсов для создания персонализированных рекомендаций."
                }}
                onConfigureAlgorithm={handleConfigureAlgorithm}
                className="sticky top-nav-offset"
              />
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <CoursePreviewModal
        course={selectedCourse}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onEnroll={handleEnroll}
      />
      <AlgorithmConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onSave={handleSaveAlgorithmConfig}
      />
    </div>
  );
};

export default CourseRecommendations;