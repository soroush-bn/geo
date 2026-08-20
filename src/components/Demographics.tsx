"use client";

import React from "react";
import { data2024, data2025 } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  year: "2024" | "2025" | "yoy";
}

export default function Demographics({ year }: Props) {
  const d24 = data2024.participant_demographics_detailed;
  const d25 = data2025.participant_demographics_detailed;

  const getIndicators = (d: any) => d.equity_and_vulnerability_indicators_pct;

  const i24 = getIndicators(d24);
  const i25 = getIndicators(d25);

  const labels: Record<string, string> = {
    homelessness_housing_insecurity: "Housing Insecurity",
    living_with_disability: "Living with Disability",
    single_parent_households: "Single Parent",
    newcomers_to_canada: "Newcomers",
    two_s_lgbtqia_plus: "2SLGBTQIA+",
    receiving_income_assistance: "Income Assistance",
    single_person_households: "Single Person",
    households_with_children: "With Children",
  };

  const chartData = Object.keys(labels).map(key => {
    return {
      name: labels[key],
      "2024-25": i24[key]?.yes || 0,
      "2025-26": i25[key]?.yes || 0,
      exact24: Math.round((i24[key]?.yes || 0) / 100 * d24.total_households_surveyed),
      exact25: Math.round((i25[key]?.yes || 0) / 100 * d25.total_households_surveyed),
    };
  });

  // Sort descending by 2025 data
  chartData.sort((a, b) => b["2025-26"] - a["2024-25"]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 text-sm">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between gap-4 mb-1">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-medium text-gray-900">
                {entry.value}% ({entry.payload[entry.dataKey === "2024-25" ? "exact24" : "exact25"]} households)
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Priority Populations Reach</h3>
      <p className="text-sm text-gray-500 mb-6">Percentage of households surveyed identifying with key priority groups.</p>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
            <XAxis type="number" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} domain={[0, 100]} />
            <YAxis dataKey="name" type="category" tick={{fill: '#4b5563', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} width={120} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: '#f3f4f6'}} />
            
            {(year === "2024" || year === "yoy") && <Bar dataKey="2024-25" fill="#94a3b8" radius={[0, 4, 4, 0]} barSize={year === "yoy" ? 12 : 24} />}
            {(year === "2025" || year === "yoy") && <Bar dataKey="2025-26" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={year === "yoy" ? 12 : 24} />}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
