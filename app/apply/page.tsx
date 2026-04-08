'use client';
import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, User, Mail, Phone, FileText } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = ['School Dropout', 'Drug Addict', 'Young Mother', 'PWD (Person with Disability)', 'Other'];
const DRUGS = ['Marijuana', 'Cocaine', 'Heroin', 'Methamphetamine', 'Alcohol', 'Prescription Pills', 'Other'];
const DISABILITIES = ['Visual Impairment', 'Hearing Impairment', 'Physical Disability', 'Intellectual Disability', 'Mobility Disability', 'Speech Disability', 'Other'];
const COURSES = ['Microsoft Applications', 'Frontend Development', 'Backend Development', 'MERN Stack Full', 'Music Production & Digital Export'];

const ApplyPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    drugSpecific: '',
    disability: '',
    background: '',
    course: ''
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDropdownSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setOpenDropdown(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xreodkdv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          drugSpecific: formData.drugSpecific || 'N/A',
          disability: formData.disability || 'N/A',
          background: formData.background,
          course: formData.course,
          _subject: 'New Protocol Application - MERN Stack Training'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] relative overflow-hidden">
      {/* Utopian Invisible-Tangible Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033] via-[#0f172a] to-[#001a33]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,128,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,245,212,0.08)_0%,transparent_50%)]" />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:90px_90px]" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft size={20} /> Back to Homepage
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side - Inspirational 5 Sentences */}
          <div className="lg:sticky lg:top-8 space-y-10">
            <div>
              <div className="inline text-[#FF0080] font-mono text-sm tracking-[4px] mb-4">THE GATEWAY PROTOCOL</div>
              <h1 className="text-5xl md:text-6xl font-bold leading-none text-white tracking-tighter">
                You Are Not<br />Broken.<br />
                <span className="bg-gradient-to-r from-[#FF0080] via-[#00F5D4] to-[#6B00B6] bg-clip-text text-transparent">
                  You Are Unactivated.
                </span>
              </h1>
            </div>

            <div className="space-y-8 text-lg text-gray-300 leading-relaxed max-w-lg">
              <p>
                We do not see you as a dropout, an addict, or a burden. 
                We see you as a powerful processor waiting to be awakened.
              </p>
              <p>
                The Logic Lab in Mpondwe is not just a training centre — 
                it is your bridge from the border to the global digital economy.
              </p>
              <p>
                Here, coding becomes your new dopamine. 
                Debugging becomes your therapy. 
                Remote income becomes your freedom.
              </p>
              <p>
                Whether you are a recovering addict, a young mother, 
                a school dropout, or a person with disability — 
                your next chapter begins with one decision.
              </p>
              <p className="text-[#00F5D4] font-medium">
                This is your invitation to rewrite your story through code.
              </p>
            </div>
          </div>

          {/* Right Side - Premium Form */}
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-2">Begin Your Transformation</h2>
            <p className="text-gray-400 mb-10">June 2026 Cohort • Limited to 150 Participants</p>

            {submitStatus === 'success' ? (
              <div className="text-center py-20">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#00F5D4] to-[#FF0080] rounded-2xl flex items-center justify-center mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Application Received</h3>
                <p className="text-gray-400">Thank you. The Logic Lab team will review your application and contact you soon.</p>
                <Link href="/" className="mt-10 inline-block px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white">
                  Return Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-4 text-gray-500" size={20} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00F5D4]"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 text-gray-500" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00F5D4]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 text-gray-500" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00F5D4]"
                      placeholder="+256 777 950 995"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="relative">
                  <label className="block text-sm text-gray-400 mb-2">Which group best describes you? *</label>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-left text-white flex justify-between items-center focus:outline-none focus:border-[#00F5D4]"
                  >
                    <span>{formData.category || 'Select category...'}</span>
                    <ChevronDown size={20} />
                  </button>
                  {openDropdown === 'category' && (
                    <div className="absolute z-50 mt-2 w-full bg-[#1a1a2e] border border-white/10 rounded-2xl overflow-hidden">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleDropdownSelect('category', cat)}
                          className="w-full text-left px-5 py-4 hover:bg-[#00F5D4]/10 text-gray-300 hover:text-white"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Conditional Fields */}
                {formData.category === 'Drug Addict' && (
                  <div className="relative">
                    <label className="block text-sm text-gray-400 mb-2">Specific Drug You Want to Overcome</label>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'drug' ? null : 'drug')}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-left text-white flex justify-between items-center"
                    >
                      <span>{formData.drugSpecific || 'Select drug...'}</span>
                      <ChevronDown size={20} />
                    </button>
                    {openDropdown === 'drug' && (
                      <div className="absolute z-50 mt-2 w-full bg-[#1a1a2e] border border-white/10 rounded-2xl overflow-hidden">
                        {DRUGS.map(drug => (
                          <button
                            key={drug}
                            type="button"
                            onClick={() => handleDropdownSelect('drugSpecific', drug)}
                            className="w-full text-left px-5 py-4 hover:bg-[#00F5D4]/10 text-gray-300 hover:text-white"
                          >
                            {drug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {formData.category === 'PWD (Person with Disability)' && (
                  <div className="relative">
                    <label className="block text-sm text-gray-400 mb-2">Type of Disability</label>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'disability' ? null : 'disability')}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-left text-white flex justify-between items-center"
                    >
                      <span>{formData.disability || 'Select disability type...'}</span>
                      <ChevronDown size={20} />
                    </button>
                    {openDropdown === 'disability' && (
                      <div className="absolute z-50 mt-2 w-full bg-[#1a1a2e] border border-white/10 rounded-2xl overflow-hidden">
                        {DISABILITIES.map(dis => (
                          <button
                            key={dis}
                            type="button"
                            onClick={() => handleDropdownSelect('disability', dis)}
                            className="w-full text-left px-5 py-4 hover:bg-[#00F5D4]/10 text-gray-300 hover:text-white"
                          >
                            {dis}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                    <FileText size={18} /> Your Story & Motivation
                  </label>
                  <textarea
                    name="background"
                    value={formData.background}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00F5D4] resize-y"
                    placeholder="Share your journey. Why do you want to join the Logic Lab?"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm text-gray-400 mb-2">Preferred Course *</label>
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === 'course' ? null : 'course')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-left text-white flex justify-between items-center focus:outline-none focus:border-[#00F5D4]"
                  >
                    <span>{formData.course || 'Select your preferred course...'}</span>
                    <ChevronDown size={20} />
                  </button>
                  {openDropdown === 'course' && (
                    <div className="absolute z-50 mt-2 w-full bg-[#1a1a2e] border border-white/10 rounded-2xl overflow-hidden">
                      {COURSES.map(course => (
                        <button
                          key={course}
                          type="button"
                          onClick={() => handleDropdownSelect('course', course)}
                          className="w-full text-left px-5 py-4 hover:bg-[#00F5D4]/10 text-gray-300 hover:text-white"
                        >
                          {course}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.category || !formData.course}
                  className="w-full py-5 mt-6 bg-gradient-to-r from-[#FF0080] via-[#6B00B6] to-[#00F5D4] hover:brightness-110 text-white font-bold uppercase tracking-widest rounded-2xl transition-all disabled:opacity-50 text-lg"
                >
                  {isSubmitting ? 'Submitting Your Application...' : 'Submit My Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;