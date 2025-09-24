import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import Icon from '../../../components/AppIcon';

const GraphVisualization = ({ 
  data, 
  filters, 
  onNodeSelect, 
  selectedNode, 
  searchQuery,
  className = '' 
}) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isLoading, setIsLoading] = useState(true);

  // Mock graph data
  const mockData = {
    nodes: [
      // Skills nodes
      { id: 'python', name: 'Python', type: 'skill', category: 'programming', demand: 95, salary: 120000, level: 'intermediate' },
      { id: 'javascript', name: 'JavaScript', type: 'skill', category: 'programming', demand: 90, salary: 110000, level: 'intermediate' },
      { id: 'react', name: 'React', type: 'skill', category: 'frontend', demand: 85, salary: 115000, level: 'intermediate' },
      { id: 'machine-learning', name: 'Машинное обучение', type: 'skill', category: 'ai', demand: 88, salary: 140000, level: 'advanced' },
      { id: 'data-analysis', name: 'Анализ данных', type: 'skill', category: 'analytics', demand: 82, salary: 105000, level: 'intermediate' },
      { id: 'sql', name: 'SQL', type: 'skill', category: 'database', demand: 75, salary: 95000, level: 'beginner' },
      
      // Course nodes
      { id: 'python-basics', name: 'Основы Python', type: 'course', category: 'programming', duration: 40, rating: 4.8, students: 1250 },
      { id: 'react-advanced', name: 'Продвинутый React', type: 'course', category: 'frontend', duration: 60, rating: 4.9, students: 890 },
      { id: 'ml-fundamentals', name: 'Основы ML', type: 'course', category: 'ai', duration: 80, rating: 4.7, students: 650 },
      { id: 'data-science', name: 'Data Science', type: 'course', category: 'analytics', duration: 120, rating: 4.6, students: 420 },
      
      // Job role nodes
      { id: 'frontend-dev', name: 'Frontend разработчик', type: 'job', category: 'development', salary: 110000, openings: 245, experience: 'junior' },
      { id: 'data-scientist', name: 'Data Scientist', type: 'job', category: 'analytics', salary: 135000, openings: 89, experience: 'middle' },
      { id: 'ml-engineer', name: 'ML инженер', type: 'job', category: 'ai', salary: 150000, openings: 67, experience: 'senior' },
      { id: 'fullstack-dev', name: 'Fullstack разработчик', type: 'job', category: 'development', salary: 125000, openings: 156, experience: 'middle' },
      
      // Learning outcome nodes
      { id: 'web-development', name: 'Веб-разработка', type: 'outcome', category: 'development', completion: 78 },
      { id: 'ai-specialization', name: 'ИИ специализация', type: 'outcome', category: 'ai', completion: 45 },
      { id: 'data-analytics', name: 'Аналитика данных', type: 'outcome', category: 'analytics', completion: 62 }
    ],
    links: [
      // Skill to course connections
      { source: 'python', target: 'python-basics', type: 'teaches', strength: 0.9 },
      { source: 'react', target: 'react-advanced', type: 'teaches', strength: 0.95 },
      { source: 'machine-learning', target: 'ml-fundamentals', type: 'teaches', strength: 0.85 },
      { source: 'data-analysis', target: 'data-science', type: 'teaches', strength: 0.8 },
      
      // Course to job connections
      { source: 'python-basics', target: 'fullstack-dev', type: 'prepares', strength: 0.7 },
      { source: 'react-advanced', target: 'frontend-dev', type: 'prepares', strength: 0.9 },
      { source: 'ml-fundamentals', target: 'ml-engineer', type: 'prepares', strength: 0.8 },
      { source: 'data-science', target: 'data-scientist', type: 'prepares', strength: 0.85 },
      
      // Skill to job connections
      { source: 'javascript', target: 'frontend-dev', type: 'requires', strength: 0.95 },
      { source: 'python', target: 'data-scientist', type: 'requires', strength: 0.9 },
      { source: 'machine-learning', target: 'ml-engineer', type: 'requires', strength: 0.95 },
      { source: 'sql', target: 'data-scientist', type: 'requires', strength: 0.8 },
      
      // Course to outcome connections
      { source: 'react-advanced', target: 'web-development', type: 'contributes', strength: 0.8 },
      { source: 'python-basics', target: 'web-development', type: 'contributes', strength: 0.6 },
      { source: 'ml-fundamentals', target: 'ai-specialization', type: 'contributes', strength: 0.9 },
      { source: 'data-science', target: 'data-analytics', type: 'contributes', strength: 0.85 },
      
      // Skill relationships
      { source: 'python', target: 'machine-learning', type: 'enables', strength: 0.7 },
      { source: 'javascript', target: 'react', type: 'prerequisite', strength: 0.8 },
      { source: 'python', target: 'data-analysis', type: 'enables', strength: 0.75 }
    ]
  };

  const getNodeColor = (node) => {
    const colors = {
      skill: '#1E40AF', // blue-800
      course: '#10B981', // emerald-500
      job: '#F59E0B', // amber-500
      outcome: '#6366F1' // indigo-500
    };
    return colors?.[node?.type] || '#6B7280';
  };

  const getNodeSize = (node) => {
    const baseSizes = {
      skill: 8,
      course: 10,
      job: 12,
      outcome: 9
    };
    
    let multiplier = 1;
    if (node?.type === 'skill' && node?.demand) {
      multiplier = 0.8 + (node?.demand / 100) * 0.4;
    } else if (node?.type === 'course' && node?.students) {
      multiplier = 0.8 + Math.min(node?.students / 1000, 1) * 0.4;
    } else if (node?.type === 'job' && node?.openings) {
      multiplier = 0.8 + Math.min(node?.openings / 200, 1) * 0.4;
    }
    
    return baseSizes?.[node?.type] * multiplier;
  };

  const filterData = (data, filters, searchQuery) => {
    let filteredNodes = data?.nodes;
    
    // Apply category filter
    if (filters?.category && filters?.category !== 'all') {
      filteredNodes = filteredNodes?.filter(node => node?.category === filters?.category);
    }
    
    // Apply level filter
    if (filters?.level && filters?.level !== 'all') {
      filteredNodes = filteredNodes?.filter(node => 
        !node?.level || node?.level === filters?.level
      );
    }
    
    // Apply salary filter
    if (filters?.salaryRange && filters?.salaryRange !== 'all') {
      const [min, max] = filters?.salaryRange?.split('-')?.map(Number);
      filteredNodes = filteredNodes?.filter(node => 
        !node?.salary || (node?.salary >= min && (!max || node?.salary <= max))
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      filteredNodes = filteredNodes?.filter(node =>
        node?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }
    
    const nodeIds = new Set(filteredNodes.map(node => node.id));
    const filteredLinks = data?.links?.filter(link =>
      nodeIds?.has(link?.source) && nodeIds?.has(link?.target)
    );
    
    return { nodes: filteredNodes, links: filteredLinks };
  };

  useEffect(() => {
    const updateDimensions = () => {
      const container = svgRef?.current?.parentElement;
      if (container) {
        setDimensions({
          width: container?.clientWidth,
          height: container?.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef?.current || dimensions?.width === 0) return;

    setIsLoading(true);
    
    const svg = d3?.select(svgRef?.current);
    svg?.selectAll('*')?.remove();

    const filteredData = filterData(data || mockData, filters, searchQuery);
    
    const width = dimensions?.width;
    const height = dimensions?.height;

    // Create zoom behavior
    const zoom = d3?.zoom()?.scaleExtent([0.1, 4])?.on('zoom', (event) => {
        container?.attr('transform', event?.transform);
      });

    svg?.call(zoom);

    const container = svg?.append('g');

    // Create simulation
    const simulation = d3?.forceSimulation(filteredData?.nodes)
      ?.force('link', d3?.forceLink(filteredData?.links)?.id(d => d?.id)?.distance(80))
      ?.force('charge', d3?.forceManyBody()?.strength(-300))
      ?.force('center', d3?.forceCenter(width / 2, height / 2))
      ?.force('collision', d3?.forceCollide()?.radius(d => getNodeSize(d) + 5));

    // Create links
    const link = container?.append('g')
      ?.selectAll('line')
      ?.data(filteredData?.links)
      ?.enter()?.append('line')
      ?.attr('stroke', '#E5E7EB')
      ?.attr('stroke-opacity', 0.6)
      ?.attr('stroke-width', d => Math.sqrt(d?.strength * 3));

    // Create nodes
    const node = container?.append('g')
      ?.selectAll('circle')
      ?.data(filteredData?.nodes)
      ?.enter()?.append('circle')
      ?.attr('r', getNodeSize)
      ?.attr('fill', getNodeColor)
      ?.attr('stroke', '#FFFFFF')
      ?.attr('stroke-width', 2)
      ?.style('cursor', 'pointer')
      ?.call(d3?.drag()
        ?.on('start', dragstarted)
        ?.on('drag', dragged)
        ?.on('end', dragended));

    // Create labels
    const label = container?.append('g')
      ?.selectAll('text')
      ?.data(filteredData?.nodes)
      ?.enter()?.append('text')
      ?.text(d => d?.name)
      ?.attr('font-size', '12px')
      ?.attr('font-family', 'Inter, sans-serif')
      ?.attr('fill', '#374151')
      ?.attr('text-anchor', 'middle')
      ?.attr('dy', d => getNodeSize(d) + 16)
      ?.style('pointer-events', 'none');

    // Node interactions
    node?.on('click', (event, d) => {
        event?.stopPropagation();
        onNodeSelect(d);
        
        // Highlight connected nodes
        const connectedNodes = new Set();
        filteredData?.links?.forEach(link => {
          if (link?.source?.id === d?.id) connectedNodes?.add(link?.target?.id);
          if (link?.target?.id === d?.id) connectedNodes?.add(link?.source?.id);
        });
        
        node?.style('opacity', n => n?.id === d?.id || connectedNodes?.has(n?.id) ? 1 : 0.3);
        link?.style('opacity', l => l?.source?.id === d?.id || l?.target?.id === d?.id ? 0.8 : 0.1);
        label?.style('opacity', n => n?.id === d?.id || connectedNodes?.has(n?.id) ? 1 : 0.3);
      })?.on('mouseover', (event, d) => {
        if (!selectedNode) {
          node?.style('opacity', n => n?.id === d?.id ? 1 : 0.7);
        }
      })?.on('mouseout', (event, d) => {
        if (!selectedNode) {
          node?.style('opacity', 1);
        }
      });

    // Clear selection on background click
    svg?.on('click', () => {
      if (selectedNode) {
        onNodeSelect(null);
        node?.style('opacity', 1);
        link?.style('opacity', 0.6);
        label?.style('opacity', 1);
      }
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event?.active) simulation?.alphaTarget(0.3)?.restart();
      d.fx = d?.x;
      d.fy = d?.y;
    }

    function dragged(event, d) {
      d.fx = event?.x;
      d.fy = event?.y;
    }

    function dragended(event, d) {
      if (!event?.active) simulation?.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Update positions on simulation tick
    simulation?.on('tick', () => {
      link?.attr('x1', d => d?.source?.x)?.attr('y1', d => d?.source?.y)?.attr('x2', d => d?.target?.x)?.attr('y2', d => d?.target?.y);

      node?.attr('cx', d => d?.x)?.attr('cy', d => d?.y);

      label?.attr('x', d => d?.x)?.attr('y', d => d?.y);
    });

    // Simulation end
    simulation?.on('end', () => {
      setIsLoading(false);
    });

    return () => {
      simulation?.stop();
    };
  }, [data, filters, searchQuery, dimensions, selectedNode, onNodeSelect]);

  return (
    <div className={`relative w-full h-full bg-card rounded-lg border border-border ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/80 z-10">
          <div className="flex items-center space-x-2">
            <div className="animate-spin">
              <Icon name="Loader2" size={20} className="text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Загрузка графа...</span>
          </div>
        </div>
      )}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="overflow-hidden"
      />
      {/* Graph controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => {
            const svg = d3?.select(svgRef?.current);
            svg?.transition()?.duration(750)?.call(
              d3?.zoom()?.transform,
              d3?.zoomIdentity
            );
          }}
          className="p-2 bg-card border border-border rounded-lg shadow-sm hover:bg-muted nav-transition"
          title="Сбросить масштаб"
        >
          <Icon name="Home" size={16} />
        </button>
        
        <button
          onClick={() => {
            const svg = d3?.select(svgRef?.current);
            svg?.transition()?.duration(300)?.call(
              d3?.zoom()?.scaleBy,
              1.5
            );
          }}
          className="p-2 bg-card border border-border rounded-lg shadow-sm hover:bg-muted nav-transition"
          title="Увеличить"
        >
          <Icon name="ZoomIn" size={16} />
        </button>
        
        <button
          onClick={() => {
            const svg = d3?.select(svgRef?.current);
            svg?.transition()?.duration(300)?.call(
              d3?.zoom()?.scaleBy,
              0.75
            );
          }}
          className="p-2 bg-card border border-border rounded-lg shadow-sm hover:bg-muted nav-transition"
          title="Уменьшить"
        >
          <Icon name="ZoomOut" size={16} />
        </button>
      </div>
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-sm">
        <h4 className="text-sm font-medium text-foreground mb-2">Легенда</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs text-muted-foreground">Навыки</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-xs text-muted-foreground">Курсы</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-xs text-muted-foreground">Вакансии</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-xs text-muted-foreground">Результаты</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;