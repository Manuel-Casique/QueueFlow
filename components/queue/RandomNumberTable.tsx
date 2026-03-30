import React, { useState } from 'react';
import { RowData } from '@/hooks/useMonteCarlo';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Dices } from 'lucide-react';

interface Props {
  rows: RowData[];
  k: number;
}

const formatNumber = (num: number) => Number(num).toLocaleString('es-VE', { minimumFractionDigits: 4, maximumFractionDigits: 4 });

export function RandomNumberTable({ rows, k }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50; 
  
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = rows.slice(startIndex, startIndex + itemsPerPage);

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
            <Dices className="w-5 h-5 text-indigo-600" />
            Tabla de Datos Generada
          </CardTitle>
          <p className="text-sm text-slate-500 mt-1">Muestra los {k} números aleatorios generados por cada observación.</p>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-between sm:justify-start gap-2 text-sm w-full sm:w-auto mt-2 md:mt-0">
            <span className="text-slate-500">Ir a página:</span>
            <select 
              className="border border-slate-300 rounded-md p-1 text-slate-700 bg-white max-w-[120px]"
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
                <th className="px-6 py-3 font-semibold text-center border-r border-slate-200">Iteración (n)</th>
                {Array.from({ length: k }).map((_, i) => (
                    <th key={i} className="px-4 py-3 font-medium text-center border-r border-slate-200">
                        Var {i + 1}
                    </th>
                ))}
                <th className="px-4 py-3 font-semibold text-center bg-indigo-50/50 text-indigo-700">
                    Promedio (x̄)
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row) => (
                <tr key={row.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2 font-medium text-slate-900 text-center border-r border-slate-100">{row.id}</td>
                  {row.cols.map((val, idx) => (
                      <td key={idx} className="px-4 py-2 text-center text-slate-600 border-r border-slate-100">
                          {formatNumber(val)}
                      </td>
                  ))}
                  <td className="px-4 py-2 text-center font-medium bg-indigo-50/30 text-indigo-900 text-opacity-90">
                      {formatNumber(row.rowMean)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 text-center sm:text-left">
              Mostrando del {startIndex + 1} al {Math.min(startIndex + itemsPerPage, rows.length)} de {rows.length} resultados
            </p>
            <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex-1 sm:flex-none"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
              </Button>
              <div className="text-sm font-medium text-slate-700 px-2 whitespace-nowrap">
                {currentPage} / {totalPages}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex-1 sm:flex-none"
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
