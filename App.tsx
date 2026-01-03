import React, { useMemo } from 'react';
import { getICHData } from './utils/dataProcessor';
import { CSV_DATA } from './constants';
import ChartCard from './components/ChartCard';
import { DoubleRoseChart, MultiDimGaugeChart, StackedBarChart } from './components/Visualizations';
import SearchGrid from './components/SearchGrid';
import BackgroundMusic from './components/BackgroundMusic';

const App: React.FC = () => {
  // Load data once
  const data = useMemo(() => getICHData(), []);

  // Handle CSV Download
  const handleDownload = () => {
    const blob = new Blob([CSV_DATA], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Guilin_ICH_Data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-guilin-dark to-[#020617] text-slate-200 font-sans selection:bg-guilin-gold selection:text-white pb-20">
      
      {/* Background Music Component */}
      <BackgroundMusic />

      {/* Header */}
      <header className="pt-8 pb-6 px-4 md:px-8 text-center relative overflow-hidden">
        {/* Abstract background shape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-guilin-teal/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-guilin-gold via-yellow-200 to-guilin-gold drop-shadow-sm mb-2">
            桂林非物质文化遗产
          </h1>
          <p className="text-slate-400 text-sm md:text-base tracking-widest uppercase opacity-80 mb-4">
            Visual Analytics Dashboard
          </p>
          
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-guilin-gold/30 rounded-full text-guilin-gold text-xs transition-all hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] group"
          >
            <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            下载源数据 (CSV)
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 md:px-6 space-y-8">
        
        {/* Top Section: Charts */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Chart 1: Double Layer Rose (Category & Level) - 5 Columns */}
          <div className="md:col-span-5 h-[450px]">
            <ChartCard title="双层嵌套玫瑰图 (类型与级别)" className="h-full">
              <DoubleRoseChart data={data} />
            </ChartCard>
          </div>

          {/* Chart 2: Gauge (Level Weight) - 3 Columns */}
          <div className="md:col-span-3 h-[450px]">
            <ChartCard title="级别权重多维检测" className="h-full">
              <MultiDimGaugeChart data={data} />
            </ChartCard>
          </div>

          {/* Chart 3: Stacked Bar (Spatial Distribution) - 4 Columns */}
          <div className="md:col-span-4 h-[450px]">
            <ChartCard title="各区县空间分布丰度对比" className="h-full">
              <StackedBarChart data={data} />
            </ChartCard>
          </div>
        </section>

        {/* Divider */}
        <div className="relative py-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="px-3 bg-guilin-dark text-lg font-serif text-slate-400">项目名录 ({data.length})</span>
            </div>
        </div>

        {/* Bottom Section: Search & Grid */}
        <section>
          <SearchGrid data={data} />
        </section>
      </main>

      <footer className="mt-12 text-center text-slate-600 text-sm py-8 border-t border-white/5 bg-[#0b1120]">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-medium text-slate-500 mb-2">Guilin Intangible Cultural Heritage Visualization Dashboard</p>
          <div className="flex justify-center flex-wrap gap-4 text-xs opacity-70 mb-2">
            <span>数据来源: 广西非物质文化遗产网</span>
            <span>|</span>
            <span>桂林市非遗保护中心</span>
          </div>
          <div className="text-guilin-gold/80 text-xs font-serif">
             制作人员：万虹烨
          </div>
          <p className="text-[10px] mt-4 opacity-30 font-mono">
            Designed for GitHub Deployment • Pure Frontend Implementation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;