import React from "react";
import { Activity, Calendar, Check, Gamepad, Gauge } from 'lucide-react'; // Import icons

interface ArmStatusProps {
  status: string;
  lastMaintenance: string;
  nextCalibration: string;
  gamesPlayed: number;
  performanceScore: number;
}

const ArmStatus: React.FC<ArmStatusProps> = ({ 
  status, 
  lastMaintenance, 
  nextCalibration, 
  gamesPlayed, 
  performanceScore 
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-2xl font-semibold mb-6 text-gray-900">Arm Status</h2>
    <div className="grid grid-cols-2 gap-6">
      {/* Status Card */}
      <div className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <Activity className="w-5 h-5 text-gray-700" />
          <dt className="font-medium text-gray-900">Status</dt>
        </div>
        <dd className={`text-lg font-semibold ${
          status.toLowerCase() === 'active' ? 'text-gray-900' : 'text-gray-900'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </dd>
      </div>

      {/* Last Maintenance Card */}
      <div className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <Calendar className="w-5 h-5 text-gray-700" />
          <dt className="font-medium text-gray-900">Last Maintenance</dt>
        </div>
        <dd className="text-lg font-semibold text-gray-900">{lastMaintenance}</dd>
      </div>

      {/* Next Calibration Card */}
      <div className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <Check className="w-5 h-5 text-gray-700" />
          <dt className="font-medium text-gray-900">Next Calibration</dt>
        </div>
        <dd className="text-lg font-semibold text-gray-900">{nextCalibration}</dd>
      </div>

      {/* Games Played Card */}
      <div className="bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <Gamepad className="w-5 h-5 text-gray-700" />
          <dt className="font-medium text-gray-900">Games Played</dt>
        </div>
        <dd className="text-lg font-semibold text-gray-900">{gamesPlayed}</dd>
      </div>

      {/* Performance Score Card - Spans full width */}
      <div className="col-span-2 bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <Gauge className="w-5 h-5 text-gray-700" />
          <dt className="font-medium text-gray-900">Performance Score</dt>
        </div>
        <dd className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
            <div 
              className="bg-gray-900 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${performanceScore}%` }}
            ></div>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {performanceScore.toFixed(2)}%
          </span>
        </dd>
      </div>
    </div>
  </div>
);

export default ArmStatus;
