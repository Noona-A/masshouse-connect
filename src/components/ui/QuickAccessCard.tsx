import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface QuickAccessCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  href: string;
  variant?: "default" | "accent";
}

const QuickAccessCard = ({ title, description, icon: Icon, href, variant = "default" }: QuickAccessCardProps) => {
  const isExternal = href.startsWith("http");
  
  const content = (
    <div className={`group flex flex-col items-center p-6 rounded-lg border transition-all duration-300 text-center ${
      variant === "accent"
        ? "bg-accent/10 border-accent/30 hover:bg-accent hover:border-accent hover:shadow-lg"
        : "bg-card border-border hover:border-primary/30 hover:shadow-lg"
    }`}>
      <div className={`mb-4 w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
        variant === "accent"
          ? "bg-accent/20 group-hover:bg-accent-foreground/20"
          : "bg-secondary group-hover:bg-primary/10"
      }`}>
        <Icon className={`h-7 w-7 transition-colors ${
          variant === "accent"
            ? "text-accent group-hover:text-accent-foreground"
            : "text-primary"
        }`} />
      </div>
      <h3 className={`font-semibold transition-colors ${
        variant === "accent" ? "group-hover:text-accent-foreground" : ""
      }`}>
        {title}
      </h3>
      {description && (
        <p className={`mt-1 text-sm transition-colors ${
          variant === "accent" 
            ? "text-muted-foreground group-hover:text-accent-foreground/80" 
            : "text-muted-foreground"
        }`}>
          {description}
        </p>
      )}
    </div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link to={href}>{content}</Link>;
};

export default QuickAccessCard;
