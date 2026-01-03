import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as echarts from 'echarts';
import { ICHItem } from '../types';

// --- Shared Options ---
const COMMON_TOOLBOX = {
  feature: {
    saveAsImage: {
      show: true,
      title: '另存为JPG',
      type: 'jpeg',
      backgroundColor: '#0f172a',
      pixelRatio: 2
    }
  },
  iconStyle: {
    borderColor: '#94a3b8'
  },
  right: 10,
  top: 0
};

// --- Double Layer Rose Chart ---
// Inner: Level (Pie)
// Outer: Category (Rose)
export const DoubleRoseChart: React.FC<{ data: ICHItem[] }> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    // Prepare Data
    // Group 1: National
    const nationalItems = data.filter(d => d.level === '国家级');
    const regionalItems = data.filter(d => d.level === '自治区级');

    const getCatStats = (items: ICHItem[]) => {
      const counts: Record<string, number> = {};
      items.forEach(i => counts[i.category] = (counts[i.category] || 0) + 1);
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    };

    const nationalCats = getCatStats(nationalItems);
    const regionalCats = getCatStats(regionalItems);

    const innerData = [
      { 
        value: nationalItems.length, 
        name: '国家级', 
        itemStyle: { color: '#f59e0b' },
        selected: true
      },
      { 
        value: regionalItems.length, 
        name: '自治区级', 
        itemStyle: { color: '#14b8a6' } 
      }
    ];

    // Combine for outer ring to align with inner ring
    const outerData = [
      ...nationalCats.map(c => ({
        ...c,
        itemStyle: { color: '#fbbf24' } // Lighter Gold
      })),
      ...regionalCats.map(c => ({
        ...c,
        itemStyle: { color: '#2dd4bf' } // Lighter Teal
      }))
    ];

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        show: true,
        top: 'bottom',
        textStyle: { color: '#94a3b8', fontSize: 10 },
        type: 'scroll'
      },
      toolbox: COMMON_TOOLBOX,
      series: [
        {
          name: '非遗级别',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            position: 'inner',
            fontSize: 12,
            fontWeight: 'bold',
            color: '#fff'
          },
          labelLine: { show: false },
          data: innerData
        },
        {
          name: '非遗类别',
          type: 'pie',
          radius: ['45%', '70%'],
          roseType: 'area', // Nightingale Rose Mode
          itemStyle: {
            borderRadius: 5,
            borderColor: '#0f172a',
            borderWidth: 2
          },
          label: {
            color: '#cbd5e1',
            formatter: '{b}' 
          },
          data: outerData
        }
      ]
    };

    chart.setOption(option);

    const resize = () => chart.resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} className="w-full h-full" />;
};


// --- Multi-Dimension Gauge Chart ---
export const MultiDimGaugeChart: React.FC<{ data: ICHItem[] }> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'nat_pct' | 'nat_cnt' | 'reg_pct' | 'reg_cnt'>('nat_pct');

  const stats = useMemo(() => {
    const total = data.length;
    const nat = data.filter(d => d.level === '国家级').length;
    const reg = data.filter(d => d.level === '自治区级').length;
    return { total, nat, reg };
  }, [data]);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    let value = 0;
    let max = 100;
    let name = '';
    let color = '#f59e0b';
    let suffix = '';

    switch (mode) {
      case 'nat_pct':
        value = parseFloat(((stats.nat / stats.total) * 100).toFixed(1));
        max = 100;
        name = '国家级占比';
        color = '#f59e0b';
        suffix = '%';
        break;
      case 'nat_cnt':
        value = stats.nat;
        max = stats.total;
        name = '国家级数量';
        color = '#d97706';
        suffix = '项';
        break;
      case 'reg_pct':
        value = parseFloat(((stats.reg / stats.total) * 100).toFixed(1));
        max = 100;
        name = '自治区级占比';
        color = '#14b8a6';
        suffix = '%';
        break;
      case 'reg_cnt':
        value = stats.reg;
        max = stats.total;
        name = '自治区级数量';
        color = '#0d9488';
        suffix = '项';
        break;
    }

    const option = {
      toolbox: COMMON_TOOLBOX,
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: max,
          splitNumber: 5,
          radius: '100%',
          center: ['50%', '70%'],
          itemStyle: {
            color: color,
            shadowColor: 'rgba(0,138,255,0.45)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          },
          progress: {
            show: true,
            roundCap: true,
            width: 18
          },
          pointer: {
            length: '50%',
            width: 5,
            offsetCenter: [0, '-20%']
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 18,
              color: [[1, '#1e293b']]
            }
          },
          axisTick: { show: false },
          splitLine: {
            length: 12,
            lineStyle: { width: 2, color: '#999' }
          },
          axisLabel: {
            color: '#94a3b8',
            fontSize: 10,
            distance: 25
          },
          title: {
            offsetCenter: [0, '30%'],
            fontSize: 20,
            color: '#e2e8f0',
            fontFamily: 'serif'
          },
          detail: {
            backgroundColor: 'transparent',
            fontSize: 36,
            fontWeight: 'bold',
            color: color,
            offsetCenter: [0, '-20%'],
            formatter: `{value}${suffix}`
          },
          data: [{ value, name }]
        }
      ]
    };

    chart.setOption(option);

    const resize = () => chart.resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      chart.dispose();
    };
  }, [data, mode, stats]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <div ref={chartRef} className="flex-1 min-h-[250px]" />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button 
          onClick={() => setMode('nat_pct')}
          className={`text-xs py-1 rounded border transition-colors ${mode === 'nat_pct' ? 'bg-guilin-gold text-guilin-dark border-guilin-gold' : 'border-white/10 hover:bg-white/5 text-slate-400'}`}
        >
          国家级占比
        </button>
        <button 
          onClick={() => setMode('reg_pct')}
          className={`text-xs py-1 rounded border transition-colors ${mode === 'reg_pct' ? 'bg-guilin-teal text-guilin-dark border-guilin-teal' : 'border-white/10 hover:bg-white/5 text-slate-400'}`}
        >
          自治区级占比
        </button>
        <button 
          onClick={() => setMode('nat_cnt')}
          className={`text-xs py-1 rounded border transition-colors ${mode === 'nat_cnt' ? 'bg-yellow-700 text-white border-yellow-700' : 'border-white/10 hover:bg-white/5 text-slate-400'}`}
        >
          国家级数量
        </button>
        <button 
          onClick={() => setMode('reg_cnt')}
          className={`text-xs py-1 rounded border transition-colors ${mode === 'reg_cnt' ? 'bg-teal-700 text-white border-teal-700' : 'border-white/10 hover:bg-white/5 text-slate-400'}`}
        >
          自治区级数量
        </button>
      </div>
    </div>
  );
};


// --- Stacked Bar Chart (Spatial Distribution - Horizontal) ---
export const StackedBarChart: React.FC<{ data: ICHItem[] }> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    // Process Data
    const areaMap = new Map<string, { nat: number; reg: number; total: number }>();
    
    data.forEach(d => {
      const area = d.cleanArea || "未知";
      if (!areaMap.has(area)) areaMap.set(area, { nat: 0, reg: 0, total: 0 });
      const entry = areaMap.get(area)!;
      
      if (d.level === '国家级') entry.nat++;
      else entry.reg++;
      entry.total++;
    });

    const sortedData = Array.from(areaMap.entries())
      .sort((a, b) => a[1].total - b[1].total); // Sort ascending (bottom to top for horizontal bar)

    const areas = sortedData.map(d => d[0]);
    const natData = sortedData.map(d => d[1].nat);
    const regData = sortedData.map(d => d[1].reg);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        textStyle: { color: '#cbd5e1' },
        top: 0
      },
      toolbox: COMMON_TOOLBOX,
      grid: {
        left: '3%',
        right: '5%',
        bottom: '5%',
        top: '10%',
        containLabel: true
      },
      // SWAPPED AXES FOR HORIZONTAL ORIENTATION
      xAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#334155', type: 'dashed' } },
        axisLabel: { color: '#94a3b8' }
      },
      yAxis: {
        type: 'category',
        data: areas,
        axisLabel: { 
          color: '#cbd5e1', 
          fontSize: 12
        },
        axisLine: { lineStyle: { color: '#475569' } }
      },
      series: [
        {
          name: '国家级',
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: natData,
          itemStyle: { color: '#f59e0b' },
          barWidth: '60%'
        },
        {
          name: '自治区级',
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: regData,
          itemStyle: {
             color: '#14b8a6',
             borderRadius: [0, 4, 4, 0] // Rounded corners on the right side
          },
          barWidth: '60%'
        }
      ]
    };

    chart.setOption(option);

    const resize = () => chart.resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} className="w-full h-full" />;
};