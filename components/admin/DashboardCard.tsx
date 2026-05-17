import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactElement<LucideIcon>;
  highlight?: boolean;
}

export const DashboardCard = ({ title, count, icon, highlight }: DashboardCardProps) => {
  return (
    <Card className={cn(
      "p-4 transition-colors",
      highlight
        ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
        : "bg-slate-100 dark:bg-slate-800"
    )}>
      <CardContent>
        <h3 className={cn(
          "text-3xl text-center mb-4 font-bold",
          highlight ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-200"
        )}>
          {title}
        </h3>
        <div className="flex gap-5 justify-center items-center">
          <span className={highlight ? "text-blue-500" : "text-slate-500"}>
            {icon}
          </span>
          <h3 className={cn(
            "text-5xl font-semibold",
            highlight ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-200"
          )}>
            {count}
          </h3>
        </div>
        {highlight && (
          <p className="text-center text-xs text-blue-500 mt-2 font-medium">New</p>
        )}
      </CardContent>
    </Card>
  );
}