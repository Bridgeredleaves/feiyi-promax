import React, { useState, useMemo } from 'react';
import { ICHItem } from '../types';
import ItemCard from './ItemCard';

interface SearchGridProps {
  data: ICHItem[];
}

const SearchGrid: React.FC<SearchGridProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerTerm = searchTerm.toLowerCase();
    return data.filter(item => 
      item.name.toLowerCase().includes(lowerTerm) ||
      item.category.toLowerCase().includes(lowerTerm) ||
      item.area.toLowerCase().includes(lowerTerm) ||
      item.id.toString().includes(lowerTerm)
    );
  }, [data, searchTerm]);

  return (
    <div className="flex flex-col gap-6 mt-8">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-full leading-5 bg-guilin-panel text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-guilin-gold/50 focus:border-guilin-gold sm:text-sm shadow-lg transition-all"
            placeholder="搜索非遗项目、类型、地区..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <span className="text-xs text-gray-500">{filteredData.length} 项</span>
        </div>
      </div>

      {/* Grid */}
      {filteredData.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
            <p>未找到相关项目</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 overflow-y-auto max-h-[800px] pr-2">
            {filteredData.map(item => (
            <ItemCard key={item.id} item={item} />
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchGrid;
