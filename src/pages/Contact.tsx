import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Building, Users, AlertTriangle, Phone, Mail, Clock, MapPin, ExternalLink } from "lucide-react";

const directors = [
  { name: "Director Name", role: "Chair", email: "chair@masshouse-rtm.co.uk" },
  { name: "Director Name", role: "Treasurer", email: "treasurer@masshouse-rtm.co.uk" },
  { name: "Director Name", role: "Secretary", email: "secretary@masshouse-rtm.co.uk" },
  { name: "Director Name", role: "Director", email: "director@masshouse-rtm.co.uk" },
];

const emergencyServices = [
  { name: "Police (Emergency)", number: "999" },
  { name: "Police (Non-Emergency)", number: "101" },
  { name: "Gas Emergency", number: "0800 111 999" },
  { name: "Electricity Emergency", number: "105" },
  { name: "Water Emergency", number: "0800 783 4444" },
  { name: "Birmingham City Council", number: "0121 303 1111" },
];

const Contact = () => {
  return (
    <Layout>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with the right team"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Contact" },
        ]}
      />

      {/* Contact Cards */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Day-to-Day Management */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Day-to-Day Management</h3>
                  <p className="text-sm text-muted-foreground">Moonstone Block Management</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                For service charges, maintenance requests, general enquiries, and day-to-day building issues.
              </p>
              
              <div className="space-y-3">
                <a href="tel:0121XXXXXXX" className="flex items-center gap-2 text-primary hover:underline">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">0121 XXX XXXX</span>
                </a>
                <a href="mailto:info@moonstoneblockmanagement.co.uk" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">info@moonstoneblockmanagement.co.uk</span>
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Monday - Friday, 9am - 5pm</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Your Property Manager:</strong><br />
                  [Name to be inserted]
                </p>
              </div>
            </div>

            {/* RTM Directors */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">RTM Directors</h3>
                  <p className="text-sm text-muted-foreground">Governance & Strategy</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                For governance matters, strategic concerns, or feedback about management.
              </p>
              
              <div className="space-y-2">
                {directors.map((director, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{director.role}</span>
                    <a href={`mailto:${director.email}`} className="text-primary hover:underline">
                      Email
                    </a>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Board meets monthly (15th)</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Next AGM:</strong> April 2025 (TBC)
                </p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-destructive rounded-lg p-6 text-destructive-foreground" id="emergency">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-destructive-foreground/20 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">24/7 Emergency Hotline</h3>
                  <p className="text-sm text-destructive-foreground/80">For genuine emergencies only</p>
                </div>
              </div>
              
              <a href="tel:0121XXXXXXX" className="text-3xl font-bold hover:underline block mb-4">
                0121 XXX XXXX
              </a>
              
              <p className="text-sm text-destructive-foreground/80 mb-4">
                This line is for emergencies only:
              </p>
              
              <ul className="space-y-1 text-sm text-destructive-foreground/90">
                <li>• Fire, flood, serious water leak</li>
                <li>• No heating/hot water (in winter)</li>
                <li>• Lift entrapment</li>
                <li>• Building security breach</li>
                <li>• Immediate danger to health/safety</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-destructive-foreground/20">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Available 24/7/365</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Useful Contacts */}
      <section className="section-padding bg-muted">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-6">Other Useful Contacts</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyServices.map((service, index) => (
              <div 
                key={index}
                className="bg-card rounded-lg p-4 border border-border flex justify-between items-center"
              >
                <span className="text-muted-foreground">{service.name}</span>
                <a 
                  href={`tel:${service.number.replace(/\s/g, '')}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {service.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding">
        <div className="section-container">
          <div className="flex items-start gap-4 mb-6">
            <MapPin className="h-6 w-6 text-primary shrink-0" />
            <div>
              <h2 className="text-2xl font-bold">Location</h2>
              <p className="text-muted-foreground">Masshouse Plaza, Birmingham B5 5JR</p>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg h-80 flex items-center justify-center border border-border">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Map embed would go here</p>
              <a 
                href="https://maps.google.com/?q=Masshouse+Plaza+Birmingham" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1 mt-2"
              >
                View on Google Maps
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-3">The Masshouse Building</h3>
              <p className="text-muted-foreground text-sm">
                Flats 1-200<br />
                Masshouse Plaza, Birmingham B5 5JR
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-3">The Hive Building</h3>
              <p className="text-muted-foreground text-sm">
                Flats 201-336<br />
                Masshouse Plaza, Birmingham B5 5JR
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
