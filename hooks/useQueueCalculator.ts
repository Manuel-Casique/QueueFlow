import { useState, useCallback } from 'react';
import { ModelType, ServerModel, QueueResults } from '@/types/queue';

// Función auxiliar para calcular factoriales
const factorial = (n: number): number => {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

export function useQueueCalculator() {
  const [modelType, setModelType] = useState<ModelType>('infinite');
  const [serverModel, setServerModel] = useState<ServerModel>('single');
  const [lambda, setLambda] = useState('');
  const [mu, setMu] = useState('');
  const [servers, setServers] = useState('');
  const [nLimit, setNLimit] = useState('');
  const [results, setResults] = useState<QueueResults | null>(null);
  const [error, setError] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateInfinite = (l: number, m: number, s: number) => {
    const rho = l / (s * m);
    
    let p0 = 0;
    let ls = 0;
    let lq = 0;
    let ws = 0;
    let wq = 0;

    if (s === 1) {
      p0 = 1 - rho;
      ls = rho / (1 - rho);
      lq = Math.pow(rho, 2) / (1 - rho);
      ws = 1 / (m - l);
      wq = rho / (m - l);
    } else {
      let sum = 0;
      for (let n = 0; n < s; n++) {
        sum += Math.pow(l / m, n) / factorial(n);
      }
      p0 = 1 / (sum + (Math.pow(l / m, s) / (factorial(s) * (1 - rho))));
      
      lq = (p0 * Math.pow(l / m, s) * rho) / (factorial(s) * Math.pow(1 - rho, 2));
      ls = lq + (l / m);
      wq = lq / l;
      ws = wq + (1 / m);
    }

    const probDist = [];
    let index = 0;
    let currentPn = s === 1 
      ? (1 - rho) * Math.pow(rho, index)
      : (index < s 
          ? (Math.pow(l / m, index) / factorial(index)) * p0 
          : (Math.pow(l / m, index) / (factorial(s) * Math.pow(s, index - s))) * p0);
    
    let nextPn = s === 1
      ? (1 - rho) * Math.pow(rho, index + 1)
      : ((index + 1) < s 
          ? (Math.pow(l / m, index + 1) / factorial(index + 1)) * p0 
          : (Math.pow(l / m, index + 1) / (factorial(s) * Math.pow(s, (index + 1) - s))) * p0);

    probDist.push({ n: index, prob: currentPn });

    while (Math.abs(currentPn - nextPn) >= 0.0001 && index < 1000) {
      index++;
      currentPn = nextPn;
      nextPn = s === 1
        ? (1 - rho) * Math.pow(rho, index + 1)
        : ((index + 1) < s 
            ? (Math.pow(l / m, index + 1) / factorial(index + 1)) * p0 
            : (Math.pow(l / m, index + 1) / (factorial(s) * Math.pow(s, (index + 1) - s))) * p0);
            
      probDist.push({ n: index, prob: currentPn });
    }

    const modelName = s === 1 ? 'Sin límite en cola (M/M/1:DG/∞/∞)' : `Multiservidor Infinito (M/M/${s}:DG/∞/∞)`;
    setResults({ model: modelName, lambda: l, mu: m, s, rho, p0, ls, lq, ws, wq, probDist });
  };

  const calculateFinite = (l: number, m: number, N: number, s: number) => {
    const rho = l / (s * m);
    let p0 = 0;
    let ls = 0;
    let lq = 0;
    let ws = 0;
    let wq = 0;
    
    const probDist = [];

    if (s === 1) {
      if (rho === 1) {
        p0 = 1 / (N + 1);
        ls = N / 2;
      } else {
        p0 = (1 - rho) / (1 - Math.pow(rho, N + 1));
        ls = (rho * (1 - (N + 1) * Math.pow(rho, N) + N * Math.pow(rho, N + 1))) / ((1 - rho) * (1 - Math.pow(rho, N + 1)));
      }
      
      for (let i = 0; i <= N; i++) {
        const prob = rho === 1 ? 1 / (N + 1) : p0 * Math.pow(rho, i);
        probDist.push({ n: i, prob });
      }
    } else {
      let sum = 0;
      for (let n = 0; n <= s; n++) {
        sum += Math.pow(l / m, n) / factorial(n);
      }
      
      let sum2 = 0;
      if (rho !== 1) {
        sum2 = (Math.pow(l / m, s) / factorial(s)) * rho * ((1 - Math.pow(rho, N - s)) / (1 - rho));
      } else {
        sum2 = (Math.pow(l / m, s) / factorial(s)) * (N - s);
      }
      
      p0 = 1 / (sum + sum2);

      for (let n = 0; n <= N; n++) {
        let prob = 0;
        if (n < s) {
          prob = (Math.pow(l / m, n) / factorial(n)) * p0;
        } else {
          prob = (Math.pow(l / m, n) / (factorial(s) * Math.pow(s, n - s))) * p0;
        }
        probDist.push({ n, prob });
      }

      // probDist[N].prob will be used directly below
      
      if (rho !== 1) {
        lq = (p0 * Math.pow(l / m, s) * rho) / (factorial(s) * Math.pow(1 - rho, 2)) * 
             (1 - Math.pow(rho, N - s) - (N - s) * Math.pow(rho, N - s) * (1 - rho));
      } else {
        lq = (p0 * Math.pow(l / m, s)) / (factorial(s)) * ((N - s) * (N - s + 1) / 2);
      }
      
      let expectedService = 0;
      for (let n = 0; n < s; n++) {
        expectedService += n * probDist[n].prob;
      }
      
      let sumPns = 0;
      for (let n = s; n <= N; n++) {
        sumPns += probDist[n].prob;
      }
      expectedService += s * sumPns;
      
      ls = lq + expectedService;
    }

    const pn = probDist[N] ? probDist[N].prob : 0;
    const lambdaEf = l * (1 - pn);
    const lambdaPerdida = l - lambdaEf;
    
    if (s === 1) {
      lq = ls - (1 - p0);
    }
    
    ws = ls / lambdaEf;
    wq = lq / lambdaEf;

    const modelName = s === 1 ? 'Con límite en cola (M/M/1:DG/N/∞)' : `Multiservidor Finito (M/M/${s}:DG/N/∞)`;
    setResults({ model: modelName, lambda: l, mu: m, N, s, rho, p0, ls, lq, ws, wq, lambdaEf, lambdaPerdida, probDist });
  };

  const handleCalculate = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setError('');
    setResults(null);
    const l = parseFloat(lambda);
    const m = parseFloat(mu);
    const s = serverModel === 'multi' ? parseInt(servers) : 1;
    const n = parseInt(nLimit);

    if (isNaN(l) || isNaN(m) || l <= 0 || m <= 0) {
      setError('Por favor ingrese valores válidos y mayores a cero para Lambda y Mu.');
      return;
    }
    if (serverModel === 'multi' && (isNaN(s) || s < 1)) {
      setError('Por favor ingrese una cantidad de servidores válida (s >= 1).');
      return;
    }

    if (modelType === 'infinite' && l >= (s * m)) {
      setError('El sistema es inestable. Lambda (λ) debe ser menor que el total de capacidad de servicio (s × μ).');
      return;
    }
    if (modelType === 'finite' && (isNaN(n) || n <= 0)) {
      setError('Por favor ingrese un límite de cola válido (N > 0).');
      return;
    }
    if (modelType === 'finite' && n < s) {
      setError('El límite del sistema (N) debe ser mayor o igual a la cantidad de servidores (s).');
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      if (modelType === 'infinite') {
        calculateInfinite(l, m, s);
      } else {
        calculateFinite(l, m, n, s);
      }
      setIsCalculating(false);
    }, 600);
  }, [lambda, mu, nLimit, servers, modelType, serverModel]);

  const handleClear = () => {
    setLambda('');
    setMu('');
    setNLimit('');
    setServers('');
    setResults(null);
    setError('');
    setIsCalculating(false);
  };

  return {
    modelType, setModelType,
    serverModel, setServerModel,
    lambda, setLambda,
    mu, setMu,
    servers, setServers,
    nLimit, setNLimit,
    results, error,
    isCalculating,
    handleCalculate, handleClear
  };
}