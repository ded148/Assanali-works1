import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeLabels = {
    '/': 'Главная',
    '/student-dashboard': 'Панель студента',
    '/educator-dashboard': 'Панель преподавателя',
    '/knowledge-graph': 'Граф знаний',
    '/course-recommendations': 'Рекомендации курсов',
    '/skills-analytics': 'Аналитика навыков',
    '/login': 'Вход в систему'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Главная', path: '/' }];

    let currentPath = '';
    pathSegments?.forEach(segment => {
      currentPath += `/${segment}`;
      const label = routeLabels?.[currentPath] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      breadcrumbs?.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path) => {
    if (path !== location?.pathname) {
      navigate(path);
    }
  };

  if (location?.pathname === '/login' || breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={breadcrumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-2" 
              />
            )}
            {index === breadcrumbs?.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {breadcrumb?.label}
              </span>
            ) : (
              <button
                onClick={() => handleBreadcrumbClick(breadcrumb?.path)}
                className="text-muted-foreground hover:text-foreground nav-transition hover:underline"
              >
                {breadcrumb?.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumbs;