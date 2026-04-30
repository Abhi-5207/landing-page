/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Menu, X, Sun, Wind, Droplets, Zap, ShieldCheck, 
  ArrowRight, Users, Globe, Recycle, Award, 
  CheckCircle, ChevronLeft, ChevronRight, Mail, Phone, MapPin
} from 'lucide-react';

// --- Utility Components ---

const CountUp = ({ end, duration = 2, prefix = '', suffix = '' }: { end: number, duration?: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// --- Main Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'The Problem', href: '#problem' },
    { name: 'Our Technology', href: '#technology' },
    { name: 'Applications', href: '#applications' },
    { name: 'Success Stories', href: '#stories' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 glass-card shadow-md border-b' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center text-white font-bold text-xl">KVB</div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
            GREEN <span className="text-primary-green">ENERGIES</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-eco-dark/70 hover:text-primary-green transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="btn-primary text-sm">Start Your Green Journey</button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-eco-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium text-eco-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="btn-primary w-full mt-2">Start Your Green Journey</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-primary-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-primary-blue/5 rounded-full blur-3xl" />
      
      <div className="section-container grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
            < Award size={14} /> ISO 9001:2015 CERTIFIED
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Revolutionizing <span className="text-primary-green">Sustainable</span> Solar Steam Cooking
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
            Empowering communities and industries to reduce carbon emissions through advanced, eco-friendly solar and bioenergy solutions. Recognized by Government of India, MNRE, UNIDO & PUSA KRISHI.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary flex items-center gap-2">
              Explore Our Solutions <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">Technical Specs</button>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">30+</span>
              <span className="text-xs text-gray-500 uppercase font-bold">Years Lifespan</span>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">50k</span>
              <span className="text-xs text-gray-500 uppercase font-bold">Daily Meals</span>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">100%</span>
              <span className="text-xs text-gray-500 uppercase font-bold">Eco-Friendly</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative lg:h-[600px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ y: y1 }}
        >
          {/* Futuristic Visual Placeholder */}
          <div className="relative w-full aspect-square max-w-[500px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-sky-100 rounded-[2rem] rotate-6 scale-95 opacity-50" />
            <div className="absolute inset-0 bg-white rounded-[2rem] shadow-2xl border border-white/50 flex flex-col items-center justify-center overflow-hidden p-8">
              {/* Simple stylized Solar Dish Graphic */}
              <div className="relative w-64 h-64 border-4 border-emerald-500 rounded-full flex items-center justify-center p-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white shadow-lg rounded-full animate-bounce">
                  <Sun className="text-orange-400" size={32} fill="currentColor" />
                </div>
                <div className="w-full h-full border-4 border-dashed border-emerald-200 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 border border-emerald-400/30 rounded-full" />
                <Zap className="text-emerald-500 absolute" size={64} />
              </div>
              
              <div className="mt-12 text-center">
                <h3 className="font-bold text-xl mb-2">Solar Scheffler Dish</h3>
                <p className="text-sm text-gray-500">16 m² Precision Mirrored Surface</p>
              </div>

              {/* Data Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 p-3 glass-card rounded-xl flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold">400Kg Steam/Hr</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProblemSolution = () => {
  const [viewMode, setViewMode] = useState<'problem' | 'solution'>('solution');

  return (
    <section id="problem" className="bg-gray-50 py-24 overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">The Global Crisis vs <span className="text-primary-green">The Solution</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Tackling the environmental and health impact of traditional cooking methods with innovative green technology.</p>
          
          <div className="mt-10 inline-flex p-1 bg-gray-200 rounded-full">
            <button 
              onClick={() => setViewMode('problem')}
              className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'problem' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500 hover:text-eco-dark'}`}
            >
              The Problem
            </button>
            <button 
              onClick={() => setViewMode('solution')}
              className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'solution' ? 'bg-primary-green text-white shadow-md' : 'text-gray-500 hover:text-eco-dark'}`}
            >
              The Solution
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {viewMode === 'problem' ? (
              <motion.div 
                key="problem-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid gap-6 lg:col-start-1"
              >
                {[
                  { label: '2.1 Billion', desc: 'People rely on harmful wood or animal waste for cooking.', color: 'text-red-600' },
                  { label: '4 Million', desc: 'Annual deaths caused by indoor air pollution from traditional cooking.', color: 'text-red-600' },
                  { label: '2.5 Billion Tons', desc: 'CO2 emitted annually from traditional cooking methods.', color: 'text-red-600' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className={`text-4xl font-bold mb-2 ${item.color}`}>{item.label}</h3>
                    <p className="text-gray-600 font-medium">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="solution-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid gap-6 lg:col-start-1"
              >
                {[
                  { label: 50000, desc: 'Meals per day possible, providing a highly scalable solution.', prefix: '', suffix: '+', color: 'text-primary-green' },
                  { label: 25, desc: 'Reduction in global deforestation caused by traditional wood collection.', prefix: '', suffix: '%', color: 'text-primary-green' },
                  { label: 1.3, desc: 'Billion USD potential global savings by reducing CO2 emissions.', prefix: '$', suffix: 'B', color: 'text-primary-green' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border-l-4 border-primary-green shadow-sm hover:shadow-md transition-shadow">
                    <h3 className={`text-4xl font-bold mb-2 ${item.color}`}>
                      <CountUp end={item.label} prefix={item.prefix} suffix={item.suffix} />
                    </h3>
                    <p className="text-gray-600 font-medium">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hidden lg:flex items-center justify-center p-12 bg-white rounded-3xl shadow-inner border border-gray-100">
            <div className="text-center">
              <Globe className={`w-48 h-48 mx-auto mb-8 transition-colors duration-500 ${viewMode === 'problem' ? 'text-red-200' : 'text-emerald-200'}`} />
              <h3 className="text-2xl font-bold mb-4">{viewMode === 'problem' ? 'Critical Alarms' : 'Restoring Planet Health'}</h3>
              <p className="text-gray-500 leading-relaxed">
                {viewMode === 'problem' 
                  ? 'Our current energy consumption models are reaching a breaking point. Deforestation and carbon emissions are accelerating global warming at unprecedented rates.' 
                  : 'By harnessing the infinite energy of the sun, we provide zero-carbon alternatives for steam production and large-scale industrial processes.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechnologySpecs = () => {
  const specs = [
    { title: 'Surface Area', value: '16 m²', desc: 'Modular mirrored surface, scalable from 5kW to 300kW thermal units.', icon: <Users size={24} /> },
    { title: 'Performance', value: '400 Kg/hr', desc: 'Generates steam at 8 bar pressure even in varied conditions.', icon: <Zap size={24} /> },
    { title: 'Temp Range', value: '100°C - 400°C', desc: 'Operates efficiently across a wide temperature spectrum.', icon: <Sun size={24} /> },
    { title: 'Plant Life', value: '30 Years', desc: 'Engineered for extreme durability and long-term sustainability.', icon: <ShieldCheck size={24} /> },
  ];

  return (
    <section id="technology" className="py-24 bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary-green font-bold text-sm uppercase tracking-widest mb-4 block">Engineered for Excellence</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">The Solar Scheffler Dish Core Technology</h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Our proprietary solar tracking and concentrated thermal storage system transforms direct sunlight into high-pressure steam. It is modular, easy to maintain, and designed to withstand the harshest industrial environments.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {specs.map((spec, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-green mb-4">
                    {spec.icon}
                  </div>
                  <h4 className="font-bold text-gray-500 text-sm uppercase mb-1">{spec.title}</h4>
                  <p className="text-xl font-bold mb-2">{spec.value}</p>
                  <p className="text-xs text-gray-400 leading-tight">{spec.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-eco-bg rounded-full flex items-center justify-center p-12 overflow-hidden border border-gray-100">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-dashed border-primary-green/20 rounded-full"
              />
              <div className="relative z-10 p-4 bg-white rounded-3xl shadow-xl">
                 {/* Visual Representation of Specs Interaction */}
                 <div className="p-8 border-4 border-primary-green/10 rounded-2xl">
                    <div className="flex flex-col gap-4">
                      <div className="h-4 w-48 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '85%' }}
                          className="h-full bg-primary-green"
                        />
                      </div>
                      <div className="h-4 w-64 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '92%' }}
                          transition={{ delay: 0.1 }}
                          className="h-full bg-primary-blue"
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between items-end">
                      <div className="flex -space-x-2">
                        {[1,2,3,4].map(j => <div key={j} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />)}
                      </div>
                      <Award className="text-primary-green" size={32} />
                    </div>
                 </div>
              </div>
            </div>
            
            {/* Pulsating Hotspot */}
            <div className="absolute top-1/4 right-1/4">
               <div className="relative">
                  <div className="w-6 h-6 bg-primary-green rounded-full animate-ping opacity-75" />
                  <div className="absolute inset-0 w-6 h-6 bg-primary-green rounded-full shadow-lg" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Applications = () => {
  const apps = [
    { title: 'Solar Cooking', desc: 'Cooking and water pasteurization at massive scale.', icon: <Sun /> },
    { title: 'Power Generation', desc: 'Stand-alone or grid-integrated thermal power.', icon: <Zap /> },
    { title: 'Desalination', desc: 'Creating fresh water from seawater or contaminated sources.', icon: <Droplets /> },
    { title: 'Textile Industry', desc: 'Powering machine drives, drying, and fabric dyeing.', icon: <Recycle /> },
    { title: 'Pharmaceuticals', desc: 'Evaporation, sterilization, and distillation.', icon: <ShieldCheck /> },
    { title: 'Solar HVAC', desc: 'Next-gen solar air conditioning and climate control.', icon: <Wind /> },
  ];

  return (
    <section id="applications" className="py-24 bg-eco-bg">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Industrial & Community <span className="text-primary-green">Applications</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Versatile thermal solutions designed for various sectors needing clean heat energy.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-primary-green/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-eco-bg rounded-2xl flex items-center justify-center text-primary-green mb-6 group-hover:bg-primary-green group-hover:text-white transition-colors duration-300">
                {app.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{app.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{app.desc}</p>
              <button className="flex items-center gap-2 text-xs font-bold text-primary-green uppercase tracking-wider group-hover:gap-3 transition-all">
                Learn More <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SuccessStories = () => {
  const stories = [
    { title: 'Indian Army, Chennai', desc: '4 sq. meter dish catering to 40 people daily with zero carbon footprint.', location: 'TN, India' },
    { title: 'Siddagangamath', desc: 'Massive installation of 30 Solar Scheffler Dishes (16 sq. meters each) for large-scale temple cooking.', location: 'Karnataka, India' },
    { title: 'INS Mandovi Academy', desc: 'Four 16 sq. meter dishes catering to 400 people at the Naval Academy in Goa.', location: 'Goa, India' },
    { title: 'YASHADA IAS Academy', desc: '16 sq. meter dish serving 200 civil service trainees with clean solar meals.', location: 'Pune, India' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % stories.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section id="stories" className="py-24 bg-white relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Pioneering <span className="text-primary-green">Success Stories</span></h2>
            <p className="text-gray-500">From military bases to religious institutions, our tech is making a tangible difference daily.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={prev} className="p-4 rounded-full border border-gray-200 hover:border-primary-green hover:text-primary-green transition-all shadow-sm"><ChevronLeft /></button>
            <button onClick={next} className="p-4 rounded-full border border-gray-200 hover:border-primary-green hover:text-primary-green transition-all shadow-sm"><ChevronRight /></button>
          </div>
        </div>

        <div className="relative min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="p-10 lg:p-16 rounded-[2.5rem] bg-gray-900 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/20 rounded-bl-[100px] group-hover:w-40 group-hover:h-40 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-8">
                     <div className="flex text-emerald-400">
                        <CheckCircle size={20} />
                     </div>
                     <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Project Complete</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 italic font-display">{stories[activeIndex].title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">"{stories[activeIndex].desc}"</p>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-primary-green" />
                    <span className="text-gray-400 font-medium">{stories[activeIndex].location}</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block relative">
                 <div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center p-8">
                    {/* Placeholder for imagery */}
                    <div className="text-center">
                       <Sun className="w-24 h-24 text-primary-green/20 mx-auto mb-4" />
                       <span className="text-gray-300 font-bold uppercase tracking-[0.2em]">Deployment Imagery</span>
                    </div>
                 </div>
                 {/* Floating Indicator */}
                 <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-primary-green">
                          <Award size={24} />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">Impact Rating</p>
                          <p className="text-lg font-bold">100% Reliable</p>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 pt-24 pb-12 text-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center text-white font-bold text-xl">KVB</div>
              <span className="font-display font-bold text-2xl tracking-tight uppercase">
                KVB Green <span className="text-primary-green">Energies</span>
              </span>
            </div>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-md">
              Committed to a cleaner, greener planet through industrial-scale solar thermal innovation.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
               <div>
                  <h4 className="text-primary-green font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-primary-green pl-3">Contact Us</h4>
                  <div className="space-y-4">
                    <a href="tel:+919545529950" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                      <Phone size={18} /> +91 9545529950
                    </a>
                    <a href="mailto:kvbgreenenergies@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                      <Mail size={18} /> kvbgreenenergies@gmail.com
                    </a>
                  </div>
               </div>
               <div>
                  <h4 className="text-primary-green font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-primary-green pl-3">Location</h4>
                  <div className="flex items-start gap-3 text-gray-400 leading-snug">
                     <MapPin size={18} className="mt-1 flex-shrink-0" />
                     <p>Plot no. R16, 3rd Main road KSSIDC Belur Industrial Area Dharwad-580011, Karnataka</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Ready to Go Solar?</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-primary-green transition-colors" />
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-primary-green transition-colors" />
              </div>
              <textarea placeholder="Tell us about your requirements" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-primary-green transition-colors"></textarea>
              <button className="btn-primary w-full py-4 text-base shadow-xl shadow-emerald-900/50">Send Inquiry</button>
            </form>
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
               <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Founder</p>
                  <p className="font-bold text-lg">Ravikumar Chavadi</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Join Our Mission</p>
                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"><Globe size={14}/></div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-6">
          <p>© 2026 KVB Green Energies. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-eco-bg text-eco-dark selection:bg-primary-green/30">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <TechnologySpecs />
      <Applications />
      <SuccessStories />
      <Footer />
    </div>
  );
}
