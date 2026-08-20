"use client";

import React from "react";
import { data2024, data2025 } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Props {
  year: "2024" | "2025" | "yoy";
}

export default function HardwareDistribution({ year }: Props) {
  const h24 = data2024.devices_and_connections_distributed.hardware_and_apps;
  const h25 = data2025.devices_and_connections_distributed.hardware_and_apps;
  const c24 = data2024.devices_and_connections_distributed.connectivity_services;
  const c25 = data2025.devices_and_connections_distributed.connectivity_services;

  const hardwareData = h25.map((item, i) => ({
    name: item.type.replace(" & Headsets", ""),
    "2024-25": h24[i]?.quantity || 0,
    "2025-26": item.quantity,
  }));

  const connectivityData = c25.map((item, i) => ({
    name: item.type.replace("Active ", ""),
    "2024-25": c24[i]?.unique_connections || 0,
    "2025-26": item.unique_connections,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Hardware Distributed</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hardwareData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
              {(year === "2024" || year === "yoy") && <Bar dataKey="2024-25" fill="#94a3b8" radius={[4, 4, 0, 0]} />}
              {(year === "2025" || year === "yoy") && <Bar dataKey="2025-26" fill="#4f46e5" radius={[4, 4, 0, 0]} />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Connectivity Services</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={connectivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
              {(year === "2024" || year === "yoy") && <Bar dataKey="2024-25" fill="#94a3b8" radius={[4, 4, 0, 0]} />}
              {(year === "2025" || year === "yoy") && <Bar dataKey="2025-26" fill="#06b6d4" radius={[4, 4, 0, 0]} />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
