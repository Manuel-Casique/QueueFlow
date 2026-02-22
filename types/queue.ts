export type ModelType = 'infinite' | 'finite';

export interface ProbRow {
  n: number;
  prob: number;
}

export interface QueueResults {
  model: string;
  lambda: number;
  mu: number;
  N?: number;
  rho: number;
  p0: number;
  ls: number;
  lq: number;
  ws: number;
  wq: number;
  lambdaEf?: number;
  lambdaPerdida?: number;
  probDist: ProbRow[];
}