export type ModelType = 'infinite' | 'finite';
export type ServerModel = 'single' | 'multi';

export interface ProbRow {
  n: number;
  prob: number;
}

export interface QueueResults {
  model: string;
  lambda: number;
  mu: number;
  N?: number;
  s?: number;
  rho: number;
  utilization: number;
  p0: number;
  ls: number;
  lq: number;
  ws: number;
  wq: number;
  lambdaEf?: number;
  lambdaPerdida?: number;
  C: number;
  C_asterisk: number;
  probDist: ProbRow[];
}