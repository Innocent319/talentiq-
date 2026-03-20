import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, TrendingUp, Target, Clock, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { mockCandidates, mockJobs } from '../data/mockData';

const experienceData = [
  { range: '0-2', count: 2 },
  { range: '3-5', count: 3 },
  { range: '6-8', count: 2 },
  { range: '9+', count: 1 },
];

const skillsData = [
  { skill: 'React', count: 4 },
  { skill: 'Python', count: 3 },
  { skill: 'AWS', count: 3 },
  { skill: 'TypeScript', count: 3 },
  { skill: 'Node.js', count: 2 },
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidates by Experience</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={experienceData}>
              <XAxis dataKey="range" />
              <YAxis />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills</h3>
          <div className="space-y-4">
            {skillsData.map((item: any, index: number) => (
              <div key={index} className="flex items-center gap-4">
                <span className="w-24 text-sm font-medium text-gray-700">{item.skill}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.count / 5) * 100}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="h-2 bg-primary-500 rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 w-8">{item.count}</span>
              </div>
            ))}
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
        <div className="space-y-4">
          {[
            { icon: Users, text: 'Sarah Chen applied to Senior Frontend Developer', time: '2 hours ago', color: 'bg-blue-100 text-blue-600' },
            { icon: Target, text: 'New match: Michael Rodriguez for DevOps Engineer', time: '4 hours ago', color: 'bg-green-100 text-green-600' },
            { icon: Award, text: 'Emily Watson completed assessment', time: '6 hours ago', color: 'bg-purple-100 text-purple-600' },
            { icon: Clock, text: '3 candidates moved to interview stage', time: '8 hours ago', color: 'bg-orange-100 text-orange-600' },
          ].map((activity: any, index: number) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-lg ${activity.color}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};
