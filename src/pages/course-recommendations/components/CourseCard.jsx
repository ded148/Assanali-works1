import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const CourseCard = ({ course, onEnroll, onBookmark, onPreview, className = '' }) => {
  const [isBookmarked, setIsBookmarked] = useState(course?.isBookmarked || false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(course?.id, !isBookmarked);
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-success/10 text-success border-success/20';
      case 'intermediate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getDifficultyLabel = (level) => {
    const labels = {
      beginner: 'Начинающий',
      intermediate: 'Средний',
      advanced: 'Продвинутый',
      expert: 'Эксперт'
    };
    return labels?.[level] || level;
  };

  const formatDuration = (duration) => {
    if (duration < 4) return `${duration} нед.`;
    if (duration < 16) return `${Math.round(duration / 4)} мес.`;
    return `${Math.round(duration / 52)} г.`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg hover:shadow-md nav-transition ${className}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(course?.difficulty)}`}>
                {getDifficultyLabel(course?.difficulty)}
              </span>
              <span className="text-xs text-muted-foreground">
                {course?.provider}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
              {course?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {course?.description}
            </p>
          </div>
          <button
            onClick={handleBookmark}
            className="p-2 text-muted-foreground hover:text-foreground nav-transition"
            aria-label={isBookmarked ? 'Убрать из закладок' : 'Добавить в закладки'}
          >
            <Icon 
              name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
              size={20} 
              className={isBookmarked ? 'text-primary' : ''} 
            />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>{formatDuration(course?.duration)}</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Users" size={14} />
                <span>{course?.studentsCount?.toLocaleString('ru-RU')}</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Star" size={14} />
                <span>{course?.rating}</span>
              </div>
            </div>
            <div className="text-right">
              {course?.price === 0 ? (
                <span className="text-success font-medium">Бесплатно</span>
              ) : (
                <span className="text-foreground font-medium">
                  {course?.price?.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">Релевантность:</span>
              <div className="flex items-center space-x-1">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${course?.relevanceScore}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-primary">
                  {course?.relevanceScore}%
                </span>
              </div>
            </div>
            {course?.certificate && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="Award" size={14} />
                <span>Сертификат</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-xs font-medium text-muted-foreground mb-2">Навыки:</h4>
          <div className="flex flex-wrap gap-1">
            {course?.skills?.slice(0, 4)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
              >
                {skill}
              </span>
            ))}
            {course?.skills?.length > 4 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{course?.skills?.length - 4} еще
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onEnroll(course?.id)}
            iconName="Play"
            iconPosition="left"
            className="flex-1"
          >
            Записаться
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(course?.id)}
            iconName="Eye"
            className="px-3"
            aria-label="Предварительный просмотр"
          />
        </div>

        {course?.prerequisites && course?.prerequisites?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="AlertCircle" size={12} />
              <span>Требования: {course?.prerequisites?.join(', ')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;