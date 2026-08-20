"use client";

import React, { useState } from "react";
import KPIHeader from "@/components/KPIHeader";
import HardwareDistribution from "@/components/HardwareDistribution";
import FinancialTransparency from "@/components/FinancialTransparency";
import Demographics from "@/components/Demographics";
import PartnerDirectory from "@/components/PartnerDirectory";

import StrategicPlanView from "@/components/StrategicPlanView";

export default function Dashboard() {
  const [viewYear, setViewYear] = useState<"2024" | "2025" | "yoy" | "strategic">("2025");

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              G
            </div>
            <h1 className="font-bold text-xl tracking-tight text-gray-900">
              <a href="https://geonovascotia.ca/reports/annual-reports/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
                GEO Nova Scotia Impact
              </a>
            </h1>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewYear("2024")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewYear === "2024" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
            >
              2024-25
            </button>
            <button 
              onClick={() => setViewYear("2025")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewYear === "2025" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
            >
              2025-26
            </button>
            <button 
              onClick={() => setViewYear("yoy")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewYear === "yoy" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
            >
              YoY Comparison
            </button>
            <button 
              onClick={() => setViewYear("strategic")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewYear === "strategic" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
            >
              Strategic Plan
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {viewYear !== "strategic" ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Annual Impact Report</h2>
              <p className="text-gray-500">
                {viewYear === "2024" && "Displaying data for the April 1, 2024 – March 31, 2025 reporting period."}
                {viewYear === "2025" && "Displaying data for the April 1, 2025 – March 31, 2026 reporting period."}
                {viewYear === "yoy" && "Comparing performance between the 2024-25 and 2025-26 fiscal years."}
              </p>
            </div>

            <KPIHeader year={viewYear} />
            
            <HardwareDistribution year={viewYear} />
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="flex flex-col gap-8">
                <FinancialTransparency />
              </div>
              <div className="flex flex-col gap-8">
                <Demographics year={viewYear} />
              </div>
            </div>

            <div className="mt-8">
              <PartnerDirectory />
            </div>
          </>
        ) : (
          <StrategicPlanView />
        )}
      </main>

      {/* Footer Disclaimer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 pb-4 border-t border-gray-200 text-center">
        <p className="text-sm font-medium text-gray-600">
          * All information and data presented on this dashboard are sourced directly from the official <a href="https://geonovascotia.ca/reports/annual-reports/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">GEO Nova Scotia reports</a>.
        </p>
      </footer>
    </div>
  );
}
