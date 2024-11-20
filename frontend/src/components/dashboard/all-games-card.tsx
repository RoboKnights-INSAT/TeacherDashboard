import Link from 'next/link'
import { DiamondIcon as ChessIcon } from 'lucide-react'
import { Game } from '@/types'
import { getStatusColor } from '@/lib/data/mock'

interface AllGamesCardProps {
  all_games: Game[],
  active_games_count: number
}

export function AllGamesCard({ all_games, active_games_count }: AllGamesCardProps) {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ChessIcon className="h-5 w-5 mr-2 text-indigo-500" />
            <h2 className="text-xl font-semibold text-gray-900">All Games</h2>
          </div>
          <span className="text-sm text-gray-500">{active_games_count} Active</span>
        </div>
      </div>
      <div className="p-6">
        <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
          <ul className="space-y-4">
            {all_games.map((game) => (
              <li key={game.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                <Link href={`/game/${game.id}`} className="flex-1 flex justify-between items-center">
                  <span className="font-medium text-gray-900">ARM {game.arm_id}</span>
                  <div className="flex items-center gap-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      game.status === 'active' ? 'bg-green-50 text-green-700' :
                      game.status === 'completed' ? 'bg-blue-50 text-blue-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {game.status}
                    </span>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>{game.n_moves} moves</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}