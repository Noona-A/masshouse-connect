import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Building2, Leaf, Shield, MapPin, Train, Users, Thermometer, Home, Eye, Lock } from "lucide-react";

const masshouseSpecs = {
  kitchen: [
    "Choice of designer fitted units and worktops",
    "Stainless steel SMEG electric oven and hob",
    "Stainless steel extractor hood",
    "Integrated SMEG washing machine/tumble dryer",
    "Integrated SMEG dishwasher",
    "Stainless steel inset round bowl and drainer",
    "Laminated up-stands to work surfaces",
  ],
  bathroom: [
    "Contemporary white Ideal Standard bathroom suite",
    "Contemporary chrome taps",
    "Aqualisa thermostatic shower with varispray fixed head",
    "Heated chrome towel rail",
    "Shaver point",
    "Vanity unit with mirrors",
    "Ceramic floor tiles",
  ],
  interior: [
    "Smooth finish to all ceilings",
    "Contemporary beech finish doors with chrome fittings",
    "Laminate flooring to main living areas",
    "Carpet to all bedrooms",
    "Recessed chrome downlighters",
    "Video entry system",
    "Smoke detectors",
    "10 year NHBC Buildmark warranty",
  ],
};

const hiveSpecs = {
  kitchen: [
    "Designer fitted kitchen units",
    "Quality integrated appliances",
    "Chrome fixtures and fittings",
    "High quality worktops",
  ],
  bathroom: [
    "Contemporary bathroom suites",
    "Chrome taps and fixtures",
    "Thermostatic showers",
    "High quality tiling",
  ],
  interior: [
    "Spot lighting throughout",
    "Luxury carpets in bedrooms",
    "Laminate wood flooring to living areas",
    "Video entry system",
    "10 year NHBC warranty",
  ],
  environmental: [
    "Birmingham District Energy Company (BDEC) heating system",
    "10-30% annual savings on hot water and heating",
    "92% reduction in carbon dioxide emissions",
    "State-of-the-art computer controlled heating",
    "Wet radiators for efficient heating",
  ],
};

