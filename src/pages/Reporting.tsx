import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText,
  Download,
  Calendar,
  Briefcase,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Mail,
  Plus,
  Share2,
  Printer,
  Settings,
  BarChart,
  PieChart as PieChartIcon,
  LineChart,
  Table
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'hiring' | 'pipeline' | 'performance' | 'diversity' | 'custom';
  description: string;
  lastGenerated: Date;
  schedule: 'daily' | 'weekly' | 'monthly' | 'on-demand';
  recipients: number;
}

interface CustomReport {
  id: string;
  name: string;
  metrics: string[];
  filters: string[];
  visualization: 'bar' | 'line' | 'pie' | 'table';
}

export const Reporting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'custom' | 'scheduled'>('templates');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState('last30');

  const reportTemplates: Report[] = [
    {
      id: '1',
      name: 'Hiring Pipeline Report',
      type: 'pipeline',
      description: 'Overview of candidates in each stage of the hiring funnel',
      lastGenerated: new Date('2024-03-19'),
      schedule: 'weekly',
      recipients: 5
    },
    {
      id: '2',
      name: 'Time to Hire Analysis',
      type: 'performance',
      description: 'Average time to fill positions by department and role',
      lastGenerated: new Date('2024-03-18'),
      schedule: 'monthly',
      recipients: 3
    },
    {
      id: '3',
      name: 'Source Effectiveness',
      type: 'hiring',
      description: 'Track which recruiting sources yield the best candidates',
      lastGenerated: new Date('2024-03-17'),
      schedule: 'weekly',
      recipients: 2
    },
    {
      id: '4',
      name: 'Diversity Metrics',
      type: 'diversity',
      description: 'Diversity breakdown of candidates at each pipeline stage',
      lastGenerated: new Date('2024-03-15'),
      schedule: 'monthly',
      recipients: 4
    },
    {
      id: '5',
      name: 'Quality of Hire',
      type: 'performance',
      description: 'Performance metrics of recently hired candidates',
      lastGenerated: new Date('2024-03-10'),
      schedule: 'monthly',
      recipients: 6
    },
  ];

  const customReports: CustomReport[] = [
    { id: '1', name: 'Frontend Candidates Analysis', metrics: ['match_score', 'experience', 'skills'], filters: ['skills', 'location'], visualization: 'bar' },
    { id: '2', name: 'Weekly New Applications', metrics: ['count', 'source'], filters: ['date'], visualization: 'line' },
    { id: '3', name: 'Skills Distribution', metrics: ['skills_count'], filters: ['department'], visualization: 'pie' },
  ];

  const reportTypes = [
    { id: 'hiring', label: 'Hiring', icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
    { id: 'pipeline', label: 'Pipeline', icon: BarChart3, color: 'bg-purple-100 text-purple-600' },
    { id: 'performance', label: 'Performance', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
    { id: 'diversity', label: 'Diversity', icon: Users, color: 'bg-orange-100 text-orange-600' },
  ];

  const metrics = [
    { id: 'total_candidates', label: 'Total Candidates', category: 'candidates' },
    { id: 'new_applications', label: 'New Applications', category: 'candidates' },
    { id: 'avg_match_score', label: 'Avg. Match Score', category: 'matching' },
    { id: 'time_to_hire', label: 'Time to Hire', category: 'performance' },
    { id: 'offer_acceptance', label: 'Offer Acceptance Rate', category: 'performance' },
    { id: 'diversity_score', label: 'Diversity Score', category: 'diversity' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Generate and schedule custom reports</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} />
          Create Report
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        {[
          { id: 'templates', label: 'Report Templates', icon: FileText },
          { id: 'custom', label: 'Custom Reports', icon: Settings },
          { id: 'scheduled', label: 'Scheduled Reports', icon: Calendar },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === tab.id 
                ? 'text-primary-600 border-primary-600' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
              <option value="year">This year</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTemplates.map((report, index) => {
              const typeInfo = reportTypes.find(t => t.id === report.type);
              const TypeIcon = typeInfo?.icon || FileText;
              
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${typeInfo?.color || 'bg-gray-100 text-gray-600'}`}>
                      <TypeIcon size={24} />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.schedule === 'daily' ? 'bg-green-100 text-green-700' :
                      report.schedule === 'weekly' ? 'bg-blue-100 text-blue-700' :
                      report.schedule === 'monthly' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {report.schedule}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {report.lastGenerated.toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail size={12} />
                      {report.recipients} recipients
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      <Download size={16} />
                      Generate
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Share2 size={16} />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Printer size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'custom' && (
        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Custom Report</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Name</label>
                <input
                  type="text"
                  placeholder="e.g., Monthly Hiring Summary"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Metrics</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {metrics.map((metric) => (
                    <label
                      key={metric.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedMetrics.includes(metric.id)
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(metric.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMetrics([...selectedMetrics, metric.id]);
                          } else {
                            setSelectedMetrics(selectedMetrics.filter(m => m !== metric.id));
                          }
                        }}
                        className="w-4 h-4 text-primary-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-900">{metric.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Visualization Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'bar', icon: BarChart, label: 'Bar Chart' },
                    { id: 'line', icon: LineChart, label: 'Line Chart' },
                    { id: 'pie', icon: PieChartIcon, label: 'Pie Chart' },
                    { id: 'table', icon: Table, label: 'Table' },
                  ].map((viz) => {
                    const Icon = viz.icon;
                    return (
                      <button
                        key={viz.id}
                        className="flex items-center gap-2 p-3 rounded-lg border-2 border-gray-200 hover:border-primary-500 transition-colors"
                      >
                        <Icon size={18} className="text-gray-600" />
                        <span className="text-sm font-medium">{viz.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This year</option>
                  <option>Custom range</option>
                </select>
              </div>

              <button className="w-full px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                Generate Report
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Custom Reports</h3>
            <div className="space-y-3">
              {customReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      {report.visualization === 'bar' && <BarChart className="text-primary-600" size={20} />}
                      {report.visualization === 'line' && <LineChart className="text-primary-600" size={20} />}
                      {report.visualization === 'pie' && <PieChartIcon className="text-primary-600" size={20} />}
                      {report.visualization === 'table' && <Table className="text-primary-600" size={20} />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{report.name}</h4>
                      <p className="text-xs text-gray-500">
                        {report.metrics.length} metrics • {report.filters.length} filters
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                      Run
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Edit
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'scheduled' && (
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Scheduled Reports</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <Plus size={16} />
                Add Schedule
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Weekly Hiring Pipeline', schedule: 'Every Monday at 9 AM', lastRun: 'Mar 18, 2024', nextRun: 'Mar 25, 2024', recipients: 5 },
                { name: 'Monthly Diversity Report', schedule: '1st of each month', lastRun: 'Mar 1, 2024', nextRun: 'Apr 1, 2024', recipients: 3 },
                { name: 'Quarterly Performance Review', schedule: 'Quarterly', lastRun: 'Jan 1, 2024', nextRun: 'Apr 1, 2024', recipients: 8 },
              ].map((schedule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{schedule.name}</h4>
                    <p className="text-sm text-gray-600">{schedule.schedule}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>Last: {schedule.lastRun}</span>
                      <span>Next: {schedule.nextRun}</span>
                      <span>{schedule.recipients} recipients</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <Settings size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Report</h2>
            <p className="text-gray-600">Custom report builder coming soon...</p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="mt-6 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
