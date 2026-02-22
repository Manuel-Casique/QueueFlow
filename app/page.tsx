"use client";

import { useQueueCalculator } from '@/hooks/useQueueCalculator';
import { QueueHeader } from '@/components/queue/QueueHeader';
import { QueueForm } from '@/components/queue/QueueForm';
import { ResultsDashboard } from '@/components/queue/ResultsDashboard';

export default function QueueFlowPage() {
  const {
    modelType, setModelType,
    lambda, setLambda,
    mu, setMu,
    nLimit, setNLimit,
    results, error,
    handleCalculate, handleClear
  } = useQueueCalculator();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <QueueHeader 
          modelType={modelType} 
          setModelType={setModelType} 
        />
        
        <QueueForm 
          modelType={modelType}
          lambda={lambda} setLambda={setLambda}
          mu={mu} setMu={setMu}
          nLimit={nLimit} setNLimit={setNLimit}
          error={error}
          onCalculate={handleCalculate}
          onClear={handleClear}
        />

        <ResultsDashboard 
          results={results!} 
          modelType={modelType} 
        />

      </div>
    </div>
  );
}