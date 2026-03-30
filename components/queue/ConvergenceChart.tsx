import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity } from 'lucide-react';

interface Props {
  data: Array<{ iteration: number; wq: number; ws: number }>;
  theoreticalWq?: number;
  theoreticalWs?: number;
}

export function ConvergenceChart({ data, theoreticalWq, theoreticalWs }: Props) {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
          <Activity className="w-5 h-5 text-indigo-600" />
          Convergencia de Tiempos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis 
                dataKey="iteration" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickFormatter={(val) => val.toLocaleString()}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelFormatter={(label) => `Iteración: ${label.toLocaleString()}`}
                formatter={(value: unknown) => {
                  if (typeof value === 'number') return value.toFixed(4);
                  return String(value);
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              
              <Line 
                type="monotone" 
                name="Wq (MC)"
                dataKey="wq" 
                stroke="#0d9488" // teal-600
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }} 
              />
              
              {theoreticalWq !== undefined && !isNaN(theoreticalWq) && (
                <ReferenceLine 
                    y={theoreticalWq} 
                    label={{ position: 'right', value: 'Wq Teórico', fill: '#0f766e', fontSize: 12 }} 
                    stroke="#0f766e" // teal-700
                    strokeDasharray="3 3" 
                />
              )}

              <Line 
                type="monotone" 
                name="Ws (MC)"
                dataKey="ws" 
                stroke="#059669" // emerald-600
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }} 
              />
              
              {theoreticalWs !== undefined && !isNaN(theoreticalWs) && (
                <ReferenceLine 
                    y={theoreticalWs} 
                    label={{ position: 'left', value: 'Ws Teórico', fill: '#047857', fontSize: 12 }} 
                    stroke="#047857" // emerald-700
                    strokeDasharray="3 3" 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-slate-500 mt-4 text-center">
            Muestra cómo los promedios empíricos (simulados) se acercan al valor teórico esperado (Ley de los Grandes Números).
        </p>
      </CardContent>
    </Card>
  );
}
