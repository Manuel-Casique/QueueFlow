import { Activity, Users, Clock, Percent, Zap, ArrowDownRight } from 'lucide-react';
import { QueueResults, ModelType } from '@/types/queue';
import { ProbabilityChart } from './ProbabilityChart';
import { ProbabilityTable } from './ProbabilityTable';
import { MetricCard } from './MetricCard';
import { useEffect, useRef } from 'react';

interface ResultsDashboardProps {
  results: QueueResults;
  modelType: ModelType;
}

export function ResultsDashboard({ results, modelType }: ResultsDashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [results]);

  if (!results) return null;

  const metrics = [
    {
      title: 'Ls (Clientes en sistema)',
      value: results.ls.toFixed(4),
      unit: 'clientes',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      colorClass: 'bg-blue-50'
    },
    {
      title: 'Lq (Clientes en cola)',
      value: results.lq.toFixed(4),
      unit: 'clientes',
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      colorClass: 'bg-indigo-50'
    },
    {
      title: 'Ws (Tiempo en sistema)',
      value: results.ws.toFixed(4),
      unit: 'u',
      icon: <Clock className="w-5 h-5 text-emerald-600" />,
      colorClass: 'bg-emerald-50'
    },
    {
      title: 'Wq (Tiempo en cola)',
      value: results.wq.toFixed(4),
      unit: 'u',
      icon: <Clock className="w-5 h-5 text-teal-600" />,
      colorClass: 'bg-teal-50'
    },
    {
      title: 'Rho (Utilización)',
      value: `${(results.rho * 100).toFixed(2)}`,
      unit: '%',
      icon: <Percent className="w-5 h-5 text-amber-600" />,
      colorClass: 'bg-amber-50'
    },
    {
      title: 'P0 (Prob. vacío)',
      value: `${(results.p0 * 100).toFixed(2)}`,
      unit: '%',
      icon: <Zap className="w-5 h-5 text-purple-600" />,
      colorClass: 'bg-purple-50'
    },
  ];

  if (modelType === 'finite' && results.lambdaEf !== undefined) {
    metrics.push(
      {
        title: 'Ro (ρ)',
        value: results.rho.toFixed(4),
        unit: '',
        icon: <Activity className="w-5 h-5 text-amber-600" />,
        colorClass: 'bg-amber-50'
      },
      {
        title: 'λ Efectiva',
        value: results.lambdaEf.toFixed(4),
        unit: 'clientes/u',
        icon: <Activity className="w-5 h-5 text-orange-600" />,
        colorClass: 'bg-orange-50'
      },
      {
        title: 'λ Perdida',
        value: results.lambdaPerdida?.toFixed(4) || '0.0000',
        unit: 'clientes/u',
        icon: <ArrowDownRight className="w-5 h-5 text-rose-600" />,
        colorClass: 'bg-rose-50'
      }
    );
  }

  return (
    <div ref={containerRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-2">
      <div className="flex items-center gap-2 text-slate-800 font-semibold border-b pb-2">
        <Activity className="w-5 h-5 text-emerald-600" />
        <h2>Resultados: {results.model}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            icon={metric.icon}
            colorClass={metric.colorClass}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <ProbabilityChart data={results.probDist} />
        <ProbabilityTable data={results.probDist} />
      </div>
    </div>
  );
}