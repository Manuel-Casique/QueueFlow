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
        <Card>
            <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-lg ${colorClass}`}>
                    {icon}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
                    <p className="text-xl md:text-2xl font-bold truncate">
                        {value}
                        {unit && <span className="text-sm font-normal text-slate-500 ml-1">{unit}</span>}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}