/*
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ArmStatus from '@/components/arm/armstatus';
import ArmConfiguration from '@/components/arm/armconfiguration';
import { armData } from '@/lib/data/mock'



export default function ArmDetail() {
  const params = useParams();
  const { id } = params;

  const [difficulty, setDifficulty] = useState(5);

  const handleSettingsChange = () => {
    console.log('Settings changed:', { difficulty });
    // Add API call or backend integration here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-8 group">
          <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Robotic Arm: {id}</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <ArmStatus
            status={armData.status}
            lastMaintenance={armData.lastMaintenance}
            nextCalibration={armData.nextCalibration}
            gamesPlayed={armData.gamesPlayed}
            performanceScore={armData.performanceScore}
          />
          <ArmConfiguration
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            onSave={handleSettingsChange}
          />
        </div>
      </div>
    </div>
  );
}
  */
