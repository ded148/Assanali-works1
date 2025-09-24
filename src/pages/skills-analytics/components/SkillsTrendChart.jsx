import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SkillsTrendChart = ({ data, selectedSkills, onSkillToggle }) => {
  const colors = ['#1E40AF', '#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.dataKey}:</span>
              <span className="font-medium text-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-elevation">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Тренды спроса на навыки
          </h3>
          <p className="text-sm text-muted-foreground">
            Изменение спроса на ключевые навыки за последние 12 месяцев
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
          {Object.keys(data?.[0] || {})?.filter(key => key !== 'month')?.map((skill, index) => (
            <button
              key={skill}
              onClick={() => onSkillToggle(skill)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedSkills?.includes(skill)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              style={selectedSkills?.includes(skill) ? { backgroundColor: colors?.[index % colors?.length] } : {}}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {selectedSkills?.map((skill, index) => (
              <Line
                key={skill}
                type="monotone"
                dataKey={skill}
                stroke={colors?.[index % colors?.length]}
                strokeWidth={2}
                dot={{ fill: colors?.[index % colors?.length], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: colors?.[index % colors?.length], strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillsTrendChart;