import React from 'react';

interface Move {
  number: number;
  white: string;
  black: string;
}

interface MoveHistoryProps {
  moves: Move[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-900">Move History</h3>
      <div className="h-[500px] overflow-y-auto rounded-lg">
        <table className="w-full">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Move</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">White</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Black</th>
            </tr>
          </thead>
          <tbody>
            {moves.map((move) => (
              <tr 
                key={move.number} 
                className="border-t border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-sm text-gray-400">{move.number}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{move.white}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{move.black}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoveHistory;
