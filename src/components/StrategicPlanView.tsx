"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { strategicPlanData as data } from "@/lib/strategic-data";
import { RefreshCw, Users, Scale, Heart, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";

const icons = [RefreshCw, Users, Scale, Heart, ShieldCheck];

export default function StrategicPlanView() {
  const [activeTab, setActiveTab] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);

  const {
    report_metadata,
    organizational_identity,
    core_definitions,
    participant_impact_areas,
    strategic_priorities_and_objectives
  } = data;

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % participant_impact_areas.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [participant_impact_areas.length]);

  return (
    <div className="flex flex-col gap-12 mt-4">
      {/* Identity Section */}
      <section className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{report_metadata.subtitle}</h2>
          <p className="text-indigo-600 font-medium mb-12">Publication: {report_metadata.publication_date}</p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-indigo-50 rounded-xl">
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">{organizational_identity.vision}</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl">
              <h3 className="text-xl font-bold text-indigo-900 mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">{organizational_identity.mission}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 px-2">Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizational_identity.core_values.map((val, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{val.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Definitions & Ticker */}
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Definitions</h2>
          <div className="flex flex-col gap-6">
            {core_definitions.map((def, i) => (
              <div key={i} className="border-l-4 border-indigo-600 pl-4 py-1">
                <h3 className="font-bold text-gray-900">{def.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{def.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center overflow-hidden">
          <h2 className="text-xl font-medium text-indigo-300 uppercase tracking-wider mb-8">Participant Impact</h2>
          <div className="relative h-40 w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={tickerIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute flex flex-col items-center gap-4 w-full"
              >
                <CheckCircle2 className="text-indigo-400 w-10 h-10" />
                <p className="text-xl sm:text-2xl font-medium px-4">
                  {participant_impact_areas[tickerIndex]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Strategic Priorities */}
      <section className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Strategic Priorities</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 flex flex-col gap-3">
            {strategic_priorities_and_objectives.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`text-left p-4 rounded-xl transition-all border-2 ${
                  activeTab === idx 
                    ? "border-indigo-600 bg-indigo-50 text-indigo-900" 
                    : "border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="font-bold text-sm mb-1">{item.priority.split(':')[0]}</div>
                <div className="text-sm leading-tight">{item.priority.split(':')[1]?.trim() || item.priority}</div>
              </button>
            ))}
          </div>
          
          <div className="lg:w-2/3 bg-gray-50 rounded-xl p-8 border border-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{strategic_priorities_and_objectives[activeTab].priority}</h3>
                <p className="text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  {strategic_priorities_and_objectives[activeTab].description}
                </p>
                <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-4">Objectives</h4>
                <ul className="space-y-3">
                  {strategic_priorities_and_objectives[activeTab].objectives.map((obj, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <ChevronRight className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 text-sm leading-relaxed">{obj}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
