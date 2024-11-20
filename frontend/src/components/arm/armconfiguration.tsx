import React from "react";

interface ArmConfigurationProps {
  difficulty: number;
  setDifficulty: (value: number) => void;
  onSave: () => void;
}

const ArmConfiguration: React.FC<ArmConfigurationProps> = ({
  difficulty,
  setDifficulty,
  onSave,
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-semibold text-gray-900">Arm Configuration</h2>
      <div className="px-4 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
        Level {difficulty}
      </div>
    </div>

    <div className="space-y-8">
      <div>
        <label className="block text-sm font-semibold mb-4 text-gray-700">
          Chess AI Difficulty
          <span className="ml-2 font-normal text-gray-500">Select game difficulty level</span>
        </label>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {[...Array(10)].map((_, i) => (
            <button
              key={i}
              onClick={() => setDifficulty(i + 1)}
              className={`
                relative px-5 py-2.5 rounded-xl transition-all duration-200 
                ${difficulty === i + 1
                  ? 'bg-gray-900 text-white shadow-md scale-105 font-medium'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2'
                }
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500 italic">
          Tip: Higher difficulties provide more challenging gameplay
        </div>
      </div>

      <div className="pt-4">
        <button
          className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-medium
            hover:bg-gray-700 active:bg-gray-800 
            transform transition-all duration-200 
            hover:shadow-lg active:scale-98
            focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          onClick={onSave}
        >
          Save Configuration
        </button>
      </div>
    </div>
  </div>
);

export default ArmConfiguration;
