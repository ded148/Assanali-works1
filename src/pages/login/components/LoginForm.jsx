import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: 'student', label: 'Студент' },
    { value: 'educator', label: 'Преподаватель' },
    { value: 'admin', label: 'Администратор' }
  ];

  const mockCredentials = {
    student: { email: 'student@university.ru', password: 'student123' },
    educator: { email: 'educator@university.ru', password: 'educator123' },
    admin: { email: 'admin@university.ru', password: 'admin123' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Введите адрес электронной почты';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Введите корректный адрес электронной почты';
    }

    if (!formData?.password) {
      newErrors.password = 'Введите пароль';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (!formData?.role) {
      newErrors.role = 'Выберите роль';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const expectedCredentials = mockCredentials?.[formData?.role];
      
      if (formData?.email === expectedCredentials?.email && formData?.password === expectedCredentials?.password) {
        // Store user data in localStorage
        localStorage.setItem('userRole', formData?.role);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', 'Иван Петров');
        
        // Navigate based on role
        if (formData?.role === 'student') {
          navigate('/student-dashboard');
        } else if (formData?.role === 'educator') {
          navigate('/educator-dashboard');
        } else {
          navigate('/educator-dashboard'); // Admin uses educator dashboard
        }
      } else {
        setErrors({
          general: `Неверные учетные данные для роли "${roleOptions?.find(r => r?.value === formData?.role)?.label}". Проверьте email и пароль.`
        });
      }
    } catch (error) {
      setErrors({
        general: 'Произошла ошибка при входе в систему. Попробуйте еще раз.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-card-elevation p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Network" size={24} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">SkillGraph</h1>
          </div>
          <p className="text-muted-foreground">
            Войдите в систему для доступа к персональным рекомендациям
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors?.general && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <p className="text-sm text-error">{errors?.general}</p>
              </div>
            </div>
          )}

          <Select
            label="Роль пользователя"
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            error={errors?.role}
            required
          />

          <Input
            label="Электронная почта"
            type="email"
            placeholder="example@university.ru"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Запомнить меня"
              checked={formData?.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
            />
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 nav-transition"
              onClick={() => console.log('Forgot password')}
            >
              Забыли пароль?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="left"
          >
            Войти в систему
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Нет аккаунта?{' '}
            <button
              type="button"
              className="text-primary hover:text-primary/80 nav-transition font-medium"
              onClick={() => console.log('Register')}
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;