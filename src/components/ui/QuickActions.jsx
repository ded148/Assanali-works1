import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActions = ({ userRole = 'student', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getQuickActions = (role, currentPath) => {
    const baseActions = {
      student: [
        {
          id: 'explore-courses',
          label: 'Найти курсы',
          icon: 'Search',
          action: () => navigate('/course-recommendations'),
          shortcut: 'Ctrl+K',
          primary: true
        },
        {
          id: 'view-progress',
          label: 'Мой прогресс',
          icon: 'TrendingUp',
          action: () => navigate('/student-dashboard'),
          shortcut: 'Ctrl+P'
        },
        {
          id: 'explore-graph',
          label: 'Исследовать граф',
          icon: 'Network',
          action: () => navigate('/knowledge-graph'),
          shortcut: 'Ctrl+G'
        }
      ],
      educator: [
        {
          id: 'create-course',
          label: 'Создать курс',
          icon: 'Plus',
          action: () => console.log('Create course'),
          shortcut: 'Ctrl+N',
          primary: true
        },
        {
          id: 'view-analytics',
          label: 'Аналитика',
          icon: 'BarChart3',
          action: () => navigate('/skills-analytics'),
          shortcut: 'Ctrl+A'
        },
        {
          id: 'manage-curriculum',
          label: 'Учебный план',
          icon: 'BookOpen',
          action: () => console.log('Manage curriculum'),
          shortcut: 'Ctrl+C'
        }
      ],
      admin: [
        {
          id: 'system-overview',
          label: 'Обзор системы',
          icon: 'Monitor',
          action: () => navigate('/educator-dashboard'),
          shortcut: 'Ctrl+O',
          primary: true
        },
        {
          id: 'user-management',
          label: 'Пользователи',
          icon: 'Users',
          action: () => console.log('User management'),
          shortcut: 'Ctrl+U'
        },
        {
          id: 'reports',
          label: 'Отчеты',
          icon: 'FileText',
          action: () => navigate('/skills-analytics'),
          shortcut: 'Ctrl+R'
        }
      ]
    };

    // Filter out actions that lead to current page
    return baseActions?.[role]?.filter(action => {
      if (action?.id === 'explore-courses' && currentPath === '/course-recommendations') return false;
      if (action?.id === 'view-progress' && currentPath === '/student-dashboard') return false;
      if (action?.id === 'explore-graph' && currentPath === '/knowledge-graph') return false;
      if (action?.id === 'view-analytics' && currentPath === '/skills-analytics') return false;
      if (action?.id === 'system-overview' && currentPath === '/educator-dashboard') return false;
      if (action?.id === 'reports' && currentPath === '/skills-analytics') return false;
      return true;
    }) || [];
  };

  const quickActions = getQuickActions(userRole, location?.pathname);
  const primaryAction = quickActions?.find(action => action?.primary);
  const secondaryActions = quickActions?.filter(action => !action?.primary);

  const handleActionClick = (action) => {
    action?.action();
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    // Handle keyboard shortcuts
    if (event?.ctrlKey || event?.metaKey) {
      const shortcutAction = quickActions?.find(action => 
        action?.shortcut && action?.shortcut?.toLowerCase()?.includes(event?.key?.toLowerCase())
      );
      if (shortcutAction) {
        event?.preventDefault();
        shortcutAction?.action();
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [quickActions]);

  if (quickActions?.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Primary Action Button */}
      {primaryAction && (
        <Button
          variant="default"
          size="sm"
          onClick={() => handleActionClick(primaryAction)}
          iconName={primaryAction?.icon}
          iconPosition="left"
          className="hidden sm:flex"
        >
          {primaryAction?.label}
        </Button>
      )}
      {/* Secondary Actions Dropdown */}
      {secondaryActions?.length > 0 && (
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            iconName="MoreHorizontal"
            className="p-2"
            aria-label="Дополнительные действия"
          />

          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal z-dropdown animate-slide-down">
              <div className="p-2">
                {primaryAction && (
                  <>
                    <button
                      onClick={() => handleActionClick(primaryAction)}
                      className="sm:hidden w-full flex items-center justify-between px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md nav-transition"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon name={primaryAction?.icon} size={16} />
                        <span>{primaryAction?.label}</span>
                      </div>
                      {primaryAction?.shortcut && (
                        <span className="text-xs text-muted-foreground">
                          {primaryAction?.shortcut}
                        </span>
                      )}
                    </button>
                    <hr className="sm:hidden my-2 border-border" />
                  </>
                )}
                
                {secondaryActions?.map((action) => (
                  <button
                    key={action?.id}
                    onClick={() => handleActionClick(action)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md nav-transition"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name={action?.icon} size={16} />
                      <span>{action?.label}</span>
                    </div>
                    {action?.shortcut && (
                      <span className="text-xs text-muted-foreground">
                        {action?.shortcut}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Mobile Primary Action */}
      {primaryAction && (
        <Button
          variant="default"
          size="sm"
          onClick={() => handleActionClick(primaryAction)}
          iconName={primaryAction?.icon}
          className="sm:hidden p-2"
          aria-label={primaryAction?.label}
        />
      )}
    </div>
  );
};

export default QuickActions;