import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const CoursePreviewModal = ({ course, isOpen, onClose, onEnroll }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !course) return null;

  const mockCurriculum = [
    {
      module: 'Модуль 1: Основы',
      duration: '2 недели',
      lessons: [
        'Введение в технологию',
        'Основные концепции',
        'Практическое задание 1'
      ]
    },
    {
      module: 'Модуль 2: Продвинутые темы',
      duration: '3 недели',
      lessons: [
        'Углубленное изучение',
        'Лучшие практики',
        'Проектная работа'
      ]
    },
    {
      module: 'Модуль 3: Практика',
      duration: '3 недели',
      lessons: [
        'Реальные кейсы',
        'Командная работа',
        'Финальный проект'
      ]
    }
  ];

  const mockInstructor = {
    name: 'Анна Петрова',
    title: 'Senior Full Stack Developer',
    company: 'Яндекс',
    experience: '8+ лет',
    rating: 4.9,
    studentsCount: 15420,
    bio: `Опытный разработчик с более чем 8-летним стажем в области веб-разработки. 
    Работала в крупных IT-компаниях, включая Яндекс и Mail.ru Group. 
    Специализируется на современных JavaScript-фреймворках и архитектуре приложений.`
  };

  const mockReviews = [
    {
      id: 1,
      author: 'Михаил К.',
      rating: 5,
      date: '15 сентября 2024',
      text: `Отличный курс! Очень структурированная подача материала. 
      Преподаватель объясняет сложные концепции простым языком. 
      Практические задания помогают закрепить теорию.`
    },
    {
      id: 2,
      author: 'Елена С.',
      rating: 4,
      date: '10 сентября 2024',
      text: `Хороший курс для начинающих. Много практики, что очень важно. 
      Единственный минус - хотелось бы больше примеров реальных проектов.`
    },
    {
      id: 3,
      author: 'Дмитрий В.',
      rating: 5,
      date: '5 сентября 2024',
      text: `Превосходный курс! После его прохождения смог найти работу 
      в IT-компании. Материал актуальный, преподаватель отвечает на все вопросы.`
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: 'Info' },
    { id: 'curriculum', label: 'Программа', icon: 'BookOpen' },
    { id: 'instructor', label: 'Преподаватель', icon: 'User' },
    { id: 'reviews', label: 'Отзывы', icon: 'MessageSquare' }
  ];

  const formatDuration = (duration) => {
    if (duration < 4) return `${duration} нед.`;
    if (duration < 16) return `${Math.round(duration / 4)} мес.`;
    return `${Math.round(duration / 52)} г.`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">{course?.title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="p-2"
            aria-label="Закрыть"
          />
        </div>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Tabs Navigation */}
          <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-border">
            <nav className="p-4">
              <div className="space-y-1">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg nav-transition ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">О курсе</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {course?.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">{formatDuration(course?.duration)}</p>
                      <p className="text-xs text-muted-foreground">Продолжительность</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">{course?.studentsCount?.toLocaleString('ru-RU')}</p>
                      <p className="text-xs text-muted-foreground">Студентов</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Icon name="Star" size={24} className="text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">{course?.rating}</p>
                      <p className="text-xs text-muted-foreground">Рейтинг</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Icon name="Award" size={24} className="text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">{course?.certificate ? 'Да' : 'Нет'}</p>
                      <p className="text-xs text-muted-foreground">Сертификат</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-foreground mb-3">Навыки, которые вы получите</h4>
                    <div className="flex flex-wrap gap-2">
                      {course?.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {course?.prerequisites && course?.prerequisites?.length > 0 && (
                    <div>
                      <h4 className="text-md font-medium text-foreground mb-3">Требования</h4>
                      <ul className="space-y-1">
                        {course?.prerequisites?.map((req, index) => (
                          <li key={index} className="flex items-center space-x-2 text-muted-foreground">
                            <Icon name="Check" size={16} className="text-success" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Программа курса</h3>
                  {mockCurriculum?.map((module, index) => (
                    <div key={index} className="border border-border rounded-lg">
                      <div className="p-4 bg-muted/30">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">{module.module}</h4>
                          <span className="text-sm text-muted-foreground">{module.duration}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          {module.lessons?.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-center space-x-2 text-muted-foreground">
                              <Icon name="Play" size={14} className="text-primary" />
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Преподаватель</h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={24} color="white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-foreground">{mockInstructor?.name}</h4>
                      <p className="text-muted-foreground">{mockInstructor?.title}</p>
                      <p className="text-sm text-muted-foreground">{mockInstructor?.company}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(mockInstructor?.rating)}
                          <span className="text-sm text-muted-foreground ml-1">{mockInstructor?.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {mockInstructor?.studentsCount?.toLocaleString('ru-RU')} студентов
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-2">О преподавателе</h5>
                    <p className="text-muted-foreground leading-relaxed">{mockInstructor?.bio}</p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Отзывы студентов</h3>
                  <div className="space-y-4">
                    {mockReviews?.map((review) => (
                      <div key={review?.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{review?.author}</span>
                            <div className="flex items-center space-x-1">
                              {renderStars(review?.rating)}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review?.date}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{review?.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              {course?.price === 0 ? (
                <span className="text-lg font-semibold text-success">Бесплатно</span>
              ) : (
                <span className="text-lg font-semibold text-foreground">
                  {course?.price?.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Закрыть
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  onEnroll(course?.id);
                  onClose();
                }}
                iconName="Play"
                iconPosition="left"
              >
                Записаться на курс
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewModal;