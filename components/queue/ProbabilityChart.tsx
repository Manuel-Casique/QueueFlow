import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProbRow } from '@/types/queue';

interface Props {
  data: ProbRow[];
}

export function ProbabilityChart({ data }: Props) {
  const [showCumulative, setShowCumulative] = useState(false);

  const chartData = useMemo(() => {
    return data.reduce<{
      accumulated: number;
      items: Array<{name: string, n: number, Probabilidad: number, Acumulada: number}>
    }>((acc, item) => {
      const nextAccumulated = acc.accumulated + item.prob;
      acc.items.push({
        name: `n=${item.n}`,
        n: item.n,
        Probabilidad: Number(item.prob.toFixed(4)),
        Acumulada: Number(nextAccumulated.toFixed(4))
      });
      return { accumulated: nextAccumulated, items: acc.items };
    }, { accumulated: 0, items: [] }).items;
  }, [data]);

  const activeDataKey = showCumulative ? "Acumulada" : "Probabilidad";
  const activeColor = showCumulative ? "#059669" : "#4f46e5";

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            {showCumulative ? 'Acumulado F(n)' : 'Probabilidad P(n)'}
          </CardTitle>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setShowCumulative(false)} 
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${!showCumulative ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Exactas P(n)
            </button>
            <button 
              onClick={() => setShowCumulative(true)} 
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${showCumulative ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Acumuladas F(n)
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer className="w-full h-full">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey={activeDataKey} fill={activeColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}