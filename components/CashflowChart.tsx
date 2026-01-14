import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ChartDataPoint } from '../types';

interface Props {
  data: ChartDataPoint[];
}

export const CashflowChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-[200px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A5D4E" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#4A5D4E" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4C3A3" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#D4C3A3" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E2DD" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9CA3AF', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              borderRadius: '12px', 
              border: '1px solid #E5E2DD',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
            }}
            itemStyle={{ color: '#2C362F' }}
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#4A5D4E"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorActual)"
          />
          <Area
            type="monotone"
            dataKey="predicted"
            stroke="#D4C3A3"
            strokeWidth={2}
            strokeDasharray="5 5"
            fillOpacity={1}
            fill="url(#colorPredicted)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};