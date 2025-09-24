import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'student', isAuthenticated = true }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Панель управления',
      path: userRole === 'educator' ? '/educator-dashboard' : '/student-dashboard',
      icon: 'LayoutDashboard',
      roles: ['student', 'educator', 'admin']
    },
    {
      label: 'Граф знаний',
      path: '/knowledge-graph',
      icon: 'Network',
      roles: ['student', 'educator', 'admin']
    },
    {
      label: 'Рекомендации',
      path: '/course-recommendations',
      icon: 'BookOpen',
      roles: ['student', 'educator', 'admin']
    },
    {
      label: 'Аналитика',
      path: '/skills-analytics',
      icon: 'BarChart3',
      roles: ['student', 'educator', 'admin']
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Новые рекомендации курсов',
      message: 'Доступны 3 новых курса по машинному обучению',
      time: '5 мин назад',
      type: 'info',
      unread: true
    },
    {
      id: 2,
      title: 'Обновление графа знаний',
      message: 'Добавлены новые связи между навыками',
      time: '1 час назад',
      type: 'success',
      unread: true
    },
    {
      id: 3,
      title: 'Изменения в аналитике',
      message: 'Обновлены данные о трендах рынка труда',
      time: '2 часа назад',
      type: 'warning',
      unread: false
    }
  ];

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  const filteredNavItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  const isActivePath = (path) => {
    if (path === '/student-dashboard' || path === '/educator-dashboard') {
      return location?.pathname === '/student-dashboard' || location?.pathname === '/educator-dashboard';
    }
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsProfileOpen(false);
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      student: 'Студент',
      educator: 'Преподаватель',
      admin: 'Администратор'
    };
    return roleNames?.[role] || 'Пользователь';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef?.current && !profileRef?.current?.contains(event?.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-nav">
      <div className="h-nav px-6">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Network" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">SkillGraph</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {filteredNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium nav-transition nav-hover ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-muted-foreground hover:text-foreground nav-transition nav-hover rounded-lg"
              >
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-dropdown animate-slide-down">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">Уведомления</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications?.map((notification) => (
                      <div
                        key={notification?.id}
                        className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer ${
                          notification?.unread ? 'bg-muted/30' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification?.type === 'success' ? 'bg-success' :
                            notification?.type === 'warning'? 'bg-warning' : 'bg-primary'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{notification?.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{notification?.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification?.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border">
                    <Button variant="ghost" size="sm" className="w-full">
                      Посмотреть все
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted nav-transition"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-foreground">Иван Петров</p>
                  <p className="text-xs text-muted-foreground">{getRoleDisplayName(userRole)}</p>
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal z-dropdown animate-slide-down">
                  <div className="p-4 border-b border-border">
                    <p className="font-medium text-foreground">Иван Петров</p>
                    <p className="text-sm text-muted-foreground">{getRoleDisplayName(userRole)}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md nav-transition">
                      <Icon name="Settings" size={16} />
                      <span>Настройки</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md nav-transition">
                      <Icon name="HelpCircle" size={16} />
                      <span>Помощь</span>
                    </button>
                    <hr className="my-2 border-border" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md nav-transition"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Выйти</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground nav-transition"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-down">
          <nav className="p-4 space-y-2">
            {filteredNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium nav-transition ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;