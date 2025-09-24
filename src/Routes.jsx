import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import CourseRecommendations from './pages/course-recommendations';
import StudentDashboard from './pages/student-dashboard';
import SkillsAnalytics from './pages/skills-analytics';
import KnowledgeGraph from './pages/knowledge-graph';
import EducatorDashboard from './pages/educator-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CourseRecommendations />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/course-recommendations" element={<CourseRecommendations />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/skills-analytics" element={<SkillsAnalytics />} />
        <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
        <Route path="/educator-dashboard" element={<EducatorDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
