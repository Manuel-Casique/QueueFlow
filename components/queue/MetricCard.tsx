import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface Props {
    title: string;
    value: string;
    unit?: string;
    icon: React.ReactNode;
    colorClass: string;
}

export function MetricCard({ title, value, unit, icon, colorClass }: Props) {
    return (
        <Card className="h-full">
            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-center sm:items-start xl:items-center gap-2 sm:gap-4 h-full">
                <div className={`p-2 sm:p-3 shrink-0 rounded-lg ${colorClass}`}>
                    {icon}
                </div>
                <div className="flex flex-col text-center sm:text-left overflow-hidden w-full">
                    <p className="text-xs sm:text-sm font-medium text-slate-500 break-words leading-tight">{title}</p>
                    <p className="text-lg md:text-xl lg:text-2xl font-bold mt-1 max-w-full truncate">
                        {value}
                        {unit && <span className="text-xs sm:text-sm font-normal text-slate-500 ml-1">{unit}</span>}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}