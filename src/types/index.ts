export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  currentTitle: string;
  currentCompany: string;
  yearsOfExperience: number;
  skills: string[];
  education: Education[];
  experience: Experience[];
  certifications: string[];
  projects: Project[];
  summary: string;
  salaryExpectation?: number;
  availability: 'immediate' | '2weeks' | '1month' | '3months';
  matchedJobs?: string[];
  compatibilityScore?: number;
  createdAt: Date;
  lastUpdated: Date;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: number;
}

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  impact: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: { min: number; max: number };
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experienceRequired: { min: number; max: number };
  educationRequired: string;
  industry: string;
  benefits: string[];
  status: 'active' | 'paused' | 'closed';
  createdAt: Date;
  candidateCount?: number;
}

export interface FilterCriteria {
  search?: string;
  skills?: string[];
  experience?: { min?: number; max?: number };
  location?: string;
  salary?: { min?: number; max?: number };
  availability?: string[];
  education?: string[];
  industry?: string[];
}

export interface FilterPreset {
  id: string;
  name: string;
  criteria: FilterCriteria;
  createdAt: Date;
}

export interface MatchingResult {
  candidateId: string;
  jobId: string;
  score: number;
  breakdown: {
    skillsMatch: number;
    experienceMatch: number;
    industryRelevance: number;
    culturalFit: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
}

export interface Analytics {
  totalCandidates: number;
  totalJobs: number;
  averageMatchScore: number;
  topSkills: { skill: string; count: number }[];
  candidatesByExperience: { range: string; count: number }[];
  candidatesByLocation: { location: string; count: number }[];
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'upload' | 'filter' | 'match' | 'review';
  description: string;
  timestamp: Date;
}
