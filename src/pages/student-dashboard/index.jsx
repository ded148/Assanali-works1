import React from 'react';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import UserRoleIndicator from '../../components/ui/UserRoleIndicator';
import QuickActions from '../../components/ui/QuickActions';
import QuickStats from './components/QuickStats';
import RecommendedCourses from './components/RecommendedCourses';
import ProgressTracking from './components/ProgressTracking';
import SkillsRadarChart from './components/SkillsRadarChart';
import TrendingJobs from './components/TrendingJobs';
import RecentActivity from './components/RecentActivity';

const StudentDashboard = () => {
  const userRole = 'student';
  const userName = 'Иван Петров';

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} isAuthenticated={true} />
      <main className="pt-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <NavigationBreadcrumbs className="mb-4" />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <UserRoleIndicator 
                  userRole={userRole} 
                  userName={userName}
                />
                <div className="hidden sm:block">
                  <h1 className="text-2xl font-bold text-foreground">
                    Добро пожаловать, {userName?.split(' ')?.[0]}!
                  </h1>
                  <p className="text-muted-foreground">
                    Продолжайте свой путь к достижению карьерных целей
                  </p>
                </div>
              </div>
              
              <QuickActions userRole={userRole} />
            </div>
          </div>

          {/* Quick Stats */}
          <QuickStats className="mb-8" />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* Recommended Courses */}
              <RecommendedCourses />
              
              {/* Skills Analysis */}
              <SkillsRadarChart />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Progress Tracking */}
              <ProgressTracking />
              
              {/* Recent Activity */}
              <RecentActivity />
            </div>
          </div>

          {/* Trending Jobs - Full Width */}
          <TrendingJobs />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;