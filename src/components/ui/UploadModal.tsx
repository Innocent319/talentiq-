import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Link2, FileText, Linkedin, HardDrive, Loader2, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { parseResumeFile } from '../../utils/algorithms';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (candidate: any) => void;
}

type TabType = 'upload' | 'linkedin' | 'drive';
type UploadStatus = 'pending' | 'uploading' | 'processing' | 'complete' | 'error';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: UploadStatus;
  progress?: number;
  candidate?: any;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUploadComplete }) => {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [driveUrl, setDriveUrl] = useState('');

  if (!isOpen) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    const fileObjects: UploadedFile[] = newFiles.map(file => ({
      id: `file-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: formatFileSize(file.size),
      status: 'pending' as UploadStatus
    }));
    setFiles([...files, ...fileObjects]);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleUpload = async () => {
    setFiles(files.map(f => ({ ...f, status: 'uploading' as UploadStatus, progress: 0 })));

    for (const file of files) {
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'processing' as UploadStatus } : f
      ));

      try {
        const parsed = await parseResumeFile(new File([], file.name));
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'complete' as UploadStatus, candidate: parsed } : f
        ));
        onUploadComplete(parsed);
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'error' as UploadStatus } : f
        ));
      }
    }
  };

  const handleLinkedinParse = async () => {
    if (!linkedinUrl.includes('linkedin.com')) {
      alert('Please enter a valid LinkedIn profile URL');
      return;
    }
    setFiles([...files, {
      id: `linkedin-${Date.now()}`,
      name: 'LinkedIn Profile: ' + linkedinUrl.split('/in/')[1]?.split('?')[0] || 'Unknown',
      size: 'LinkedIn',
      status: 'processing'
    }]);
    setLinkedinUrl('');
  };

  const handleDriveImport = async () => {
    if (!driveUrl) {
      alert('Please enter a Google Drive folder URL');
      return;
    }
    setFiles([...files, {
      id: `drive-${Date.now()}`,
      name: 'Google Drive Folder',
      size: 'Importing...',
      status: 'processing'
    }]);
    setDriveUrl('');
  };

  const tabs = [
    { id: 'upload' as TabType, label: 'Upload Files', icon: Upload },
    { id: 'linkedin' as TabType, label: 'LinkedIn', icon: Linkedin },
    { id: 'drive' as TabType, label: 'Google Drive', icon: HardDrive },
  ];

  const completedCount = files.filter(f => f.status === 'complete').length;
  const totalCount = files.length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Import Resumes</h2>
            <p className="text-sm text-gray-500 mt-1">Upload files or import from cloud sources</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                  activeTab === tab.id 
                    ? 'text-primary-600 border-primary-600' 
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    isDragging 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-300 hover:border-primary-400'
                  }`}
                >
                  <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Drag & drop multiple resumes here
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    or click to browse files
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg cursor-pointer hover:bg-primary-700 transition-colors"
                  >
                    Select Files
                  </label>
                  <p className="text-xs text-gray-400 mt-4">
                    Supports PDF, DOC, DOCX, TXT • Max 10MB each
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900">Bulk Upload</h4>
                      <p className="text-sm text-blue-700">Select multiple files at once to process them all together</p>
                    </div>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {completedCount > 0 
                          ? `${completedCount} of ${totalCount} processed` 
                          : `${totalCount} file${totalCount !== 1 ? 's' : ''} selected`
                        }
                      </h3>
                      {completedCount > 0 && completedCount === totalCount && (
                        <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                          <CheckCircle2 size={16} />
                          All complete
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {files.map((file) => (
                        <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <FileText size={18} className="text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.status === 'pending' && (
                              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Pending</span>
                            )}
                            {file.status === 'uploading' && (
                              <Loader2 size={16} className="text-blue-600 animate-spin" />
                            )}
                            {file.status === 'processing' && (
                              <div className="flex items-center gap-1 text-blue-600">
                                <Loader2 size={16} className="animate-spin" />
                                <span className="text-xs">Processing</span>
                              </div>
                            )}
                            {file.status === 'complete' && (
                              <CheckCircle2 size={18} className="text-green-600" />
                            )}
                            {file.status === 'error' && (
                              <AlertCircle size={18} className="text-red-600" />
                            )}
                            {file.status === 'pending' && (
                              <button 
                                onClick={() => removeFile(file.id)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <Trash2 size={14} className="text-gray-400" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'linkedin' && (
              <motion.div
                key="linkedin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                    <Linkedin size={48} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Import from LinkedIn</h3>
                  <p className="text-gray-600">Enter a LinkedIn profile URL to automatically extract candidate information</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile URL</label>
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="url"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder="https://www.linkedin.com/in/candidate-name"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <button
                        onClick={handleLinkedinParse}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Import
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-medium text-blue-900 mb-2">What we extract:</h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        Contact information and profile photo
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        Work experience and education history
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        Skills, certifications, and endorsements
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        Recommendations and accomplishments
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'drive' && (
              <motion.div
                key="drive"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                    <HardDrive size={48} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Import from Google Drive</h3>
                  <p className="text-gray-600">Connect a Google Drive folder to import multiple resumes at once</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Google Drive Folder URL</label>
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="url"
                          value={driveUrl}
                          onChange={(e) => setDriveUrl(e.target.value)}
                          placeholder="https://drive.google.com/drive/folders/..."
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <button
                        onClick={handleDriveImport}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Connect
                      </button>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-medium text-green-900 mb-2">Supported files:</h4>
                    <ul className="space-y-1 text-sm text-green-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        PDF resumes
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        Word documents (.doc, .docx)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        Plain text files
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        Google Docs (will be converted to PDF)
                      </li>
                    </ul>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    Note: You'll need to grant access to your Google Drive folder to import files
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || files.every(f => f.status === 'complete' || f.status === 'processing')}
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {files.some(f => f.status === 'processing' || f.status === 'uploading') ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload size={18} />
                Process {files.length} File{files.length !== 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
