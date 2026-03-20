import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Key,
  Save,
  Moon,
  Sun,
  Lock,
  Monitor,
  Eye
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const { theme, toggleTheme, setTheme } = useTheme();

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Database },
  ];

  const themeModes = [
    { id: 'light', label: 'Light', icon: Sun, description: 'Perfect for daytime use' },
    { id: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes at night' },
    { id: 'system', label: 'System', icon: Monitor, description: 'Match your device settings' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="card p-4 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          {activeSection === 'profile' && (
            <div className="card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Profile Information</h3>
              
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Change Photo
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@company.com"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    defaultValue="TechCorp Inc."
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                  <input
                    type="text"
                    defaultValue="Recruiting Manager"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                <Save size={18} />
                <span>Save Changes</span>
              </button>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="card p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Appearance Settings</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customize how the app looks on your device</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme Mode</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {themeModes.map((mode) => {
                    const Icon = mode.icon;
                    const isActive = (mode.id === 'system' && theme !== 'light' && theme !== 'dark') || theme === mode.id;
                    
                    return (
                      <button
                        key={mode.id}
                        onClick={() => mode.id === 'system' ? setTheme(theme) : setTheme(mode.id as 'light' | 'dark')}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          isActive 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-primary-100 dark:bg-primary-900/50' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            <Icon size={20} className={isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">{mode.label}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{mode.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-4">
                  {theme === 'dark' ? <Moon size={24} className="text-primary-600 dark:text-primary-400" /> : <Sun size={24} className="text-primary-600" />}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Dark Mode</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <motion.div
                    animate={{ x: theme === 'dark' ? 28 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                  >
                    {theme === 'dark' ? (
                      <Moon size={14} className="text-primary-600" />
                    ) : (
                      <Sun size={14} className="text-yellow-500" />
                    )}
                  </motion.div>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Accent Color</label>
                <div className="flex gap-3">
                  {['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                    <button
                      key={color}
                      className="w-10 h-10 rounded-full border-2 border-transparent hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                <select className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Eye className="text-blue-600 dark:text-blue-400 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-200">Preview Mode</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Try out different themes before applying. Click the toggle above to see changes instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Lock size={24} className="text-gray-600 dark:text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Enable
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Key size={24} className="text-gray-600 dark:text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Change Password</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Update
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Database size={24} className="text-gray-600 dark:text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Active Sessions</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Manage your active login sessions</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    View All
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notification Preferences</h3>
              
              {[
                { label: 'New candidate applications', description: 'Get notified when candidates apply to your jobs' },
                { label: 'Match alerts', description: 'Receive alerts for high-matching candidates' },
                { label: 'Weekly digest', description: 'Summary of recruitment activity' },
                { label: 'System updates', description: 'Stay informed about platform updates' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.label}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                  <button className="relative w-14 h-8 rounded-full bg-primary-600">
                    <motion.div
                      animate={{ x: 28 }}
                      className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Integrations</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Connect your favorite tools and services</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'LinkedIn', status: 'Connected', icon: 'in' },
                  { name: 'Google Workspace', status: 'Not connected', icon: 'g' },
                  { name: 'Slack', status: 'Connected', icon: '#' },
                  { name: 'Calendar', status: 'Not connected', icon: 'c' },
                ].map((integration, i) => (
                  <div key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                          {integration.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{integration.name}</h4>
                          <p className={`text-xs ${integration.status === 'Connected' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                            {integration.status}
                          </p>
                        </div>
                      </div>
                      <button className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        integration.status === 'Connected'
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}>
                        {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
