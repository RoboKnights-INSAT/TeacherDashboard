export interface Game {
    id: number
    arm_id: number
    student_name: string
    status: 'active' | 'completed'
    n_moves: number
  }
  
  export interface RoboticArm {
    id: string
    status: 'active' | 'idle'
    games_played: number
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
  export interface GameData{
    id: number;
    fen: string;
    student_name?: string;
    moves: Move[];
    arm_id: number;
    status: string;
  }
  export interface Move {
    number: number; 
    white: string; 
    black: string; 
  }