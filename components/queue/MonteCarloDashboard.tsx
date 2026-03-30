import { Activity, LayoutDashboard, Calculator, Info } from 'lucide-react';
import { MonteCarloResult } from '@/hooks/useMonteCarlo';
import { MetricCard } from './MetricCard';
import { RandomNumberTable } from './RandomNumberTable';
// import { DistributionChart } from './DistributionChart';
import { useEffect, useRef } from 'react';

interface Props {
  data: MonteCarloResult;
}

export function MonteCarloDashboard({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [data]);

  if (!data) return null;

  const distName = data.distribution === 'poisson' ? 'Poisson' : 'Exponencial';

  return (
    <div ref={containerRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-2">
        <div className="flex items-center gap-2 text-slate-800 font-semibold">
          <LayoutDashboard className="w-5 h-5 text-indigo-600" />
          <h2>Resultados de Simulación: {distName}</h2>
        </div>
        <div className="text-sm font-medium text-slate-500">
           Generadas: {data.n} x {data.k} observaciones
        </div>
      </div>

      {/* Tarjetas KPI */}
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-600 uppercase tracking-wide">
         <Calculator className="w-4 h-4 text-emerald-600" /> Estadísticas Globales (Matriz n x k)
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <MetricCard
            title="Media Empírica (Global)"
            value={data.globalMean.toFixed(4)}
            unit=""
            icon={<Activity className="w-5 h-5 text-indigo-600" />}
            colorClass="bg-indigo-50"
        />
        <MetricCard
            title="Media Teórica (μ)"
            value={data.theoreticalMean.toFixed(4)}
            unit=""
            icon={<Info className="w-5 h-5 text-rose-600" />}
            colorClass="bg-rose-50"
        />
        <MetricCard
            title="Desviación Estd. Empírica"
            value={data.globalStdDev.toFixed(4)}
            unit="S"
            icon={<Activity className="w-5 h-5 text-teal-600" />}
            colorClass="bg-teal-50"
        />
        <MetricCard
            title="Desv. Estd. Teórica (σ)"
            value={data.theoreticalStdDev.toFixed(4)}
            unit="σ"
            icon={<Info className="w-5 h-5 text-rose-600" />}
            colorClass="bg-rose-50"
        />
      </div>

      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-600 uppercase tracking-wide mt-8">
         <Calculator className="w-4 h-4 text-emerald-600" /> Estadísticas Límite Central (Promedios n)
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <MetricCard
            title="Media de los Promedios"
            value={data.rowMeansMean.toFixed(4)}
            unit=""
            icon={<Activity className="w-5 h-5 text-indigo-600" />}
            colorClass="bg-indigo-50"
        />
        <MetricCard
            title="Desv. Estd. de los Promedios"
            value={data.rowMeansStdDev.toFixed(4)}
            unit="S(x̄)"
            icon={<Activity className="w-5 h-5 text-teal-600" />}
            colorClass="bg-teal-50"
        />
      </div>

      {/* DataTable */}
      <div className="mt-8">
         <RandomNumberTable rows={data.rows} k={data.k} />
      </div>

      {/* Gráfico TLC */}
      <div className="mt-8">
        {/* <DistributionChart 
            data={data.rows} 
            theoreticalMean={data.theoreticalMean} 
        /> */}
      </div>
    </div>
  );
}
