import { MonitorIcon } from 'lucide-react'
import { RoboticArm } from '@/types'

interface RoboticArmsCardProps {
  arms: RoboticArm[]
}

export function RoboticArmsCard({ arms }: RoboticArmsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <MonitorIcon className="h-5 w-5 mr-2 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-900">Robotic Arm Status</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="max-h-[300px] overflow-y-auto">
          <ul className="space-y-4">
            {arms.map((arm) => (
              <li key={arm.id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex-1 flex justify-between items-center cursor-pointer">
                  <span className="font-medium text-gray-900">ARM# {arm.id}</span>
                  <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      arm.status === 'active' ? 'bg-green-50 text-green-700' :
                      arm.status === 'idle' ? 'bg-blue-50 text-blue-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {arm.status}
                    </span>
                    <span className="text-sm text-gray-500">{arm.games_played} games played</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}