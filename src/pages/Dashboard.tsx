import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, TrendingUp, Target, Clock, Award, Calendar, X, ArrowRight, TrendingDown, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { mockCandidates, mockJobs } from '../data/mockData';

const experienceData = [
  { range: '0-2', count: 2 },
  { range: '3-5', count: 3 },
  { range: '6-8', count: 2 },
  { range: '9+', count: 1 },
];

const skillsData = [
  { skill: 'React', count: 4, demand: 7, trend: 'up' },
  { skill: 'Python', count: 3, demand: 5, trend: 'stable' },
  { skill: 'AWS', count: 3, demand: 6, trend: 'up' },
  { skill: 'TypeScript', count: 3, demand: 4, trend: 'down' },
  { skill: 'Node.js', count: 2, demand: 4, trend: 'stable' },
  { skill: 'Machine Learning', count: 1, demand: 3, trend: 'up' },
];

export const Dashboard: React.FC = () => {
  const totalCandidates = mockCandidates.length;
  const activeJobs = mockJobs.filter((j: any) => j.status === 'active').length;
  const avgScore = Math.round(
    mockCandidates.reduce((sum: number, c: any) => sum + (c.compatibilityScore || 0), 0) / totalCandidates
  );

  const stats = [
    { 
      icon: Users, 
      label: 'Total Candidates', 
      value: totalCandidates, 
      change: '+12%',
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    { 
      icon: Briefcase, 
      label: 'Active Jobs', 
      value: activeJobs, 
      change: '+3',
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    { 
      icon: Target, 
      label: 'Avg Match Score', 
      value: `${avgScore}%`, 
      change: '+5%',
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    { 
      icon: TrendingUp, 
      label: 'This Week', 
      value: '24', 
      change: '+8',
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={stat.color} size={24} />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Candidates by Experience</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-green-600">
                <div className="w-3 h-3 bg-green-500 rounded" />
                Ideal: 3-5 years
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={experienceData}>
              <XAxis dataKey="range" />
              <YAxis />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {experienceData.map((_entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 1 ? '#10b981' : '#3b82f6'} 
                  />
                ))}
              </Bar>
              <ReferenceLine x="3-5" stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Ideal Range', position: 'top', fill: '#10b981' }} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <span className="font-medium">Job Requirement:</span> 3-5 years experience preferred for most open positions
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills</h3>
          <div className="space-y-4">
            {skillsData.map((item: any, index: number) => {
              const gap = item.demand - item.count;
              const isHighDemand = gap > 1;
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                      {isHighDemand && (
                        <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs rounded flex items-center gap-1">
                          <AlertCircle size={10} />
                          High Demand
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {item.trend === 'up' && <TrendingUp size={14} className="text-green-500" />}
                      {item.trend === 'down' && <TrendingDown size={14} className="text-red-500" />}
                      {item.trend === 'stable' && <TrendingUp size={14} className="text-gray-400" />}
                      <span className="text-sm font-medium text-gray-600">
                        {item.count} vs {item.demand} roles
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / Math.max(item.demand, 1)) * 100}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className={`h-2 rounded-full ${isHighDemand ? 'bg-orange-500' : 'bg-primary-500'}`}
                      />
                    </div>
                    {gap > 0 && (
                      <span className="text-xs text-orange-600 font-medium whitespace-nowrap">
                        {gap} more needed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-3 h-3 bg-orange-500 rounded" />
              <span>High Demand (more roles than candidates)</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { 
              id: 1,
              icon: Users, 
              text: 'Sarah Chen applied to Senior Frontend Developer', 
              time: '2 hours ago', 
              color: 'bg-blue-100 text-blue-600',
              candidate: 'Sarah Chen',
              job: 'Senior Frontend Developer',
              actions: [
                { label: 'Schedule Interview', icon: Calendar, color: 'bg-primary-600 hover:bg-primary-700' },
                { label: 'View Profile', icon: Users, color: 'bg-gray-100 hover:bg-gray-200' }
              ]
            },
            { 
              id: 2,
              icon: Target, 
              text: 'New match: Michael Rodriguez for DevOps Engineer', 
              time: '4 hours ago', 
              color: 'bg-green-100 text-green-600',
              candidate: 'Michael Rodriguez',
              job: 'DevOps Engineer',
              actions: [
                { label: 'Schedule Interview', icon: Calendar, color: 'bg-primary-600 hover:bg-primary-700' },
                { label: 'Reject & Nurture', icon: X, color: 'bg-gray-100 hover:bg-gray-200' }
              ]
            },
            { 
              id: 3,
              icon: Award, 
              text: 'Emily Watson completed assessment', 
              time: '6 hours ago', 
              color: 'bg-purple-100 text-purple-600',
              candidate: 'Emily Watson',
              job: 'ML Engineer',
              actions: [
                { label: 'View Results', icon: Award, color: 'bg-primary-600 hover:bg-primary-700' },
                { label: 'Move to Next Stage', icon: ArrowRight, color: 'bg-green-100 hover:bg-green-200 text-green-700' }
              ]
            },
            { 
              id: 4,
              icon: Clock, 
              text: '3 candidates moved to interview stage', 
              time: '8 hours ago', 
              color: 'bg-orange-100 text-orange-600',
              candidate: null,
              job: null,
              actions: [
                { label: 'View All', icon: Users, color: 'bg-gray-100 hover:bg-gray-200' }
              ]
            },
          ].map((activity: any, index: number) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className={`p-3 rounded-xl ${activity.color}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  {activity.actions.map((action: any, i: number) => {
                    const ActionIcon = action.icon;
                    return (
                      <button
                        key={i}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-colors ${action.color}`}
                      >
                        <ActionIcon size={14} />
                        {action.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};
