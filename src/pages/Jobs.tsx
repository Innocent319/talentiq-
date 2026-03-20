import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Users,
  Briefcase,
  Plus,
  Search,
  MoreVertical,
  Building2,
  Calendar
} from 'lucide-react';
import { mockJobs } from '../data/mockData';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={onClick}
      className="card p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign size={14} />
          <span>${(job.salary.min / 1000).toFixed(0)}K - ${(job.salary.max / 1000).toFixed(0)}K</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase size={14} />
          <span className="capitalize">{job.type}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.requiredSkills.slice(0, 3).map((skill: string, index: number) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium"
          >
            {skill}
          </span>
        ))}
        {job.requiredSkills.length > 3 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{job.requiredSkills.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{(new Date(job.createdAt).toLocaleDateString())}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700">{job.candidateCount} candidates</span>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          job.status === 'active' ? 'bg-green-100 text-green-700' :
          job.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>
    </motion.div>
  );
};

export const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job: Job) => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requiredSkills.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const stats = {
    total: mockJobs.length,
    active: mockJobs.filter((j: Job) => j.status === 'active').length,
    paused: mockJobs.filter((j: Job) => j.status === 'paused').length,
    totalCandidates: mockJobs.reduce((sum: number, j: Job) => sum + (j.candidateCount || 0), 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Jobs</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your job postings and track applicants</p>
        </div>
        <button
          onClick={() => alert('Job creation modal coming soon!')}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} />
          <span>Post New Job</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Jobs', value: stats.total, icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
          { label: 'Active', value: stats.active, icon: Building2, color: 'bg-green-100 text-green-600' },
          { label: 'Paused', value: stats.paused, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
          { label: 'Total Candidates', value: stats.totalCandidates, icon: Users, color: 'bg-purple-100 text-purple-600' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jobs by title, company, or skills..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredJobs.map((job: Job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => {}}
          />
        ))}
      </motion.div>

      {filteredJobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
        </motion.div>
      )}
    </div>
  );
};
