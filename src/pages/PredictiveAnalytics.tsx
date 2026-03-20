import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Award,
  Clock,
  Users,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const PredictiveAnalytics: React.FC = () => {
  const [selectedPrediction, setSelectedPrediction] = useState('success');

  const successProbabilityData = [
    { name: 'Sarah Chen', probability: 92, risk: 'Low', trend: 'up' },
    { name: 'Michael Rodriguez', probability: 85, risk: 'Low', trend: 'up' },
    { name: 'Emily Watson', probability: 78, risk: 'Medium', trend: 'stable' },
    { name: 'James Park', probability: 72, risk: 'Medium', trend: 'up' },
    { name: 'Lisa Thompson', probability: 88, risk: 'Low', trend: 'up' },
    { name: 'Alex Kim', probability: 65, risk: 'High', trend: 'down' },
  ];

  const performanceTrendData = [
    { month: 'Jan', predicted: 75, actual: 72, confidence: 85 },
    { month: 'Feb', predicted: 78, actual: 80, confidence: 88 },
    { month: 'Mar', predicted: 82, actual: 79, confidence: 90 },
    { month: 'Apr', predicted: 85, actual: null, confidence: 92 },
    { month: 'May', predicted: 87, actual: null, confidence: 88 },
    { month: 'Jun', predicted: 90, actual: null, confidence: 85 },
  ];

  const skillDemandData = [
    { skill: 'React', demand: 95, supply: 70, growth: 15 },
    { skill: 'Python', demand: 90, supply: 75, growth: 20 },
    { skill: 'AWS', demand: 88, supply: 55, growth: 25 },
    { skill: 'Node.js', demand: 82, supply: 68, growth: 10 },
    { skill: 'TypeScript', demand: 85, supply: 60, growth: 18 },
    { skill: 'Machine Learning', demand: 80, supply: 45, growth: 30 },
  ];

  const predictions = [
    {
      id: 'success',
      label: 'Success Prediction',
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      id: 'retention',
      label: 'Retention Risk',
      icon: Users,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    },
    {
      id: 'growth',
      label: 'Growth Trajectory',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      id: 'performance',
      label: 'Performance Forecast',
      icon: BarChart3,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Predictive Analytics</h2>
        <p className="text-sm text-gray-500 mt-1">AI-powered insights for smarter hiring decisions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          {predictions.map((pred) => {
            const Icon = pred.icon;
            return (
              <button
                key={pred.id}
                onClick={() => setSelectedPrediction(pred.id)}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  selectedPrediction === pred.id 
                    ? 'bg-white shadow-lg border-2 border-primary-500' 
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${pred.bg}`}>
                    <Icon className={pred.color} size={20} />
                  </div>
                  <span className="font-medium text-gray-900">{pred.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-3 space-y-6">
          {selectedPrediction === 'success' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Avg Success Probability', value: '84%', change: '+5%', trend: 'up' },
                  { label: 'High-Risk Candidates', value: '2', change: '-1', trend: 'up' },
                  { label: 'Prediction Accuracy', value: '91%', change: '+3%', trend: 'up' },
                ].map((stat, i) => (
                  <div key={i} className="card p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">{stat.label}</span>
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="text-green-500" size={18} />
                      ) : (
                        <ArrowDownRight className="text-red-500" size={18} />
                      )}
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} vs last month
                    </p>
                  </div>
                ))}
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Success Probability by Candidate</h3>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    <Sparkles size={14} />
                    AI-Powered
                  </div>
                </div>
                <div className="space-y-4">
                  {successProbabilityData.map((candidate, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{candidate.name}</span>
                          <span className={`text-sm font-medium ${
                            candidate.risk === 'Low' ? 'text-green-600' : 
                            candidate.risk === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {candidate.risk} Risk
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${candidate.probability}%` }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                            className={`h-3 rounded-full ${
                              candidate.probability >= 80 ? 'bg-green-500' :
                              candidate.probability >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{candidate.probability}%</span>
                        {candidate.trend === 'up' ? (
                          <TrendingUp className="text-green-500" size={20} />
                        ) : candidate.trend === 'down' ? (
                          <TrendingDown className="text-red-500" size={20} />
                        ) : (
                          <Activity className="text-gray-400" size={20} />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend Prediction</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                      strokeDasharray="5 5"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-blue-500 rounded" />
                    <span className="text-sm text-gray-600">Predicted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-green-500 rounded" />
                    <span className="text-sm text-gray-600">Actual</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedPrediction === 'skill' && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Demand Forecast</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillDemandData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Demand" dataKey="demand" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Radar name="Supply" dataKey="supply" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}

          {selectedPrediction === 'factors' && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Success Factors</h3>
              <div className="space-y-4">
                {[
                  { factor: 'Technical Skills Match', impact: '+25%', icon: Code, color: 'bg-blue-100 text-blue-600' },
                  { factor: 'Cultural Fit Assessment', impact: '+18%', icon: Users, color: 'bg-green-100 text-green-600' },
                  { factor: 'Career Growth Trajectory', impact: '+15%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
                  { factor: 'Interview Performance', impact: '+22%', icon: Award, color: 'bg-orange-100 text-orange-600' },
                  { factor: 'Salary Expectations', impact: '+12%', icon: Target, color: 'bg-red-100 text-red-600' },
                  { factor: 'Availability', impact: '+8%', icon: Clock, color: 'bg-gray-100 text-gray-600' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className={`p-3 rounded-lg ${item.color}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.factor}</h4>
                        <p className="text-sm text-gray-500">Impact on success probability</p>
                      </div>
                      <span className="text-lg font-bold text-green-600">{item.impact}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="text-primary-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
            <p className="text-sm text-gray-500">Automated recommendations based on historical data</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              type: 'success',
              title: 'High Success Probability',
              description: 'Lisa Thompson shows 88% success probability based on skill match, experience level, and career trajectory.',
              action: 'Fast-track to final interview'
            },
            { 
              type: 'warning',
              title: 'Retention Risk Detected',
              description: 'Alex Kim\'s salary expectations exceed budget by 15%. Consider negotiation or continue searching.',
              action: 'Review compensation package'
            },
            { 
              type: 'info',
              title: 'Growth Opportunity',
              description: 'Machine Learning skills show 30% YoY growth. Consider upskilling current team members.',
              action: 'View training recommendations'
            },
          ].map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border-2 ${
                insight.type === 'success' ? 'border-green-200 bg-green-50' :
                insight.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {insight.type === 'success' && <CheckCircle2 className="text-green-600" size={18} />}
                {insight.type === 'warning' && <AlertTriangle className="text-yellow-600" size={18} />}
                {insight.type === 'info' && <Sparkles className="text-blue-600" size={18} />}
                <h4 className="font-semibold text-gray-900">{insight.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
              <button className={`text-sm font-medium ${
                insight.type === 'success' ? 'text-green-700 hover:text-green-800' :
                insight.type === 'warning' ? 'text-yellow-700 hover:text-yellow-800' :
                'text-blue-700 hover:text-blue-800'
              }`}>
                {insight.action} →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Code = ({ size, className }: { size: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
