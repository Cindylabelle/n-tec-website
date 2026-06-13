'use client';

import React, { useState, useEffect } from 'react';

interface FormData {
  program: string;
  course: string;
  level: string;
  startDate: string;
  duration: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

export default function NtecHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    program: '', course: '', level: '', startDate: '', duration: '',
    fullName: '', phone: '', email: '', message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [levelOptions, setLevelOptions] = useState<string[]>([]);

  // Dynamic level options based on selected program
  const getLevelOptions = (program: string): string[] => {
    if (program === 'Internship Program') {
      return ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Does not apply'];
    } else if (program === 'Bootcamp Program' || program === 'Holiday / Summer Program') {
      return ['Beginner', 'Intermediate', 'Advanced'];
    } else {
      return ['Beginner', 'Intermediate', 'Advanced', 'Does not apply'];
    }
  };

  // Update level options when program changes
  useEffect(() => {
    const newLevels = getLevelOptions(formData.program);
    setLevelOptions(newLevels);
    
    // Reset level if current value is no longer valid
    if (formData.level && !newLevels.includes(formData.level)) {
      setFormData(prev => ({ ...prev, level: '' }));
    }
  }, [formData.program]);

  const openModal = () => {
    setIsModalOpen(true);
    setSubmitted(false);
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      program: '', course: '', level: '', startDate: '', duration: '',
      fullName: '', phone: '', email: '', message: '',
    });
    setErrors({});
    setLevelOptions([]);
  };

  // Real-time validation on blur
  const handleBlur = (field: keyof FormData) => {
    if (!formData[field]) {
      setErrors(prev => ({ ...prev, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` }));
    } else {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error as soon as user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    Object.keys(formData).forEach(key => {
      const field = key as keyof FormData;
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/mykalglg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => closeModal(), 1800);
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Your actual options
  const programOptions = [
    'Internship Program',
    'Bootcamp Program',
    'Holiday / Summer Program',
    'Course Training',
  ];

  const courseOptions = [
    'Data Analysis',
    'Web Development',
    'Graphic Design',
    'Computer Awareness & Basics',
    'Software Development',
    'Networking & Hardware',
    'Solar Panel Installation',
    'Starlink Setup & Configuration',
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navbar + Hero + Programs + About sections remain the same as before */}
      {/* ... (keep your existing hero, programs, about sections here) */}

      {/* ==================== DARK MODAL ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <div className="bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-700 max-h-[92vh] flex flex-col">
            
            {/* Modal Header with X button */}
            <div className="flex justify-between items-center px-8 pt-6 pb-4 border-b border-slate-700 flex-shrink-0">
              <div>
                <h2 className="text-3xl font-semibold text-white">Apply to N-tec</h2>
                <p className="text-slate-400 text-sm mt-1">Fill the form below to apply for a program</p>
              </div>
              <button 
                onClick={closeModal} 
                className="text-4xl text-slate-400 hover:text-white transition-colors leading-none"
              >
                ×
              </button>
            </div>

            {submitted ? (
              <div className="p-12 text-center flex-1 flex flex-col justify-center">
                <div className="text-emerald-400 text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-semibold mb-2">Application Received!</h3>
                <p className="text-slate-400">Thank you. We’ll contact you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto flex-1">
                
                {/* Program Details */}
                <div>
                  <h3 className="text-cyan-400 font-semibold text-lg mb-4">Program Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    {/* Program */}
                    <div>
                      <label className="block text-sm text-slate-300 mb-1.5">Program</label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('program')}
                        className={`w-full bg-slate-800 border rounded-2xl px-4 py-3 text-white focus:outline-none ${errors.program ? 'border-red-500' : 'border-slate-600'}`}
                      >
                        <option value="">Select program type</option>
                        {programOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                      </select>
                      {errors.program && <p className="text-red-400 text-sm mt-1">{errors.program}</p>}
                    </div>

                    {/* Course */}
                    <div>
                      <label className="block text-sm text-slate-300 mb-1.5">Course</label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('course')}
                        className={`w-full bg-slate-800 border rounded-2xl px-4 py-3 text-white focus:outline-none ${errors.course ? 'border-red-500' : 'border-slate-600'}`}
                      >
                        <option value="">Select specific course</option>
                        {courseOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                      </select>
                      {errors.course && <p className="text-red-400 text-sm mt-1">{errors.course}</p>}
                    </div>

                    {/* Level (Dynamic) */}
                    <div>
                      <label className="block text-sm text-slate-300 mb-1.5">Level</label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('level')}
                        disabled={!formData.program}
                        className={`w-full bg-slate-800 border rounded-2xl px-4 py-3 text-white focus:outline-none ${errors.level ? 'border-red-500' : 'border-slate-600'} ${!formData.program ? 'opacity-50' : ''}`}
                      >
                        <option value="">Select level</option>
                        {levelOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                      </select>
                      {errors.level && <p className="text-red-400 text-sm mt-1">{errors.level}</p>}
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm text-slate-300 mb-1.5">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('startDate')}
                        className={`w-full bg-slate-800 border rounded-2xl px-4 py-3 text-white focus:outline-none ${errors.startDate ? 'border-red-500' : 'border-slate-600'}`}
                      />
                      {errors.startDate && <p className="text-red-400 text-sm mt-1">{errors.startDate}</p>}
                    </div>

                    {/* Duration with placeholder */}
                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-300 mb-1.5">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('duration')}
                        placeholder="e.g. 3 months"
                        className={`w-full bg-slate-800 border rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none ${errors.duration ? 'border-red-500' : 'border-slate-600'}`}
                      />
                      {errors.duration && <p className="text-red-400 text-sm mt-1">{errors.duration}</p>}
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h3 className="text-cyan-400 font-semibold text-lg mb-4">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div>
                      <label className="block text-sm text-slate-300 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('fullName')}
                        placeholder="John Doe"
                        className={`w-full bg-slate-800 border rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none ${errors.fullName ? 'border-red-500' : 'border-slate-600'}`}
                      />
                      {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm text-slate-300 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('phone')}
                        placeholder="+237 6XX XXX XXX"
                        className={`w-full bg-slate-800 border rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none ${errors.phone ? 'border-red-500' : 'border-slate-600'}`}
                      />
                      {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm text-slate-300 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        placeholder="john@example.com"
                        className={`w-full bg-slate-800 border rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none ${errors.email ? 'border-red-500' : 'border-slate-600'}`}
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-300 mb-1.5">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('message')}
                        placeholder="Why are you applying? Any additional information..."
                        rows={4}
                        className={`w-full bg-slate-800 border rounded-3xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none resize-y ${errors.message ? 'border-red-500' : 'border-slate-600'}`}
                      />
                      {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-700 flex-shrink-0">
                  <button type="button" onClick={closeModal} className="px-6 py-3 text-slate-400 hover:text-white font-medium">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 text-slate-950 font-semibold rounded-2xl transition-all"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}