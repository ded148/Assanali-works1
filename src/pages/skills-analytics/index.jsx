import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import AnalyticsHeader from './components/AnalyticsHeader';
import KPICards from './components/KPICards';
import SkillsTrendChart from './components/SkillsTrendChart';
import SalaryCorrelationChart from './components/SalaryCorrelationChart';
import GeographicDistribution from './components/GeographicDistribution';
import SkillsGapAnalysis from './components/SkillsGapAnalysis';
import AnalyticsFilters from './components/AnalyticsFilters';
import ProgramEffectiveness from './components/ProgramEffectiveness';

const SkillsAnalytics = () => {
  const [userRole] = useState('educator');
  const [lastUpdated] = useState(new Date('2024-09-24T03:44:47'));
  const [selectedSkills, setSelectedSkills] = useState(['Python', 'JavaScript', 'React']);
  const [filters, setFilters] = useState({
    industry: 'all',
    educationLevel: 'all',
    region: 'all',
    timePeriod: '1y',
    startDate: '',
    endDate: ''
  });

  // Mock KPI data
  const kpiData = {
    averageSalary: 120000,
    salaryChange: 8.5,
    employmentRate: 87.3,
    employmentChange: 5.2,
    skillsAlignment: 73.8,
    alignmentChange: -2.1,
    activeVacancies: 15420,
    vacanciesChange: 12.7
  };

  // Mock skills trend data
  const skillsTrendData = [
    { month: 'Янв 2024', Python: 85, JavaScript: 92, React: 78, 'Machine Learning': 65, DevOps: 58, 'Data Science': 72 },
    { month: 'Фев 2024', Python: 87, JavaScript: 89, React: 82, 'Machine Learning': 68, DevOps: 61, 'Data Science': 75 },
    { month: 'Мар 2024', Python: 89, JavaScript: 91, React: 85, 'Machine Learning': 71, DevOps: 64, 'Data Science': 78 },
    { month: 'Апр 2024', Python: 91, JavaScript: 88, React: 87, 'Machine Learning': 74, DevOps: 67, 'Data Science': 80 },
    { month: 'Май 2024', Python: 93, JavaScript: 90, React: 89, 'Machine Learning': 77, DevOps: 70, 'Data Science': 82 },
    { month: 'Июн 2024', Python: 95, JavaScript: 93, React: 91, 'Machine Learning': 80, DevOps: 73, 'Data Science': 85 },
    { month: 'Июл 2024', Python: 97, JavaScript: 95, React: 93, 'Machine Learning': 83, DevOps: 76, 'Data Science': 87 },
    { month: 'Авг 2024', Python: 94, JavaScript: 97, React: 95, 'Machine Learning': 86, DevOps: 79, 'Data Science': 89 },
    { month: 'Сен 2024', Python: 96, JavaScript: 94, React: 97, 'Machine Learning': 89, DevOps: 82, 'Data Science': 91 }
  ];

  // Mock salary correlation data
  const salaryCorrelationData = [
    { skill: 'Python', demand: 96, salary: 140000 },
    { skill: 'JavaScript', demand: 94, salary: 125000 },
    { skill: 'React', demand: 97, salary: 135000 },
    { skill: 'Machine Learning', demand: 89, salary: 160000 },
    { skill: 'DevOps', demand: 82, salary: 145000 },
    { skill: 'Data Science', demand: 91, salary: 155000 },
    { skill: 'Node.js', demand: 78, salary: 120000 },
    { skill: 'Docker', demand: 75, salary: 130000 },
    { skill: 'Kubernetes', demand: 68, salary: 150000 },
    { skill: 'AWS', demand: 85, salary: 142000 },
    { skill: 'Azure', demand: 72, salary: 138000 },
    { skill: 'PostgreSQL', demand: 69, salary: 115000 },
    { skill: 'MongoDB', demand: 65, salary: 118000 },
    { skill: 'Redis', demand: 58, salary: 125000 },
    { skill: 'GraphQL', demand: 62, salary: 132000 }
  ];

  // Mock geographic distribution data
  const geographicData = [
    {
      name: 'Москва',
      demandLevel: 95,
      vacancies: 8420,
      averageSalary: 165000,
      topSkill: 'Python',
      growthRate: 15.2
    },
    {
      name: 'Санкт-Петербург',
      demandLevel: 87,
      vacancies: 3240,
      averageSalary: 135000,
      topSkill: 'JavaScript',
      growthRate: 12.8
    },
    {
      name: 'Новосибирск',
      demandLevel: 72,
      vacancies: 1180,
      averageSalary: 95000,
      topSkill: 'React',
      growthRate: 8.5
    },
    {
      name: 'Екатеринбург',
      demandLevel: 68,
      vacancies: 980,
      averageSalary: 88000,
      topSkill: 'Python',
      growthRate: 6.2
    },
    {
      name: 'Казань',
      demandLevel: 65,
      vacancies: 720,
      averageSalary: 82000,
      topSkill: 'JavaScript',
      growthRate: 9.1
    },
    {
      name: 'Нижний Новгород',
      demandLevel: 58,
      vacancies: 540,
      averageSalary: 78000,
      topSkill: 'Java',
      growthRate: 4.7
    },
    {
      name: 'Челябинск',
      demandLevel: 45,
      vacancies: 320,
      averageSalary: 65000,
      topSkill: 'C#',
      growthRate: 2.3
    }
  ];

  // Mock skills gap analysis data
  const skillsGapData = [
    {
      skill: 'Machine Learning',
      category: 'technical',
      marketDemand: 89,
      educationSupply: 34,
      gap: 55,
      recommendations: `Увеличить количество курсов по машинному обучению и добавить практические проекты с реальными данными`
    },
    {
      skill: 'Cloud Computing',
      category: 'technical',
      marketDemand: 85,
      educationSupply: 28,
      gap: 57,
      recommendations: `Внедрить специализацию по облачным технологиям с сертификацией AWS/Azure`
    },
    {
      skill: 'DevOps',
      category: 'technical',
      marketDemand: 82,
      educationSupply: 31,
      gap: 51,
      recommendations: `Создать междисциплинарные курсы, объединяющие разработку и администрирование`
    },
    {
      skill: 'Data Science',
      category: 'technical',
      marketDemand: 91,
      educationSupply: 45,
      gap: 46,
      recommendations: `Расширить программы по анализу данных и добавить курсы по Big Data`
    },
    {
      skill: 'Cybersecurity',
      category: 'technical',
      marketDemand: 78,
      educationSupply: 22,
      gap: 56,
      recommendations: `Разработать специализированные программы по информационной безопасности`
    },
    {
      skill: 'Project Management',
      category: 'management',
      marketDemand: 76,
      educationSupply: 58,
      gap: 18,
      recommendations: `Добавить практические кейсы и симуляции реальных проектов`
    },
    {
      skill: 'Leadership',
      category: 'soft',
      marketDemand: 84,
      educationSupply: 52,
      gap: 32,
      recommendations: `Интегрировать развитие лидерских навыков во все программы`
    },
    {
      skill: 'Critical Thinking',
      category: 'soft',
      marketDemand: 88,
      educationSupply: 67,
      gap: 21,
      recommendations: `Усилить аналитические компоненты в учебных программах`
    },
    {
      skill: 'UX/UI Design',
      category: 'creative',
      marketDemand: 73,
      educationSupply: 41,
      gap: 32,
      recommendations: `Создать междисциплинарные программы дизайна и технологий`
    },
    {
      skill: 'Digital Marketing',
      category: 'creative',
      marketDemand: 69,
      educationSupply: 54,
      gap: 15,
      recommendations: `Обновить программы с учетом новых цифровых платформ`
    }
  ];

  // Mock program effectiveness data
  const programEffectivenessData = [
    {
      program: 'Информатика и вычислительная техника',
      faculty: 'Факультет информационных технологий',
      students: 245,
      employment: 89.2,
      satisfaction: 87.5,
      skillsMatch: 82.1,
      salaryGrowth: 28.5
    },
    {
      program: 'Программная инженерия',
      faculty: 'Факультет информационных технологий',
      students: 189,
      employment: 92.1,
      satisfaction: 91.2,
      skillsMatch: 88.7,
      salaryGrowth: 32.1
    },
    {
      program: 'Искусственный интеллект',
      faculty: 'Факультет математики и компьютерных наук',
      students: 156,
      employment: 94.8,
      satisfaction: 93.4,
      skillsMatch: 91.2,
      salaryGrowth: 38.7
    },
    {
      program: 'Кибербезопасность',
      faculty: 'Факультет информационной безопасности',
      students: 134,
      employment: 87.6,
      satisfaction: 85.9,
      skillsMatch: 79.3,
      salaryGrowth: 25.8
    },
    {
      program: 'Анализ данных',
      faculty: 'Факультет математики и компьютерных наук',
      students: 167,
      employment: 91.4,
      satisfaction: 89.7,
      skillsMatch: 86.5,
      salaryGrowth: 35.2
    },
    {
      program: 'Веб-разработка',
      faculty: 'Факультет информационных технологий',
      students: 203,
      employment: 85.3,
      satisfaction: 83.1,
      skillsMatch: 77.8,
      salaryGrowth: 22.4
    },
    {
      program: 'Мобильная разработка',
      faculty: 'Факультет информационных технологий',
      students: 142,
      employment: 88.7,
      satisfaction: 86.3,
      skillsMatch: 81.9,
      salaryGrowth: 26.7
    },
    {
      program: 'DevOps и облачные технологии',
      faculty: 'Факультет системного администрирования',
      students: 98,
      employment: 93.2,
      satisfaction: 90.8,
      skillsMatch: 89.1,
      salaryGrowth: 34.6
    }
  ];

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev?.includes(skill) 
        ? prev?.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      industry: 'all',
      educationLevel: 'all',
      region: 'all',
      timePeriod: '1y',
      startDate: '',
      endDate: ''
    });
  };

  const handleExportReport = () => {
    // Mock export functionality
    console.log('Экспорт отчета по аналитике навыков');
    // In real implementation, this would generate and download a report
  };

  const handleRefreshData = () => {
    // Mock data refresh functionality
    console.log('Обновление данных аналитики');
    // In real implementation, this would fetch fresh data from APIs
  };

  useEffect(() => {
    document.title = 'Аналитика навыков - SkillGraph';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} isAuthenticated={true} />
      
      <main className="pt-nav">
        <AnalyticsHeader
          onExportReport={handleExportReport}
          onRefreshData={handleRefreshData}
          lastUpdated={lastUpdated}
        />

        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumbs className="mb-6" />

          <AnalyticsFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />

          <KPICards kpiData={kpiData} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <SkillsTrendChart
              data={skillsTrendData}
              selectedSkills={selectedSkills}
              onSkillToggle={handleSkillToggle}
            />
            <SalaryCorrelationChart data={salaryCorrelationData} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <GeographicDistribution data={geographicData} />
            <SkillsGapAnalysis data={skillsGapData} />
          </div>

          <ProgramEffectiveness data={programEffectivenessData} />
        </div>
      </main>
    </div>
  );
};

export default SkillsAnalytics;