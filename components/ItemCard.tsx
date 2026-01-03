import React from 'react';
import { ICHItem } from '../types';

interface ItemCardProps {
  item: ICHItem;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const isNational = item.level === '国家级';

  return (
    <div className="group relative bg-guilin-panel border border-white/5 rounded-lg p-4 hover:border-guilin-gold/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white/5 rounded-full blur-xl group-hover:bg-guilin-gold/10 transition-colors"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
            <span className={`text-xs font-bold px-2 py-1 rounded-sm border ${
                isNational 
                ? 'text-guilin-gold border-guilin-gold/30 bg-guilin-gold/10' 
                : 'text-guilin-teal border-guilin-teal/30 bg-guilin-teal/10'
            }`}>
                {item.level}
            </span>
            <span className="text-xs text-slate-400 font-mono">#{item.id}</span>
        </div>
        
        <h3 className="text-lg font-serif font-bold text-slate-100 mb-1 leading-tight group-hover:text-guilin-gold transition-colors">
            {item.name}
        </h3>
        
        <div className="text-sm text-guilin-teal mb-3">{item.category}</div>
        
        <div className="space-y-1 text-xs text-slate-400">
            <div className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="truncate">{item.cleanArea}</span>
            </div>
            <div className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                <span className="truncate" title={item.protectionUnit}>{item.protectionUnit}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
