'use client';

import React, { useState } from 'react';

export default function NtecHome() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with your actual Formspree endpoint
    // Example: https://formspree.io/f/YOUR_FORM_ID
    try {
      const response = await fetch('https://formspree.io/f/xnjylapr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', program: '', message: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const programs = [
    { title: "Computer Awareness & Basics", desc: "Foundation skills for beginners of all ages" },
    { title: "Software Development", desc: "Practical coding & web/app development" },
    { title: "Graphic Design", desc: "Visual communication & creative tools" },
    { title: "Data Analysis", desc: "Excel, Power BI & real-world data skills" },
    { title: "Networking & Hardware", desc: "Computer maintenance & network fundamentals" },
    { title: "Solar Panel Installation", desc: "Hands-on renewable energy training" },
    { title: "Starlink Setup & Configuration", desc: "Modern satellite internet installation skills" },
    { title: "Bootcamps & Holiday Programs", desc: "Intensive short courses during breaks" },
  ];

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
            <a href="#apply" className="hover:text-cyan-400 transition-colors">Apply</a>
            <a href="/contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          <a 
            href="#apply" 
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium rounded-xl text-sm transition-all active:scale-[0.985]"
          >
            Apply Now
          </a>
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
          networking, solar energy & Starlink installation — designed for students 
          ready to work.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#apply" 
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-2xl text-lg transition-all active:scale-[0.985]"
          >
            Start Your Application
          </a>
          <a 
            href="#programs" 
            className="px-8 py-4 border border-slate-700 hover:bg-slate-900 rounded-2xl text-lg transition-all"
          >
            Explore Programs
          </a>
        </div>
      </section>

      {/* Programs Showcase */}
      <section id="programs" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="text-cyan-500 text-sm font-medium tracking-widest">WHAT WE OFFER</div>
            <h2 className="text-4xl font-semibold tracking-tight mt-2">Practical Programs</h2>
          </div>
          <a href="/programs" className="hidden md:block text-sm text-cyan-400 hover:text-cyan-300">View all programs →</a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className="group bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-10 h-10 bg-slate-800 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                <div className="w-5 h-5 bg-cyan-500 rounded-full" />
              </div>
              <h3 className="font-semibold text-xl mb-3 tracking-tight">{program.title}</h3>
              <p className="text-slate-400 text-[15px] leading-relaxed">{program.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Teaser */}
      <section id="about" className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-emerald-500 text-sm font-medium tracking-[3px] mb-3">OUR MISSION</div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-6">
            Empowering people with<br />real, usable technology skills
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            N-tec is a vocational training center dedicated to giving students of all ages 
            and backgrounds practical, job-ready skills in technology — from foundational 
            computing to future-focused areas like solar and satellite internet.
          </p>
          <a 
            href="/about" 
            className="inline-block mt-8 text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Learn more about N-tec →
          </a>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="text-cyan-500 text-sm font-medium tracking-widest">READY TO START?</div>
          <h2 className="text-4xl font-semibold tracking-tight mt-3">Apply to N-tec</h2>
          <p className="text-slate-400 mt-3">Fill the form below and we’ll get back to you within 48 hours.</p>
        </div>

        {submitted ? (
          <div className="bg-emerald-950 border border-emerald-900 rounded-3xl p-10 text-center">
            <div className="text-emerald-400 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-semibold mb-2">Application Received!</h3>
            <p className="text-slate-400">Thank you. We’ll contact you within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 text-slate-400">Full Name</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleInputChange} required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-cyan-500" 
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-slate-400">Email Address</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleInputChange} required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-cyan-500" 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 text-slate-400">Phone Number</label>
                <input 
                  type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-cyan-500" 
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-slate-400">Preferred Program</label>
                <select 
                  name="program" value={formData.program} onChange={handleInputChange} required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select a program</option>
                  {programs.map((p, i) => (
                    <option key={i} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-slate-400">Tell us about yourself or your goals</label>
              <textarea 
                name="message" value={formData.message} onChange={handleInputChange} rows={4} required
                className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-5 py-4 focus:outline-none focus:border-cyan-500 resize-y"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 font-semibold rounded-2xl text-lg transition-all active:scale-[0.985]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
            
            <p className="text-center text-xs text-slate-500">
              We respect your privacy. Your information is only used to contact you about N-tec programs.
            </p>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-6">
          © {new Date().getFullYear()} N-tec Vocational Training Center. All rights reserved.
        </div>
      </footer>
    </div>
  );
}