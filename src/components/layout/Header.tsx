import React from 'react';
import { Search, Bell, Upload, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  onUpload?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onUpload }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">AI-Powered Recruitment Platform</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search candidates..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <button 
            onClick={onUpload}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Upload size={18} />
            <span>Upload Resume</span>
          </button>
          
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <User size={20} className="text-primary-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
