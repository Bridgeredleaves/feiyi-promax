import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-guilin-panel/50 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl flex flex-col ${className}`}>
      <h3 className="text-lg font-serif font-bold text-guilin-gold mb-2 border-b border-white/5 pb-2 flex justify-between items-center">
        {title}
      </h3>
      <div className="flex-1 w-full min-h-[300px] relative">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
