import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit2, 
  CheckCircle,
  Filter
} from 'lucide-react';
import { mockFilterPresets } from '../data/mockData';
import type { FilterPreset } from '../types';

export const FilterPresets: React.FC = () => {
  const [presets, setPresets] = useState<FilterPreset[]>(mockFilterPresets);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPreset, setNewPreset] = useState<Partial<FilterPreset>>({
    name: '',
    criteria: {}
  });

  const filteredPresets = presets.filter(preset =>
    preset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePreset = () => {
    if (newPreset.name) {
      setPresets([...presets, {
        id: `fp${Date.now()}`,
        name: newPreset.name,
        criteria: newPreset.criteria || {},
        createdAt: new Date()
      }]);
      setNewPreset({ name: '', criteria: {} });
      setShowCreateModal(false);
    }
  };

  const handleDeletePreset = (id: string) => {
    setPresets(presets.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Filter Presets</h2>
          <p className="text-sm text-gray-500 mt-1">Save and manage reusable filter combinations</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} />
          <span>Create Preset</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search presets..."
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPresets.map((preset) => (
          <motion.div
            key={preset.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="card p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-100">
                  <Filter className="text-primary-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{preset.name}</h3>
                  <p className="text-xs text-gray-500">
                    Created {new Date(preset.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {Object.entries(preset.criteria).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-gray-600 capitalize">{key}: </span>
                  <span className="text-gray-900">
                    {Array.isArray(value) ? value.join(', ') : typeof value === 'object' && value !== null ? 
                      `${(value as any).min || 0} - ${(value as any).max || '∞'} years` : String(value)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                <CheckCircle size={16} />
                <span>Apply</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Edit2 size={18} className="text-gray-600" />
              </button>
              <button 
                onClick={() => handleDeletePreset(preset.id)}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredPresets.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Filter className="mx-auto mb-4 text-gray-300" size={48} />
          <p className="text-gray-500 text-lg">No presets found</p>
          <p className="text-sm text-gray-400 mt-2">Create your first filter preset to get started</p>
        </motion.div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Filter Preset</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preset Name</label>
                <input
                  type="text"
                  value={newPreset.name}
                  onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                  placeholder="e.g., Senior Developers"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Experience (years)</label>
                <input
                  type="number"
                  value={newPreset.criteria?.experience?.min || ''}
                  onChange={(e) => setNewPreset({
                    ...newPreset,
                    criteria: { ...newPreset.criteria, experience: { min: Number(e.target.value) } }
                  })}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                <input
                  type="text"
                  onChange={(e) => setNewPreset({
                    ...newPreset,
                    criteria: { 
                      ...newPreset.criteria, 
                      skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    }
                  })}
                  placeholder="React, TypeScript, Node.js"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePreset}
                disabled={!newPreset.name}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                Create Preset
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
