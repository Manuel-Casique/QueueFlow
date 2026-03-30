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
        <div className="bg-[#FFFFFF] border border-slate-200 p-2 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="72px" height="72px">
                        <circle cx="20" cy="100" r="18" fill="#4f39f6" />
                        <circle cx="34" cy="56" r="14.5" fill="#4f39f6" />
                        <circle cx="72" cy="29" r="12" fill="#4f39f6" />
                        <circle cx="118" cy="29" r="9.5" fill="#4f39f6" />
                        <circle cx="156" cy="56" r="8" fill="#4f39f6" />
                        <circle cx="34" cy="144" r="14.5" fill="#4f39f6" />
                        <circle cx="72" cy="171" r="12" fill="#4f39f6" />
                        <circle cx="118" cy="171" r="9.5" fill="#4f39f6" />
                        <circle cx="156" cy="144" r="8" fill="#4f39f6" />
                        <rect x="115" y="76" width="70" height="15" fill="#7d7d7d" />
                        <rect x="115" y="109" width="70" height="15" fill="#7d7d7d" />
                    </svg>
                </div>
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