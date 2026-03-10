import { ModelType, ServerModel } from '@/types/queue';

interface Props {
  modelType: ModelType;
  setModelType: (type: ModelType) => void;
  serverModel: ServerModel;
  setServerModel: (type: ServerModel) => void;
}

export function QueueHeader({ modelType, setModelType, serverModel, setServerModel }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="Colaflow Logo" className="w-16 h-16 object-contain rounded-lg shadow-sm" />
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Colaflow</h1>
          <p className="text-slate-500 font-medium">Calculadora de Líneas de Espera</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex w-full md:w-auto bg-slate-200/50 p-1 rounded-lg">
          <button
            onClick={() => setServerModel('single')}
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${serverModel === 'single' ? 'bg-white shadow-sm text-slate-900 border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Un Servidor (M/M/1)
          </button>
          <button
            onClick={() => setServerModel('multi')}
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${serverModel === 'multi' ? 'bg-white shadow-sm text-slate-900 border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Varios Servidores (M/M/s)
          </button>
        </div>

        <div className="flex w-full md:w-auto bg-slate-200/50 p-1 rounded-lg">
          <button
            onClick={() => setModelType('infinite')}
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${modelType === 'infinite' ? 'bg-white shadow-sm text-slate-900 border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Población Infinita (∞)
          </button>
          <button
            onClick={() => setModelType('finite')}
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${modelType === 'finite' ? 'bg-white shadow-sm text-slate-900 border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Población Finita (N)
          </button>
        </div>
      </div>
    </div>
  );
}