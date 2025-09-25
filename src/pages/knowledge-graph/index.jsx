import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GraphVisualization from './components/GraphVisualization';
import FilterPanel from './components/FilterPanel';
import NodeDetailsPanel from './components/NodeDetailsPanel';
import GraphStats from './components/GraphStats';

const KnowledgeGraph = () => {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterPanelCollapsed, setIsFilterPanelCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    salaryRange: 'all',
    demand: 'all'
  });
  // Add this block - Mock data for components
  const [graphData] = useState({
    nodes: [],
    links: [],
    stats: {
      totalNodes: 0,
      totalConnections: 0,
      skillsCount: 0,
      coursesCount: 0,
      careersCount: 0
    }
  });

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsFilterPanelCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    if (isMobile && node) {
      setIsDetailsPanelOpen(true);
    }
  };

  const handleCloseDetails = () => {
    setSelectedNode(null);
    setIsDetailsPanelOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelCollapsed(!isFilterPanelCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" isAuthenticated={true} />
      
      <main className="pt-nav">
        <div className="container mx-auto px-6 py-6">
          {/* Header Section */}
          <div className="mb-6">
            <NavigationBreadcrumbs className="mb-4" />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Граф знаний
                </h1>
                <p className="text-muted-foreground">
                  Исследуйте связи между навыками, курсами и карьерными возможностями
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/course-recommendations')}
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  Найти курсы
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/skills-analytics')}
                  iconName="BarChart3"
                  iconPosition="left"
                >
                  Аналитика
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-6">
            <GraphStats
              filters={filters}
              searchQuery={searchQuery}
              data={graphData.stats}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Filter Panel */}
            <div className={`lg:col-span-3 ${isMobile && isFilterPanelCollapsed ? 'lg:col-span-1' : ''}`}>
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                isCollapsed={isFilterPanelCollapsed}
                onToggleCollapse={toggleFilterPanel}
                className="sticky top-nav-offset"
              />
            </div>

            {/* Graph Visualization */}
            <div className={`${
              isFilterPanelCollapsed 
                ? 'lg:col-span-9' 
                : selectedNode && !isMobile 
                  ? 'lg:col-span-6' : 'lg:col-span-9'
            }`}>
              <div className="h-[600px] lg:h-[700px]">
                <GraphVisualization
                  filters={filters}
                  searchQuery={searchQuery}
                  selectedNode={selectedNode}
                  onNodeSelect={handleNodeSelect}
                  data={graphData}
                  className="h-full"
                />
              </div>
            </div>

            {/* Node Details Panel - Desktop */}
            {selectedNode && !isMobile && (
              <div className="lg:col-span-3">
                <NodeDetailsPanel
                  selectedNode={selectedNode}
                  onClose={handleCloseDetails}
                  onNavigate={handleNavigate}
                  className="sticky top-nav-offset"
                />
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Как использовать граф знаний
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Навигация</h4>
                    <ul className="space-y-1">
                      <li>• Кликните на узел для просмотра деталей</li>
                      <li>• Используйте колесо мыши для масштабирования</li>
                      <li>• Перетаскивайте узлы для изменения расположения</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Фильтрация</h4>
                    <ul className="space-y-1">
                      <li>• Используйте поиск для быстрого поиска</li>
                      <li>• Применяйте фильтры по категориям</li>
                      <li>• Сортируйте по зарплате и спросу</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Details Panel */}
      {selectedNode && isMobile && isDetailsPanelOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-modal">
          <div className="fixed inset-x-0 bottom-0 bg-card border-t border-border rounded-t-lg max-h-[80vh] overflow-y-auto animate-slide-up">
            <NodeDetailsPanel
              selectedNode={selectedNode}
              onClose={handleCloseDetails}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;