const Buildings = () => {
  return (
    <Layout>
      <PageHero
        title="Our Buildings"
        subtitle="Two landmark residential developments in Birmingham's thriving Eastside"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Our Buildings" },
        ]}
      />

      {/* Overview Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-muted-foreground">
              Masshouse RTM Company Limited manages 336 apartments across two connected developments 
              in Masshouse Plaza, Birmingham. Both buildings were developed by Nikal and offer 
              contemporary city centre living with excellent transport links.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-lg p-6 border border-border text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">336</div>
              <p className="text-muted-foreground">Total Apartments</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">2</div>
              <p className="text-muted-foreground">Connected Buildings</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                <Train className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">&lt;5 min</div>
              <p className="text-muted-foreground">Walk to HS2/Moor Street</p>
            </div>
          </div>
        </div>
      </section>

      {/* Masshouse Building */}
      <section className="section-padding bg-muted">
        <div className="section-container">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Masshouse</h2>
              <p className="text-muted-foreground">2 Masshouse Plaza • 169 Apartments • Completed 2007</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                Masshouse is a 14-storey mixed-use development featuring 169 apartments. 
                The building offers a mix of studio, one-bedroom, and two-bedroom apartments, 
                each designed with contemporary finishes and quality appliances.
              </p>
              <p>
                Developed by Nikal and completed in 2007, Masshouse was the first residential 
                scheme at Masshouse Plaza and set the standard for quality city centre living 
                in Birmingham's Eastside.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Apartment Types
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card rounded-lg p-4 border border-border text-center">
                  <div className="text-2xl font-bold text-primary">Studio</div>
                  <p className="text-sm text-muted-foreground">Open plan living</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border text-center">
                  <div className="text-2xl font-bold text-primary">1 Bed</div>
                  <p className="text-sm text-muted-foreground">Spacious layouts</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border text-center">
                  <div className="text-2xl font-bold text-primary">2 Bed</div>
                  <p className="text-sm text-muted-foreground">Family living</p>
                </div>
              </div>
            </div>
          </div>

          {/* Masshouse Specifications */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="bg-primary text-primary-foreground px-6 py-4">
              <h3 className="font-semibold text-lg">Apartment Specifications</h3>
            </div>
            <div className="p-6 grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">🍳</span>
                  Kitchen
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {masshouseSpecs.kitchen.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">🚿</span>
                  Bathroom
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {masshouseSpecs.bathroom.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">🏠</span>
                  Interior & Security
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {masshouseSpecs.interior.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Hive Building */}
      <section className="section-padding">
        <div className="section-container">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
              <Building2 className="h-8 w-8 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">The Hive</h2>
              <p className="text-muted-foreground">7 Masshouse Plaza • 167 Apartments • Completed 2011</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                The Hive is a 14-storey landmark development featuring 167 apartments. 
                An exciting and innovative collection of studio suites, one and two bedroom 
                apartments, The Hive presents a dynamic opportunity to be part of a vibrant 
                community in Birmingham city centre.
              </p>
              <p>
                Positioned between Bullring's landmark Selfridges store, Millennium Point 
                and Aston University campus, The Hive combines a superb city centre location 
                with individuality and exceptional finishes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-accent" />
                Unique Features
              </h3>
              <div className="space-y-3">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h4 className="font-medium">Secret Garden</h4>
                  <p className="text-sm text-muted-foreground">
                    A private city centre sanctuary for residents with decking areas, 
                    decorative lighting, and views across Eastside City Park.
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h4 className="font-medium">Curved Architecture</h4>
                  <p className="text-sm text-muted-foreground">
                    Twelve unique apartments on every level, each with individual style 
                    featuring private terraces, curved balconies, and elegant room layouts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Features Highlight */}
          <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-6 mb-8 border border-green-200 dark:border-green-900">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Environmental Innovation</h3>
                <p className="text-muted-foreground mb-4">
                  The Hive is heated via the Birmingham District Energy Company (BDEC) system - 
                  a unique energy-saving solution that provides hot water and central heating to all apartments.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-card rounded p-3 text-center">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">10-30%</div>
                    <p className="text-xs text-muted-foreground">Annual savings on heating</p>
                  </div>
                  <div className="bg-card rounded p-3 text-center">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">92%</div>
                    <p className="text-xs text-muted-foreground">CO₂ emission reduction</p>
                  </div>
                  <div className="bg-card rounded p-3 text-center">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">Less</div>
                    <p className="text-xs text-muted-foreground">Than boiling a kettle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hive Specifications */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="bg-accent text-accent-foreground px-6 py-4">
              <h3 className="font-semibold text-lg">Apartment Specifications</h3>
            </div>
            <div className="p-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">🍳</span>
                  Kitchen
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {hiveSpecs.kitchen.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">🚿</span>
                  Bathroom
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {hiveSpecs.bathroom.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">🏠</span>
                  Interior
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {hiveSpecs.interior.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-green-600" />
                  Eco Heating
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {hiveSpecs.environmental.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Prime Location</h2>
            <p className="mt-2 text-primary-foreground/80">
              In the heart of Birmingham's Eastside cultural quarter
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary-foreground/10 flex items-center justify-center mb-3">
                <Train className="h-7 w-7" />
              </div>
              <h3 className="font-semibold mb-1">HS2 Terminus</h3>
              <p className="text-sm text-primary-foreground/70">
                Future high-speed rail station at Curzon Street, minutes away
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary-foreground/10 flex items-center justify-center mb-3">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="font-semibold mb-1">City Centre</h3>
              <p className="text-sm text-primary-foreground/70">
                2 min walk to Moor Street Station, 5 min to Bullring
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary-foreground/10 flex items-center justify-center mb-3">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="font-semibold mb-1">Business District</h3>
              <p className="text-sm text-primary-foreground/70">
                5 min walk to Colmore Business District with 500+ companies
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary-foreground/10 flex items-center justify-center mb-3">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="font-semibold mb-1">Universities</h3>
              <p className="text-sm text-primary-foreground/70">
                Near Aston University and Birmingham City University
              </p>
            </div>
          </div>

          <div className="mt-12 text-center text-sm text-primary-foreground/60">
            <p>
              Nearby landmarks: Selfridges at Bullring • Millennium Point • Hotel La Tour • 
              Eastside City Park • New Street Station • Snow Hill Station
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Safety & Security</h2>
            <p className="text-muted-foreground mb-8">
              Both buildings are equipped with comprehensive security features for your peace of mind.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Video Entry System</h3>
                <p className="text-sm text-muted-foreground">Secure access control to all buildings</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">24/7 Security</h3>
                <p className="text-sm text-muted-foreground">CCTV and security measures throughout</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <Building2 className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">NHBC Warranty</h3>
                <p className="text-sm text-muted-foreground">10-year structural warranty on all properties</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Buildings;
