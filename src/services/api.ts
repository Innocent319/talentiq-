import type { Candidate, Job, MatchingResult, FilterCriteria, FilterPreset } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, error: null, loading: false };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      };
    }
  }

  async getCandidates(filters?: FilterCriteria): Promise<ApiResponse<Candidate[]>> {
    const queryString = filters ? `?${new URLSearchParams(JSON.stringify(filters))}` : '';
    return this.request<Candidate[]>(`/candidates${queryString}`);
  }

  async getCandidate(id: string): Promise<ApiResponse<Candidate>> {
    return this.request<Candidate>(`/candidates/${id}`);
  }

  async createCandidate(candidate: Partial<Candidate>): Promise<ApiResponse<Candidate>> {
    return this.request<Candidate>('/candidates', {
      method: 'POST',
      body: JSON.stringify(candidate),
    });
  }

  async updateCandidate(id: string, candidate: Partial<Candidate>): Promise<ApiResponse<Candidate>> {
    return this.request<Candidate>(`/candidates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(candidate),
    });
  }

  async deleteCandidate(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/candidates/${id}`, {
      method: 'DELETE',
    });
  }

  async getJobs(): Promise<ApiResponse<Job[]>> {
    return this.request<Job[]>('/jobs');
  }

  async getJob(id: string): Promise<ApiResponse<Job>> {
    return this.request<Job>(`/jobs/${id}`);
  }

  async createJob(job: Partial<Job>): Promise<ApiResponse<Job>> {
    return this.request<Job>('/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
    });
  }

  async updateJob(id: string, job: Partial<Job>): Promise<ApiResponse<Job>> {
    return this.request<Job>(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(job),
    });
  }

  async deleteJob(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/jobs/${id}`, {
      method: 'DELETE',
    });
  }

  async matchCandidatesToJob(jobId: string): Promise<ApiResponse<MatchingResult[]>> {
    return this.request<MatchingResult[]>(`/jobs/${jobId}/matches`);
  }

  async getFilterPresets(): Promise<ApiResponse<FilterPreset[]>> {
    return this.request<FilterPreset[]>('/filter-presets');
  }

  async createFilterPreset(preset: Partial<FilterPreset>): Promise<ApiResponse<FilterPreset>> {
    return this.request<FilterPreset>('/filter-presets', {
      method: 'POST',
      body: JSON.stringify(preset),
    });
  }

  async deleteFilterPreset(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/filter-presets/${id}`, {
      method: 'DELETE',
    });
  }

  async parseResume(file: File): Promise<ApiResponse<Partial<Candidate>>> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${this.baseUrl}/parse-resume`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, error: null, loading: false };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      };
    }
  }

  async uploadResume(file: File): Promise<ApiResponse<Candidate>> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${this.baseUrl}/upload-resume`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, error: null, loading: false };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      };
    }
  }

  async bulkUploadResumes(files: File[]): Promise<ApiResponse<Candidate[]>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`${this.baseUrl}/bulk-upload-resumes`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, error: null, loading: false };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      };
    }
  }

  async getAnalytics(type: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/analytics/${type}`);
  }

  async generateReport(config: any): Promise<ApiResponse<any>> {
    return this.request<any>('/reports/generate', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }
}

export const api = new ApiService();

export const candidatesApi = {
  list: (filters?: FilterCriteria) => api.getCandidates(filters),
  get: (id: string) => api.getCandidate(id),
  create: (candidate: Partial<Candidate>) => api.createCandidate(candidate),
  update: (id: string, candidate: Partial<Candidate>) => api.updateCandidate(id, candidate),
  delete: (id: string) => api.deleteCandidate(id),
  parseResume: (file: File) => api.parseResume(file),
  uploadResume: (file: File) => api.uploadResume(file),
  bulkUpload: (files: File[]) => api.bulkUploadResumes(files),
};

export const jobsApi = {
  list: () => api.getJobs(),
  get: (id: string) => api.getJob(id),
  create: (job: Partial<Job>) => api.createJob(job),
  update: (id: string, job: Partial<Job>) => api.updateJob(id, job),
  delete: (id: string) => api.deleteJob(id),
  match: (jobId: string) => api.matchCandidatesToJob(jobId),
};

export const analyticsApi = {
  get: (type: string) => api.getAnalytics(type),
  generateReport: (config: any) => api.generateReport(config),
};

export const filterPresetsApi = {
  list: () => api.getFilterPresets(),
  create: (preset: Partial<FilterPreset>) => api.createFilterPreset(preset),
  delete: (id: string) => api.deleteFilterPreset(id),
};

export default api;
