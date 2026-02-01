import { FileText, ClipboardList, HardHat, HelpCircle, Phone, KeyRound } from "lucide-react";
import QuickAccessCard from "@/components/ui/QuickAccessCard";

const quickLinks = [
  { title: "Pay Service Charge", description: "View payment details", icon: FileText, href: "/leaseholders#payment" },
  { title: "Meeting Minutes", description: "Board decisions", icon: ClipboardList, href: "/documents?type=minutes" },
  { title: "Planned Works", description: "Upcoming projects", icon: HardHat, href: "/improvements" },
  { title: "FAQs", description: "Common questions", icon: HelpCircle, href: "/faq" },
  { title: "Contact Us", description: "Get in touch", icon: Phone, href: "/contact" },
  { title: "Building Access", description: "Keys & fobs", icon: KeyRound, href: "/tenants#access" },
];

const QuickAccessSection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Quick Access</h2>
          <p className="mt-2 text-muted-foreground">Find what you need quickly</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link, index) => (
            <div 
              key={link.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <QuickAccessCard {...link} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;
