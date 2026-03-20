import type { Candidate, Job, FilterPreset } from '../types';

export const mockCandidates: Candidate[] = [
  {
    id: 'c1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    currentTitle: 'Senior Full Stack Developer',
    currentCompany: 'TechCorp Inc.',
    yearsOfExperience: 7,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'GraphQL', 'Docker', 'Python'],
    education: [
      { institution: 'Stanford University', degree: 'M.S.', field: 'Computer Science', year: 2017 },
      { institution: 'UC Berkeley', degree: 'B.S.', field: 'Computer Science', year: 2015 }
    ],
    experience: [
      {
        company: 'TechCorp Inc.',
        title: 'Senior Full Stack Developer',
        startDate: '2020-03',
        endDate: 'Present',
        description: 'Lead development of microservices architecture serving 1M+ users',
        achievements: ['Reduced API latency by 40%', 'Mentored 5 junior developers', 'Implemented CI/CD pipeline']
      },
      {
        company: 'StartupXYZ',
        title: 'Full Stack Developer',
        startDate: '2017-06',
        endDate: '2020-02',
        description: 'Built and scaled web applications from ground up',
        achievements: ['Grew user base from 0 to 100K', 'Led migration to React', 'Optimized database queries']
      }
    ],
    certifications: ['AWS Solutions Architect', 'Google Cloud Professional'],
    projects: [
      { name: 'E-commerce Platform', description: 'Built scalable marketplace', technologies: ['React', 'Node.js', 'MongoDB'], impact: '$2M revenue' },
      { name: 'AI Analytics Dashboard', description: 'Real-time data visualization', technologies: ['Python', 'React', 'D3.js'], impact: '60% faster decisions' }
    ],
    summary: 'Experienced full-stack developer with strong expertise in cloud architecture and team leadership.',
    salaryExpectation: 180000,
    availability: '2weeks',
    matchedJobs: ['j1', 'j3'],
    compatibilityScore: 92,
    createdAt: new Date('2024-01-15'),
    lastUpdated: new Date('2024-03-10')
  },
  {
    id: 'c2',
    name: 'Michael Rodriguez',
    email: 'michael.r@email.com',
    phone: '+1 (555) 234-5678',
    location: 'Austin, TX',
    currentTitle: 'DevOps Engineer',
    currentCompany: 'CloudSystems',
    yearsOfExperience: 5,
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD', 'Python', 'Linux', 'Monitoring'],
    education: [
      { institution: 'UT Austin', degree: 'B.S.', field: 'Information Technology', year: 2018 }
    ],
    experience: [
      {
        company: 'CloudSystems',
        title: 'DevOps Engineer',
        startDate: '2019-01',
        endDate: 'Present',
        description: 'Managing cloud infrastructure and deployment pipelines',
        achievements: ['Reduced deployment time by 70%', 'Achieved 99.99% uptime', 'Implemented auto-scaling']
      }
    ],
    certifications: ['AWS Certified DevOps Engineer', 'CKA'],
    projects: [
      { name: 'Infrastructure Migration', description: 'Migrated on-prem to cloud', technologies: ['AWS', 'Terraform', 'Kubernetes'], impact: '50% cost reduction' }
    ],
    summary: 'DevOps specialist focused on automation, scalability, and reliability engineering.',
    salaryExpectation: 150000,
    availability: '1month',
    matchedJobs: ['j2'],
    compatibilityScore: 88,
    createdAt: new Date('2024-02-01'),
    lastUpdated: new Date('2024-03-08')
  },
  {
    id: 'c3',
    name: 'Emily Watson',
    email: 'emily.watson@email.com',
    phone: '+1 (555) 345-6789',
    location: 'New York, NY',
    currentTitle: 'Data Scientist',
    currentCompany: 'DataDriven Co.',
    yearsOfExperience: 4,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Pandas', 'Scikit-learn', 'Statistics', 'Tableau'],
    education: [
      { institution: 'Columbia University', degree: 'M.S.', field: 'Data Science', year: 2020 },
      { institution: 'NYU', degree: 'B.S.', field: 'Mathematics', year: 2018 }
    ],
    experience: [
      {
        company: 'DataDriven Co.',
        title: 'Data Scientist',
        startDate: '2020-05',
        endDate: 'Present',
        description: 'Building ML models for predictive analytics',
        achievements: ['Improved model accuracy by 25%', 'Deployed 10+ ML models to production', 'Reduced churn by 15%']
      }
    ],
    certifications: ['Google Data Analytics Professional'],
    projects: [
      { name: 'Customer Churn Prediction', description: 'ML model for retention', technologies: ['Python', 'TensorFlow', 'SQL'], impact: '$500K savings' }
    ],
    summary: 'Data scientist with strong background in machine learning and statistical analysis.',
    salaryExpectation: 140000,
    availability: 'immediate',
    matchedJobs: ['j4'],
    compatibilityScore: 85,
    createdAt: new Date('2024-02-10'),
    lastUpdated: new Date('2024-03-05')
  },
  {
    id: 'c4',
    name: 'James Park',
    email: 'james.park@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    currentTitle: 'Frontend Developer',
    currentCompany: 'WebSolutions',
    yearsOfExperience: 3,
    skills: ['React', 'TypeScript', 'Vue.js', 'CSS', 'JavaScript', 'Figma', 'Next.js'],
    education: [
      { institution: 'University of Washington', degree: 'B.S.', field: 'Computer Science', year: 2021 }
    ],
    experience: [
      {
        company: 'WebSolutions',
        title: 'Frontend Developer',
        startDate: '2021-06',
        endDate: 'Present',
        description: 'Developing responsive web applications',
        achievements: ['Built design system used across 5 products', 'Improved page load time by 50%', 'Led accessibility improvements']
      }
    ],
    certifications: [],
    projects: [
      { name: 'Design System', description: 'Company-wide component library', technologies: ['React', 'TypeScript', 'Storybook'], impact: '40% faster development' }
    ],
    summary: 'Creative frontend developer passionate about user experience and design systems.',
    salaryExpectation: 120000,
    availability: '2weeks',
    matchedJobs: ['j1'],
    compatibilityScore: 78,
    createdAt: new Date('2024-02-15'),
    lastUpdated: new Date('2024-03-01')
  },
  {
    id: 'c5',
    name: 'Lisa Thompson',
    email: 'lisa.t@email.com',
    phone: '+1 (555) 567-8901',
    location: 'Chicago, IL',
    currentTitle: 'Backend Engineer',
    currentCompany: 'FinTech Solutions',
    yearsOfExperience: 6,
    skills: ['Java', 'Spring Boot', 'Python', 'PostgreSQL', 'MongoDB', 'Kafka', 'Microservices', 'AWS'],
    education: [
      { institution: 'Northwestern University', degree: 'M.S.', field: 'Software Engineering', year: 2018 },
      { institution: 'UChicago', degree: 'B.S.', field: 'Computer Science', year: 2016 }
    ],
    experience: [
      {
        company: 'FinTech Solutions',
        title: 'Backend Engineer',
        startDate: '2018-08',
        endDate: 'Present',
        description: 'Building high-performance financial systems',
        achievements: ['Processed $1B+ transactions', 'Reduced latency by 60%', 'Implemented fraud detection']
      }
    ],
    certifications: ['AWS Solutions Architect', 'Certified Kubernetes Administrator'],
    projects: [
      { name: 'Payment Processing System', description: 'Real-time transaction handling', technologies: ['Java', 'Kafka', 'PostgreSQL'], impact: '$1B processed' }
    ],
    summary: 'Experienced backend engineer specializing in high-scale distributed systems.',
    salaryExpectation: 165000,
    availability: '1month',
    matchedJobs: ['j3'],
    compatibilityScore: 90,
    createdAt: new Date('2024-01-20'),
    lastUpdated: new Date('2024-03-12')
  },
  {
    id: 'c6',
    name: 'Alex Kim',
    email: 'alex.kim@email.com',
    phone: '+1 (555) 678-9012',
    location: 'Denver, CO',
    currentTitle: 'Mobile Developer',
    currentCompany: 'AppStudio',
    yearsOfExperience: 4,
    skills: ['React Native', 'Swift', 'iOS', 'Android', 'TypeScript', 'JavaScript', 'Firebase', 'GraphQL'],
    education: [
      { institution: 'CU Boulder', degree: 'B.S.', field: 'Computer Science', year: 2019 }
    ],
    experience: [
      {
        company: 'AppStudio',
        title: 'Mobile Developer',
        startDate: '2019-08',
        endDate: 'Present',
        description: 'Cross-platform mobile application development',
        achievements: ['2M+ app downloads', '4.8 star rating', 'Released 10+ apps']
      }
    ],
    certifications: ['Apple Developer Certification'],
    projects: [
      { name: 'Fitness Tracking App', description: 'Health & fitness mobile app', technologies: ['React Native', 'Firebase', 'HealthKit'], impact: '2M downloads' }
    ],
    summary: 'Mobile developer with expertise in cross-platform frameworks and user engagement.',
    salaryExpectation: 135000,
    availability: 'immediate',
    matchedJobs: ['j5'],
    compatibilityScore: 82,
    createdAt: new Date('2024-02-20'),
    lastUpdated: new Date('2024-03-09')
  },
  {
    id: 'c7',
    name: 'David Martinez',
    email: 'david.m@email.com',
    phone: '+1 (555) 789-0123',
    location: 'Los Angeles, CA',
    currentTitle: 'Product Manager',
    currentCompany: 'TechStart',
    yearsOfExperience: 8,
    skills: ['Product Strategy', 'Agile', 'User Research', 'SQL', 'Data Analysis', 'Roadmapping', 'Stakeholder Management'],
    education: [
      { institution: 'UCLA', degree: 'MBA', field: 'Business Administration', year: 2016 },
      { institution: 'USC', degree: 'B.S.', field: 'Engineering', year: 2012 }
    ],
    experience: [
      {
        company: 'TechStart',
        title: 'Senior Product Manager',
        startDate: '2019-03',
        endDate: 'Present',
        description: 'Leading product strategy and roadmap',
        achievements: ['Grew product revenue 3x', 'Launched 5 major features', 'Improved NPS by 40 points']
      }
    ],
    certifications: ['CSPO', 'Google Analytics'],
    projects: [
      { name: 'Product Launch', description: 'Led successful product release', technologies: ['Agile', 'SQL', 'User Testing'], impact: '3x revenue growth' }
    ],
    summary: 'Strategic product leader with technical background and track record of growth.',
    salaryExpectation: 175000,
    availability: '2weeks',
    matchedJobs: ['j6'],
    compatibilityScore: 87,
    createdAt: new Date('2024-01-25'),
    lastUpdated: new Date('2024-03-11')
  },
  {
    id: 'c8',
    name: 'Rachel Green',
    email: 'rachel.g@email.com',
    phone: '+1 (555) 890-1234',
    location: 'Boston, MA',
    currentTitle: 'UX Designer',
    currentCompany: 'DesignHub',
    yearsOfExperience: 5,
    skills: ['Figma', 'User Research', 'Prototyping', 'UI Design', 'Design Systems', 'Usability Testing', 'HTML/CSS'],
    education: [
      { institution: 'RISD', degree: 'M.F.A.', field: 'Digital Design', year: 2019 },
      { institution: 'Boston University', degree: 'B.A.', field: 'Graphic Design', year: 2017 }
    ],
    experience: [
      {
        company: 'DesignHub',
        title: 'Senior UX Designer',
        startDate: '2019-05',
        endDate: 'Present',
        description: 'Creating intuitive user experiences',
        achievements: ['Won 3 design awards', 'Reduced user friction by 45%', 'Built design system from scratch']
      }
    ],
    certifications: ['Google UX Design Certificate'],
    projects: [
      { name: 'Enterprise Dashboard', description: 'Complex data visualization UI', technologies: ['Figma', 'Prototyping', 'User Research'], impact: '60% task completion increase' }
    ],
    summary: 'Award-winning designer focused on creating seamless and delightful user experiences.',
    salaryExpectation: 145000,
    availability: '1month',
    matchedJobs: ['j7'],
    compatibilityScore: 84,
    createdAt: new Date('2024-02-05'),
    lastUpdated: new Date('2024-03-07')
  }
];

