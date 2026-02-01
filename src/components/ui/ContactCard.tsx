import { LucideIcon, Phone, Mail, Clock } from "lucide-react";

interface ContactCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  phone?: string;
  email?: string;
  hours?: string;
  variant?: "default" | "emergency";
}

const ContactCard = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  phone, 
  email, 
  hours,
  variant = "default" 
}: ContactCardProps) => {
  return (
    <div className={`rounded-lg p-6 ${
      variant === "emergency"
        ? "bg-destructive text-destructive-foreground"
        : "bg-card border border-border shadow-sm"
    }`}>
      <div className="flex items-start gap-4">
        <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
          variant === "emergency"
            ? "bg-destructive-foreground/20"
            : "bg-secondary"
        }`}>
          <Icon className={`h-6 w-6 ${
            variant === "emergency" ? "text-destructive-foreground" : "text-primary"
          }`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg">{title}</h3>
          {subtitle && (
            <p className={`text-sm mt-0.5 ${
              variant === "emergency" ? "text-destructive-foreground/80" : "text-muted-foreground"
            }`}>
              {subtitle}
            </p>
          )}
          
          <div className="mt-4 space-y-2">
            {phone && (
              <a 
                href={`tel:${phone.replace(/\s/g, '')}`}
                className={`flex items-center gap-2 text-sm font-medium hover:underline ${
                  variant === "emergency" ? "" : "text-primary"
                }`}
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            )}
            {email && (
              <a 
                href={`mailto:${email}`}
                className={`flex items-center gap-2 text-sm hover:underline ${
                  variant === "emergency" ? "" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mail className="h-4 w-4" />
                {email}
              </a>
            )}
            {hours && (
              <div className={`flex items-center gap-2 text-sm ${
                variant === "emergency" ? "text-destructive-foreground/80" : "text-muted-foreground"
              }`}>
                <Clock className="h-4 w-4" />
                {hours}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
