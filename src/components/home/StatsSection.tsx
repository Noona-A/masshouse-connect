import { Building2, Users, Home, Calendar } from "lucide-react";
import StatCard from "@/components/ui/StatCard";

const stats = [
  { value: "336", label: "Apartments", icon: Home },
  { value: "190", label: "RTM Members", icon: Users },
  { value: "2", label: "Buildings", icon: Building2 },
  { value: "2026", label: "Est.", icon: Calendar },
];

const StatsSection = () => {
  return (
    <section className="bg-muted -mt-8 relative z-20 section-container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 -mt-8">
        {stats.map((stat, index) => (
          <div 
            key={stat.label} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <StatCard {...stat} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
