import { Calculator, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModelType, ServerModel } from '@/types/queue';

interface Props {
    modelType: ModelType;
    serverModel: ServerModel;
    lambda: string; setLambda: (v: string) => void;
    mu: string; setMu: (v: string) => void;
    servers: string; setServers: (v: string) => void;
    nLimit: string; setNLimit: (v: string) => void;
    error: string;
    isCalculating: boolean;
    onCalculate: (e?: React.FormEvent) => void;
    onClear: () => void;
}

export function QueueForm({ modelType, serverModel, lambda, setLambda, mu, setMu, servers, setServers, nLimit, setNLimit, error, isCalculating, onCalculate, onClear }: Props) {
    return (
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-indigo-600" />
                    Parámetros de Entrada
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onCalculate}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="lambda">Tasa de Llegada (λ)</Label>
                            <div className="relative">
                                <Input autoFocus id="lambda" type="number" step="any" placeholder="Ej. 4" value={lambda} onChange={(e) => setLambda(e.target.value)} disabled={isCalculating} />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none"><span className="text-sm text-slate-400">clientes/u</span></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mu">Tasa de Servicio (μ)</Label>
                            <div className="relative">
                                <Input id="mu" type="number" step="any" placeholder="Ej. 6" value={mu} onChange={(e) => setMu(e.target.value)} disabled={isCalculating} />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none"><span className="text-sm text-slate-400">clientes/u</span></div>
                            </div>
                        </div>
                        {serverModel === 'multi' && (
                            <div className="space-y-2">
                                <Label htmlFor="servers">Servidores (s)</Label>
                                <div className="relative">
                                    <Input id="servers" type="number" step="1" placeholder="Ej. 2" value={servers} onChange={(e) => setServers(e.target.value)} disabled={isCalculating} />
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none"><span className="text-sm text-slate-400">cantidad</span></div>
                                </div>
                            </div>
                        )}
                        {modelType === 'finite' && (
                            <div className="space-y-2">
                                <Label htmlFor="nLimit">Límite del Sistema (N)</Label>
                                <div className="relative">
                                    <Input id="nLimit" type="number" step="1" placeholder="Ej. 5" value={nLimit} onChange={(e) => setNLimit(e.target.value)} disabled={isCalculating} />
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none"><span className="text-sm text-slate-400">máximo</span></div>
                                </div>
                            </div>
                        )}
                    </div>
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4" />{error}
                        </div>
                    )}
                    <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClear} className="w-full sm:w-auto" disabled={isCalculating}>Limpiar</Button>
                        <Button type="submit" disabled={isCalculating} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
                            {isCalculating ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Calculando...</>
                            ) : (
                                <><Calculator className="w-4 h-4 mr-2" />Calcular</>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}