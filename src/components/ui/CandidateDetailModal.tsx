import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Award,
  GraduationCap,
  Code,
  Star,
  MessageSquare,
  Download,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  FileText,
  ChevronRight,
  Edit2
} from 'lucide-react';
import type { Candidate, Job, Education, Experience, Project } from '../../types';
import { calculateCompatibilityScore, analyzeSkillGaps, generateCandidateSummary } from '../../utils/algorithms';

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  job?: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'overview' | 'experience' | 'skills' | 'projects' | 'analytics' | 'notes';

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({ 
  candidate, 
  job,
  isOpen, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen || !candidate) return null;

  const matchingResult = job ? calculateCompatibilityScore(candidate, job) : null;
  const skillGaps = job ? analyzeSkillGaps(candidate, job) : null;
  const aiSummary = generateCandidateSummary(candidate);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'notes', label: 'Notes', icon: MessageSquare },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                    {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
                    <p className="text-gray-600">{candidate.currentTitle} at {candidate.currentCompany}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {candidate.location}</span>
                      <span className="flex items-center gap-1"><Briefcase size={14} /> {candidate.yearsOfExperience} years</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> 
                        {candidate.availability === 'immediate' ? 'Available immediately' : 
                         candidate.availability === '2weeks' ? '2 weeks notice' : 
                         candidate.availability === '1month' ? '1 month notice' : '3 months notice'}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                        activeTab === tab.id 
                          ? 'text-primary-600 border-b-2 border-primary-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="card p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Star className="text-yellow-500" size={20} />
                            AI-Generated Summary
                          </h3>
                          <p className="text-gray-700 leading-relaxed">{aiSummary}</p>
                        </div>

                        <div className="card p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                          <div className="space-y-3">
                            <a href={`mailto:${candidate.email}`} className="flex items-center gap-3 text-gray-700 hover:text-primary-600">
                              <Mail size={18} />
                              {candidate.email}
                            </a>
                            <a href={`tel:${candidate.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-primary-600">
                              <Phone size={18} />
                              {candidate.phone}
                            </a>
                            <div className="flex items-center gap-3 text-gray-700">
                              <MapPin size={18} />
                              {candidate.location}
                            </div>
                          </div>
                        </div>

                        <div className="card p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
                          <div className="space-y-4">
                            {candidate.education.map((edu: Education, index: number) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="p-2 bg-primary-100 rounded-lg">
                                  <GraduationCap className="text-primary-600" size={18} />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h4>
                                  <p className="text-gray-600">{edu.institution}</p>
                                  <p className="text-sm text-gray-500">{edu.year}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {candidate.certifications.length > 0 && (
                          <div className="card p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
                            <div className="flex flex-wrap gap-2">
                              {candidate.certifications.map((cert: string, index: number) => (
                                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                                  <Award size={14} />
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        {matchingResult && (
                          <div className="card p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Score</h3>
                            <div className="text-center mb-6">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${
                                  matchingResult.score >= 80 ? 'bg-green-100' :
                                  matchingResult.score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                                }`}
                              >
                                <span className={`text-4xl font-bold ${
                                  matchingResult.score >= 80 ? 'text-green-600' :
                                  matchingResult.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {matchingResult.score}%
                                </span>
                              </motion.div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Skills Match</span>
                                  <span className="font-medium">{Math.round(matchingResult.breakdown.skillsMatch)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${matchingResult.breakdown.skillsMatch}%` }}
                                    className="h-2 bg-blue-500 rounded-full"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Experience</span>
                                  <span className="font-medium">{Math.round(matchingResult.breakdown.experienceMatch)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${matchingResult.breakdown.experienceMatch}%` }}
                                    className="h-2 bg-purple-500 rounded-full"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Industry Fit</span>
                                  <span className="font-medium">{Math.round(matchingResult.breakdown.industryRelevance)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${matchingResult.breakdown.industryRelevance}%` }}
                                    className="h-2 bg-orange-500 rounded-full"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Cultural Fit</span>
                                  <span className="font-medium">{Math.round(matchingResult.breakdown.culturalFit)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${matchingResult.breakdown.culturalFit}%` }}
                                    className="h-2 bg-green-500 rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {skillGaps && skillGaps.critical.length > 0 && (
                          <div className="card p-6 border-2 border-red-200">
                            <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                              <AlertCircle size={20} />
                              Skill Gaps
                            </h3>
                            <div className="space-y-3">
                              {skillGaps.critical.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-2">Critical Gaps:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {skillGaps.critical.map((skill: string, index: number) => (
                                      <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {skillGaps.preferred.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium text-gray-700 mb-2">Preferred:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {skillGaps.preferred.map((skill: string, index: number) => (
                                      <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="card p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Matched Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill: string, index: number) => (
                              <span 
                                key={index} 
                                className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'experience' && (
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                      {candidate.experience.map((exp: Experience, index: number) => (
                        <div key={index} className="relative pl-14 pb-8">
                          <div className="absolute left-4 w-5 h-5 rounded-full bg-primary-600 border-4 border-white shadow" />
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card p-6"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                                <p className="text-primary-600 font-medium">{exp.company}</p>
                              </div>
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                {exp.startDate} - {exp.endDate === 'Present' ? 'Present' : exp.endDate}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4">{exp.description}</p>
                            {exp.achievements.length > 0 && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700">Key Achievements:</h4>
                                <ul className="space-y-1">
                                  {exp.achievements.map((achievement: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                      <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {candidate.skills.map((skill: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="card p-4 flex items-center gap-4"
                        >
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                            <Code className="text-white" size={20} />
                          </div>
                          <span className="font-medium text-gray-900">{skill}</span>
                          <div className="ml-auto">
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <Star 
                                  key={level} 
                                  size={14} 
                                  className={level <= 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} 
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    {candidate.projects.map((project: Project, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                            <p className="text-gray-600">{project.description}</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            Impact: {project.impact}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Experience Score', value: 85, color: 'bg-blue-500' },
                        { label: 'Skills Match', value: matchingResult ? Math.round(matchingResult.breakdown.skillsMatch) : 75, color: 'bg-purple-500' },
                        { label: 'Growth Potential', value: 78, color: 'bg-green-500' },
                      ].map((metric, index) => (
                        <div key={index} className="card p-6 text-center">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">{metric.label}</h4>
                          <div className="relative w-24 h-24 mx-auto">
                            <svg className="w-24 h-24 transform -rotate-90">
                              <circle
                                cx="48"
                                cy="48"
                                r="40"
                                strokeWidth="8"
                                fill="none"
                                className="stroke-gray-200"
                              />
                              <motion.circle
                                cx="48"
                                cy="48"
                                r="40"
                                strokeWidth="8"
                                fill="none"
                                className={metric.color}
                                strokeDasharray={`${metric.value * 2.51} 251`}
                                initial={{ strokeDasharray: '0 251' }}
                                animate={{ strokeDasharray: `${metric.value * 2.51} 251` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-900">
                              {metric.value}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="card p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Trajectory</h3>
                      <div className="flex items-end justify-between h-40 px-4">
                        {candidate.experience.map((exp: Experience, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ height: 0 }}
                            animate={{ height: `${60 + index * 20}%` }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="w-16 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg flex items-end justify-center pb-2"
                          >
                            <span className="text-white text-xs font-medium">{exp.title.split(' ')[0]}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-6">
                    <div className="card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Team Notes</h3>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                          <Edit2 size={16} />
                          Add Note
                        </button>
                      </div>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add notes about this candidate..."
                        className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                      />
                    </div>

                    <div className="space-y-4">
                      {[
                        { author: 'John Smith', time: '2 hours ago', text: 'Strong technical background. Would be a great fit for the frontend team.' },
                        { author: 'Sarah Johnson', time: '5 hours ago', text: 'Interview scheduled for next Tuesday. Very enthusiastic about the role.' },
                        { author: 'Mike Brown', time: '1 day ago', text: 'Referred by a current employee. Recommended for priority review.' },
                      ].map((note, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="card p-4"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium text-sm">
                              {note.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium text-gray-900">{note.author}</span>
                            <span className="text-sm text-gray-500">{note.time}</span>
                          </div>
                          <p className="text-gray-600">{note.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download size={18} />
                    Export PDF
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <ExternalLink size={18} />
                    View Original
                  </button>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Reject
                  </button>
                  <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                    Move to Next Stage
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
