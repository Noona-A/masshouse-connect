import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Landmark, Users, CheckCircle, ArrowRight, Target, Eye, Heart } from "lucide-react";

const benefits = [
  "Residents control major decisions about the buildings",
  "Greater transparency in spending and management",
  "Direct say in choosing the managing agent",
  "Potential for improved service quality",
  "Building a stronger community",
];

const timeline = [
  { year: "Jan 2023", title: "Campaign Launch", description: "Residents unite to explore Right to Manage options" },
  { year: "Aug 2025", title: "Majority Achieved", description: "Majority support secured across both buildings" },
  { year: "Sep 2025", title: "Claim Notice Submitted", description: "Formal RTM claim notice submitted to the freeholder" },
  { year: "Jan 2026", title: "Handover Discussions", description: "Met with the freeholder to discuss the handover date" },
  { year: "2026", title: "RTM Agreement", description: "Freeholder agreed to grant RTM; handover date to be confirmed" },
];

const directors = [
  { name: "Henry Carpenter", role: "Chair", bio: "Leads the RTM board and brings extensive experience in property management and community leadership." },
  { name: "Noor Abduljhbar", role: "IT & Treasurer", bio: "Manages IT systems and financial oversight, ensuring robust accounting and digital operations." },
  { name: "Mark Hopkins", role: "Secretary", bio: "Experienced in governance and administration, keeping company operations running smoothly." },
  { name: "Stuart Buchanan", role: "Director", bio: "Passionate about building improvements and resident engagement." },
  { name: "Gary Douglas", role: "Director", bio: "Brings valuable expertise to the board's decision-making processes." },
  { name: "Bebe Woo", role: "Director", bio: "Committed to enhancing the community and representing leaseholder interests." },
];

const About = () => {
  return (
    <Layout>
      <PageHero
        title="About Masshouse RTM"
        subtitle="Understanding leaseholder-led property management"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "About" },
        ]}
      />

      {/* What is RTM */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Landmark className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">What is Right to Manage?</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                Right to Manage (RTM) is a legal right that allows leaseholders of residential flats to take over the management of their building from the freeholder, without having to prove any fault or pay compensation.
              </p>
              <p>
                Under RTM, a company formed by the leaseholders (the RTM Company) takes on responsibility for managing the building. This includes maintenance, repairs, insurance, and day-to-day operations.
              </p>
              <p>
                The RTM Company typically appoints a professional managing agent to handle these tasks, but the key difference is that residents—through the board of directors—have the final say on important decisions.
              </p>
            </div>

            <div className="mt-8 bg-secondary/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Benefits of RTM</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="section-padding bg-muted">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Our Story</h2>
            <p className="mt-2 text-muted-foreground">The journey to leaseholder-led management</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />
              
              {timeline.map((item, index) => (
                <div 
                  key={item.year}
                  className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background transform -translate-x-1/2" />
                  
                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                      <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded mb-2">
                        {item.year}
                      </span>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="mt-1 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Directors */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Meet Your Directors</h2>
            <p className="mt-2 text-muted-foreground">Elected by fellow leaseholders to represent your interests</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {directors.map((director, index) => (
              <div 
                key={index}
                className="bg-card rounded-lg p-6 border border-border text-center card-hover"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Users className="h-10 w-10 text-primary/50" />
                </div>
                <h3 className="font-semibold text-lg">{director.name}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 bg-accent/10 text-accent text-sm font-medium rounded">
                  {director.role}
                </span>
                <p className="mt-3 text-sm text-muted-foreground">{director.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">How It Works</h2>
            <p className="mt-2 text-primary-foreground/80">The structure of leaseholder-led management</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary-foreground/10 flex items-center justify-center mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Leaseholders</h3>
              <p className="text-primary-foreground/80">Elect directors at the AGM and vote on major decisions</p>
              <ArrowRight className="mx-auto mt-4 h-6 w-6 text-accent hidden md:block" />
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary-foreground/10 flex items-center justify-center mb-4">
                <Landmark className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">RTM Directors</h3>
              <p className="text-primary-foreground/80">Set strategy, approve budgets, and oversee management</p>
              <ArrowRight className="mx-auto mt-4 h-6 w-6 text-accent hidden md:block" />
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary-foreground/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Managing Agent</h3>
              <p className="text-primary-foreground/80">Handles day-to-day operations and reports to directors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Our Vision</h2>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">Open communication and clear financial reporting</p>
              </div>
              
              <div className="p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Value</h3>
                <p className="text-sm text-muted-foreground">Quality services at fair and reasonable costs</p>
              </div>
              
              <div className="p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">Building a thriving, connected neighborhood</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
