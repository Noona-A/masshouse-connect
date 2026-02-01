import { Building, Users, AlertTriangle } from "lucide-react";
import ContactCard from "@/components/ui/ContactCard";

const ContactsSection = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Contact Information</h2>
          <p className="mt-2 text-muted-foreground">Get in touch with the right team</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <ContactCard
            title="Moonstone Block Management"
            subtitle="Day-to-day management"
            icon={Building}
            phone="0121 798 8444"
            email="info@moonstonebm.co.uk"
            hours="Monday - Friday, 9am - 5pm"
          />
          
          <ContactCard
            title="RTM Directors"
            subtitle="Governance & strategy"
            icon={Users}
            email="directors@masshouse-rtm.co.uk"
            hours="Board meets monthly"
          />
          
          <ContactCard
            title="24/7 Emergency Hotline"
            subtitle="For genuine emergencies only"
            icon={AlertTriangle}
            phone="0121 XXX XXXX"
            hours="Available 24/7/365"
            variant="emergency"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
