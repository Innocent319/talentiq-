import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap,
  Award,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

const matchTrendData = [
  { month: 'Jan', matches: 12, quality: 85 },
  { month: 'Feb', matches: 18, quality: 87 },
  { month: 'Mar', matches: 24, quality: 89 },
  { month: 'Apr', matches: 22, quality: 88 },
  { month: 'May', matches: 28, quality: 91 },
  { month: 'Jun', matches: 32, quality: 92 },
];

const skillsMatchData = [
  { skill: 'React', matchRate: 92 },
  { skill: 'Python', matchRate: 88 },
  { skill: 'AWS', matchRate: 85 },
  { skill: 'Node.js', matchRate: 82 },
  { skill: 'TypeScript', matchRate: 90 },
  { skill: 'Machine Learning', matchRate: 78 },
];

const candidateQualityData = [
  { name: 'Excellent', value: 35 },
  { name: 'Good', value: 45 },
  { name: 'Average', value: 15 },
  { name: 'Below', value: 5 },
];

const pipelineData = [
  { stage: 'Applied', count: 120, fill: '#3b82f6' },
  { stage: 'Screened', count: 85, fill: '#8b5cf6' },
  { stage: 'Interviewed', count: 42, fill: '#ec4899' },
  { stage: 'Offered', count: 12, fill: '#10b981' },
  { stage: 'Hired', count: 8, fill: '#059669' },
];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Track performance metrics and hiring insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            icon: Target, 
            label: 'Match Rate', 
            value: '87%', 
            change: '+5%',
            trend: 'up',
            color: 'text-green-600',
            bg: 'bg-green-100'
          },
          { 
            icon: Zap, 
            label: 'Avg. Time to Hire', 
            value: '18 days', 
            change: '-3 days',
            trend: 'up',
            color: 'text-blue-600',
            bg: 'bg-blue-100'
          },
          { 
            icon: Award, 
            label: 'Quality of Hire', 
            value: '4.2/5', 
            change: '+0.3',
            trend: 'up',
            color: 'text-purple-600',
            bg: 'bg-purple-100'
          },
          { 
            icon: TrendingUp, 
            label: 'Retention Rate', 
            value: '94%', 
            change: '+2%',
            trend: 'up',
            color: 'text-orange-600',
            bg: 'bg-orange-100'
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={stat.color} size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.change}
                </div>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={matchTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="matches" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="quality" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Match Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillsMatchData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Match Rate" dataKey="matchRate" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Quality</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={candidateQualityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {candidateQualityData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiring Pipeline</h3>
          <div className="space-y-4">
            {pipelineData.map((stage, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-gray-700">{stage.stage}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stage.count / pipelineData[0].count) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="h-full rounded-full flex items-center justify-end pr-3"
                    style={{ backgroundColor: stage.fill }}
                  >
                    <span className="text-white text-sm font-bold">{stage.count}</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              title: 'Skills Gap Analysis',
              description: '42% of candidates lack cloud certifications. Consider adding cloud training to onboarding.',
              icon: TrendingUp,
              color: 'bg-blue-100 text-blue-600'
            },
            { 
              title: 'Diversity Initiative',
              description: 'Currently 35% diverse hires. Expand sourcing channels to improve representation.',
              icon: Users,
              color: 'bg-purple-100 text-purple-600'
            },
            { 
              title: 'Time to Hire',
              description: 'Technical interviews taking 15% longer than target. Consider structured interview formats.',
              icon: Zap,
              color: 'bg-orange-100 text-orange-600'
            },
          ].map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className={`w-10 h-10 rounded-lg ${insight.color} flex items-center justify-center mb-3`}>
                  <Icon size={20} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
