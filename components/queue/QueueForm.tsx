import { Calculator, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModelType } from '@/types/queue';

interface Props {
    modelType: ModelType;
    lambda: string; setLambda: (v: string) => void;
    mu: string; setMu: (v: string) => void;
    nLimit: string; setNLimit: (v: string) => void;
    error: string;
    onCalculate: () => void;
    onClear: () => void;
}

export function QueueForm({ modelType, lambda, setLambda, mu, setMu, nLimit, setNLimit, error, onCalculate, onClear }: Props) {
    return (
        <Card className="border-slate-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-indigo-600" />
                    Parámetros de Entrada
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="lambda">Tasa de Llegada (λ)</Label>
                        <div className="relative">
                            <Input id="lambda" type="number" placeholder="Ej. 4" value={lambda} onChange={(e) => setLambda(e.target.value)} />
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none"><span className="text-sm text-slate-400">clientes/u</span></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="mu">Tasa de Servicio (μ)</Label>
                        <div className="relative">
                            <Input id="mu" type="number" placeholder="Ej. 6" value={mu} onChange={(e) => setMu(e.target.value)} />
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none"><span className="text-sm text-slate-400">clientes/u</span></div>
                        </div>
                    </div>
                    {modelType === 'finite' && (
                        <div className="space-y-2">
                            <Label htmlFor="nLimit">Límite del Sistema (N)</Label>
                            <div className="relative">
                                <Input id="nLimit" type="number" placeholder="Ej. 5" value={nLimit} onChange={(e) => setNLimit(e.target.value)} />
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
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClear}>Limpiar</Button>
                    <Button onClick={onCalculate} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Calculator className="w-4 h-4 mr-2" />Calcular
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}