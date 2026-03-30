import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';
import { RowData } from '@/hooks/useMonteCarlo';
import { useMemo } from 'react';

interface Props {
  data: RowData[];
  theoreticalMean: number;
}

export function DistributionChart({ data, theoreticalMean }: Props) {
  
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const means = data.map(d => d.rowMean);
    const min = Math.min(...means);
    const max = Math.max(...means);
    
    const BINS = 25;
    const step = (max - min) / BINS;
    
    const bins = Array.from({ length: BINS }).map((_, i) => ({
      binMin: min + i * step,
      binMax: min + (i + 1) * step,
      binCenter: min + (i + 0.5) * step,
      frecuencia: 0
    }));

    means.forEach(m => {
      let index = Math.floor((m - min) / step);
      if (index >= BINS) index = BINS - 1;
      if (index < 0) index = 0;
      bins[index].frecuencia++;
    });

    return bins;
  }, [data]);

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          Teorema del Límite Central (Medias Muestrales)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} vertical={false} />
              <XAxis 
                dataKey="binCenter" 
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(val) => val.toFixed(2)}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                tick={{ fontSize: 11, fill: '#64748b' }} 
              />
              <Tooltip 
                cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelFormatter={(value: unknown) => {
                  if (typeof value === 'number') return `Centro de Rango: ${value.toFixed(2)}`;
                  return String(value);
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [value, "Frecuencia"]}
              />
              <Bar 
                dataKey="frecuencia" 
                fill="#4f46e5" 
                radius={[4, 4, 0, 0]} 
                name="Frecuencia"
              />
              {theoreticalMean !== undefined && !isNaN(theoreticalMean) && (
                <ReferenceLine 
                    x={Number(theoreticalMean.toFixed(2))} 
                    label={{ position: 'top', value: `μ = ${theoreticalMean}`, fill: '#dc2626', fontSize: 13, fontWeight: 'bold' }} 
                    stroke="#dc2626" 
                    strokeDasharray="4 4"
                    strokeWidth={2}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-slate-500 mt-6 text-center">
            Distribución de los promedios calculados por cada fila. Según el Teorema del Límite Central, debería asimilarse a una campana de Gauss centrada en la media teórica $\mu$.
        </p>
      </CardContent>
    </Card>
  );
}
