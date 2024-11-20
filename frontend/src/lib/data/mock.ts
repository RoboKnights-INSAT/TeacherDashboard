import { Game, RoboticArm } from "@/types"

export const games: Game[] = [
  { id: '1', studentName: 'Alice', status: 'active', duration: 15, moves: 10 },
  { id: '2', studentName: 'Charlie', status: 'active', duration: 5, moves: 3 },
  { id: '3', studentName: 'elyes', status: 'completed', duration: 5, moves: 3 },
]

export const arms: RoboticArm[] = [
  { id: 'ARM1', status: 'active', lastMaintenance: '2023-05-01', gamesPlayed: 50 },
  { id: 'ARM2', status: 'idle', lastMaintenance: '2023-05-10', gamesPlayed: 45 },
  { id: 'ARM3', status: 'idle', lastMaintenance: '2023-04-15', gamesPlayed: 60 },
]

export const armData = {
  id: '1',
  status: 'active',
  lastMaintenance: '2024-05-01',
  nextCalibration: '2025-06-01',
  gamesPlayed: 50,
  performanceScore: 95.5,
};

export const gameData = {
  id: '1',
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  moves: [
    { number: 1, white: 'e4', black: 'e5' },
    { number: 2, white: 'Nf3', black: 'Nc6' },
    { number: 3, white: 'Bb5', black: 'a6' },
    { number: 4, white: 'd4', black: 'exd4' },
    { number: 5, white: 'Nxd4', black: 'Nf6' },
    { number: 6, white: 'Nc3', black: 'g6' },
    { number: 7, white: 'Nf3', black: 'Bg7' },
    { number: 8, white: 'Be3', black: 'O-O' },
    { number: 9, white: 'O-O', black: 'd5' },
    { number: 10, white: 'c4', black: 'dxc4' },
    { number: 11, white: 'Nc6', black: 'Nf6' },
    { number: 12, white: 'Nxe5', black: 'Nxe5' },
  ],
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'paused':
    case 'idle':
      return 'bg-yellow-100 text-yellow-800'
    case 'maintenance':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}