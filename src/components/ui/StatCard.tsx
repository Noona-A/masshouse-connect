import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: LucideIcon;
}

const StatCard = ({ value, label, icon: Icon }: StatCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6 text-center shadow-sm border border-border card-hover">
      {Icon && (
        <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      )}
      <div className="text-3xl md:text-4xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

export default StatCard;
