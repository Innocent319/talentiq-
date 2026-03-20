import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Clock,
  Video,
  MapPin,
  User,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
  Phone,
  Edit2,
  MoreVertical
} from 'lucide-react';
import { mockCandidates } from '../data/mockData';

interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateTitle: string;
  jobTitle: string;
  type: 'phone' | 'video' | 'onsite' | 'technical';
  stage: 'screening' | 'technical' | 'cultural' | 'final';
  date: Date;
  duration: number;
  interviewer: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  feedback?: {
    rating: number;
    notes: string;
    recommendation: 'strong_yes' | 'yes' | 'neutral' | 'no' | 'strong_no';
  };
}

export const InterviewScheduler: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const interviews: Interview[] = [
    {
      id: '1',
      candidateId: 'c1',
      candidateName: 'Sarah Chen',
      candidateTitle: 'Senior Full Stack Developer',
      jobTitle: 'Senior Frontend Developer',
      type: 'video',
      stage: 'technical',
      date: new Date(2024, 2, 21, 10, 0),
      duration: 60,
      interviewer: 'John Smith',
      status: 'scheduled'
    },
    {
      id: '2',
      candidateId: 'c2',
      candidateName: 'Michael Rodriguez',
      candidateTitle: 'DevOps Engineer',
      jobTitle: 'DevOps Engineer',
      type: 'onsite',
      stage: 'cultural',
      date: new Date(2024, 2, 21, 14, 0),
      duration: 45,
      interviewer: 'Sarah Johnson',
      status: 'scheduled'
    },
    {
      id: '3',
      candidateId: 'c3',
      candidateName: 'Emily Watson',
      candidateTitle: 'Data Scientist',
      jobTitle: 'ML Engineer',
      type: 'phone',
      stage: 'screening',
      date: new Date(2024, 2, 22, 11, 0),
      duration: 30,
      interviewer: 'Mike Brown',
      status: 'completed',
      feedback: {
        rating: 4,
        notes: 'Strong technical background. Good communication skills.',
        recommendation: 'yes'
      }
    },
    {
      id: '4',
      candidateId: 'c4',
      candidateName: 'James Park',
      candidateTitle: 'Frontend Developer',
      jobTitle: 'Senior Frontend Developer',
      type: 'technical',
      stage: 'final',
      date: new Date(2024, 2, 25, 15, 0),
      duration: 90,
      interviewer: 'Lisa Wang',
      status: 'scheduled'
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getInterviewsForDate = (day: number) => {
    return interviews.filter(interview => 
      interview.date.getDate() === day &&
      interview.date.getMonth() === currentDate.getMonth() &&
      interview.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const interviewTypes = [
    { id: 'phone', label: 'Phone Screen', icon: Phone, color: 'bg-blue-100 text-blue-600' },
    { id: 'video', label: 'Video Call', icon: Video, color: 'bg-purple-100 text-purple-600' },
    { id: 'onsite', label: 'On-site', icon: MapPin, color: 'bg-green-100 text-green-600' },
    { id: 'technical', label: 'Technical', icon: Calendar, color: 'bg-orange-100 text-orange-600' },
  ];

  const interviewStages = [
    { id: 'screening', label: 'Screening', color: 'bg-gray-500' },
    { id: 'technical', label: 'Technical', color: 'bg-blue-500' },
    { id: 'cultural', label: 'Cultural Fit', color: 'bg-purple-500' },
    { id: 'final', label: 'Final Round', color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Interview Scheduler</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and schedule candidate interviews</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'calendar' ? 'bg-white shadow text-primary-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'list' ? 'bg-white shadow text-primary-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List
            </button>
          </div>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            <Plus size={20} />
            Schedule Interview
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {view === 'calendar' ? (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex items-center gap-2">
                  <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Today
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-4 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-medium text-gray-500 text-sm">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startingDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-24 p-2" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayInterviews = getInterviewsForDate(day);
                  const isToday = day === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear();
                  
                  return (
                    <motion.div
                      key={day}
                      onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                      className={`min-h-24 p-2 rounded-lg border-2 cursor-pointer transition-colors ${
                        isToday ? 'border-primary-500 bg-primary-50' :
                        selectedDate?.getDate() === day ? 'border-primary-300 bg-primary-50/50' :
                        'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className={`text-sm font-medium ${
                        isToday ? 'text-primary-600' : 'text-gray-700'
                      }`}>
                        {day}
                      </span>
                      <div className="mt-1 space-y-1">
                        {dayInterviews.slice(0, 2).map(interview => (
                          <div
                            key={interview.id}
                            className={`text-xs px-2 py-1 rounded truncate ${
                              interview.status === 'completed' ? 'bg-green-100 text-green-700' :
                              interview.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {interview.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} {interview.candidateName.split(' ')[0]}
                          </div>
                        ))}
                        {dayInterviews.length > 2 && (
                          <span className="text-xs text-gray-500">+{dayInterviews.length - 2} more</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {interviews.map((interview, index) => {
                const TypeIcon = interviewTypes.find(t => t.id === interview.type)?.icon || Calendar;
                const typeInfo = interviewTypes.find(t => t.id === interview.type);
                
                return (
                  <motion.div
                    key={interview.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="card p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${typeInfo?.color}`}>
                          <TypeIcon size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{interview.candidateName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              interview.status === 'completed' ? 'bg-green-100 text-green-700' :
                              interview.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                              interview.status === 'rescheduled' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {interview.status}
                            </span>
                          </div>
                          <p className="text-gray-600">{interview.candidateTitle}</p>
                          <p className="text-sm text-gray-500">for {interview.jobTitle}</p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {interview.date.toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {interview.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} ({interview.duration} min)
                            </span>
                            <span className="flex items-center gap-1">
                              <User size={14} />
                              {interview.interviewer}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>

                    {interview.feedback && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                size={16}
                                className={star <= interview.feedback!.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            interview.feedback.recommendation === 'strong_yes' || interview.feedback.recommendation === 'yes' 
                              ? 'bg-green-100 text-green-700' :
                            interview.feedback.recommendation === 'neutral'
                              ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                          }`}>
                            {interview.feedback.recommendation.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{interview.feedback.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        <Video size={16} />
                        Join Call
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        View Profile
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Types</h3>
            <div className="space-y-3">
              {interviewTypes.map((type) => {
                const Icon = type.icon;
                const count = interviews.filter(i => i.type === type.id && i.status === 'scheduled').length;
                return (
                  <div key={type.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${type.color}`}>
                        <Icon size={16} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{type.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
            <div className="space-y-3">
              {interviews.filter(i => i.status === 'scheduled').slice(0, 5).map((interview) => (
                <div key={interview.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {interview.date.toLocaleDateString()} at {interview.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900 text-sm">{interview.candidateName}</p>
                  <p className="text-xs text-gray-500">{interview.type} - {interview.duration} min</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Stages</h3>
            <div className="space-y-3">
              {interviewStages.map((stage) => {
                const count = interviews.filter(i => i.stage === stage.id).length;
                return (
                  <div key={stage.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                      <span className="text-sm font-medium text-gray-700">{stage.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Interview</h2>
              <button onClick={() => setShowScheduleModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Candidate</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none">
                  <option>Choose candidate...</option>
                  {mockCandidates.map(c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.currentTitle}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interview Type</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none">
                    <option>Phone Screen</option>
                    <option>Video Call</option>
                    <option>On-site</option>
                    <option>Technical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none">
                    <option>Screening</option>
                    <option>Technical</option>
                    <option>Cultural Fit</option>
                    <option>Final Round</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interviewer</label>
                <input
                  type="text"
                  placeholder="Enter interviewer name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700">
                  Schedule
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const Star = ({ size, className }: { size: number; className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
