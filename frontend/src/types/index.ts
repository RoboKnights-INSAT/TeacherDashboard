export interface Game {
    id: string
    arm_id: number
    studentName: string
    status: 'active' | 'completed'
    n_moves: number
  }
  
  export interface RoboticArm {
    id: string
    status: 'active' | 'idle'
    gamesPlayed: number
  }
  
  export interface StatCardProps {
    title: string
    value: number
    icon: React.ReactNode
    iconBgColor?: string
  }

  export interface DashboardData {
    total_games: number;
    total_completed_games: number;
    active_games_count: number;
    active_games: Game[];
    all_games: Game[];
    robotic_arms: RoboticArm[];
  }