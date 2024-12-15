'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import GameBoard from '@/components/individual-game/gameboard';
import MoveHistory from '@/components/individual-game/move-history';
import { GameData } from '@/types';

export default function GameView() {
  const params = useParams();
  const { id } = params;

  const [gameData, setGameData] = useState<GameData | null>(null);
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchGameData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/game/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch game data.');
        }
        const data: GameData = await res.json();
        setGameData(data);
        setStudentName(data.student_name || ''); // Initialize the student name
        setIsLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setIsLoading(false);
        clearInterval(intervalId); // Stop polling if there's an error
      }
    };

    // Fetch data immediately and then start polling
    fetchGameData();
    intervalId = setInterval(fetchGameData, 5000); // Poll every 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [id]);

  const handleSaveName = async () => {
    if (!studentName.trim()) return alert('Student name cannot be empty.');

    try {
      const res = await fetch(`http://localhost:5000/game/updateName/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_name: studentName }),
      });

      if (!res.ok) {
        throw new Error('Failed to save student name.');
      }

      const updatedData: GameData = await res.json();
      setGameData(updatedData);
      alert('Student name saved successfully.');
    } catch (err) {
      alert((err as Error).message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <h1 className="text-2xl text-gray-700">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <h1 className="text-2xl text-red-600">Error: {error}</h1>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <h1 className="text-2xl text-gray-700">Game data not found.</h1>
      </div>
    );
  }

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

            <div className="flex justify-center items-center mb-6">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                className="border border-white rounded p-2 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-gray-900 transition text-gray-800"
              />
              <button
                onClick={handleSaveName}
                className="bg-gray-900 text-white rounded px-4 py-2 hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>

            <div className="flex justify-center mb-4">
              <GameBoard fen={gameData.fen} />
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-gray-900">Robotic Arm #{gameData.arm_id}</span>
            </div>
          </div>
          <div className="md:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <MoveHistory moves={gameData.moves} status={gameData.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
