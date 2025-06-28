'use client';

import { useState, useEffect } from 'react';

// Icons (using simple SVG)
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ExpenseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IncomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const LiabilityIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ReportIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ReceivableIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

// Add Expense Pop-up Window Component
function AddExpenseModal({ isOpen, onClose, onAdd, categories, onAddCategory }) {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: ''
  });
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3B82F6');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.category && formData.amount && formData.description) {
      onAdd(formData);
      setFormData({ category: '', amount: '', description: '' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      try {
        await onAddCategory(newCategoryName.trim(), newCategoryColor);
        setFormData({ ...formData, category: newCategoryName.trim() });
        setNewCategoryName('');
        setNewCategoryColor('#3B82F6');
        setShowAddCategory(false);
      } catch (error) {
        alert(error.message || 'Failed to add category');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 w-full max-w-lg mx-4 transform transition-all duration-300 ease-out scale-100 animate-in">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Expense</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track your spending</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Category</span>
              </span>
            </label>
            <div className="space-y-2">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                {showAddCategory ? 'Cancel' : '+ Add New Category'}
              </button>
            </div>
             
             {showAddCategory && (
               <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                 <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Add New Category</h4>
                 <div className="space-y-3">
                   <input
                     type="text"
                     value={newCategoryName}
                     onChange={(e) => setNewCategoryName(e.target.value)}
                     placeholder="Category name"
                     className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                   />
                   <div className="flex items-center space-x-3">
                     <label className="text-sm text-gray-600 dark:text-gray-400">Color:</label>
                     <input
                       type="color"
                       value={newCategoryColor}
                       onChange={(e) => setNewCategoryColor(e.target.value)}
                       className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                     />
                   </div>
                   <button
                     type="button"
                     onClick={handleAddCategory}
                     disabled={!newCategoryName.trim()}
                     className="w-full px-3 py-2 text-sm bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                   >
                     Add Category
                   </button>
                 </div>
               </div>
             )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Amount</span>
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <span>Description</span>
              </span>
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
              placeholder="Enter expense description"
              required
            />
          </div>
          
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddIncomeModal({ isOpen, onClose, onAdd, categories, onAddCategory }) {
  const [formData, setFormData] = useState({
    source: '',
    amount: '',
    type: '',
    recurring: false
  });
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#10B981');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.source && formData.amount && formData.type) {
      onAdd(formData);
      setFormData({ source: '', amount: '', type: '', recurring: false });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      try {
        await onAddCategory(newCategoryName.trim(), newCategoryColor);
        setFormData({ ...formData, type: newCategoryName.trim() });
        setNewCategoryName('');
        setNewCategoryColor('#10B981');
        setShowAddCategory(false);
      } catch (error) {
        alert(error.message || 'Failed to add category');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 w-full max-w-lg mx-4 transform transition-all duration-300 ease-out scale-100 animate-in">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Income</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track your earnings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                <span>Income Source</span>
              </span>
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
              placeholder="e.g., Primary Salary, Freelance Work"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Amount</span>
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Income Type</span>
              </span>
            </label>
            <div className="space-y-2">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
                required
              >
                <option value="">Select income type</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="w-full px-4 py-2 text-sm text-green-600 dark:text-green-400 border border-green-300 dark:border-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
              >
                {showAddCategory ? 'Cancel' : '+ Add New Category'}
              </button>
            </div>
            
            {showAddCategory && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Add New Category</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <div className="flex items-center space-x-3">
                    <label className="text-sm text-gray-600 dark:text-gray-400">Color:</label>
                    <input
                      type="color"
                      value={newCategoryColor}
                      onChange={(e) => setNewCategoryColor(e.target.value)}
                      className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    disabled={!newCategoryName.trim()}
                    className="w-full px-3 py-2 text-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
                  >
                    Add Category
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="recurring"
                checked={formData.recurring}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recurring Income</span>
            </label>
          </div>
          
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Add Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddLiabilityModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    creditor: '',
    amount: '',
    monthlyPayment: '',
    dueDate: '',
    status: 'current',
    type: ''
  });

  const liabilityTypes = [
    'mortgage', 'auto', 'credit', 'education', 
    'personal', 'business', 'medical', 'other'
  ];

  const statusOptions = [
    { value: 'current', label: 'Current' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'due-soon', label: 'Due Soon' },
    { value: 'paid', label: 'Paid Off' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.creditor && formData.amount && formData.monthlyPayment && formData.dueDate && formData.type) {
      onAdd(formData);
      setFormData({ creditor: '', amount: '', monthlyPayment: '', dueDate: '', status: 'current', type: '' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 w-full max-w-lg mx-4 transform transition-all duration-300 ease-out scale-100 animate-in">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Liability</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track your debts and payables</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-2 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Creditor/Institution</span>
              </span>
            </label>
            <input
              type="text"
              name="creditor"
              value={formData.creditor}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
              placeholder="e.g., Chase Bank, Toyota Financial"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span>Total Amount</span>
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">$</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Monthly Payment</span>
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">$</span>
                <input
                  type="number"
                  name="monthlyPayment"
                  value={formData.monthlyPayment}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Due Date</span>
                </span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Status</span>
                </span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
                required
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <span className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Liability Type</span>
              </span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm"
              required
            >
              <option value="">Select liability type</option>
              {liabilityTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Add Liability
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Dashboard Components
function DashboardCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 ${className}`}>
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white flex items-center">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
        {title}
      </h3>
      {children}
    </div>
  );
}

function StatCard({ title, value, change, isPositive }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md hover:scale-105 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{title}</h4>
        <div className={`w-2 h-2 rounded-full ${isPositive ? 'bg-green-400' : 'bg-red-400'}`}></div>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
      <div className={`text-sm flex items-center ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isPositive ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
        </svg>
        {change}
      </div>
    </div>
  );
}

function ExpenseItem({ category, amount, percentage, date, description }) {
  const categoryColors = {
    'Housing': 'bg-blue-500',
    'Food': 'bg-green-500',
    'Transportation': 'bg-yellow-500',
    'Entertainment': 'bg-purple-500',
    'Utilities': 'bg-orange-500',
    'Healthcare': 'bg-pink-500',
    'Shopping': 'bg-indigo-500',
    'Other': 'bg-gray-500'
  };
  
  return (
    <div className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full ${categoryColors[category] || 'bg-gray-500'} flex items-center justify-center mr-4 shadow-sm`}>
          <span className="text-white text-xs font-bold">{category.charAt(0)}</span>
        </div>
        <div>
          <span className="text-gray-900 dark:text-white font-semibold">{category}</span>
          {description && <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</div>}
          {date && <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date}
          </div>}
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-red-600 dark:text-red-400 text-lg">-${amount}</div>
        {percentage && <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{percentage}% of total</div>}
      </div>
    </div>
  );
}

function IncomeItem({ source, amount, date, description }) {
  const sourceIcons = {
    'Primary Salary': '💼',
    'Freelance Work': '💻',
    'Investment Returns': '📈',
    'Side Business': '🏪'
  };
  
  return (
    <div className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mr-4 shadow-sm">
          <span className="text-lg">{sourceIcons[source] || '💰'}</span>
        </div>
        <div>
          <span className="text-gray-900 dark:text-white font-semibold">{source}</span>
          {description && <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</div>}
          {date && <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date}
          </div>}
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-green-600 dark:text-green-400 text-lg">+${amount}</div>
      </div>
    </div>
  );
}

function LiabilityItem({ creditor, amount, dueDate, type, status }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full mr-3 ${status === 'overdue' ? 'bg-red-500' : status === 'due-soon' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
        <div>
          <span className="text-gray-700 dark:text-gray-300 font-medium">{creditor}</span>
          <div className="text-sm text-gray-500">{type}</div>
          <div className="text-xs text-gray-400">Due: {dueDate}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-gray-900 dark:text-white">${amount}</div>
        <div className={`text-xs px-2 py-1 rounded-full ${status === 'overdue' ? 'bg-red-100 text-red-800' : status === 'due-soon' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {status === 'overdue' ? 'Overdue' : status === 'due-soon' ? 'Due Soon' : 'Current'}
        </div>
      </div>
    </div>
  );
}

function TransactionItem({ description, amount, date, type }) {
  return (
    <div className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group">
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${type === 'income' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
          <svg className={`w-4 h-4 ${type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={type === 'income' ? "M12 6v6m0 0v6m0-6h6m-6 0H6" : "M20 12H4"} />
          </svg>
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{description}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date}
          </div>
        </div>
      </div>
      <div className={`font-bold text-lg ${type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {type === 'income' ? '+' : '-'}${amount}
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar({ activeSection, setActiveSection, handleLogout }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: HomeIcon, color: 'from-blue-500 to-blue-600' },
    { id: 'expenses', label: 'Expenses', icon: ExpenseIcon, color: 'from-red-500 to-red-600' },
    { id: 'income', label: 'Income', icon: IncomeIcon, color: 'from-green-500 to-green-600' },
    { id: 'liabilities', label: 'Liabilities & Payables', icon: LiabilityIcon, color: 'from-orange-500 to-orange-600' },
    { id: 'receivables', label: 'Receivables & Assets', icon: ReceivableIcon, color: 'from-teal-500 to-teal-600' },
    { id: 'reports', label: 'Reports', icon: ReportIcon, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="w-72 lg:w-80 xl:w-72 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl h-screen min-h-screen sticky top-0 flex-shrink-0 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6 h-full flex flex-col overflow-hidden">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Personal Budget</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">Financial Dashboard</p>
        </div>
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3.5 text-left rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg transform scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white hover:scale-102'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
                )}
                <div className={`relative z-10 ${isActive ? 'text-white' : ''}`}>
                  <Icon />
                </div>
                <span className={`ml-4 font-semibold text-sm relative z-10 ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                {isActive && (
                  <div className="ml-auto relative z-10">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl font-semibold transition-all duration-200 border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 flex items-center justify-center space-x-2 mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Made with care © 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeSection, setActiveSection] = useState('overview');
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddLiabilityModal, setShowAddLiabilityModal] = useState(false);
  const [expenses, setExpenses] = useState([]);

  // Income data from database
  const [incomeData, setIncomeData] = useState([]);

  // Liabilities data from database
  const [liabilities, setLiabilities] = useState([]);
  
  // Receivables and Assets data
  const [receivables, setReceivables] = useState([]);
  const [assets, setAssets] = useState([]);
  const [showAddReceivableModal, setShowAddReceivableModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [showQuickActionMenu, setShowQuickActionMenu] = useState(false);
  
  // Categories state
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  
  // Report state
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [reportDateRange, setReportDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  // Authentication handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Murshed@k5') {
      setIsAuthenticated(true);
      setLoginError('');
      setPassword('');
    } else {
      setLoginError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setLoginError('');
  };

  // Data fetching functions
  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses');
      if (response.ok) {
        const data = await response.json();
        // Format data for display
        const formattedExpenses = data.map(expense => ({
          ...expense,
          amount: expense.amount.toLocaleString(),
          date: new Date(expense.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        }));
        setExpenses(formattedExpenses);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchIncome = async () => {
    try {
      const response = await fetch('/api/income');
      if (response.ok) {
        const data = await response.json();
        // Format data for display
        const formattedIncome = data.map(income => ({
          ...income,
          amount: income.amount.toLocaleString(),
          date: new Date(income.date).toISOString().split('T')[0]
        }));
        setIncomeData(formattedIncome);
      }
    } catch (error) {
      console.error('Error fetching income:', error);
    }
  };

  const fetchLiabilities = async () => {
    try {
      const response = await fetch('/api/liabilities');
      if (response.ok) {
        const data = await response.json();
        // Format data for display
        const formattedLiabilities = data.map(liability => ({
          ...liability,
          amount: liability.amount.toLocaleString(),
          monthlyPayment: liability.monthlyPayment.toLocaleString(),
          dueDate: new Date(liability.dueDate).toISOString().split('T')[0]
        }));
        setLiabilities(formattedLiabilities);
      }
    } catch (error) {
      console.error('Error fetching liabilities:', error);
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const response = await fetch('/api/expense-categories');
      if (response.ok) {
        const data = await response.json();
        setExpenseCategories(data);
      }
    } catch (error) {
      console.error('Error fetching expense categories:', error);
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const response = await fetch('/api/income-categories');
      if (response.ok) {
        const data = await response.json();
        setIncomeCategories(data);
      }
    } catch (error) {
      console.error('Error fetching income categories:', error);
    }
  };

  const fetchReceivables = async () => {
    try {
      const response = await fetch('/api/receivables');
      if (response.ok) {
        const data = await response.json();
        // Format data for display
        const formattedReceivables = data.map(receivable => ({
          ...receivable,
          amount: receivable.amount.toLocaleString(),
          dueDate: new Date(receivable.dueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        }));
        setReceivables(formattedReceivables);
      }
    } catch (error) {
      console.error('Error fetching receivables:', error);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await fetch('/api/assets');
      if (response.ok) {
        const data = await response.json();
        // Format data for display
        const formattedAssets = data.map(asset => ({
          ...asset,
          value: asset.value.toLocaleString(),
          purchaseDate: new Date(asset.purchaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        }));
        setAssets(formattedAssets);
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const addExpenseCategory = async (name, color) => {
    try {
      const response = await fetch('/api/expense-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, color }),
      });
      
      if (response.ok) {
        const newCategory = await response.json();
        setExpenseCategories(prev => [...prev, newCategory]);
        return newCategory;
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create category');
      }
    } catch (error) {
      console.error('Error adding expense category:', error);
      throw error;
    }
  };

  const addIncomeCategory = async (name, color) => {
    try {
      const response = await fetch('/api/income-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, color }),
      });
      
      if (response.ok) {
        const newCategory = await response.json();
        setIncomeCategories(prev => [...prev, newCategory]);
        return newCategory;
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create category');
      }
    } catch (error) {
      console.error('Error adding income category:', error);
      throw error;
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchExpenses(),
        fetchIncome(),
        fetchLiabilities(),
        fetchExpenseCategories(),
        fetchIncomeCategories(),
        fetchReceivables(),
        fetchAssets()
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Close quick action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showQuickActionMenu && !event.target.closest('.relative')) {
        setShowQuickActionMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showQuickActionMenu]);

  // Export function to download financial data as CSV
  const handleExport = () => {
    try {
      const monthlyReports = calculateMonthlyReports();
      const stats = calculateStats();
      
      // Prepare data for export
      const exportData = {
        summary: {
          totalIncome: monthlyReports.totalIncome,
          totalExpenses: monthlyReports.totalExpenses,
          netSavings: monthlyReports.netSavings,
          savingsRate: monthlyReports.savingsRate,
          totalBalance: stats.totalBalance
        },
        expenses: expenses.map(expense => ({
          category: expense.category,
          amount: expense.amount,
          description: expense.description,
          date: expense.date
        })),
        income: incomeData.map(income => ({
          source: income.source,
          amount: income.amount,
          description: income.description,
          date: income.date
        })),
        liabilities: liabilities.map(liability => ({
          type: liability.type,
          amount: liability.amount,
          monthlyPayment: liability.monthlyPayment,
          description: liability.description,
          dueDate: liability.dueDate
        }))
      };

      // Convert to CSV format
      let csvContent = "Personal Budget Export\n\n";
      
      // Summary section
      csvContent += "FINANCIAL SUMMARY\n";
      csvContent += `Total Income,${exportData.summary.totalIncome}\n`;
      csvContent += `Total Expenses,${exportData.summary.totalExpenses}\n`;
      csvContent += `Net Savings,${exportData.summary.netSavings}\n`;
      csvContent += `Savings Rate,${exportData.summary.savingsRate}%\n`;
      csvContent += `Total Balance,${exportData.summary.totalBalance}\n\n`;
      
      // Expenses section
      csvContent += "EXPENSES\n";
      csvContent += "Category,Amount,Description,Date\n";
      exportData.expenses.forEach(expense => {
        csvContent += `${expense.category},${expense.amount},"${expense.description}",${expense.date}\n`;
      });
      csvContent += "\n";
      
      // Income section
      csvContent += "INCOME\n";
      csvContent += "Source,Amount,Description,Date\n";
      exportData.income.forEach(income => {
        csvContent += `${income.source},${income.amount},"${income.description}",${income.date}\n`;
      });
      csvContent += "\n";
      
      // Liabilities section
      csvContent += "LIABILITIES\n";
      csvContent += "Type,Amount,Monthly Payment,Description,Due Date\n";
      exportData.liabilities.forEach(liability => {
        csvContent += `${liability.type},${liability.amount},${liability.monthlyPayment},"${liability.description}",${liability.dueDate}\n`;
      });
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `personal-budget-export-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message (you could add a toast notification here)
      alert('Financial data exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  // Generate comprehensive report
  const generateReport = async () => {
    setIsGeneratingReport(true);
    try {
      // Filter data based on date range
      const startDate = new Date(reportDateRange.startDate);
      const endDate = new Date(reportDateRange.endDate);
      
      const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startDate && expenseDate <= endDate;
      });
      
      const filteredIncome = incomeData.filter(income => {
        const incomeDate = new Date(income.date);
        return incomeDate >= startDate && incomeDate <= endDate;
      });
      
      // Calculate report metrics
      const totalIncome = filteredIncome.reduce((sum, income) => sum + parseFloat(income.amount.replace(/,/g, '')), 0);
      const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount.replace(/,/g, '')), 0);
      const netSavings = totalIncome - totalExpenses;
      const savingsRate = totalIncome > 0 ? (netSavings / totalIncome * 100) : 0;
      
      // Category breakdown
      const expensesByCategory = {};
      filteredExpenses.forEach(expense => {
        const amount = parseFloat(expense.amount.replace(/,/g, ''));
        expensesByCategory[expense.category] = (expensesByCategory[expense.category] || 0) + amount;
      });
      
      const incomeBySource = {};
      filteredIncome.forEach(income => {
        const amount = parseFloat(income.amount.replace(/,/g, ''));
        incomeBySource[income.source] = (incomeBySource[income.source] || 0) + amount;
      });
      
      const reportData = {
        dateRange: reportDateRange,
        summary: {
          totalIncome,
          totalExpenses,
          netSavings,
          savingsRate: savingsRate.toFixed(1)
        },
        expenses: filteredExpenses,
        income: filteredIncome,
        categoryBreakdown: {
          expenses: expensesByCategory,
          income: incomeBySource
        }
      };
      
      setReportData(reportData);
      alert('Report generated successfully!');
    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Report generation failed. Please try again.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Export report as PDF
  const exportToPDF = async () => {
    if (!reportData) {
      alert('Please generate a report first.');
      return;
    }
    
    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;
      
      // Create PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Add title
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Personal Budget Report', pageWidth / 2, 20, { align: 'center' });
      
      // Add date range
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const dateRangeText = `Period: ${reportData.dateRange.startDate} to ${reportData.dateRange.endDate}`;
      pdf.text(dateRangeText, pageWidth / 2, 30, { align: 'center' });
      
      let yPosition = 45;
      
      // Summary section
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Financial Summary', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Total Income: $${reportData.summary.totalIncome.toLocaleString()}`, 20, yPosition);
      yPosition += 7;
      pdf.text(`Total Expenses: $${reportData.summary.totalExpenses.toLocaleString()}`, 20, yPosition);
      yPosition += 7;
      pdf.text(`Net Savings: $${reportData.summary.netSavings.toLocaleString()}`, 20, yPosition);
      yPosition += 7;
      pdf.text(`Savings Rate: ${reportData.summary.savingsRate}%`, 20, yPosition);
      yPosition += 15;
      
      // Expense breakdown
      if (Object.keys(reportData.categoryBreakdown.expenses).length > 0) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Expenses by Category', 20, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        Object.entries(reportData.categoryBreakdown.expenses).forEach(([category, amount]) => {
          pdf.text(`${category}: $${amount.toLocaleString()}`, 20, yPosition);
          yPosition += 7;
        });
        yPosition += 10;
      }
      
      // Income breakdown
      if (Object.keys(reportData.categoryBreakdown.income).length > 0) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Income by Source', 20, yPosition);
        yPosition += 10;
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        Object.entries(reportData.categoryBreakdown.income).forEach(([source, amount]) => {
          pdf.text(`${source}: $${amount.toLocaleString()}`, 20, yPosition);
          yPosition += 7;
        });
      }
      
      // Save PDF
      const fileName = `budget-report-${reportData.dateRange.startDate}-to-${reportData.dateRange.endDate}.pdf`;
      pdf.save(fileName);
      
      alert('PDF exported successfully!');
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF export failed. Please try again.');
    }
  };

  // Calculate monthly reports from actual data
  const calculateMonthlyReports = () => {
    const totalIncome = incomeData.reduce((sum, income) => sum + parseFloat(income.amount.replace(/,/g, '')), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount.replace(/,/g, '')), 0);
    const netSavings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netSavings / totalIncome * 100) : 0;
    
    // Group expenses by category
    const expensesByCategory = expenses.reduce((acc, expense) => {
      const category = expense.category;
      const amount = parseFloat(expense.amount.replace(/,/g, ''));
      if (!acc[category]) {
        acc[category] = { category, amount: 0, count: 0 };
      }
      acc[category].amount += amount;
      acc[category].count += 1;
      return acc;
    }, {});
    
    const categoryArray = Object.values(expensesByCategory).map(cat => ({
      category: cat.category,
      amount: cat.amount.toLocaleString(),
      percentage: totalExpenses > 0 ? (cat.amount / totalExpenses * 100).toFixed(1) : 0
    })).sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
    
    return {
      totalIncome,
      totalExpenses,
      netSavings,
      savingsRate: savingsRate.toFixed(1),
      budgetVariance: 0, // This would need budget data to calculate
      expensesByCategory: categoryArray
    };
  };
  
  const monthlyReports = calculateMonthlyReports();

  // Combine and sort recent transactions from actual data
  const getRecentTransactions = () => {
    const transactions = [];
    
    // Add income transactions
    incomeData.forEach(income => {
      transactions.push({
        description: income.source,
        amount: income.amount,
        date: income.date,
        type: 'income'
      });
    });
    
    // Add expense transactions
    expenses.forEach(expense => {
      transactions.push({
        description: expense.description || expense.category,
        amount: expense.amount,
        date: expense.date,
        type: 'expense'
      });
    });
    
    // Sort by date (most recent first)
    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  
  const recentTransactions = getRecentTransactions();

  // Calculate financial goals based on actual savings
  const calculateGoals = () => {
    const totalSavings = monthlyReports.netSavings * 6; // Estimate 6 months of savings
    return [
      { 
        name: 'Emergency Fund', 
        current: Math.max(0, totalSavings * 0.6), 
        target: 15000, 
        percentage: Math.min(100, (totalSavings * 0.6 / 15000 * 100)).toFixed(1)
      },
      { 
        name: 'Vacation Fund', 
        current: Math.max(0, totalSavings * 0.2), 
        target: 5000, 
        percentage: Math.min(100, (totalSavings * 0.2 / 5000 * 100)).toFixed(1)
      },
      { 
        name: 'Investment Fund', 
        current: Math.max(0, totalSavings * 0.2), 
        target: 25000, 
        percentage: Math.min(100, (totalSavings * 0.2 / 25000 * 100)).toFixed(1)
      }
    ];
  };
  
  const goals = calculateGoals();

  // Calculate stats from actual data
  const calculateStats = () => {
    const totalIncome = incomeData.reduce((sum, income) => sum + parseFloat(income.amount.replace(/,/g, '')), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount.replace(/,/g, '')), 0);
    const savings = totalIncome - totalExpenses;
    const totalBalance = savings * 6; // Estimate balance as 6 months of net savings
    
    return {
      totalBalance: Math.max(0, totalBalance).toLocaleString(),
      monthlyIncome: totalIncome.toLocaleString(),
      monthlyExpenses: totalExpenses.toLocaleString(),
      savings: Math.max(0, savings).toLocaleString()
    };
  };
  
  const stats = calculateStats();

  // Function to add new expense
  const addExpense = async (newExpense) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: newExpense.description,
          amount: newExpense.amount,
          category: newExpense.category,
          date: new Date().toISOString()
        })
      });

      if (response.ok) {
        // Refresh expenses data
        await fetchExpenses();
        setShowAddExpenseModal(false);
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const addIncome = async (newIncome) => {
    try {
      const response = await fetch('/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: newIncome.source,
          amount: newIncome.amount,
          type: newIncome.type,
          recurring: newIncome.recurring,
          date: new Date().toISOString()
        })
      });

      if (response.ok) {
        // Refresh income data
        await fetchIncome();
        setShowAddIncomeModal(false);
      } else {
        console.error('Failed to add income');
      }
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  const addLiability = async (newLiability) => {
    try {
      const response = await fetch('/api/liabilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creditor: newLiability.creditor,
          amount: newLiability.amount,
          monthlyPayment: newLiability.monthlyPayment,
          dueDate: newLiability.dueDate,
          status: newLiability.status,
          type: newLiability.type
        })
      });

      if (response.ok) {
        // Refresh liabilities data
        await fetchLiabilities();
        setShowAddLiabilityModal(false);
      } else {
        console.error('Failed to add liability');
      }
    } catch (error) {
      console.error('Error adding liability:', error);
    }
  };



  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading data...</span>
        </div>
      );
    }

    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Balance" value={`$${stats.totalBalance}`} change="+2.5% from last month" isPositive={true} />
              <StatCard title="Monthly Income" value={`$${stats.monthlyIncome}`} change="+5.2% from last month" isPositive={true} />
              <StatCard title="Monthly Expenses" value={`$${stats.monthlyExpenses}`} change="-1.8% from last month" isPositive={true} />
              <StatCard title="Savings" value={`$${stats.savings}`} change="+12.3% from last month" isPositive={true} />
            </div>

            {/* Charts and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Expense Breakdown */}
              <DashboardCard title="Recent Expenses">
                <div className="space-y-1">
                  {expenses.slice(0, 5).map((expense, index) => (
                    <ExpenseItem key={index} {...expense} />
                  ))}
                  {expenses.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      No expenses recorded yet. Add your first expense to get started.
                    </div>
                  )}
                </div>
                {expenses.length > 0 && (
                  <button 
                    onClick={() => setActiveSection('expenses')}
                    className="w-full mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    View All Expenses
                  </button>
                )}
              </DashboardCard>

              {/* Recent Transactions */}
              <DashboardCard title="Recent Transactions">
                <div className="space-y-1">
                  {recentTransactions.slice(0, 5).map((transaction, index) => (
                    <TransactionItem key={index} {...transaction} />
                  ))}
                  {recentTransactions.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      No transactions yet. Add income or expenses to see recent activity.
                    </div>
                  )}
                </div>
                {recentTransactions.length > 0 && (
                  <button className="w-full mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                    View All Transactions
                  </button>
                )}
              </DashboardCard>
            </div>

            {/* Financial Goals */}
            <DashboardCard title="Financial Goals Progress">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{goal.name}</span>
                      <span className="text-sm text-gray-500">{goal.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${goal.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              {monthlyReports.netSavings <= 0 && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    💡 Start saving money to see progress towards your financial goals. Add income sources and track expenses to build positive savings.
                  </p>
                </div>
              )}
            </DashboardCard>
          </div>
        );

      case 'expenses':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Expense Management</h2>
              <button 
                  onClick={() => setShowAddExpenseModal(true)}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Expense</span>
                </button>
            </div>

            {/* Expense Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Total Expenses" value={`$${monthlyReports.totalExpenses.toLocaleString()}`} change="Current month total" isPositive={false} />
              <StatCard title="Total Transactions" value={expenses.length.toString()} change={`${expenses.length} transactions`} isPositive={true} />
              <StatCard title="Avg per Transaction" value={expenses.length > 0 ? `$${(monthlyReports.totalExpenses / expenses.length).toLocaleString()}` : '$0'} change="Average amount" isPositive={false} />
            </div>

            {/* Detailed Expenses */}
            <DashboardCard title="All Expenses">
              <div className="space-y-1">
                {expenses.map((expense, index) => (
                  <ExpenseItem key={index} {...expense} />
                ))}
                {expenses.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No expenses recorded yet. Start tracking your spending by adding expenses.
                  </div>
                )}
              </div>
            </DashboardCard>

            {/* Expense Categories Chart */}
            <DashboardCard title="Expense Categories">
              <div className="space-y-4">
                {monthlyReports.expensesByCategory.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">{category.category}</span>
                      <span className="font-semibold">${category.amount} ({category.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                {monthlyReports.expensesByCategory.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No expense data available. Add some expenses to see the breakdown.
                  </div>
                )}
              </div>
            </DashboardCard>
          </div>
        );

      case 'income':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Income Management</h2>
              <button 
                onClick={() => setShowAddIncomeModal(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Income</span>
              </button>
            </div>

            {/* Income Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Total Income" value={`$${monthlyReports.totalIncome.toLocaleString()}`} change="Current month total" isPositive={true} />
              <StatCard title="Income Sources" value={incomeData.length.toString()} change={`${incomeData.length} active sources`} isPositive={true} />
              <StatCard title="Avg per Source" value={incomeData.length > 0 ? `$${(monthlyReports.totalIncome / incomeData.length).toLocaleString()}` : '$0'} change="Average amount" isPositive={true} />
            </div>

            {/* Income Sources */}
            <DashboardCard title="Income Sources">
              <div className="space-y-1">
                {incomeData.map((income, index) => (
                  <IncomeItem key={index} {...income} />
                ))}
                {incomeData.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No income data available. Add some income sources to get started.
                  </div>
                )}
              </div>
            </DashboardCard>

            {/* Income Breakdown */}
            <DashboardCard title="Income Distribution">
              <div className="space-y-4">
                {incomeData.map((income, index) => {
                  const percentage = (parseFloat(income.amount.replace(',', '')) / 6450 * 100).toFixed(1);
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">{income.source}</span>
                        <span className="font-semibold">${income.amount}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </DashboardCard>
          </div>
        );

      case 'liabilities':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Liabilities & Payables</h2>
              <button 
                onClick={() => setShowAddLiabilityModal(true)}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Liability</span>
              </button>
            </div>

            {/* Liability Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard 
                title="Total Liabilities" 
                value={`$${liabilities.reduce((sum, l) => sum + parseFloat(l.amount.replace(/,/g, '')), 0).toLocaleString()}`} 
                change={`${liabilities.length} total liabilities`} 
                isPositive={false} 
              />
              <StatCard 
                title="Monthly Payments" 
                value={`$${liabilities.reduce((sum, l) => sum + parseFloat(l.monthlyPayment.replace(/,/g, '')), 0).toLocaleString()}`} 
                change="Total monthly payments" 
                isPositive={false} 
              />
              <StatCard 
                title="Overdue" 
                value={liabilities.filter(l => l.status === 'overdue').length.toString()} 
                change="Overdue payments" 
                isPositive={false} 
              />
              <StatCard 
                title="Due Soon" 
                value={liabilities.filter(l => l.status === 'due-soon').length.toString()} 
                change="Due within 7 days" 
                isPositive={false} 
              />
            </div>

            {/* Liabilities List */}
            <DashboardCard title="All Liabilities">
              <div className="space-y-1">
                {liabilities.map((liability, index) => (
                  <LiabilityItem key={index} {...liability} />
                ))}
                {liabilities.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No liabilities found. Add debts or payables to track them here.
                  </div>
                )}
              </div>
            </DashboardCard>

            {/* Payment Schedule */}
            <DashboardCard title="Upcoming Payments">
              <div className="space-y-4">
                {liabilities
                  .filter(l => l.status === 'due-soon' || l.status === 'overdue')
                  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                  .map((liability, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{liability.creditor}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Due: {liability.dueDate}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 dark:text-white">${liability.amount}</div>
                        <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mt-1">
                          Pay Now
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </DashboardCard>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Reports</h2>
              
              {/* Date Range Selection */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From:</label>
                  <input
                    type="date"
                    value={reportDateRange.startDate}
                    onChange={(e) => setReportDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To:</label>
                  <input
                    type="date"
                    value={reportDateRange.endDate}
                    onChange={(e) => setReportDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={generateReport}
                    disabled={isGeneratingReport}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    {isGeneratingReport ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <span>Generate Report</span>
                    )}
                  </button>
                  <button 
                    onClick={exportToPDF}
                    disabled={!reportData}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-100 disabled:dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:text-gray-400 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Export PDF
                  </button>
                </div>
              </div>
            </div>
            
            {/* Report Status */}
            {reportData && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-800 dark:text-green-300 font-medium">
                    Report generated for period: {reportData.dateRange.startDate} to {reportData.dateRange.endDate}
                  </span>
                </div>
              </div>
            )}

            {/* Report Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Net Income" value={`$${monthlyReports.netSavings.toLocaleString()}`} change="+15.3% from last month" isPositive={true} />
              <StatCard title="Savings Rate" value={`${monthlyReports.savingsRate}%`} change="Above target (40%)" isPositive={true} />
              <StatCard title="Budget Variance" value={`${monthlyReports.budgetVariance}%`} change="Under budget" isPositive={true} />
              <StatCard title="Expense Ratio" value="49.3%" change="Income to expenses" isPositive={true} />
            </div>

            {/* Monthly Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DashboardCard title="Monthly Financial Summary">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium text-green-800 dark:text-green-300">Total Income</span>
                    <span className="font-bold text-green-800 dark:text-green-300">${monthlyReports.totalIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span className="font-medium text-red-800 dark:text-red-300">Total Expenses</span>
                    <span className="font-bold text-red-800 dark:text-red-300">${monthlyReports.totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="font-medium text-blue-800 dark:text-blue-300">Net Savings</span>
                    <span className="font-bold text-blue-800 dark:text-blue-300">${monthlyReports.netSavings.toLocaleString()}</span>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="Expense Analysis">
                <div className="space-y-3">
                  {monthlyReports.expensesByCategory.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300">{category.category}</span>
                        <span className="font-semibold">${category.amount} ({category.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </div>

            {/* Trends and Insights */}
            <DashboardCard title="Financial Insights & Recommendations">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Positive Trends</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-sm">Savings rate increased by 15.3% this month</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-sm">Transportation costs reduced by 8%</span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-sm">Income diversification improved</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-blue-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-sm">Consider increasing emergency fund contribution</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-sm">Review entertainment budget allocation</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-sm">Explore investment opportunities</span>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        );

      case 'receivables':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Receivables & Assets</h2>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowAddReceivableModal(true)}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Receivable</span>
                </button>
                <button 
                  onClick={() => setShowAddAssetModal(true)}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Asset</span>
                </button>
              </div>
            </div>

            {/* Assets Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard 
                title="Total Assets" 
                value={`$${assets.reduce((sum, a) => sum + parseFloat(a.value.replace(/,/g, '')), 0).toLocaleString()}`} 
                change={`${assets.length} total assets`} 
                isPositive={true} 
              />
              <StatCard 
                title="Receivables" 
                value={`$${receivables.reduce((sum, r) => sum + parseFloat(r.amount.replace(/,/g, '')), 0).toLocaleString()}`} 
                change={`${receivables.length} pending payments`} 
                isPositive={true} 
              />
              <StatCard 
                title="Overdue Receivables" 
                value={receivables.filter(r => r.status === 'overdue').length.toString()} 
                change="Overdue payments" 
                isPositive={false} 
              />
              <StatCard 
                title="Due Soon" 
                value={receivables.filter(r => r.status === 'due-soon').length.toString()} 
                change="Due within 7 days" 
                isPositive={true} 
              />
            </div>

            {/* Receivables List */}
            <DashboardCard title="Outstanding Receivables">
              <div className="space-y-4">
                {receivables.map((receivable, index) => {
                  const statusColors = {
                    'paid': 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
                    'overdue': 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
                    'due-soon': 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
                    'scheduled': 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  };
                  const statusBadgeColors = {
                    'paid': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
                    'overdue': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
                    'due-soon': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
                    'scheduled': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                  };
                  
                  return (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${statusColors[receivable.status] || statusColors.scheduled}`}>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{receivable.description}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Due: {receivable.dueDate}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${statusColors[receivable.status]?.split(' ').slice(-2).join(' ') || 'text-blue-600 dark:text-blue-400'}`}>${receivable.amount}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusBadgeColors[receivable.status] || statusBadgeColors.scheduled}`}>
                          {receivable.status === 'paid' ? 'Paid' : 
                           receivable.status === 'overdue' ? 'Overdue' :
                           receivable.status === 'due-soon' ? 'Due Soon' : 'Scheduled'}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {receivables.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No receivables found. Add outstanding payments to track them here.
                  </div>
                )}
              </div>
            </DashboardCard>

            {/* Assets Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <DashboardCard title="Asset Portfolio">
                <div className="space-y-4">
                  {(() => {
                    const totalAssetValue = assets.reduce((sum, asset) => sum + parseFloat(asset.value.replace(/,/g, '')), 0);
                    const assetsByCategory = assets.reduce((acc, asset) => {
                      const category = asset.category || 'Other';
                      if (!acc[category]) acc[category] = 0;
                      acc[category] += parseFloat(asset.value.replace(/,/g, ''));
                      return acc;
                    }, {});
                    
                    const colors = ['bg-teal-500', 'bg-teal-400', 'bg-teal-300', 'bg-teal-200', 'bg-teal-100'];
                    
                    return Object.entries(assetsByCategory).map(([category, value], index) => {
                      const percentage = totalAssetValue > 0 ? ((value / totalAssetValue) * 100).toFixed(1) : 0;
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">{category}</span>
                            <span className="font-semibold">${value.toLocaleString()} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className={`${colors[index % colors.length]} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                  {assets.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                      No assets found. Add assets to see portfolio breakdown.
                    </div>
                  )}
                </div>
              </DashboardCard>

              <DashboardCard title="Assets List">
                <div className="space-y-3">
                  {assets.slice(0, 5).map((asset, index) => {
                    const categoryIcons = {
                      'Stocks': 'M7 11l5-5m0 0l5 5m-5-5v12',
                      'Real Estate': 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5',
                      'Cash': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
                      'Other': 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
                    };
                    const categoryColors = {
                      'Stocks': 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                      'Real Estate': 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                      'Cash': 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
                      'Other': 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    };
                    
                    const category = asset.category || 'Other';
                    const iconPath = categoryIcons[category] || categoryIcons.Other;
                    const colorClass = categoryColors[category] || categoryColors.Other;
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{asset.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{asset.category} - {asset.purchaseDate}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900 dark:text-white">${asset.value}</div>
                          <div className="text-xs text-gray-500">{asset.status || 'Active'}</div>
                        </div>
                      </div>
                    );
                  })}
                  {assets.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      No assets found. Add assets to track your portfolio.
                    </div>
                  )}
                  {assets.length > 5 && (
                    <div className="text-center pt-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Showing 5 of {assets.length} assets
                      </span>
                    </div>
                  )}
                </div>
              </DashboardCard>
            </div>
          </div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Personal Budget</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Enter your password to access the dashboard</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
                placeholder="Enter password"
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-800 dark:text-red-300 text-sm">{loginError}</span>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-blue-300 group-hover:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </span>
                Access Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} handleLogout={handleLogout} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent capitalize">{activeSection}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                  {activeSection === 'overview' && '📊 Complete financial overview and insights'}
                  {activeSection === 'expenses' && '💸 Track and manage your expenses'}
                  {activeSection === 'income' && '💰 Monitor your income sources'}
                  {activeSection === 'liabilities' && '📋 Manage debts and payables'}
                  {activeSection === 'reports' && '📈 Detailed financial analysis and reports'}
                </p>
              </div>
              <div className="flex space-x-3">
                <div className="relative">
                  <button 
                    onClick={() => setShowQuickActionMenu(!showQuickActionMenu)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Quick Action</span>
                  </button>
                  
                  {/* Quick Action Dropdown */}
                  {showQuickActionMenu && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setShowAddExpenseModal(true);
                            setShowQuickActionMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                        >
                          <ExpenseIcon />
                          <span>Add Expense</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowAddIncomeModal(true);
                            setShowQuickActionMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                        >
                          <IncomeIcon />
                          <span>Add Income</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowAddLiabilityModal(true);
                            setShowQuickActionMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                        >
                          <LiabilityIcon />
                          <span>Add Liability</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  onClick={handleExport}
                  className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Export</span>
                </button>

              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
      
      {/* Add Expense Modal */}
      <AddExpenseModal 
        isOpen={showAddExpenseModal}
        onClose={() => setShowAddExpenseModal(false)}
        onAdd={addExpense}
        categories={expenseCategories}
        onAddCategory={addExpenseCategory}
      />
      
      {/* Add Income Modal */}
       <AddIncomeModal 
         isOpen={showAddIncomeModal}
         onClose={() => setShowAddIncomeModal(false)}
         onAdd={addIncome}
         categories={incomeCategories}
         onAddCategory={addIncomeCategory}
       />
       
      {/* Add Liability Modal */}
       <AddLiabilityModal 
         isOpen={showAddLiabilityModal}
         onClose={() => setShowAddLiabilityModal(false)}
         onAdd={addLiability}
       />
     </div>
   );
}
