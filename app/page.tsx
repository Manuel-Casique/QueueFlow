"use client";

import { useState } from 'react';
import { useQueueCalculator } from '@/hooks/useQueueCalculator';
import { useMonteCarlo, DistributionType } from '@/hooks/useMonteCarlo';
import { QueueHeader } from '@/components/queue/QueueHeader';
import { QueueForm } from '@/components/queue/QueueForm';
import { ResultsDashboard } from '@/components/queue/ResultsDashboard';
import { MonteCarloDashboard } from '@/components/queue/MonteCarloDashboard';
import { MonteCarloForm } from '@/components/queue/MonteCarloForm';

export default function QueueFlowPage() {
  const {
    modelType, setModelType,
    serverModel, setServerModel,
    lambda, setLambda,
    mu, setMu,
    servers, setServers,
    nLimit, setNLimit,
    results, error: calcError,
    isCalculating,
    handleCalculate, handleClear
  } = useQueueCalculator();

  const { mcResults, isSimulating, mcError, simulateMc, clearMc } = useMonteCarlo();
  
  const [mode, setMode] = useState<'analitico' | 'simulacion'>('analitico');
  
  const [distType, setDistType] = useState<DistributionType>('poisson');
  const [mcMu, setMcMu] = useState('');
  const [mcK, setMcK] = useState('');
  const [mcN, setMcN] = useState('');

  const handleSimulate = (e?: React.FormEvent) => {
    e?.preventDefault();
    simulateMc(distType, mcMu, mcK, mcN);
  };

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 p-4 pb-24 sm:pb-8 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="flex p-1 space-x-1 bg-slate-200/60 rounded-xl w-full max-w-md mx-auto mb-2">
          <button 
             onClick={() => setMode('analitico')} 
             className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === 'analitico' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'}`}
          >
             Modelos Analíticos
          </button>
          <button 
             onClick={() => setMode('simulacion')} 
             className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === 'simulacion' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'}`}
          >
             Simulador Monte Carlo
          </button>
        </div>
        
        {mode === 'analitico' ? (
          <>
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
              error={calcError}
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
          </>
        ) : (
          <>
            <MonteCarloForm 
              distType={distType} setDistType={setDistType}
              mu={mcMu} setMu={setMcMu}
              kVars={mcK} setKVars={setMcK}
              nObs={mcN} setNObs={setMcN}
              error={mcError}
              isCalculating={isSimulating}
              onCalculate={handleSimulate}
              onClear={clearMc}
            />

            {mcResults && (
               <MonteCarloDashboard data={mcResults} />
            )}
          </>
        )}

      </div>
    </div>
  );
}