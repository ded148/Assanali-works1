import React from 'react';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import QuickStats from './components/QuickStats';
import CurriculumRecommendations from './components/CurriculumRecommendations';
import ProgramEffectiveness from './components/ProgramEffectiveness';
import CourseManagement from './components/CourseManagement';
import MarketTrendAlerts from './components/MarketTrendAlerts';
import AdminTools from './components/AdminTools';

const EducatorDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header userRole="educator" isAuthenticated={true} />
      
      <main className="pt-nav">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumbs */}
          <NavigationBreadcrumbs className="mb-6" />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Панель преподавателя
            </h1>
            <p className="text-muted-foreground">
              Управление курсами и анализ эффективности образовательных программ
            </p>
          </div>

          {/* Quick Stats */}
          <QuickStats className="mb-8" />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {/* Curriculum Recommendations */}
            <CurriculumRecommendations className="xl:col-span-1" />
            
            {/* Market Trend Alerts */}
            <MarketTrendAlerts className="xl:col-span-1" />
          </div>

          {/* Program Effectiveness - Full Width */}
          <ProgramEffectiveness className="mb-8" />

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Course Management */}
            <CourseManagement className="xl:col-span-1" />
            
            {/* Admin Tools */}
            <AdminTools className="xl:col-span-1" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EducatorDashboard;