export const mockJobs: Job[] = [
  {
    id: 'j1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: { min: 150000, max: 200000 },
    description: 'Join our team building next-generation web applications using React and TypeScript.',
    requiredSkills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
    preferredSkills: ['Next.js', 'GraphQL', 'Testing'],
    experienceRequired: { min: 4, max: 8 },
    educationRequired: 'Bachelor\'s in Computer Science or equivalent',
    industry: 'Technology',
    benefits: ['Health Insurance', '401k', 'Remote Work', 'Stock Options'],
    status: 'active',
    createdAt: new Date('2024-02-01'),
    candidateCount: 24
  },
  {
    id: 'j2',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Austin, TX',
    type: 'full-time',
    salary: { min: 140000, max: 180000 },
    description: 'Build and maintain scalable cloud infrastructure using Kubernetes and AWS.',
    requiredSkills: ['Kubernetes', 'AWS', 'Docker', 'CI/CD'],
    preferredSkills: ['Terraform', 'Monitoring', 'Linux'],
    experienceRequired: { min: 3, max: 7 },
    educationRequired: 'Bachelor\'s in IT or related field',
    industry: 'Cloud Computing',
    benefits: ['Health Insurance', 'Unlimited PTO', 'Home Office Stipend'],
    status: 'active',
    createdAt: new Date('2024-02-10'),
    candidateCount: 18
  },
  {
    id: 'j3',
    title: 'Full Stack Engineer',
    company: 'DataFlow',
    location: 'New York, NY',
    type: 'full-time',
    salary: { min: 160000, max: 210000 },
    description: 'Build scalable web applications with modern tech stack.',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    preferredSkills: ['AWS', 'GraphQL', 'Microservices'],
    experienceRequired: { min: 5, max: 10 },
    educationRequired: 'Bachelor\'s in Computer Science',
    industry: 'FinTech',
    benefits: ['Health Insurance', '401k', 'Equity', 'Gym Membership'],
    status: 'active',
    createdAt: new Date('2024-02-15'),
    candidateCount: 31
  },
  {
    id: 'j4',
    title: 'Machine Learning Engineer',
    company: 'AI Solutions',
    location: 'Seattle, WA',
    type: 'full-time',
    salary: { min: 170000, max: 220000 },
    description: 'Develop and deploy machine learning models at scale.',
    requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
    preferredSkills: ['PyTorch', 'MLOps', 'Cloud Platforms'],
    experienceRequired: { min: 3, max: 8 },
    educationRequired: 'M.S. in Data Science or related field',
    industry: 'AI/ML',
    benefits: ['Health Insurance', 'Stock Options', 'Conference Budget', 'Remote Work'],
    status: 'active',
    createdAt: new Date('2024-02-20'),
    candidateCount: 15
  },
  {
    id: 'j5',
    title: 'React Native Developer',
    company: 'MobileFirst',
    location: 'Denver, CO',
    type: 'full-time',
    salary: { min: 130000, max: 170000 },
    description: 'Build cross-platform mobile applications.',
    requiredSkills: ['React Native', 'TypeScript', 'JavaScript'],
    preferredSkills: ['iOS', 'Android', 'Firebase'],
    experienceRequired: { min: 2, max: 6 },
    educationRequired: 'Bachelor\'s in Computer Science',
    industry: 'Mobile',
    benefits: ['Health Insurance', 'Remote Work', 'Learning Budget'],
    status: 'active',
    createdAt: new Date('2024-03-01'),
    candidateCount: 12
  },
  {
    id: 'j6',
    title: 'Senior Product Manager',
    company: 'GrowthTech',
    location: 'Chicago, IL',
    type: 'full-time',
    salary: { min: 160000, max: 200000 },
    description: 'Lead product strategy for enterprise SaaS platform.',
    requiredSkills: ['Product Strategy', 'Agile', 'Data Analysis'],
    preferredSkills: ['Technical Background', 'B2B SaaS', 'SQL'],
    experienceRequired: { min: 5, max: 12 },
    educationRequired: 'MBA or Bachelor\'s with equivalent experience',
    industry: 'SaaS',
    benefits: ['Health Insurance', '401k', 'Bonus', 'Unlimited PTO'],
    status: 'active',
    createdAt: new Date('2024-03-05'),
    candidateCount: 22
  },
  {
    id: 'j7',
    title: 'Senior UX Designer',
    company: 'DesignFirst',
    location: 'Boston, MA',
    type: 'full-time',
    salary: { min: 130000, max: 170000 },
    description: 'Create intuitive and beautiful user experiences.',
    requiredSkills: ['Figma', 'User Research', 'UI Design', 'Prototyping'],
    preferredSkills: ['Design Systems', 'HTML/CSS', 'Motion Design'],
    experienceRequired: { min: 4, max: 8 },
    educationRequired: 'Bachelor\'s in Design or related field',
    industry: 'Design',
    benefits: ['Health Insurance', 'Creative Budget', 'Flexible Hours', 'Remote Work'],
    status: 'active',
    createdAt: new Date('2024-03-10'),
    candidateCount: 19
  }
];

export const mockFilterPresets: FilterPreset[] = [
  {
    id: 'fp1',
    name: 'Frontend Developers',
    criteria: { skills: ['React', 'TypeScript'], experience: { min: 3 } },
    createdAt: new Date('2024-02-01')
  },
  {
    id: 'fp2',
    name: 'Senior Engineers',
    criteria: { experience: { min: 5 } },
    createdAt: new Date('2024-02-05')
  },
  {
    id: 'fp3',
    name: 'Available Immediately',
    criteria: { availability: ['immediate'] },
    createdAt: new Date('2024-02-10')
  }
];
