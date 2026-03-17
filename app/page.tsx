"use client";

import { useQueueCalculator } from '@/hooks/useQueueCalculator';
import { QueueHeader } from '@/components/queue/QueueHeader';
import { QueueForm } from '@/components/queue/QueueForm';
import { ResultsDashboard } from '@/components/queue/ResultsDashboard';

export default function QueueFlowPage() {
  const {
    modelType, setModelType,
    serverModel, setServerModel,
    lambda, setLambda,
    mu, setMu,
    servers, setServers,
    nLimit, setNLimit,
    results, error,
    isCalculating,
    handleCalculate, handleClear
  } = useQueueCalculator();

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 p-4 pb-24 sm:pb-8 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <QueueHeader 
          modelType={modelType} 
          setModelType={setModelType} 
          serverModel={serverModel}
          setServerModel={setServerModel}
        />
        
        <QueueForm 
          modelType={modelType}
          serverModel={serverModel}
          lambda={lambda} setLambda={setLambda}
          mu={mu} setMu={setMu}
          servers={servers} setServers={setServers}
          nLimit={nLimit} setNLimit={setNLimit}
          error={error}
          isCalculating={isCalculating}
          onCalculate={handleCalculate}
          onClear={handleClear}
        />

        {results && (
          <ResultsDashboard 
            results={results} 
            modelType={modelType} 
          />
        )}

      </div>
    </div>
  );
}