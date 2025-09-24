import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CredentialsHelper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mockCredentials = [
    {
      role: 'Студент',
      email: 'student@university.ru',
      password: 'student123',
      description: 'Доступ к персональным рекомендациям курсов и аналитике прогресса'
    },
    {
      role: 'Преподаватель',
      email: 'educator@university.ru',
      password: 'educator123',
      description: 'Управление учебными программами и анализ эффективности курсов'
    },
    {
      role: 'Администратор',
      email: 'admin@university.ru',
      password: 'admin123',
      description: 'Полный доступ к системной аналитике и управлению пользователями'
    }
  ];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        iconName="HelpCircle"
        iconPosition="left"
        className="text-muted-foreground hover:text-foreground"
      >
        Тестовые учетные данные
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-modal z-dropdown animate-slide-down">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={16} className="text-primary" />
              <h3 className="font-semibold text-foreground">Демо-доступ</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Используйте следующие учетные данные для тестирования системы
            </p>
          </div>

          <div className="p-4 space-y-4">
            {mockCredentials?.map((cred, index) => (
              <div
                key={index}
                className="p-3 bg-muted/30 border border-border rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {cred?.role}
                  </span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => navigator.clipboard?.writeText(cred?.email)}
                      className="p-1 text-muted-foreground hover:text-foreground nav-transition"
                      title="Скопировать email"
                    >
                      <Icon name="Copy" size={12} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Email:</span>
                    <code className="bg-muted px-1 py-0.5 rounded text-foreground">
                      {cred?.email}
                    </code>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Пароль:</span>
                    <code className="bg-muted px-1 py-0.5 rounded text-foreground">
                      {cred?.password}
                    </code>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">
                  {cred?.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Это демонстрационная версия. В реальной системе используйте ваши учетные данные университета.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialsHelper;