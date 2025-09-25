import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import CredentialsHelper from './components/CredentialsHelper';
import Icon from '../../components/AppIcon';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated === 'true' && userRole) {
      if (userRole === 'student') {
        navigate('/student-dashboard');
      } else {
        navigate('/educator-dashboard');
      }
    }

    // Set page title
    document.title = 'Вход в систему - SkillGraph';
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px]" />
      <div className="relative min-h-screen flex">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Network" size={28} color="white" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-foreground">SkillGraph</h1>
                  <p className="text-sm text-muted-foreground">Образовательная аналитика</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">
                  Добро пожаловать
                </h2>
                <p className="text-muted-foreground">
                  Войдите в систему для доступа к персональным рекомендациям и аналитике навыков
                </p>
              </div>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Demo Credentials Helper */}
            <div className="mt-6 text-center">
              <CredentialsHelper />
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-center space-y-2">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <button className="text-muted-foreground hover:text-foreground nav-transition">
                  Политика конфиденциальности
                </button>
                <span className="text-border">•</span>
                <button className="text-muted-foreground hover:text-foreground nav-transition">
                  Условия использования
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} SkillGraph. Все права защищены.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Trust Signals (Desktop Only) */}
        <div className="hidden lg:flex lg:w-96 bg-muted/30 border-l border-border">
          <div className="flex flex-col justify-center p-8 w-full">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Доверенная платформа
              </h3>
              <p className="text-muted-foreground">
                Интегрированная система аналитики навыков для российских университетов
              </p>
            </div>

            <TrustSignals />

            {/* Contact Support */}
            <div className="mt-8 p-4 bg-card border border-border rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="MessageCircle" size={16} color="white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Нужна помощь?
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Свяжитесь с технической поддержкой
                  </p>
                  <button className="text-xs text-primary hover:text-primary/80 nav-transition">
                    support@skillgraph.ru
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Trust Signals */}
      <div className="lg:hidden bg-muted/30 border-t border-border">
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Доверенная платформа
            </h3>
            <p className="text-sm text-muted-foreground">
              Интегрированная система для российских университетов
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <TrustSignals />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;