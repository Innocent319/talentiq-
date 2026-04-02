import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  AlertTriangle,
  CheckCircle,
  X,
  User,
  Mail,
  GitMerge
} from 'lucide-react';
import { mockCandidates } from '../data/mockData';
import { detectDuplicateCandidates } from '../utils/algorithms';
import type { Candidate } from '../types';

interface Duplicate {
  candidates: Candidate[];
  similarity: number;
  reason: string;
}

export const DuplicateDetection: React.FC = () => {
  const [showDuplicates, setShowDuplicates] = useState(false);

  const duplicates = useMemo(() => {
    const duplicateIds = detectDuplicateCandidates(mockCandidates);
    return duplicateIds.map((ids, index) => {
      const candidates = ids.map(id => mockCandidates.find(c => c.id === id)!);
      // Use index to generate a stable similarity score for this session
      const similarity = 85 + (index % 10);
      return {
        candidates,
        similarity,
        reason: candidates[0].email === candidates[1].email 
          ? 'Same email address'
          : 'Similar name and skills'
      } as Duplicate;
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Duplicate Detection</h2>
          <p className="text-sm text-gray-500 mt-1">Identify and merge duplicate candidate profiles</p>
        </div>
        <button
          onClick={() => setShowDuplicates(!showDuplicates)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            showDuplicates ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Search size={18} />
          Scan for Duplicates
        </button>
      </div>

      {duplicates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {duplicates.map((dup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 border-2 border-yellow-200 bg-yellow-50/50"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-yellow-600" size={20} />
                <span className="font-semibold text-gray-900">Potential Duplicate Found</span>
                <span className="ml-auto px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
                  {Math.round(dup.similarity)}% match
                </span>
              </div>

              <div className="space-y-4">
                {dup.candidates.map((candidate, i) => (
                  <React.Fragment key={candidate.id}>
                    {i > 0 && (
                      <div className="flex items-center justify-center">
                        <div className="h-8 border-l-2 border-dashed border-gray-300" />
                        <GitMerge className="text-gray-400 -mt-6" size={16} />
                      </div>
                    )}
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                        <p className="text-sm text-gray-600">{candidate.currentTitle}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Mail size={12} />
                          {candidate.email}
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <User size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <p className="text-sm text-gray-600 mt-4">{dup.reason}</p>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <X size={16} />
                  Not a Duplicate
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  <GitMerge size={16} />
                  Merge Profiles
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Duplicates Found</h3>
          <p className="text-gray-500">Your candidate database is clean with no duplicate entries</p>
        </div>
      )}
    </div>
  );
};
