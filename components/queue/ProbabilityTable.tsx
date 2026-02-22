import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ListOrdered } from 'lucide-react';
import { ProbRow } from '@/types/queue';

interface Props {
  data: ProbRow[];
}

const formatNumber = (num: number) => Number(num).toLocaleString('es-VE', { minimumFractionDigits: 4, maximumFractionDigits: 4 });

export function ProbabilityTable({ data }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const dataWithAccumulated = data.map((row, index) => {
    const acum = data.slice(0, index + 1).reduce((acc, curr) => acc + curr.prob, 0);
    return { ...row, acum };
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = dataWithAccumulated.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-indigo-600" />
            Tabla de Probabilidades P(n)
          </CardTitle>
          <p className="text-sm text-slate-500 mt-1">Probabilidad de encontrar exactamente &apos;n&apos; clientes.</p>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Ir a página:</span>
            <select 
              className="border border-slate-300 rounded-md p-1 text-slate-700 bg-white"
              value={currentPage}
              onChange={(e) => goToPage(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <option key={page} value={page}>Pág {page}</option>
              ))}
            </select>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3 font-semibold">n (Clientes)</th>
                <th className="px-6 py-3 font-semibold">Probabilidad P(n)</th>
                <th className="px-6 py-3 font-semibold">Acumulada F(n)</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row) => (
                <tr key={row.n} className="bg-white border-b hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-slate-900">{row.n}</td>
                  <td className="px-6 py-3 text-slate-600">{formatNumber(row.prob)}</td>
                  <td className="px-6 py-3 text-slate-600">{formatNumber(row.acum)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Mostrando del {startIndex + 1} al {Math.min(startIndex + itemsPerPage, data.length)} de {data.length} resultados
            </p>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
              </Button>
              <div className="text-sm font-medium text-slate-700 px-2">
                {currentPage} / {totalPages}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}