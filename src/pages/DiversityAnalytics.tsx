import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  Globe,
  User,
  UserCheck,
  UserX
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

export const DiversityAnalytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('gender');
  const [blindMode, setBlindMode] = useState(false);

  const genderData = [
    { name: 'Male', value: 58, fill: '#3b82f6' },
    { name: 'Female', value: 35, fill: '#ec4899' },
    { name: 'Non-Binary', value: 5, fill: '#8b5cf6' },
    { name: 'Prefer not to say', value: 2, fill: '#94a3b8' },
  ];

  const ethnicityData = [
    { name: 'Asian', value: 28, fill: '#f59e0b' },
    { name: 'White', value: 42, fill: '#e2e8f0' },
    { name: 'Hispanic/Latino', value: 15, fill: '#10b981' },
    { name: 'Black', value: 10, fill: '#8b5cf6' },
    { name: 'Other', value: 5, fill: '#06b6d4' },
  ];

  const ageData = [
    { name: '18-24', value: 8 },
    { name: '25-34', value: 42 },
    { name: '35-44', value: 32 },
    { name: '45-54', value: 12 },
    { name: '55+', value: 6 },
  ];

  const pipelineDiversityData = [
    { stage: 'Applied', male: 58, female: 35, other: 7 },
    { stage: 'Screened', male: 55, female: 38, other: 7 },
    { stage: 'Interviewed', male: 52, female: 40, other: 8 },
    { stage: 'Offered', male: 50, female: 43, other: 7 },
    { stage: 'Hired', male: 48, female: 45, other: 7 },
  ];

  const metrics = [
    { 
      id: 'gender', 
      label: 'Gender Distribution', 
      icon: Users,
      data: genderData,
      goal: 50,
      current: 35,
      status: 'below'
    },
    { 
      id: 'ethnicity', 
      label: 'Ethnic Diversity', 
      icon: Globe,
      data: ethnicityData,
      goal: 30,
      current: 58,
      status: 'on-track'
    },
    { 
      id: 'age', 
      label: 'Age Distribution', 
      icon: BarChart3,
      data: ageData,
      goal: null,
      current: null,
      status: 'balanced'
    },
  ];

  const pipelineStages = [
    { name: 'Applied', count: 150, diversity: 72 },
    { name: 'Screened', count: 85, diversity: 75 },
    { name: 'Phone Interview', count: 42, diversity: 78 },
    { name: 'Technical Interview', count: 25, diversity: 80 },
    { name: 'Final Interview', count: 15, diversity: 82 },
    { name: 'Offer', count: 8, diversity: 85 },
    { name: 'Hired', count: 5, diversity: 88 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Diversity Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Track and improve diversity metrics across your hiring pipeline</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Blind Mode</span>
            <button
              onClick={() => setBlindMode(!blindMode)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                blindMode ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: blindMode ? 28 : 4 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      <div className="card p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Eye className="text-purple-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Blind Recruitment Mode {blindMode ? 'Enabled' : 'Disabled'}</h3>
            <p className="text-sm text-gray-600">
              {blindMode 
                ? 'Personal information is hidden to reduce unconscious bias in screening.'
                : 'Enable blind mode to hide names, photos, and other identifying information during initial review.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Icon className="text-primary-600" size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{metric.label}</h3>
                </div>
                <button
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedMetric === metric.id 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  View Details
                </button>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={metric.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {metric.data.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              {metric.goal && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">vs Goal: {metric.goal}%</span>
                    <span className={`text-sm font-medium ${
                      metric.status === 'on-track' ? 'text-green-600' :
                      metric.status === 'below' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.status === 'on-track' && <CheckCircle size={14} className="inline mr-1" />}
                      {metric.status === 'below' && <AlertTriangle size={14} className="inline mr-1" />}
                      {metric.current}% {metric.status === 'on-track' ? 'Above' : 'Current'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((metric.current / 100) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                      className={`h-2 rounded-full ${
                        metric.status === 'on-track' ? 'bg-green-500' :
                        metric.status === 'below' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Diversity by Pipeline Stage</h3>
        <p className="text-sm text-gray-500 mb-6">Track how diversity changes through each stage of your hiring process</p>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pipelineDiversityData}>
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="male" name="Male" fill="#3b82f6" stackId="a" />
            <Bar dataKey="female" name="Female" fill="#ec4899" stackId="a" />
            <Bar dataKey="other" name="Other" fill="#8b5cf6" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Funnel with Diversity</h3>
        <div className="space-y-3">
          {pipelineStages.map((stage, index) => (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4"
            >
              <div className="w-32 text-sm font-medium text-gray-700">{stage.name}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stage.count / pipelineStages[0].count) * 100}%` }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="h-full bg-primary-500 rounded-full flex items-center justify-end pr-3"
                >
                  <span className="text-white text-sm font-medium">{stage.count}</span>
                </motion.div>
              </div>
              <div className="w-24 text-right">
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stage.diversity >= 80 ? 'bg-green-100 text-green-700' :
                  stage.diversity >= 60 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {stage.diversity >= 80 && <UserCheck size={12} />}
                  {stage.diversity < 60 && <UserX size={12} />}
                  {stage.diversity >= 60 && stage.diversity < 80 && <User size={12} />}
                  {stage.diversity}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Diversity Goals</h3>
          <div className="space-y-4">
            {[
              { goal: 'Women in Tech Roles', target: 40, current: 35, deadline: 'Q2 2024' },
              { goal: 'Underrepresented Minorities', target: 30, current: 25, deadline: 'Q4 2024' },
              { goal: 'Leadership Diversity', target: 35, current: 28, deadline: 'Q1 2025' },
            ].map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{item.goal}</span>
                  <span className="text-sm text-gray-500">Deadline: {item.deadline}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.current / item.target) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-3 bg-primary-500 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-20 text-right">
                    {item.current}/{item.target}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Items</h3>
          <div className="space-y-3">
            {[
              { action: 'Review job descriptions for biased language', priority: 'high', status: 'pending' },
              { action: 'Expand sourcing to diverse talent pools', priority: 'high', status: 'in-progress' },
              { action: 'Implement structured interviews', priority: 'medium', status: 'completed' },
              { action: 'Add diversity training for hiring managers', priority: 'medium', status: 'pending' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  item.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                }`} />
                <span className="flex-1 text-sm text-gray-700">{item.action}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'completed' ? 'bg-green-100 text-green-700' :
                  item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {item.status === 'completed' && <CheckCircle size={12} className="inline mr-1" />}
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
