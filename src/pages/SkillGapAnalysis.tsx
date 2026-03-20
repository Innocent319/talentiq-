import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Target,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { mockCandidates, mockJobs } from '../data/mockData';
import { analyzeSkillGaps } from '../utils/algorithms';

export const SkillGapAnalysis: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<string>('');

  const skillGaps = React.useMemo(() => {
    const allSkills = new Map<string, { demand: number; supply: number }>();
    
    mockJobs.forEach(job => {
      job.requiredSkills.forEach(skill => {
        const existing = allSkills.get(skill) || { demand: 0, supply: 0 };
        allSkills.set(skill, { ...existing, demand: existing.demand + 1 });
      });
    });

    mockCandidates.forEach(candidate => {
      candidate.skills.forEach(skill => {
        const existing = allSkills.get(skill) || { demand: 0, supply: 0 };
        allSkills.set(skill, { ...existing, supply: existing.supply + 1 });
      });
    });

    return Array.from(allSkills.entries()).map(([skill, data]) => ({
      skill,
      demandCount: data.demand,
      supplyCount: data.supply,
      gap: data.demand - data.supply,
      trend: data.demand > data.supply ? 'up' as const : data.demand < data.supply ? 'down' as const : 'stable' as const
    })).sort((a, b) => b.gap - a.gap);
  }, []);

  const analysis = selectedCandidate && selectedJob 
    ? analyzeSkillGaps(
        mockCandidates.find(c => c.id === selectedCandidate)!,
        mockJobs.find(j => j.id === selectedJob)!
      )
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Skill Gap Analysis</h2>
        <p className="text-sm text-gray-500 mt-1">Analyze market demand vs candidate supply for skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Skill Gaps</h3>
          <p className="text-sm text-gray-500 mb-4">
            Skills with positive gap have more demand than supply in the market
          </p>
          <div className="space-y-3">
            {skillGaps.slice(0, 10).map((sg, index) => (
              <motion.div
                key={sg.skill}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{sg.skill}</span>
                  <div className="flex items-center gap-2">
                    {sg.trend === 'up' && <TrendingUp size={16} className="text-red-500" />}
                    {sg.trend === 'down' && <TrendingDown size={16} className="text-green-500" />}
                    {sg.trend === 'stable' && <Minus size={16} className="text-gray-400" />}
                    <span className={`text-sm font-medium ${
                      sg.gap > 0 ? 'text-red-600' : sg.gap < 0 ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {sg.gap > 0 ? '+' : ''}{sg.gap}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>Demand: {sg.demandCount} jobs</span>
                  <span>Supply: {sg.supplyCount} candidates</span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(sg.supplyCount / Math.max(sg.demandCount, 1)) * 100}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Gap Analysis</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Candidate</label>
              <select
                value={selectedCandidate}
                onChange={(e) => setSelectedCandidate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="">Choose...</option>
                {mockCandidates.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Job</label>
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="">Choose...</option>
                {mockJobs.map(j => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>
            </div>
          </div>

          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="text-red-600" size={20} />
                  <h4 className="font-semibold text-red-900">Critical Skill Gaps</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.critical.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
                {analysis.critical.length === 0 && (
                  <p className="text-sm text-red-600">Candidate meets all critical requirements!</p>
                )}
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="text-yellow-600" size={20} />
                  <h4 className="font-semibold text-yellow-900">Preferred Skill Gaps</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.preferred.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {!selectedCandidate && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="mx-auto mb-2 text-gray-300" size={48} />
              <p>Select a candidate and job to see skill gap analysis</p>
            </div>
          )}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              title: 'Cloud Technologies',
              description: 'AWS, GCP, Azure skills are in high demand with limited supply',
              resources: 24,
              icon: Cloud
            },
            { 
              title: 'Machine Learning',
              description: 'ML/AI skills becoming essential across all roles',
              resources: 18,
              icon: Brain
            },
            { 
              title: 'System Design',
              description: 'Architecture and design patterns for senior roles',
              resources: 15,
              icon: Architecture
            },
          ].map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <BookOpen size={18} className="text-primary-600" />
                </div>
                <h4 className="font-medium text-gray-900">{rec.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{rec.resources} resources available</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Cloud = ({ size, className }: { size: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
  </svg>
);

const Brain = ({ size, className }: { size: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 4.5a2.5 2.5 0 00-4.96-.46 2.5 2.5 0 00-1.98 3 2.5 2.5 0 00.47 4.97v.04a2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00.47-4.97v-.04a2.5 2.5 0 00-1.98-3 2.5 2.5 0 00-4.96.44" />
    <path d="M12 4.5a2.5 2.5 0 014.96-.46 2.5 2.5 0 011.98 3 2.5 2.5 0 00-.47 4.97v.04a2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 01-.47-4.97v-.04a2.5 2.5 0 011.98-3 2.5 2.5 0 014.96-.44" />
    <path d="M12 4.5v16" />
  </svg>
);

const Architecture = ({ size, className }: { size: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);
