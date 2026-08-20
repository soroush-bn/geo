"use client";

import React from "react";
import { Users, Link2, DollarSign, Handshake } from "lucide-react";
import { data2024, data2025 } from "@/lib/data";

interface Props {
  year: "2024" | "2025" | "yoy";
}

export default function KPIHeader({ year }: Props) {
  const d2024 = data2024.overall_impact_summary;
  const d2025 = data2025.overall_impact_summary;
  const f2024 = data2025.financial_summary.fiscal_year_2024_2025_comparison;
  const f2025 = data2025.financial_summary.fiscal_year_2025_2026;

  const kpis = [
    {
      title: "Households Supported",
      val24: d2024.households_supported,
      val25: d2025.households_supported,
      icon: Users,
    },
    {
      title: "Connectivity Months",
      val24: d2024.total_connectivity_months_provided,
      val25: d2025.total_connectivity_months_provided,
      icon: Link2,
    },
    {
      title: "Value Distributed ($CAD)",
      val24: f2024.expenditures_breakdown.devices_and_applications_cad + f2024.expenditures_breakdown.internet_connections_and_mobile_plans_cad,
      val25: f2025.expenditures_breakdown.devices_and_applications_cad + f2025.expenditures_breakdown.internet_connections_and_mobile_plans_cad,
      icon: DollarSign,
      format: (v: number) => `$${(v / 1000000).toFixed(2)}M`,
    },
    {
      title: "Referral Partners",
      val24: d2024.total_registered_referral_partners,
      val25: d2025.total_registered_referral_partners,
      icon: Handshake,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, idx) => {
        const val = year === "2024" ? kpi.val24 : kpi.val25;
        const formatted = kpi.format ? kpi.format(val) : val.toLocaleString();
        
        const growth = ((kpi.val25 - kpi.val24) / kpi.val24) * 100;
        
        return (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-500">{kpi.title}</h3>
              <kpi.icon className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{formatted}</div>
            
            {year === "yoy" && (
              <div className={`text-sm font-medium ${growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                {growth >= 0 ? "+" : ""}{growth.toFixed(1)}% vs Last Year
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
