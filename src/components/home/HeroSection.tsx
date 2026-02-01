import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, PoundSterling, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/50 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="section-container relative z-10 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            Masshouse RTM Company Limited
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-primary-foreground/90 font-light">
            Resident-Led Property Management
          </p>
          <p className="mt-2 text-lg text-primary-foreground/80">
            336 Homes • 2 Buildings • Professional Service
          </p>
          
          {/* Location Badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-primary-foreground/90">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Masshouse Plaza, Birmingham • Near HS2
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/report-issue">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg">
                <Wrench className="mr-2 h-5 w-5" />
                Report an Issue
              </Button>
            </Link>
            <Link to="/leaseholders">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                <PoundSterling className="mr-2 h-5 w-5" />
                Service Charge Info
              </Button>
            </Link>
            <Link to="/contact#emergency">
              <Button size="lg" variant="destructive" className="font-semibold shadow-lg">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Contact
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
