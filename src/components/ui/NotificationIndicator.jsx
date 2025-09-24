import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationIndicator = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Новые рекомендации курсов',
      message: 'Доступны 3 новых курса по машинному обучению',
      time: '5 мин назад',
      type: 'info',
      unread: true,
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 2,
      title: 'Обновление графа знаний',
      message: 'Добавлены новые связи между навыками в области веб-разработки',
      time: '1 час назад',
      type: 'success',
      unread: true,
      timestamp: new Date(Date.now() - 60 * 60 * 1000)
    },
    {
      id: 3,
      title: 'Изменения в аналитике',
      message: 'Обновлены данные о трендах рынка труда за сентябрь 2024',
      time: '2 часа назад',
      type: 'warning',
      unread: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 4,
      title: 'Завершение курса',
      message: 'Поздравляем! Вы успешно завершили курс "Основы Python"',
      time: '1 день назад',
      type: 'success',
      unread: false,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
    }
  ]);

  const dropdownRef = useRef(null);
  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(notification =>
        notification?.id === notificationId
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev?.map(notification => ({ ...notification, unread: false }))
    );
  };

  const removeNotification = (notificationId) => {
    setNotifications(prev =>
      prev?.filter(notification => notification?.id !== notificationId)
    );
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} мин назад`;
    } else if (hours < 24) {
      return `${hours} час${hours > 1 ? 'а' : ''} назад`;
    } else {
      return `${days} день${days > 1 ? 'я' : ''} назад`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-muted-foreground hover:text-foreground nav-transition nav-hover rounded-lg"
        aria-label={`Уведомления${unreadCount > 0 ? ` (${unreadCount} непрочитанных)` : ''}`}
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-popover border border-border rounded-lg shadow-modal z-notification animate-slide-down">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Уведомления</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Отметить все как прочитанные
              </Button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Нет уведомлений</p>
              </div>
            ) : (
              notifications?.map((notification) => (
                <div
                  key={notification?.id}
                  className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer group ${
                    notification?.unread ? 'bg-muted/30' : ''
                  }`}
                  onClick={() => markAsRead(notification?.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${getNotificationColor(notification?.type)}`}>
                      <Icon name={getNotificationIcon(notification?.type)} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className={`text-sm font-medium ${
                          notification?.unread ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {notification?.title}
                        </p>
                        <button
                          onClick={(e) => {
                            e?.stopPropagation();
                            removeNotification(notification?.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground nav-transition"
                          aria-label="Удалить уведомление"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {notification?.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatTime(notification?.timestamp)}
                      </p>
                      {notification?.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications?.length > 0 && (
            <div className="p-4 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full">
                Посмотреть все уведомления
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIndicator;