import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { 
  Volume2, Dog, CigaretteOff, Car, Recycle, Package, Bike, Key, 
  AlertTriangle, Phone, Building, HelpCircle, Clock
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const buildingRules = [
  {
    icon: Volume2,
    title: "Noise",
    description: "Quiet hours are 10pm - 7am. Please be considerate of neighbours at all times.",
  },
  {
    icon: Dog,
    title: "Pets",
    description: "Pets are not permitted as per the lease terms. Please check your individual lease for details.",
  },
  {
    icon: CigaretteOff,
    title: "Smoking",
    description: "Smoking is prohibited in all communal areas including hallways, stairwells, and lifts.",
  },
  {
    icon: Car,
    title: "Parking",
    description: "A valid permit is required for all vehicles. Unauthorised vehicles may be fined or removed.",
  },
  {
    icon: Recycle,
    title: "Waste Collection",
    description: "Bin collections every Monday and Thursday. Use designated bin areas for general waste.",
  },
];

const practicalInfo = [
  {
    icon: Recycle,
    title: "Bin Collection",
    details: [
      "Collection days: Every Monday and Thursday",
      "Bulky items: Contact council for collection",
      "Put bins out by 7am on collection day",
      "Use designated bin areas only",
    ],
  },
  {
    icon: Car,
    title: "Parking",
    details: [
      "Allocated spaces for residents only",
      "Visitor parking available in designated areas",
      "Display valid permit at all times",
    ],
  },
  {
    icon: Bike,
    title: "Bike Storage",
    details: [
      "Secure bike stores in basement level",
      "Access via your key fob",
      "Do not store bikes in communal corridors",
    ],
  },
  {
    icon: Package,
    title: "Parcels & Deliveries",
    details: [
      "Concierge accepts parcels during staffed hours",
      "Parcel lockers coming soon",
      "Large items delivered to your floor",
      "Collect within 7 days",
    ],
  },
  {
    icon: Key,
    title: "Moving In/Out",
    details: [
      "Book the lift in advance for large moves",
      "Protect communal areas during moves",
      "Inform concierge of moving date",
      "Weekend moves preferred where possible",
    ],
  },
];

const whoDoesWhat = [
  { area: "Inside Your Flat", responsible: "Your Landlord", examples: "Appliances, internal repairs, decorating" },
  { area: "Communal Areas", responsible: "RTM/Agent", examples: "Hallways, lifts, lighting, cleaning" },
  { area: "Building Structure", responsible: "RTM/Agent", examples: "Roof, external walls, windows (external)" },
];

const tenantFaqs = [
  {
    question: "Who should I contact for repairs inside my flat?",
    answer: "For anything inside your flat (appliances, plumbing fixtures, heating), contact your landlord or letting agent directly. The RTM is only responsible for communal areas.",
  },
  {
    question: "How do I report a communal area issue?",
    answer: "Use our Report an Issue form on this website, or contact Moonstone Block Management directly during office hours.",
  },
  {
    question: "Where can I park my car?",
    answer: "If your tenancy includes parking, use your allocated space only. Visitor parking is available in designated areas. All vehicles must display a valid permit.",
  },
  {
    question: "How do I get extra keys or fobs?",
    answer: "Contact your landlord for flat keys. For building fobs, your landlord will need to request these through Moonstone Block Management.",
  },
  {
    question: "What are the quiet hours?",
    answer: "Quiet hours are 10pm to 7am. During these times, please keep noise to a minimum out of consideration for your neighbours.",
  },
  {
    question: "Can I have visitors stay?",
    answer: "Yes, short-term visitors are welcome. For extended stays or changes to occupancy, check your tenancy agreement and inform your landlord.",
  },
  {
    question: "What should I do if I smell gas?",
    answer: "Open windows, do not use switches or flames, leave the building, and call the National Gas Emergency Line: 0800 111 999.",
  },
  {
    question: "Who do I call if I'm locked out?",
    answer: "Contact your landlord or letting agent first. If it's an emergency and you cannot reach them, contact the emergency hotline.",
  },
];

const Tenants = () => {
  return (
    <Layout>
      <PageHero
        title="Information for Tenants"
        subtitle="Everything you need to know about living at Masshouse"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Tenants" },
        ]}
      />

      {/* Building Rules */}
      <section className="section-padding">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Building Rules</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buildingRules.map((rule) => (
              <div 
                key={rule.title}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <rule.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{rule.title}</h3>
                    <p className="mt-2 text-muted-foreground text-sm">{rule.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Information */}
      <section className="section-padding bg-muted">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Practical Information</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practicalInfo.map((info) => (
              <div 
                key={info.title}
                className="bg-card rounded-lg p-6 border border-border"
                id={info.title === "Bike Storage" ? "access" : undefined}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{info.title}</h3>
                </div>
                <ul className="space-y-2">
                  {info.details.map((detail, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance & Repairs */}
      <section className="section-padding">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Maintenance & Repairs</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            It's important to know who is responsible for different types of repairs. Here's a quick guide:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full bg-card rounded-lg border border-border">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Area</th>
                  <th className="px-6 py-4 text-left font-semibold">Who's Responsible</th>
                  <th className="px-6 py-4 text-left font-semibold">Examples</th>
                </tr>
              </thead>
              <tbody>
                {whoDoesWhat.map((row, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="px-6 py-4 font-medium">{row.area}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                        row.responsible.includes("Landlord") 
                          ? "bg-accent/10 text-accent" 
                          : "bg-primary/10 text-primary"
                      }`}>
                        {row.responsible}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{row.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/report-issue">
              <Button className="bg-accent hover:bg-accent/90">
                Report a Communal Issue
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              For issues inside your flat, contact your landlord directly
            </p>
          </div>
        </div>
      </section>

      {/* Useful Contacts */}
      <section className="section-padding bg-secondary/30">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Useful Contacts</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <Building className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Moonstone Block Management</h3>
              <p className="text-sm text-muted-foreground mt-1">Communal issues</p>
              <a href="tel:0121XXXXXXX" className="text-primary font-medium mt-2 block hover:underline">
                0121 XXX XXXX
              </a>
            </div>
            
            <div className="bg-destructive/10 rounded-lg p-6 border border-destructive/30">
              <Phone className="h-8 w-8 text-destructive mb-3" />
              <h3 className="font-semibold">Emergency Hotline</h3>
              <p className="text-sm text-muted-foreground mt-1">24/7 emergencies</p>
              <a href="tel:0121XXXXXXX" className="text-destructive font-medium mt-2 block hover:underline">
                0121 XXX XXXX
              </a>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border">
              <AlertTriangle className="h-8 w-8 text-accent mb-3" />
              <h3 className="font-semibold">Police Non-Emergency</h3>
              <p className="text-sm text-muted-foreground mt-1">Report incidents</p>
              <a href="tel:101" className="text-primary font-medium mt-2 block hover:underline">
                101
              </a>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border">
              <Clock className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Council Services</h3>
              <p className="text-sm text-muted-foreground mt-1">Birmingham City Council</p>
              <a href="tel:03031231234" className="text-primary font-medium mt-2 block hover:underline">
                0303 123 1234
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tenant FAQs */}
      <section className="section-padding">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Tenant FAQs</h2>
          
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {tenantFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 p-6 bg-muted rounded-lg">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">More Questions?</h3>
                  <p className="text-muted-foreground text-sm">
                    Visit our full <Link to="/faq" className="text-primary hover:underline">FAQ page</Link> or <Link to="/contact" className="text-primary hover:underline">contact us</Link> for more information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tenants;
