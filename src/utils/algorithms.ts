import type { Candidate, Job, MatchingResult, FilterCriteria } from '../types';

export function calculateCompatibilityScore(candidate: Candidate, job: Job): MatchingResult {
  const matchedSkills = candidate.skills.filter(skill => 
    job.requiredSkills.includes(skill) || job.preferredSkills.includes(skill)
  );
  const missingSkills = job.requiredSkills.filter(skill => !candidate.skills.includes(skill));
  
  const totalRequiredSkills = job.requiredSkills.length;
  const matchedRequiredSkills = candidate.skills.filter(skill => job.requiredSkills.includes(skill)).length;
  
  const skillsMatch = totalRequiredSkills > 0 
    ? (matchedRequiredSkills / totalRequiredSkills) * 100 
    : 50;
  
  const expMatch = candidate.yearsOfExperience >= job.experienceRequired.min 
    ? 100 - Math.abs(candidate.yearsOfExperience - job.experienceRequired.max) * 5
    : (candidate.yearsOfExperience / job.experienceRequired.min) * 100;
  const experienceMatch = Math.max(0, Math.min(100, expMatch));
  
  const industryRelevance = candidate.currentCompany.toLowerCase().includes(job.industry.toLowerCase()) 
    ? 90 
    : candidate.experience.some(exp => 
        exp.description.toLowerCase().includes(job.industry.toLowerCase())
      ) ? 70 : 50;
  
  const culturalFit = calculateCulturalFit(candidate);
  
  const overallScore = Math.round(
    (skillsMatch / 100) * 0.4 +
    (experienceMatch / 100) * 0.3 +
    (industryRelevance / 100) * 0.2 +
    (culturalFit / 100) * 0.1
  ) * 100;
  
  return {
    candidateId: candidate.id,
    jobId: job.id,
    score: overallScore,
    breakdown: {
      skillsMatch,
      experienceMatch,
      industryRelevance,
      culturalFit
    },
    matchedSkills,
    missingSkills
  };
}

function calculateCulturalFit(candidate: Candidate): number {
  let score = 60;
  
  if (candidate.certifications.length > 0) score += 10;
  if (candidate.projects.length > 2) score += 10;
  if (candidate.summary && candidate.summary.length > 50) score += 10;
  if (candidate.availability === 'immediate') score += 10;
  
  return Math.min(100, score);
}

export function filterCandidates(candidates: Candidate[], criteria: FilterCriteria): Candidate[] {
  return candidates.filter(candidate => {
    if (criteria.search) {
      const searchLower = criteria.search.toLowerCase();
      const matchesSearch = 
        candidate.name.toLowerCase().includes(searchLower) ||
        candidate.currentTitle.toLowerCase().includes(searchLower) ||
        candidate.skills.some(s => s.toLowerCase().includes(searchLower)) ||
        candidate.currentCompany.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    
    if (criteria.skills && criteria.skills.length > 0) {
      const hasRequiredSkills = criteria.skills.some(skill =>
        candidate.skills.some(s => s.toLowerCase() === skill.toLowerCase())
      );
      if (!hasRequiredSkills) return false;
    }
    
    if (criteria.experience) {
      if (criteria.experience.min && candidate.yearsOfExperience < criteria.experience.min) return false;
      if (criteria.experience.max && candidate.yearsOfExperience > criteria.experience.max) return false;
    }
    
    if (criteria.location && !candidate.location.toLowerCase().includes(criteria.location.toLowerCase())) {
      return false;
    }
    
    if (criteria.salary) {
      if (criteria.salary.min && (!candidate.salaryExpectation || candidate.salaryExpectation < criteria.salary.min)) return false;
      if (criteria.salary.max && candidate.salaryExpectation && candidate.salaryExpectation > criteria.salary.max) return false;
    }
    
    if (criteria.availability && criteria.availability.length > 0) {
      if (!criteria.availability.includes(candidate.availability)) return false;
    }
    
    return true;
  });
}

export function rankCandidatesByJob(candidates: Candidate[], job: Job): MatchingResult[] {
  return candidates
    .map(candidate => calculateCompatibilityScore(candidate, job))
    .sort((a, b) => b.score - a.score);
}

export function detectDuplicateCandidates(candidates: Candidate[]): string[][] {
  const duplicates: string[][] = [];
  const checked = new Set<string>();
  
  candidates.forEach((candidate, i) => {
    if (checked.has(candidate.id)) return;
    
    const similar: string[] = [candidate.id];
    
    candidates.slice(i + 1).forEach(other => {
      if (checked.has(other.id)) return;
      
      const nameSimilarity = candidate.name.toLowerCase() === other.name.toLowerCase();
      const emailSimilarity = candidate.email.toLowerCase() === other.email.toLowerCase();
      const skillOverlap = candidate.skills.filter(s => other.skills.includes(s)).length / Math.max(candidate.skills.length, other.skills.length);
      
      if ((nameSimilarity || emailSimilarity) || (skillOverlap > 0.8 && candidate.currentTitle === other.currentTitle)) {
        similar.push(other.id);
        checked.add(other.id);
      }
    });
    
    if (similar.length > 1) {
      duplicates.push(similar);
    }
  });
  
  return duplicates;
}

export function analyzeSkillGaps(candidate: Candidate, job: Job): { critical: string[]; preferred: string[] } {
  const critical = job.requiredSkills.filter(skill => !candidate.skills.includes(skill));
  const preferred = job.preferredSkills.filter(skill => !candidate.skills.includes(skill));
  
  return { critical, preferred };
}

export function generateCandidateSummary(candidate: Candidate): string {
  const topSkills = candidate.skills.slice(0, 3).join(', ');
  const expYears = candidate.yearsOfExperience;
  const title = candidate.currentTitle;
  
  return `${candidate.name} is a ${title} with ${expYears} years of experience specializing in ${topSkills}. Strong background in ${candidate.education[0]?.field || 'technology'} from ${candidate.education[0]?.institution || 'a reputable institution'}. Currently seeking new opportunities where their technical expertise can drive business value.`;
}

export function parseResumeFile(file: File): Promise<Partial<Candidate>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        skills: ['JavaScript', 'React', 'Node.js'],
        yearsOfExperience: 3,
        summary: 'Experienced developer with strong technical skills.'
      });
    }, 1500);
  });
}

export function getAllSkills(candidates: Candidate[]): string[] {
  const skillSet = new Set<string>();
  candidates.forEach(c => c.skills.forEach(skill => skillSet.add(skill)));
  return Array.from(skillSet).sort();
}

export function getAllLocations(candidates: Candidate[]): string[] {
  const locations = new Set<string>();
  candidates.forEach(c => locations.add(c.location));
  return Array.from(locations).sort();
}
