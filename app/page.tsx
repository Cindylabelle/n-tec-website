'use client';

import React, { useState } from 'react';

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
    program: '',
    course: '',
    level: '',
    startDate: '',
    duration: '',
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setSubmitted(false);
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form when closing
    setFormData({
      program: '', course: '', level: '', startDate: '', duration: '',
      fullName: '', phone: '', email: '', message: '',
    });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.program) newErrors.program = 'Program is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.level) newErrors.level = 'Level is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email address is required';
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Replace with your actual Formspree endpoint
      const response = await fetch('https://formspree.io/f/mykalglg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          closeModal();
        }, 2000);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Program & Course options (you can edit these)
  const programOptions = [
    'Foundational Computing',
    'Software Development',
    'Graphic Design',
    'Data Analysis',
    'Networking & Hardware',
    'Solar Panel Installation',
    'Starlink Setup',
    'Bootcamp / Holiday Program',
  ];

  const courseOptions = [
    'Computer Basics & Digital Literacy',
    'Web Development (Frontend)',
    'Web Development (Fullstack)',
    'Mobile App Development',
    'Graphic Design & Branding',
    'UI/UX Design',
    'Data Analysis with Excel & Power BI',
    'Networking Fundamentals',
    'Computer Hardware & Maintenance',
    'Solar Panel Installation & Maintenance',
    'Starlink Installation & Configuration',
    'Career Readiness Bootcamp',
  ];

  const levelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Does not apply'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-slate-950 font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-semibold tracking-tight">N-tec</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#programs" className="hover:text-cyan-400 transition-colors">Programs</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          <button 
            onClick={openModal}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium rounded-xl text-sm transition-all active:scale-[0.985]"
          >
            Apply Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-block px-4 py-1.5 bg-slate-900 rounded-full text-sm mb-6 border border-slate-800">
          Practical Skills. Real Futures.
        </div>
        
        <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-6">
          Build skills that<br />actually get you hired.
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-10">
          Hands-on vocational training in computing, software, design, data, 
          networking, solar energy & Starlink installation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={openModal}
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-2xl text-lg transition-all active:scale-[0.985]"
          >
            Start Your Application
          </button>
          <a href="#programs" className="px-8 py-4 border border-slate-700 hover:bg-slate-900 rounded-2xl text-lg transition-all flex items-center justify-center">
            Explore Programs
          </a>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="text-cyan-500 text-sm font-medium tracking-widest">WHAT WE OFFER</div>
            <h2 className="text-4xl font-semibold tracking-tight mt-2">Practical Programs</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programOptions.slice(0, 8).map((program, index) => (
            <div key={index} className="group bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
              <div className="w-10 h-10 bg-slate-800 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                <div className="w-5 h-5 bg-cyan-500 rounded-full" />
              </div>
              <h3 className="font-semibold text-xl mb-3 tracking-tight">{program}</h3>
              <p className="text-slate-400 text-[15px]">Hands-on training with real projects and mentorship.</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-emerald-500 text-sm font-medium tracking-[3px] mb-3">OUR MISSION</div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-6">
            Empowering people with<br />real, usable technology skills
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            N-tec is a vocational training center dedicated to giving students of all ages 
            and backgrounds practical, job-ready skills in technology.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-6">
          © {new Date().getFullYear()} N-tec Vocational Training Center
        </div>
      </footer>

      {/* ==================== MODAL FORM ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-semibold text-slate-900">Apply</h2>
                  <p className="text-slate-600 mt-1">Fill out the form below to apply for a program.</p>
                </div>
                <button onClick={closeModal} className="text-3xl text-slate-400 hover:text-slate-600">×</button>
              </div>
            </div>

            {submitted ? (
              <div className="p-12 text-center">
                <div className="text-emerald-500 text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">Application Received!</h3>
                <p className="text-slate-600">Thank you. We’ll contact you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Program Details Section */}
                <div>
                  <h3 className="text-orange-600 font-semibold text-lg mb-4">Program Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Program */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Program</label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className={`w-full border rounded-2xl px-4 py-3 text-slate-900 focus:outline-none ${errors.program ? 'border-red-500' : 'border-slate-300'}`}
                      >
                        <option value="">Select an option</option>
                        {programOptions.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {errors.program && <p className="text-red-500 text-sm mt-1">{errors.program}</p>}
                    </div>

                    {/* Course */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Course</label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className={`w-full border rounded-2xl px-4 py-3 text-slate-900 focus:outline-none ${errors.course ? 'border-red-500' : 'border-slate-300'}`}
                      >
                        <option value="">Select an option</option>
                        {courseOptions.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                    </div>

                    {/* Level */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Level</label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className={`w-full border rounded-2xl px-4 py-3 text-slate-900 focus:outline-none ${errors.level ? 'border-red-500' : 'border-slate-300'}`}
                      >
                        <option value="">Select an option</option>
                        {levelOptions.map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className={`w-full border rounded-2xl px-4 py-3 text-slate-900 focus:outline-none ${errors.startDate ? 'border-red-500' : 'border-slate-300'}`}
                      />
                      {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                    </div>

                    {/* Duration */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="e.g. 3 months"
                        className={`w-full border rounded-2xl px-4 py-3 text-slate-900 focus:outline-none ${errors.duration ? 'border-red-500' : 'border-slate-300'}`}
                      />
                      {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                    </div>
                  </div>
                </div>

                {/* Personal Information Section */}
                <div>
                  <h3 className="text-orange-600 font-semibold text-lg mb-4">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full border rounded-2xl px-4 py-3 text-slate-900 focus:outline-none ${errors.fullName ? 'border-red-500' : 'border-slate-300'}`}
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full border rounded-2xl px-4 py-3 text-slate-900 focus:outline-none ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full border rounded-2xl px-4 py-3 text-slate-900 focus:outline-none ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Why are you applying? Any additional info you want us to know"
                        className={`w-full border rounded-3xl px-4 py-3 text-slate-900 focus:outline-none resize-y ${errors.message ? 'border-red-500' : 'border-slate-300'}`}
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold rounded-2xl transition-all"
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