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
                <a href="tel:+441217988444" className="flex items-center gap-2 text-primary hover:underline">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">0121 798 8444</span>
                </a>
                <a href="mailto:info@moonstonebm.co.uk" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">info@moonstonebm.co.uk</span>
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Monday - Friday, 9am - 5pm</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Address:</strong><br />
                  Cobalt Square, Second Floor<br />
                  83-85 Hagley Road, Edgbaston<br />
                  Birmingham B16 8QG
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
                  <span>Board meets monthly</span>
                </div>
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
              <p className="text-muted-foreground">Masshouse Plaza, Birmingham</p>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.8!2d-1.8897!3d52.4789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bc87f8a7f7f9%3A0x8f7c5e5f5e5f5e5f!2sMasshouse%2C%20Birmingham!5e0!3m2!1sen!2suk!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Masshouse Location"
            ></iframe>
          </div>
          
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-3">The Masshouse Building</h3>
              <p className="text-muted-foreground text-sm">
                Apartments 101-1404<br />
                2 Masshouse Plaza, Birmingham
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-semibold mb-3">The Hive Building</h3>
              <p className="text-muted-foreground text-sm">
                Apartments 1-5: 8 Masshouse Plaza<br />
                Apartments 101-1411: 7 Masshouse Plaza<br />
                Birmingham
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
