"use client";

import React, { useState } from "react";
import { data2025 } from "@/lib/data";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function FinancialTransparency() {
  const [activeYear, setActiveYear] = useState<"2024" | "2025">("2025");
  
  const f2024 = data2025.financial_summary.fiscal_year_2024_2025_comparison;
  const f2025 = data2025.financial_summary.fiscal_year_2025_2026;
  
  const currentData = activeYear === "2025" ? f2025 : f2024;

  const rev = currentData.revenue_breakdown;
  const exp = currentData.expenditures_breakdown;

  const revenueData = [
    { name: "Government & Grants", value: rev.government_funding_and_grants_cad },
    { name: "Partner Support", value: rev.program_support_from_partners_cad },
    { name: "Other Revenue", value: rev.other_revenue_cad },
  ];

  const expenditureData = [
    { name: "Internet & Mobile", value: exp.internet_connections_and_mobile_plans_cad },
    { name: "Devices & Apps", value: exp.devices_and_applications_cad },
    { name: "Operations", value: exp.operations_expenses_cad },
    { name: "Program Salaries", value: exp.program_salaries_cad },
  ];

  const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

  const formatCurrency = (value: number) => `$${(value / 1000000).toFixed(2)}M`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">Financial Transparency</h3>
        
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveYear("2024")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeYear === "2024" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            2024-25
          </button>
          <button 
            onClick={() => setActiveYear("2025")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeYear === "2025" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            2025-26
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-center text-sm font-medium text-gray-500 mb-2">Revenue Breakdown</h4>
          <p className="text-center text-2xl font-bold text-gray-900 mb-4">{formatCurrency(currentData.total_revenues_cad)}</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-center text-sm font-medium text-gray-500 mb-2">Expenditure Breakdown</h4>
          <p className="text-center text-2xl font-bold text-gray-900 mb-4">{formatCurrency(currentData.total_expenditures_cad)}</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenditureData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {expenditureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
