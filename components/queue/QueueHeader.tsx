import { ModelType } from '@/types/queue';

interface Props {
    modelType: ModelType;
    setModelType: (type: ModelType) => void;
}

export function QueueHeader({ modelType, setModelType }: Props) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">ColaFlow</h1>
                <p className="text-slate-500">Calculadora de Líneas de Espera (Servidor Único)</p>
            </div>
            <div className="flex w-full md:w-auto bg-slate-200/50 p-1 rounded-lg">
                <button
                    onClick={() => setModelType('infinite')}
                    className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${modelType === 'infinite' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Sin Límite (∞)
                </button>
                <button
                    onClick={() => setModelType('finite')}
                    className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${modelType === 'finite' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Con Límite (N)
                </button>
            </div>
        </div>
    );
}