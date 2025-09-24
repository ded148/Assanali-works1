import React from 'react';
import Icon from '../AppIcon';

const UserRoleIndicator = ({ userRole = 'student', userName = 'Иван Петров', className = '' }) => {
  const getRoleConfig = (role) => {
    const configs = {
      student: {
        label: 'Студент',
        icon: 'GraduationCap',
        bgColor: 'bg-primary',
        textColor: 'text-primary-foreground',
        description: 'Обучающийся'
      },
      educator: {
        label: 'Преподаватель',
        icon: 'BookOpen',
        bgColor: 'bg-secondary',
        textColor: 'text-secondary-foreground',
        description: 'Преподаватель'
      },
      admin: {
        label: 'Администратор',
        icon: 'Shield',
        bgColor: 'bg-accent',
        textColor: 'text-accent-foreground',
        description: 'Администратор системы'
      }
    };
    return configs?.[role] || configs?.student;
  };

  const roleConfig = getRoleConfig(userRole);

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`w-10 h-10 ${roleConfig?.bgColor} rounded-full flex items-center justify-center`}>
        <Icon name={roleConfig?.icon} size={20} color="white" />
      </div>
      <div className="hidden sm:block">
        <p className="text-sm font-medium text-foreground">{userName}</p>
        <p className="text-xs text-muted-foreground">{roleConfig?.label}</p>
      </div>
    </div>
  );
};

export default UserRoleIndicator;