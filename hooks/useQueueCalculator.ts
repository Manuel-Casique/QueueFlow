import { useState, useCallback } from 'react';
import { ModelType, QueueResults } from '@/types/queue';

export function useQueueCalculator() {
  const [modelType, setModelType] = useState<ModelType>('infinite');
  const [lambda, setLambda] = useState('');
  const [mu, setMu] = useState('');
  const [nLimit, setNLimit] = useState('');
  const [results, setResults] = useState<QueueResults | null>(null);
  const [error, setError] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateInfinite = (l: number, m: number) => {
    const rho = l / m;
    const p0 = 1 - rho;
    const ls = rho / (1 - rho);
    const lq = Math.pow(rho, 2) / (1 - rho);
    const ws = 1 / (m - l);
    const wq = rho / (m - l);

    const probDist = [];
    let index = 0;
    let currentPn = (1 - rho) * Math.pow(rho, index);
    let nextPn = (1 - rho) * Math.pow(rho, index + 1);

    probDist.push({ n: index, prob: currentPn });

    while (Math.abs(currentPn - nextPn) >= 0.0001 && index < 1000) {
      index++;
      currentPn = nextPn;
      nextPn = (1 - rho) * Math.pow(rho, index + 1);
      probDist.push({ n: index, prob: currentPn });
    }

    setResults({ model: 'Sin límite en cola (M/M/1:DG/∞/∞)', lambda: l, mu: m, rho, p0, ls, lq, ws, wq, probDist });
  };

  const calculateFinite = (l: number, m: number, N: number) => {
    const rho = l / m;
    let p0, ls;

    if (rho === 1) {
      p0 = 1 / (N + 1);
      ls = N / 2;
    } else {
      p0 = (1 - rho) / (1 - Math.pow(rho, N + 1));
      ls = (rho * (1 - (N + 1) * Math.pow(rho, N) + N * Math.pow(rho, N + 1))) / ((1 - rho) * (1 - Math.pow(rho, N + 1)));
    }

    const pn = rho === 1 ? 1 / (N + 1) : p0 * Math.pow(rho, N);
    const lambdaEf = l * (1 - pn);
    const lambdaPerdida = l - lambdaEf;
    const lq = ls - (1 - p0);
    const ws = ls / lambdaEf;
    const wq = lq / lambdaEf;

    const probDist = [];
    for (let i = 0; i <= N; i++) {
      const prob = rho === 1 ? 1 / (N + 1) : p0 * Math.pow(rho, i);
      probDist.push({ n: i, prob });
    }

    setResults({ model: 'Con límite en cola (M/M/1:DG/N/∞)', lambda: l, mu: m, N, rho, p0, ls, lq, ws, wq, lambdaEf, lambdaPerdida, probDist });
  };

  const handleCalculate = useCallback((e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    setError('');
    setResults(null);
    const l = parseFloat(lambda);
    const m = parseFloat(mu);
    const n = parseInt(nLimit);

    if (isNaN(l) || isNaN(m) || l <= 0 || m <= 0) {
      setError('Por favor ingrese valores válidos y mayores a cero para Lambda y Mu.');
      return;
    }

    if (modelType === 'infinite' && l >= m) {
      setError('El sistema es inestable. Lambda (λ) debe ser menor que Mu (μ).');
      return;
    }
    if (modelType === 'finite' && (isNaN(n) || n <= 0)) {
      setError('Por favor ingrese un límite de cola válido (N > 0).');
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      if (modelType === 'infinite') {
        calculateInfinite(l, m);
      } else {
        calculateFinite(l, m, n);
      }
      setIsCalculating(false);
    }, 600); // Simulated delay for visual feedback
  }, [lambda, mu, nLimit, modelType]);

  const handleClear = () => {
    setLambda('');
    setMu('');
    setNLimit('');
    setResults(null);
    setError('');
    setIsCalculating(false);
  };

  return {
    modelType, setModelType,
    lambda, setLambda,
    mu, setMu,
    nLimit, setNLimit,
    results, error,
    isCalculating,
    handleCalculate, handleClear
  };
}