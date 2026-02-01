import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
  variant?: "default" | "large";
}

const PageHero = ({ title, subtitle, breadcrumbs, children, variant = "default" }: PageHeroProps) => {
  return (
    <section 
      className={`gradient-hero text-primary-foreground ${
        variant === "large" ? "py-16 md:py-24" : "py-10 md:py-14"
      }`}
    >
      <div className="section-container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1 text-sm text-primary-foreground/70">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center gap-1">
                  {item.path ? (
                    <Link to={item.path} className="hover:text-primary-foreground transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-primary-foreground">{item.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-primary-foreground/50" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        
        <h1 className={`font-bold text-balance ${
          variant === "large" ? "text-3xl md:text-4xl lg:text-5xl" : "text-2xl md:text-3xl lg:text-4xl"
        }`}>
          {title}
        </h1>
        
        {subtitle && (
          <p className="mt-3 text-lg text-primary-foreground/90 max-w-2xl">
            {subtitle}
          </p>
        )}
        
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
};

export default PageHero;
