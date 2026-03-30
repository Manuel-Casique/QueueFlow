import { Dices, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DistributionType } from '@/hooks/useMonteCarlo';

interface Props {
    distType: DistributionType; setDistType: (v: DistributionType) => void;
    mu: string; setMu: (v: string) => void;
    kVars: string; setKVars: (v: string) => void;
    nObs: string; setNObs: (v: string) => void;
    error: string;
    isCalculating: boolean;
    onCalculate: (e?: React.FormEvent) => void;
    onClear: () => void;
}

export function MonteCarloForm({ distType, setDistType, mu, setMu, kVars, setKVars, nObs, setNObs, error, isCalculating, onCalculate, onClear }: Props) {
    return (
        <>
            <div className="flex items-center gap-4">
                <div className="bg-[#FFFFFF] border border-slate-200 p-2 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="72px" height="72px">
                        <circle cx="20" cy="100" r="18" fill="#009966" />
                        <circle cx="34" cy="56" r="14.5" fill="#009966" />
                        <circle cx="72" cy="29" r="12" fill="#009966" />
                        <circle cx="118" cy="29" r="9.5" fill="#009966" />
                        <circle cx="156" cy="56" r="8" fill="#009966" />
                        <circle cx="34" cy="144" r="14.5" fill="#009966" />
                        <circle cx="72" cy="171" r="12" fill="#009966" />
                        <circle cx="118" cy="171" r="9.5" fill="#009966" />
                        <circle cx="156" cy="144" r="8" fill="#009966" />
                        <rect x="115" y="76" width="70" height="15" fill="#7d7d7d" />
                        <rect x="115" y="109" width="70" height="15" fill="#7d7d7d" />
                    </svg>
                </div>

                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Colaflow</h1>
                    <p className="text-slate-500 font-medium">Generador de Variables Aleatorias</p>
                </div>
            </div>
            <Card className="border-slate-200">

                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Dices className="w-5 h-5 text-emerald-600" />
                        Generador de Variables Aleatorias
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onCalculate}>
                        <div className="flex bg-slate-100 p-1 rounded-lg w-full max-w-sm mb-6">
                            <button
                                type="button"
                                onClick={() => setDistType('poisson')}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${distType === 'poisson' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                Poisson
                            </button>
                            <button
                                type="button"
                                onClick={() => setDistType('exponential')}
                                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${distType === 'exponential' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                Exponencial
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="mu">Media (μ)</Label>
                                <Input autoFocus id="mu" type="number" step="any" placeholder="Ej. 10" value={mu} onChange={(e) => setMu(e.target.value)} disabled={isCalculating} />
                                <p className="text-xs text-slate-500">Valor central de la distribución</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kVars">Variables (k)</Label>
                                <Input id="kVars" type="number" step="1" placeholder="Ej. 5" value={kVars} onChange={(e) => setKVars(e.target.value)} disabled={isCalculating} max={100} />
                                <p className="text-xs text-slate-500">Columnas por cada iteración</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nObs">Observaciones (n)</Label>
                                <Input id="nObs" type="number" step="1" placeholder="Ej. 1000" value={nObs} onChange={(e) => setNObs(e.target.value)} disabled={isCalculating} max={100000} />
                                <p className="text-xs text-slate-500">Cantidad de iteraciones / filas</p>
                            </div>
                        </div>
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md flex items-center gap-2 text-sm">
                                <AlertCircle className="w-4 h-4" />{error}
                            </div>
                        )}
                        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                            <Button type="button" variant="outline" onClick={onClear} className="w-full sm:w-auto" disabled={isCalculating}>Limpiar</Button>
                            <Button type="submit" disabled={isCalculating} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">
                                {isCalculating ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generando...</>
                                ) : (
                                    <><Dices className="w-4 h-4 mr-2" />Generar Valores</>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
