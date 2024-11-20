'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { gameData } from '@/lib/data/mock';

import GameBoard from '@/components/individual-game/gameboard';
import MoveHistory from '@/components/individual-game/move-history';

const GameView: React.FC = () => {
  const params = useParams();
  const { id } = params;

  const [currentFEN, setCurrentFEN] = useState(gameData.fen);
  const [studentName, setStudentName] = useState('');
  const armElo = 1200; // Example Elo rating

  const handleSaveName = () => {
    // Logic to save the player's name
    console.log("Player name saved:", studentName);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors mb-8 group">
          <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
              Game #{id}
            </h2>
            <div className="flex items-center justify-center mb-4 text-gray-900 text-2xl font-semibold">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                className="border border-gray-900 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mr-2"
              />
              <button onClick={handleSaveName} className="bg-gray-900 text-white rounded px-4 py-2 hover:bg-green-700 transition">Save</button>
            </div>
            <div className="flex justify-center mb-4">
              <GameBoard fen={currentFEN} />
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-gray-900">Robotic Arm</span>
              <span className="text-xl font-medium text-gray-900">Elo: {armElo}</span>
            </div>
          </div>
          <div className="md:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <MoveHistory moves={gameData.moves} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameView;
