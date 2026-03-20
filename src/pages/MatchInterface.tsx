import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Star, 
  Mail, 
  MapPin, 
  Briefcase,
  UserPlus,
  MoreVertical,
  Target,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import { mockCandidates, mockJobs } from '../data/mockData';
import type { Candidate, Job } from '../types';
import { rankCandidatesByJob } from '../utils/algorithms';
import { CandidateDetailModal } from '../components/ui/CandidateDetailModal';

export const MatchInterface: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showCandidateDetail, setShowCandidateDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'experience' | 'name'>('score');
  const [minScore, setMinScore] = useState(0);

  const rankedCandidates = useMemo(() => {
    if (!selectedJob) return [];
    return rankCandidatesByJob(mockCandidates, selectedJob).filter(r => r.score >= minScore);
  }, [selectedJob, minScore]);

  const filteredRanked = useMemo(() => {
    if (!searchTerm) return rankedCandidates;
    return rankedCandidates.filter(r => {
      const candidate = mockCandidates.find(c => c.id === r.candidateId);
      return candidate?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             candidate?.currentTitle.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [rankedCandidates, searchTerm]);

  const getCandidate = (id: string) => mockCandidates.find(c => c.id === id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Candidate-Job Matching</h2>
          <p className="text-sm text-gray-500 mt-1">Find the best candidates for your open positions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="card p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Select a Job</h3>
            <div className="space-y-2">
              {mockJobs.filter(j => j.status === 'active').map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedJob?.id === job.id 
                      ? 'bg-primary-50 border-2 border-primary-500' 
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <span className="px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600">
                      {job.candidateCount} candidates
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {job.requiredSkills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white text-primary-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedJob && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-4"
            >
              <h3 className="font-semibold text-gray-900 mb-3">Filter Results</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Match Score</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    value={minScore}
                    onChange={(e) => setMinScore(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span className="font-medium text-primary-600">{minScore}%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  >
                    <option value="score">Match Score</option>
                    <option value="experience">Experience</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedJob ? (
            <div className="space-y-4">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Matching Candidates</h3>
                    <p className="text-sm text-gray-500">
                      {filteredRanked.length} candidates match "{selectedJob.title}"
                    </p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search candidates..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    <CheckCircle size={14} />
                    {filteredRanked.filter(r => r.score >= 80).length} Strong Match
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    <Target size={14} />
                    {filteredRanked.filter(r => r.score >= 60 && r.score < 80).length} Good Match
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    <Clock size={14} />
                    {filteredRanked.filter(r => r.score < 60).length} Needs Review
                  </div>
                </div>
              </div>

              <AnimatePresence mode="popLayout">
                {filteredRanked.map((result) => {
                  const candidate = getCandidate(result.candidateId);
                  if (!candidate) return null;
                  
                  return (
                    <motion.div
                      key={result.candidateId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="card p-6 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        setShowCandidateDetail(true);
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-lg font-bold">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div 
                            className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white ${
                              result.score >= 80 ? 'bg-green-500' :
                              result.score >= 60 ? 'bg-yellow-500' : 'bg-gray-500'
                            }`}
                          >
                            {result.score}%
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{candidate.name}</h4>
                              <p className="text-gray-600">{candidate.currentTitle} at {candidate.currentCompany}</p>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                                <Mail size={18} />
                              </button>
                              <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200">
                                <UserPlus size={18} />
                              </button>
                              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                                <MoreVertical size={18} />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><MapPin size={14} /> {candidate.location}</span>
                            <span className="flex items-center gap-1"><Briefcase size={14} /> {candidate.yearsOfExperience} years</span>
                            <span className="flex items-center gap-1">
                              <Star size={14} className={candidate.availability === 'immediate' ? 'text-green-500' : ''} /> 
                              {candidate.availability === 'immediate' ? 'Available Now' : candidate.availability}
                            </span>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-gray-700">Skill Match</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-md">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.breakdown.skillsMatch}%` }}
                                  transition={{ duration: 0.5 }}
                                  className="h-2 bg-blue-500 rounded-full"
                                />
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {result.matchedSkills.slice(0, 5).map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                              {result.missingSkills.slice(0, 3).map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filteredRanked.length === 0 && (
                <div className="text-center py-12">
                  <Users className="mx-auto mb-4 text-gray-300" size={48} />
                  <p className="text-gray-500">No candidates match your criteria</p>
                </div>
              )}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <Target className="mx-auto mb-4 text-gray-300" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Job to Start Matching</h3>
              <p className="text-gray-500">Choose a job from the left panel to see matching candidates</p>
            </div>
          )}
        </div>
      </div>

      <CandidateDetailModal
        candidate={selectedCandidate}
        job={selectedJob}
        isOpen={showCandidateDetail}
        onClose={() => setShowCandidateDetail(false)}
      />
    </div>
  );
};
