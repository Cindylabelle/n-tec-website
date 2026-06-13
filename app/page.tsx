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

export default function NtecWebsite() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    program: '', course: '', level: '', startDate: '', duration: '',
    fullName: '', phone: '', email: '', message: '',
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
    setFormData({ program: '', course: '', level: '', startDate: '', duration: '', fullName: '', phone: '', email: '', message: '' });
    setErrors({});
  };

  // Dynamic options
  const programOptions = [
    'Internship Program',
    'Bootcamp Program',
    'Holiday / Summer Program',
    'Course Training',
  ];

  const allCourses = [
    'Computer Awareness & Digital Literacy',
    'Web Development (Frontend)',
    'Web Development (Fullstack)',
    'Data Analysis with Excel & Power BI',
    'Graphic Design & Branding',
    'UI/UX Design',
    'Networking & Hardware',
    'Solar Panel Installation',
    'Starlink Installation & Configuration',
  ];

  const getLevelOptions = (program: string) => {
    if (program === 'Internship Program') {
      return ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Does not apply'];
    }
    if (program === 'Bootcamp Program' || program === 'Holiday / Summer Program') {
      return ['Beginner', 'Intermediate', 'Advanced', 'Does not apply'];
    }
    if (program === 'Course Training') {
      return ['Beginner', 'Intermediate', 'Advanced'];
    }
    return ['Beginner', 'Intermediate', 'Advanced', 'Does not apply'];
  };

  const showCourseField = ['Internship Program', 'Course Training'].includes(formData.program);
  const levelOptions = getLevelOptions(formData.program);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error instantly when typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Instant validation on blur
  const handleBlur = (field: keyof FormData) => {
    const value = formData[field];
    let error = '';

    if (!value) {
      const fieldNames: any = {
        program: 'Program', course: 'Course', level: 'Level',
        startDate: 'Start Date', duration: 'Duration',
        fullName: 'Full Name', phone: 'Phone Number',
        email: 'Email Address', message: 'Message'
      };
      error = `${fieldNames[field]} is required`;
    }

    setErrors(prev => ({ ...prev, [field]: error || undefined }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.program) newErrors.program = 'Program is required';
    if (showCourseField && !formData.course) newErrors.course = 'Course is required';
    if (!formData.level) newErrors.level = 'Level is required';
    if (!formData.startDate) newErrors.startDate = 'Start Date is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    if (!formData.email) newErrors.email = 'Email Address is required';
    if (!formData.message) newErrors.message = 'Message is required';

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

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-semibold tracking-tight">N-tec</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#programs" className="hover:text-indigo-600 transition-colors">Programs</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
          </div>

          <button 
            onClick={openModal}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl text-sm transition-all"
          >
            Apply Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
          Practical Skills. Real Futures.
        </div>
        
        <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-6">
          Build skills that<br />actually get you hired.
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10">
          Hands-on vocational training in computing, software, design, data, 
          networking, solar & Starlink — designed for students ready to work.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={openModal}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl text-lg transition-all"
          >
            Start Your Application
          </button>
          <a href="#programs" className="px-8 py-4 border border-slate-300 hover:bg-slate-50 rounded-2xl text-lg font-medium transition-all">
            Explore Programs
          </a>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <div className="text-indigo-600 text-sm font-semibold tracking-[2px] mb-3">WHAT WE OFFER</div>
          <h2 className="text-4xl font-semibold tracking-tight">Practical Programs for Real Growth</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Internship Program", desc: "University students gain hands-on experience in real tech environments." },
            { title: "Bootcamp Program", desc: "Intensive short-term training to quickly gain job-ready skills." },
            { title: "Holiday / Summer Program", desc: "Perfect for students during breaks to learn new skills fast." },
            { title: "Course Training", desc: "Flexible, focused training in specific tech skills." },
          ].map((prog, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-3xl p-7 hover:shadow-md transition-all">
              <h3 className="font-semibold text-2xl mb-3 tracking-tight">{prog.title}</h3>
              <p className="text-slate-600 leading-relaxed">{prog.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About / Mission */}
      <section id="about" className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-indigo-600 text-sm font-semibold tracking-[2px] mb-3">OUR MISSION</div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-6">
            Empowering every student with<br />practical, job-ready tech skills
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            N-tec is a vocational training center helping students of all backgrounds 
            in Cameroon gain real, usable technology skills that lead to employment and growth.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-semibold tracking-tight mb-4">Ready to start your journey?</h2>
        <p className="text-xl text-slate-600 mb-8">Join hundreds of students who have transformed their future with N-tec.</p>
        <button 
          onClick={openModal}
          className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl text-lg transition-all"
        >
          Apply Now — It’s Free to Start
        </button>
      </section>

      <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} N-tec Vocational Training Center — Yaoundé, Cameroon
      </footer>

      {/* ==================== IMPROVED MODAL ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-8 pt-8 pb-4 border-b flex justify-between items-start z-10">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900">Apply to N-tec</h2>
                <p className="text-slate-600 mt-1">Fill the form below. We’ll get back to you within 48 hours.</p>
              </div>
              <button onClick={closeModal} className="text-4xl text-slate-400 hover:text-slate-600 leading-none">×</button>
            </div>

            {submitted ? (
              <div className="p-12 text-center">
                <div className="text-emerald-500 text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-semibold mb-2">Application Received!</h3>
                <p className="text-slate-600">Thank you. We’ll contact you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Program Details */}
                <div>
                  <h3 className="font-semibold text-xl mb-4 text-indigo-700">Program Details</h3>

                  <div className="space-y-5">
                    {/* Program */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Program</label>
                      <select name="program" value={formData.program} onChange={handleInputChange} onBlur={() => handleBlur('program')}
                        className={`w-full border rounded-2xl px-4 py-3 ${errors.program ? 'border-red-500' : 'border-slate-300'}`}>
                        <option value="">Select a program</option>
                        {programOptions.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      {errors.program && <p className="text-red-500 text-sm mt-1">{errors.program}</p>}
                    </div>

                    {/* Course (only for Internship & Course Training) */}
                    {showCourseField && (
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Course</label>
                        <select name="course" value={formData.course} onChange={handleInputChange} onBlur={() => handleBlur('course')}
                          className={`w-full border rounded-2xl px-4 py-3 ${errors.course ? 'border-red-500' : 'border-slate-300'}`}>
                          <option value="">Select a course</option>
                          {allCourses.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                      </div>
                    )}

                    {/* Level (Dynamic) */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Level</label>
                      <select name="level" value={formData.level} onChange={handleInputChange} onBlur={() => handleBlur('level')}
                        className={`w-full border rounded-2xl px-4 py-3 ${errors.level ? 'border-red-500' : 'border-slate-300'}`}>
                        <option value="">Select your level</option>
                        {levelOptions.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                      {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Start Date</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} onBlur={() => handleBlur('startDate')}
                          className={`w-full border rounded-2xl px-4 py-3 ${errors.startDate ? 'border-red-500' : 'border-slate-300'}`} />
                        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Duration</label>
                        <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} onBlur={() => handleBlur('duration')}
                          placeholder="e.g. 3 months" className={`w-full border rounded-2xl px-4 py-3 ${errors.duration ? 'border-red-500' : 'border-slate-300'}`} />
                        {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h3 className="font-semibold text-xl mb-4 text-indigo-700">Personal Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Full Name</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} onBlur={() => handleBlur('fullName')}
                        placeholder="John Doe" className={`w-full border rounded-2xl px-4 py-3 ${errors.fullName ? 'border-red-500' : 'border-slate-300'}`} />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={() => handleBlur('phone')}
                        placeholder="e.g. 6XX XXX XXX" className={`w-full border rounded-2xl px-4 py-3 ${errors.phone ? 'border-red-500' : 'border-slate-300'}`} />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1.5">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={() => handleBlur('email')}
                        placeholder="you@example.com" className={`w-full border rounded-2xl px-4 py-3 ${errors.email ? 'border-red-500' : 'border-slate-300'}`} />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1.5">Message</label>
                      <textarea name="message" value={formData.message} onChange={handleInputChange} onBlur={() => handleBlur('message')}
                        rows={4} placeholder="Why are you applying? Any additional information..."
                        className={`w-full border rounded-3xl px-4 py-3 resize-y ${errors.message ? 'border-red-500' : 'border-slate-300'}`} />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button type="button" onClick={closeModal} className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl disabled:bg-indigo-400">
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