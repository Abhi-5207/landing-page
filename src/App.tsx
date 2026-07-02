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
  ArrowRight, Users, Globe, Recycle, Award, Flame,
  CheckCircle, ChevronLeft, ChevronRight, Mail, Phone, MapPin
} from 'lucide-react';

// --- Utility Components ---

const CountUp = ({ end, duration = 1, prefix = '', suffix = '' }: { end: number, duration?: number, prefix?: string, suffix?: string }) => {
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
    { name: 'Home', href: 'https://kvbgreenenergies.com/' },
    { name: 'The Problem', href: '#problem' },
    { name: 'Our Technology', href: '#technology' },

    { name: 'Success Stories', href: '#stories' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 glass-card shadow-md border-b' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/logo.jpeg" alt="logo" className="h-12 w-auto object-contain" />

          <span className="font-bold text-2xl text-black tracking-tight">
            KVB GREEN ENERGIES
          </span>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-sm font-medium text-eco-dark/70 hover:text-primary-green transition-colors"
            >
              {link.name}
            </a>
          ))}
          {/* <button className="btn-primary text-sm">Start Your Green Journey</button> */}
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
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-white">
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
            <a href="#contact" className="btn-primary flex items-center gap-2">
              Book Free Site Assessment <ArrowRight size={18} />
            </a>
            <a href="#calculator" className="btn-secondary flex items-center gap-2">
              Get Free Savings Report
            </a>
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
        >
          <div className="relative w-full max-w-[580px]">
            {/* Decorative backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary-green/20 to-primary-blue/20 rounded-[3rem] blur-2xl opacity-50" />

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-[12px] border-white bg-white">
              <video
                src="/solarvideo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto aspect-video object-cover"
              />

              {/* Premium overlay badge */}
              <div className="absolute top-4 right-4 glass-card px-4 py-2 rounded-full border border-white/30 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-green rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">Live Technology</span>
                </div>
              </div>
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
    <section id="problem" className="bg-gray-50 py-16 overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">The Crisis vs <span className="text-primary-green">The Solution</span></h2>
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatePresence mode="wait">
            {viewMode === 'problem' ? (
              <motion.div
                key="problem-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid gap-4"
              >
                {[
                  'Rising LPG prices affecting budgets',
                  'Dependence on fossil fuels',
                  'High recurring monthly expenses',
                  'Massive CO₂ emissions',
                  'Firewood → Deforestation + smoke hazards'
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 lg:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                      <Flame size={20} />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="solution-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid gap-4"
              >
                {[
                  'Save up to 70–90% fuel cost',
                  'Payback in 1.5 to 5 years',
                  'System life: 25–30+ years',
                  'Extremely low maintenance requirements',
                  'MNRE aligned technology',
                  'Reduce carbon footprint drastically'
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 lg:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-primary-green flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={20} />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 text-center flex flex-col items-center"
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-colors duration-500 ${viewMode === 'problem' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-primary-green'
              }`}>
              <Globe size={48} className={`transition-colors duration-500 ${viewMode === 'problem' ? 'text-red-400' : 'text-emerald-300'}`} />
            </div>
            <h3 className={`text-3xl font-bold mb-4 transition-colors duration-500 ${viewMode === 'problem' ? 'text-red-600' : 'text-gray-900'}`}>
              Restoring Planet Health
            </h3>
            <p className="text-gray-500 leading-relaxed max-w-sm">
              {viewMode === 'problem'
                ? 'India burns lakhs of LPG cylinders every day for cooking, releasing tens of thousands of tonnes of CO₂ daily and significantly increasing fuel costs and environmental pollution.'
                : 'Our solar steam systems replace LPG usage with clean, renewable energy, significantly reducing carbon emissions and lowering long-term fuel costs.'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TechnologySpecs = () => {
  const specs = [
    { title: 'Surface Area', value: '16 m²', desc: 'Modular mirrored surface, scalable from 5kW to 300kW thermal units.', icon: <Users size={24} /> },
    { title: 'Performance', value: '40 Kg/hr', desc: 'Generates steam at 8 bar pressure even in varied conditions.', icon: <Zap size={24} /> },
    { title: 'Temp Range', value: '100°C - 400°C', desc: 'Operates efficiently across a wide temperature spectrum.', icon: <Sun size={24} /> },
    { title: 'Plant Life', value: '30 Years', desc: 'Engineered for extreme durability and long-term sustainability.', icon: <ShieldCheck size={24} /> },
  ];

  return (
    <section id="technology" className="pt-16 pb-8 bg-white">
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

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary-green/20 to-primary-blue/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white">
              <img
                src="/sketch.jpeg"
                alt="Solar Scheffler Dish Technology Sketch"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolarProcess = () => {
  return (
    <section className="pb-16 bg-white overflow-hidden">
      <div className="section-container">
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
          <img
            src="/solarprocess.jpeg"
            alt="Solar Process Diagram"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};



const CalculatorCTA = () => {
  const [numPeople, setNumPeople] = useState<number | string>(200);
  const [cylinderWeight, setCylinderWeight] = useState<number | string>(19.3);
  const [cylinderPrice, setCylinderPrice] = useState<number | string>(3300);

  // Setup cost constant
  // Calculation Logic (Fixed Sl No 1-10)
  const valPeople = Number(numPeople) || 0;
  const valWeight = Number(cylinderWeight) || 1; // prevent div by zero
  const valPrice = Number(cylinderPrice) || 0;

  // Dynamic Setup Cost based on people (2 dishes per 200 people)
  const numDishes = valPeople > 0 ? Math.ceil(valPeople / 200) * 2 : 0;
  const COST_PER_DISH = 832500; // Updated per user request
  const setupCost = numDishes * COST_PER_DISH;

  const numMeals = valPeople * 2; // Sl No 2
  const lpgPerMeal = 0.05; // Sl No 3
  const totalLpgPerDay = numMeals * lpgPerMeal; // Sl No 4
  const cylsPerDay = totalLpgPerDay / valWeight; // Sl No 6
  const cylsPerMonth = cylsPerDay * 30; // Sl No 7
  const costPerMonth = cylsPerMonth * valPrice; // Sl No 9
  const cost9Months = costPerMonth * 9; // Sl No 10
  const cost3Months = costPerMonth * 3; // Remaining 3 months of LPG cost

  // Add 3 months LPG cost to the total setup cost
  const totalInvestment = setupCost + cost3Months;

  // ROI Calculation
  const annualSavings = cost9Months;
  const roiYears = annualSavings > 0 ? totalInvestment / annualSavings : 0;
  const roiMonths = roiYears * 12;


  return (
    <section id="calculator" className="py-16 bg-gray-50/50">
      <div className="section-container">
        <div className="max-w-4xl mx-auto bg-white p-6 lg:p-10 rounded-[2.5rem] shadow-xl border border-emerald-100/50 relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Payback Calculator</h2>
              <div className="w-12 h-1 bg-primary-green mx-auto mt-2 rounded-full" />
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Inputs Section */}
              <div className="lg:col-span-5">
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 h-full">
                  <h3 className="text-[10px] font-bold text-primary-green uppercase tracking-widest mb-6 flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary-green rounded-full" />
                    Input parameters
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">No of people</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-green/30" size={16} />
                        <input
                          type="number" value={numPeople}
                          onChange={(e) => setNumPeople(e.target.value === '' ? '' : Number(e.target.value))}
                          className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-2.5 text-lg font-bold text-gray-900 focus:border-primary-green outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Cyl Weight (kg)</label>
                        <input
                          type="number" value={cylinderWeight} step="0.1"
                          onChange={(e) => setCylinderWeight(e.target.value === '' ? '' : Number(e.target.value))}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-base font-bold text-gray-900 focus:border-primary-green outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Cyl Rate (₹)</label>
                        <input
                          type="number" value={cylinderPrice}
                          onChange={(e) => setCylinderPrice(e.target.value === '' ? '' : Number(e.target.value))}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-base font-bold text-gray-900 focus:border-primary-green outline-none transition-all"
                        />
                      </div>
                    </div>
                    
                    {/* Mobile Calculate Button */}
                    <button
                      type="button"
                      onClick={() => document.getElementById('results-grid')?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full bg-primary-green hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all lg:hidden mt-2"
                    >
                      Calculate Savings
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div id="results-grid" className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'No of meals', value: numMeals.toLocaleString('en-IN') },
                    { label: 'LPG per meal (kg)', value: lpgPerMeal },
                    { label: 'Total LPG req (kg) per day', value: `${totalLpgPerDay.toFixed(1)}` },
                    { label: 'Cylinders / Month', value: Math.round(cylsPerMonth) },
                    { label: 'No of Dishes', value: numDishes },
                    { label: 'System Cost', value: `₹${(totalInvestment / 100000).toFixed(1)}L` },
                    { label: 'Cost / Month', value: `₹${Math.round(costPerMonth).toLocaleString('en-IN')}` },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 transition-all">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{item.label}</p>
                      <p className="text-lg font-bold text-gray-900">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Compact Highlight Card */}
                <div className="bg-primary-green py-4 px-6 rounded-2xl text-white shadow-lg flex justify-between items-center mt-2 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-full bg-white/10 skew-x-[-20deg] translate-x-16 group-hover:translate-x-8 transition-transform duration-700" />
                  <div className="relative z-10">
                    <p className="text-emerald-100 text-[9px] font-bold uppercase tracking-widest mb-1">9-Month Cylinder Cost</p>
                    <p className="text-2xl lg:text-3xl font-black">₹{Math.round(cost9Months).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-white/20 px-4 py-2 rounded-xl border border-white/30 text-center min-w-[110px] relative z-10 backdrop-blur-sm">
                    <p className="text-white/80 text-[8px] font-bold uppercase mb-0.5 tracking-wider">ROI Period</p>
                    <p className="text-xl font-black">{roiYears.toFixed(2)} <span className="text-xs font-normal opacity-70 text-emerald-100">Years</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};




const SuccessStories = () => {
  const stories = [
    { title: 'Indian Army, Chennai', desc: '4 sq. meter dish catering to 40 people daily with zero carbon footprint.', location: 'TN, India', image: '/indian army.png' },
    { title: 'Siddagangamath', desc: 'Massive installation of 30 Solar Scheffler Dishes (16 sq. meters each) for large-scale temple cooking.', location: 'Karnataka, India', image: '/sidhaganga.jpg' },
    { title: 'INS Mandovi Academy', desc: 'Four 16 sq. meter dishes catering to 400 people at the Naval Academy in Goa.', location: 'Goa, India', image: '/ins madavi goa.jpeg' },
    { title: 'YASHADA IAS Academy', desc: '16 sq. meter dish serving 200 civil service trainees with clean solar meals.', location: 'Pune, India', image: '/yashada.jpeg' },
    { title: 'Siddharoodha Math, Hubballi', desc: 'Implementation of solar steam cooking technology for large-scale community meal preparation, supporting sustainable cooking operations for thousands of devotees daily.', location: 'Hubballi, Karnataka, India', image: '/sidharudhubli.jpg' },
    { title: 'University of Agriculture Sciences, Dharwad', desc: 'Integration of advanced solar steam cooking technology to provide sustainable and eco-friendly meal solutions for the university community.', location: 'Dharwad, Karnataka, India', image: '/agri_uni.jpg' },
    { title: 'Mauli Pratisthan – Shingave Naik, Ahmednagar', desc: 'Renewable-energy driven steam cooking initiative established to reduce conventional fuel dependency and improve eco-friendly food service infrastructure.', location: 'Ahmednagar, Maharashtra, India', image: '/mauli.png' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % stories.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section id="stories" className="py-16 bg-white relative overflow-hidden">
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

        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="p-10 lg:p-12 rounded-[2.5rem] bg-gray-900 text-white shadow-2xl relative overflow-hidden group h-[420px] flex flex-col justify-center">
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

              <div className="hidden lg:block relative h-[420px]">
                <div className={`w-full h-full bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-inner flex items-center justify-center ${stories[activeIndex].image ? 'p-6' : 'p-8'}`}>
                  {stories[activeIndex].image ? (
                    <img
                      src={stories[activeIndex].image}
                      alt={stories[activeIndex].title}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  ) : (
                    <div className="text-center">
                      <Sun className="w-24 h-24 text-primary-green/20 mx-auto mb-4" />
                      <span className="text-gray-300 font-bold uppercase tracking-[0.2em]">Deployment Imagery</span>
                    </div>
                  )}
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Deployed Google Apps Script Web App URL linked to the spreadsheet
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwBMuM2cZif-tvIeNzfxNwUjBjLh1bTC4PDlVcnRm9jWzAukNlr0DyF0TtLPeZVv2vR/exec';

      // Google Apps Script requires no-cors mode
      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      setSubmitStatus('success');
      form.reset();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input name="Name" type="text" placeholder="Your Name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-primary-green transition-colors" />
                <input name="Phone" type="tel" placeholder="Contact Number" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-primary-green transition-colors" />
              </div>
              <input name="Email" type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-primary-green transition-colors" />
              <textarea name="Message" placeholder="Tell us about your requirements" rows={4} required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-primary-green transition-colors"></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-base shadow-xl shadow-emerald-900/50 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>

              {submitStatus === 'success' && (
                <div className="text-emerald-400 text-sm text-center font-medium bg-emerald-400/10 py-2 rounded-lg">
                  Thank you! Your inquiry has been sent successfully.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg">
                  Oops! Something went wrong. Please try again later.
                </div>
              )}
            </form>
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Founder</p>
                <p className="font-bold text-lg">Ravikumar Chavadi</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Join Our Mission</p>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors"><Globe size={14} /></div>
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
      <SolarProcess />

      <CalculatorCTA />
      <SuccessStories />
      <Footer />
    </div>
  );
}
