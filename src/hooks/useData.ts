import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Candidate, Job, FilterCriteria, FilterPreset } from '../types';
import { mockCandidates, mockJobs, mockFilterPresets } from '../data/mockData';
import { filterCandidates, rankCandidatesByJob } from '../utils/algorithms';

export function useCandidates(initialFilters?: FilterCriteria) {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [filters, setFilters] = useState<FilterCriteria>(initialFilters || {});
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const filteredCandidates = useMemo(() => {
    return filterCandidates(candidates, filters);
  }, [candidates, filters]);

  const addCandidate = useCallback((candidate: Partial<Candidate>) => {
    const newCandidate: Candidate = {
      id: `c${Date.now()}`,
      name: candidate.name || 'Unknown',
      email: candidate.email || '',
      phone: candidate.phone || '',
      location: candidate.location || '',
      currentTitle: candidate.currentTitle || '',
      currentCompany: candidate.currentCompany || '',
      yearsOfExperience: candidate.yearsOfExperience || 0,
      skills: candidate.skills || [],
      education: candidate.education || [],
      experience: candidate.experience || [],
      certifications: candidate.certifications || [],
      projects: candidate.projects || [],
      summary: candidate.summary || '',
      salaryExpectation: candidate.salaryExpectation,
      availability: candidate.availability || 'immediate',
      createdAt: new Date(),
      lastUpdated: new Date(),
    };
    setCandidates(prev => [...prev, newCandidate]);
    return newCandidate;
  }, []);

  const updateCandidate = useCallback((id: string, updates: Partial<Candidate>) => {
    setCandidates(prev => prev.map(c => 
      c.id === id ? { ...c, ...updates, lastUpdated: new Date() } : c
    ));
  }, []);

  const deleteCandidate = useCallback((id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
  }, []);

  return {
    candidates: filteredCandidates,
    allCandidates: candidates,
    filters,
    setFilters,
    loading,
    error,
    addCandidate,
    updateCandidate,
    deleteCandidate,
  };
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const activeJobs = useMemo(() => jobs.filter(j => j.status === 'active'), [jobs]);

  const addJob = useCallback((job: Partial<Job>) => {
    const newJob: Job = {
      id: `j${Date.now()}`,
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      type: job.type || 'full-time',
      salary: job.salary || { min: 0, max: 0 },
      description: job.description || '',
      requiredSkills: job.requiredSkills || [],
      preferredSkills: job.preferredSkills || [],
      experienceRequired: job.experienceRequired || { min: 0, max: 10 },
      educationRequired: job.educationRequired || '',
      industry: job.industry || '',
      benefits: job.benefits || [],
      status: job.status || 'active',
      createdAt: new Date(),
      candidateCount: 0,
    };
    setJobs(prev => [...prev, newJob]);
    return newJob;
  }, []);

  const updateJob = useCallback((id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, ...updates } : j));
  }, []);

  const deleteJob = useCallback((id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  }, []);

  return {
    jobs,
    activeJobs,
    loading,
    error,
    addJob,
    updateJob,
    deleteJob,
  };
}

export function useMatching(jobId?: string) {
  const { candidates } = useCandidates();
  const { jobs } = useJobs();

  const selectedJob = useMemo(() => 
    jobs.find(j => j.id === jobId),
    [jobs, jobId]
  );

  const rankings = useMemo(() => {
    if (!selectedJob) return [];
    return rankCandidatesByJob(candidates, selectedJob);
  }, [candidates, selectedJob]);

  const getCandidateScore = useCallback((candidateId: string) => {
    return rankings.find(r => r.candidateId === candidateId);
  }, [rankings]);

  return {
    selectedJob,
    rankings,
    getCandidateScore,
  };
}

export function useFilterPresets() {
  const [presets, setPresets] = useState<FilterPreset[]>(mockFilterPresets);
  const [loading] = useState(false);

  const addPreset = useCallback((preset: Partial<FilterPreset>) => {
    const newPreset: FilterPreset = {
      id: `fp${Date.now()}`,
      name: preset.name || '',
      criteria: preset.criteria || {},
      createdAt: new Date(),
    };
    setPresets(prev => [...prev, newPreset]);
    return newPreset;
  }, []);

  const updatePreset = useCallback((id: string, updates: Partial<FilterPreset>) => {
    setPresets(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deletePreset = useCallback((id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
  }, []);

  return {
    presets,
    loading,
    addPreset,
    updatePreset,
    deletePreset,
  };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue];
}

export function useAnalytics() {
  const { candidates } = useCandidates();
  const { activeJobs } = useJobs();

  const stats = useMemo(() => {
    const totalCandidates = candidates.length;
    const totalJobs = activeJobs.length;
    const avgMatchScore = Math.round(
      candidates.reduce((sum, c) => sum + (c.compatibilityScore || 0), 0) / totalCandidates
    );
    const immediateAvailability = candidates.filter(c => c.availability === 'immediate').length;

    const skillsCount: Record<string, number> = {};
    candidates.forEach(c => {
      c.skills.forEach(skill => {
        skillsCount[skill] = (skillsCount[skill] || 0) + 1;
      });
    });
    const topSkills = Object.entries(skillsCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }));

    const experienceDistribution = [
      { range: '0-2', count: 0 },
      { range: '3-5', count: 0 },
      { range: '6-8', count: 0 },
      { range: '9+', count: 0 },
    ];
    candidates.forEach(c => {
      if (c.yearsOfExperience <= 2) experienceDistribution[0].count++;
      else if (c.yearsOfExperience <= 5) experienceDistribution[1].count++;
      else if (c.yearsOfExperience <= 8) experienceDistribution[2].count++;
      else experienceDistribution[3].count++;
    });

    return {
      totalCandidates,
      totalJobs,
      avgMatchScore,
      immediateAvailability,
      topSkills,
      experienceDistribution,
    };
  }, [candidates, activeJobs]);

  return stats;
}
