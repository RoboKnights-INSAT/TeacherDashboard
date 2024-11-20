import React from 'react';
import { Chessboard } from 'react-chessboard';

interface GameBoardProps {
  fen: string;
}

const GameBoard: React.FC<GameBoardProps> = ({ fen }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-[600px]">
        <Chessboard 
          position={fen} 
          boardWidth={500}
          arePiecesDraggable={false}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        />
      </div>
    </div>
  );
};

export default GameBoard;
