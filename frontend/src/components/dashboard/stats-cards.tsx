import { DiamondIcon as ChessIcon, ActivityIcon, CheckCircleIcon, ClockIcon } from 'lucide-react'
import { StatCard } from './stat-card'


interface StatsCardsProps {
  total_games: number, 
  total_completed_games: number, 
  active_games_count: number
}

export function StatsCards({ total_games, total_completed_games, active_games_count }: StatsCardsProps) {
  const totalGames = total_games
  const activeGames = active_games_count
  const completedGames = total_completed_games
  const stats = [
    {
      title: "Total Games",
      value: totalGames,
      icon: <ChessIcon className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      title: "Active Games",
      value: activeGames,
      icon: <ActivityIcon className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50 group-hover:bg-green-100"
    },
    {
      title: "Completed Games",
      value: completedGames,
      icon: <CheckCircleIcon className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 group-hover:bg-purple-100"
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} 
          className="animate-fade-in" 
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={<div className={`${stat.color}`}>{stat.icon}</div>}
            iconBgColor={stat.bgColor}
          />
        </div>
      ))}
    </div>
  )
}