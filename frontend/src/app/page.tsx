'use client';

import React, { useEffect, useState } from 'react';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { AllGamesCard } from '@/components/dashboard/all-games-card';
import { RoboticArmsCard } from '@/components/dashboard/robotic-arms-card';
import { Dices } from 'lucide-react';
import { DashboardData } from '@/types';

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:5000/dashboard');
      if (!res.ok) {
        throw new Error('Failed to fetch data from the API.');
      }
      const result: DashboardData = await res.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch on mount

    const interval = setInterval(() => {
      fetchData(); // Fetch at intervals
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <h1 className="text-2xl text-red-600">Error: {error}</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <h1 className="text-2xl text-gray-700">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-gray-900 p-3 rounded-xl">
              <Dices className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Chess Education Dashboard
            </h1>
          </div>
          <p className="text-gray-500 text-lg max-w-3xl">
            Monitor robotic arm performance and student progress
          </p>
        </div>

        <StatsCards 
          total_games={data.total_games} 
          total_completed_games={data.total_completed_games} 
          active_games_count={data.active_games_count} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AllGamesCard 
            all_games={data.all_games} 
            active_games_count={data.active_games_count}
          />
          <RoboticArmsCard 
            arms={data.robotic_arms} 
          />
        </div>
      </div>
    </div>
  );
}
