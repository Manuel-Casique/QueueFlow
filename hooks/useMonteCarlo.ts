import { useState, useCallback } from 'react';

export type DistributionType = 'exponential' | 'poisson';

export interface RowData {
  id: number;
  cols: number[];
  rowMean: number;
}

export interface MonteCarloResult {
  distribution: DistributionType;
  mu: number;
  k: number;
  n: number;
  rows: RowData[];
  globalMean: number;
  globalStdDev: number;
  rowMeansMean: number;
  rowMeansStdDev: number;
  theoreticalMean: number;
  theoreticalStdDev: number;
}

export function useMonteCarlo() {
  const [mcResults, setMcResults] = useState<MonteCarloResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState<string>('');

  const simulate = useCallback((
    distType: DistributionType,
    muStr: string,
    kStr: string,
    nStr: string
  ) => {
    setIsSimulating(true);
    setError('');

    try {
      const mu = parseFloat(muStr);
      const k = parseInt(kStr);
      const n = parseInt(nStr);

      if (isNaN(mu) || mu <= 0) throw new Error("La media (μ) debe ser mayor a 0.");
      if (isNaN(k) || k < 1 || k > 100) throw new Error("Variables (k) debe estar entre 1 y 100.");
      if (isNaN(n) || n < 1 || n > 100000) throw new Error("Observaciones (n) debe estar entre 1 y 100,000.");

      const rows: RowData[] = [];
      let globalSum = 0;
      let globalSqSum = 0;
      
      let rowMeansSum = 0;
      let rowMeansSqSum = 0;

      const L = Math.exp(-mu);

      for (let i = 0; i < n; i++) {
        const cols: number[] = [];
        let rowSum = 0;

        for (let j = 0; j < k; j++) {
          let val = 0;
          if (distType === 'exponential') {
             const U = Math.random();
             val = -mu * Math.log(1 - U);
          } else if (distType === 'poisson') {
             if (mu < 50) {
               let pt = 1;
               let count = 0;
               do {
                 count++;
                 pt *= Math.random();
               } while (pt > L);
               val = count - 1;
             } else {
               const u1 = Math.random();
               const u2 = Math.random();
               const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
               const poi = Math.round(mu + z0 * Math.sqrt(mu));
               val = poi < 0 ? 0 : poi;
             }
          }

          cols.push(val);
          rowSum += val;
          globalSum += val;
          globalSqSum += val * val;
        }

        const rowMean = rowSum / k;
        rows.push({ id: i + 1, cols, rowMean });
        
        rowMeansSum += rowMean;
        rowMeansSqSum += rowMean * rowMean;
      }

      const totalValues = n * k;
      const globalMean = globalSum / totalValues;
      const globalVariance = (globalSqSum - (globalSum * globalSum) / totalValues) / (totalValues - 1);
      const globalStdDev = Math.sqrt(globalVariance);

      const rowMeansMean = rowMeansSum / n;
      const rowMeansVariance = (rowMeansSqSum - (rowMeansSum * rowMeansSum) / n) / (n - 1);
      const rowMeansStdDev = Math.sqrt(rowMeansVariance);

      const theoreticalMean = mu;
      const theoreticalStdDev = distType === 'exponential' ? mu : Math.sqrt(mu);

      setMcResults({
        distribution: distType,
        mu, k, n,
        rows,
        globalMean,
        globalStdDev,
        rowMeansMean,
        rowMeansStdDev,
        theoreticalMean,
        theoreticalStdDev
      });

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error en la simulación');
      setMcResults(null);
    } finally {
      setIsSimulating(false);
    }
  }, []);

  const clearMc = useCallback(() => {
    setMcResults(null);
    setError('');
  }, []);

  return {
    mcResults,
    isSimulating,
    mcError: error,
    simulateMc: simulate,
    clearMc
  };
}
