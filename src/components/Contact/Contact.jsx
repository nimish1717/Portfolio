import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Clock, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import './Contact.css';

const EMAIL = 'nimish.agrawal@thapar.edu';
const GITHUB = 'https://github.com/nimish1717';
const LINKEDIN = 'https://linkedin.com/in/nimish-agrawal';
const INSTAGRAM = '#'; // Placeholder as requested

const SOCIAL_LINKS = [
  { name: 'GitHub', icon: Github, url: GITHUB },
  { name: 'LinkedIn', icon: Linkedin, url: LINKEDIN },
  { name: 'Instagram', icon: Instagram, url: INSTAGRAM },
  { name: 'Email', icon: Mail, url: `mailto:${EMAIL}` },
];

const REASONS = ['Project', 'Internship', 'Collaboration', 'Other'];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    reason: 'Project',
    message: '',
    honeypot: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const setReason = (reason) => {
    setFormState(prev => ({ ...prev, reason }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending' || status === 'success') return;
    
    // Honeypot check
    if (formState.honeypot) {
      setStatus('success'); // Silent ignore for bots
      return;
    }

    setStatus('sending');

    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/placeholder';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          reason: formState.reason,
          message: formState.message,
          _replyto: formState.email,
          _subject: `New Portfolio Contact — [${formState.reason}]`
        })
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  // Stagger variants for intro
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="contact" className="relative w-full bg-[#030305] text-[#EDEAE4] font-sans pt-32 pb-12 px-6 sm:px-12 lg:px-20 overflow-hidden min-h-screen flex flex-col justify-between">
      
      {/* Subtle Background Detail */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20 bg-[url('/grid.svg')] mix-blend-screen" />
      <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] border border-white/5 rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex-1 flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between">
        
        {/* Left Column: Typography & Info */}
        <motion.div 
          className="lg:w-1/2 flex flex-col pt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-400">06 / CONTACT</span>
            <div className="w-10 h-px bg-[#46B7FF]"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-2">
            <span className="font-mono text-xs text-gray-400">Have an idea, project, or opportunity?</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-6xl sm:text-7xl lg:text-[7rem] tracking-tight uppercase leading-[0.85] mb-12" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <span className="block text-[#EDEAE4]">LET'S BUILD</span>
            <span className="block text-[#EDEAE4]">SOMETHING</span>
            <span className="block text-[#46B7FF]">GREAT.</span>
          </motion.h2>

          <motion.div variants={itemVariants} className="relative mb-16 max-w-md">
            <p className="text-gray-400 font-light text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              I'm always open to discussing new projects, creative ideas, internships, or just a good conversation about tech, design or football.
            </p>
            
            {/* Annotation */}
            <div className="absolute -right-12 -top-8 rotate-6 flex flex-col items-center opacity-60">
              <span className="font-mono italic text-[#46B7FF] text-[10px] rotate-[-5deg] tracking-widest text-center whitespace-nowrap">Same curiosity.<br/>Different projects.</span>
              <svg className="w-8 h-8 text-[#46B7FF] mt-1 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M5 12c0-3 3-5 7-5s7 2 7 5m0 0l-3-2m3 2l-2 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-auto">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-start p-4 border border-white/10 rounded-lg hover:border-[#46B7FF]/50 transition-colors duration-300 bg-white/5"
              >
                <div className="w-full flex justify-between items-center mb-4">
                  <link.icon size={16} className="text-gray-400 group-hover:text-[#46B7FF] transition-colors duration-300" />
                  <ArrowUpRight size={14} className="text-gray-600 group-hover:text-[#46B7FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-gray-300">{link.name}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div 
          className="lg:w-1/2 w-full mt-12 lg:mt-0 flex flex-col justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-full max-w-xl mx-auto border border-white/10 bg-[#060608]/80 backdrop-blur-md p-8 lg:p-10 rounded-xl relative shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            
            {/* Form Header */}
            <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
              <span className="font-mono tracking-[0.2em] uppercase text-sm text-[#EDEAE4]">SEND A MESSAGE</span>
              <div className="flex flex-col items-end">
                <span className="font-mono text-[9px] text-gray-500 mb-1">I usually reply within</span>
                <div className="flex items-center space-x-1.5 text-[#46B7FF]">
                  <Clock size={12} />
                  <span className="font-mono text-[11px]">24 hours</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-6 relative">
              {/* Hidden honeypot */}
              <input type="text" name="honeypot" className="hidden" value={formState.honeypot} onChange={handleInputChange} tabIndex="-1" autoComplete="off" />

              {/* Row 1: Name & Email */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mb-2">Your Name *</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="[ Enter your name ]"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-[#EDEAE4] placeholder-gray-700 focus:outline-none focus:border-[#46B7FF] transition-colors font-mono"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mb-2">Your Email *</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="[ you@example.com ]"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-sm text-[#EDEAE4] placeholder-gray-700 focus:outline-none focus:border-[#46B7FF] transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Row 2: Reason */}
              <div className="flex flex-col pt-2">
                <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mb-4">What are you looking for? *</label>
                <div className="grid grid-cols-2 gap-3">
                  {REASONS.map(reason => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => setReason(reason)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded border text-xs font-mono transition-all duration-300 ${
                        formState.reason === reason 
                          ? 'border-[#46B7FF] bg-[#46B7FF]/10 text-white' 
                          : 'border-white/10 bg-transparent text-gray-500 hover:border-white/30'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full border flex items-center justify-center ${formState.reason === reason ? 'border-[#46B7FF]' : 'border-gray-600'}`}>
                        {formState.reason === reason && <div className="w-1 h-1 bg-[#46B7FF] rounded-full" />}
                      </div>
                      <span className="tracking-widest uppercase text-[9px]">{reason}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="flex flex-col pt-2">
                <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mb-2">Tell me about it *</label>
                <textarea
                  required
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your idea, project, or opportunity..."
                  rows="4"
                  className="w-full bg-transparent border border-white/10 rounded-lg p-4 text-sm text-[#EDEAE4] placeholder-gray-700 focus:outline-none focus:border-[#46B7FF] transition-colors font-mono resize-none"
                />
                <div className="flex justify-end mt-2">
                  <span className="font-mono text-[10px] text-gray-600">{formState.message.length} / 500</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="group w-full py-4 bg-[#46B7FF] hover:bg-[#5bc1ff] text-black font-mono font-bold text-xs tracking-[0.2em] uppercase rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01]"
              >
                <span>
                  {status === 'idle' && 'SEND MESSAGE'}
                  {status === 'sending' && 'SENDING...'}
                  {status === 'success' && 'MESSAGE SENT'}
                  {status === 'error' && 'TRY AGAIN'}
                </span>
                {status === 'idle' && <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                {status === 'success' && <CheckCircle2 size={16} />}
                {status === 'error' && <AlertCircle size={16} />}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-10 left-0 right-0 text-center font-mono text-[10px] text-green-400 tracking-widest"
                  >
                    Thanks. I'll get back to you soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-10 left-0 right-0 text-center font-mono text-[10px] text-red-400 tracking-widest"
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
