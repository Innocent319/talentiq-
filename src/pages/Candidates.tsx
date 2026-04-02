import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter as FilterIcon, 
  Star, 
  Mail, 
  MapPin, 
  Briefcase,
  X,
  Eye,
  UserPlus,
  MoreVertical
} from 'lucide-react';
import { mockCandidates } from '../data/mockData';
import type { Candidate, FilterCriteria } from '../types';
import { filterCandidates, getAllSkills } from '../utils/algorithms';

interface CandidateCardProps {
  candidate: Candidate;
  onClick: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="card p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xl font-bold">
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.currentTitle}</p>
            <p className="text-xs text-gray-500">{candidate.currentCompany}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Star size={18} className={candidate.matchedJobs?.length ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'} />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{candidate.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase size={14} />
          <span>{candidate.yearsOfExperience} years</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {candidate.skills.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium"
          >
            {skill}
          </span>
        ))}
        {candidate.skills.length > 4 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{candidate.skills.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500">Match Score</div>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${candidate.compatibilityScore || 0}%` }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`h-2 rounded-full ${
                (candidate.compatibilityScore || 0) >= 80 ? 'bg-green-500' :
                (candidate.compatibilityScore || 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            />
          </div>
          <span className="text-sm font-bold text-gray-900">{candidate.compatibilityScore || 0}%</span>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="flex gap-2"
        >
          <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
            <Mail size={16} />
          </button>
          <button className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors">
            <UserPlus size={16} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Candidates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [sortBy, setSortBy] = useState<'score' | 'experience' | 'name'>('score');

  const allSkills = useMemo(() => getAllSkills(mockCandidates), []);

  const filteredCandidates = useMemo(() => {
    const candidates = filterCandidates(mockCandidates, { ...filters, search: searchTerm });
    
    switch (sortBy) {
      case 'score':
        return candidates.sort((a: Candidate, b: Candidate) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));
      case 'experience':
        return candidates.sort((a: Candidate, b: Candidate) => b.yearsOfExperience - a.yearsOfExperience);
      case 'name':
        return candidates.sort((a: Candidate, b: Candidate) => a.name.localeCompare(b.name));
      default:
        return candidates;
    }
  }, [filters, searchTerm, sortBy]);

  const handleSkillFilter = (skill: string) => {
    setFilters((prev: FilterCriteria) => ({
      ...prev,
      skills: prev.skills?.includes(skill)
        ? prev.skills.filter((s: string) => s !== skill)
        : [...(prev.skills || []), skill]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Candidates</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, title, skills, or company..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-6 py-3 rounded-xl border transition-all flex items-center gap-2 ${
            showFilters || Object.keys(filters).some(k => filters[k as keyof FilterCriteria]) 
              ? 'bg-primary-50 border-primary-500 text-primary-700' 
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <FilterIcon size={20} />
          <span>Filters</span>
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'score' | 'experience' | 'name')}
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="score">Sort by Match</option>
          <option value="experience">Sort by Experience</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="card p-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {allSkills.slice(0, 15).map((skill: string) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillFilter(skill)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        filters.skills?.includes(skill)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Experience</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    onChange={(e) => setFilters((prev: FilterCriteria) => ({
                      ...prev,
                      experience: { ...prev.experience, min: Number(e.target.value) }
                    }))}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    onChange={(e) => setFilters((prev: FilterCriteria) => ({
                      ...prev,
                      experience: { ...prev.experience, max: Number(e.target.value) }
                    }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Availability</label>
                <div className="flex flex-wrap gap-2">
                  {['immediate', '2weeks', '1month', '3months'].map((avail) => (
                    <button
                      key={avail}
                      onClick={() => setFilters((prev: FilterCriteria) => ({
                        ...prev,
                        availability: prev.availability?.includes(avail)
                          ? prev.availability.filter((a: string) => a !== avail)
                          : [...(prev.availability || []), avail]
                      }))}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        filters.availability?.includes(avail)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {avail}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {Object.values(filters).some(v => v && (Array.isArray(v) ? v.length > 0 : true)) && (
              <button
                onClick={() => setFilters({})}
                className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                <X size={14} />
                Clear all filters
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredCandidates.map((candidate: Candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onClick={() => {}}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredCandidates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">No candidates found matching your criteria</p>
        </motion.div>
      )}
    </div>
  );
};
