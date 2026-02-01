import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, Shield, Brush, Wrench, Flame, Lightbulb, Wallet, 
  Copy, Calendar, FileText, Download, HelpCircle, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";

const serviceChargeItems = [
  { icon: Building, label: "Building Management", description: "Professional management services" },
  { icon: Shield, label: "Security & Concierge", description: "24/7 security presence" },
  { icon: Brush, label: "Cleaning", description: "Daily communal area cleaning" },
  { icon: Wrench, label: "Maintenance", description: "Repairs and upkeep" },
  { icon: Flame, label: "Insurance", description: "Buildings insurance" },
  { icon: Lightbulb, label: "Utilities", description: "Communal electricity & water" },
  { icon: Wallet, label: "Reserve Fund", description: "Future major works" },
];

const bankDetails = {
  accountName: "Masshouse RTM Company Limited",
  sortCode: "XX-XX-XX",
  accountNumber: "XXXXXXXX",
  reference: "Your flat number (e.g., M123 or H234)",
};

const importantDates = [
  { date: "1st April", event: "Financial Year Start", note: "Annual budget begins" },
  { date: "1st April & 1st October", event: "Service Charge Due", note: "Bi-annual payments" },
  { date: "April 2025", event: "Annual General Meeting", note: "Date TBC" },
  { date: "15th of each month", event: "Board Meetings", note: "Open to observers" },
];

const faqs = [
  {
    question: "Why do I pay service charge?",
    answer: "Service charge covers the cost of maintaining and managing the communal areas of the building, including cleaning, security, repairs, insurance, and building a reserve fund for future major works."
  },
  {
    question: "How is my service charge calculated?",
    answer: "Your service charge is calculated based on your flat's share of the total budget, typically determined by the size of your property as stated in your lease."
  },
  {
    question: "Can the service charge increase?",
    answer: "Yes, service charges can change annually based on actual costs and planned works. We aim to provide value while maintaining the buildings to a high standard."
  },
  {
    question: "What if I can't afford to pay?",
    answer: "Please contact Moonstone Block Management as soon as possible. We understand circumstances can change and can discuss payment arrangements."
  },
  {
    question: "What happens if I don't pay?",
    answer: "Unpaid service charges accrue interest and can become a charge on your property. In serious cases, legal action may be taken. Please communicate with us if you're struggling."
  },
  {
    question: "Can I challenge the service charge?",
    answer: "Yes, you have the right to request a summary of costs and challenge unreasonable charges through the First-tier Tribunal (Property Chamber)."
  },
];

const Leaseholders = () => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <Layout>
      <PageHero
        title="Information for Leaseholders"
        subtitle="Everything you need to know about service charges, payments, and your responsibilities"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Leaseholders" },
        ]}
      />

      <section className="section-padding">
        <div className="section-container">
          <Tabs defaultValue="service-charge" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-start gap-2 h-auto bg-transparent p-0 mb-8">
              <TabsTrigger value="service-charge" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Service Charge
              </TabsTrigger>
              <TabsTrigger value="how-to-pay" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                How to Pay
              </TabsTrigger>
              <TabsTrigger value="budget" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Budget & Spending
              </TabsTrigger>
              <TabsTrigger value="dates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Important Dates
              </TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Documents
              </TabsTrigger>
              <TabsTrigger value="faqs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                FAQs
              </TabsTrigger>
            </TabsList>

            {/* Service Charge Tab */}
            <TabsContent value="service-charge" className="mt-0">
              <div className="max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">What is the Service Charge?</h2>
                <p className="text-muted-foreground mb-6">
                  The service charge is a payment made by all leaseholders to cover the costs of maintaining and managing the building's communal areas and services. This ensures our buildings remain safe, clean, and well-maintained.
                </p>

                <h3 className="text-lg font-semibold mb-4">What Your Service Charge Covers</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {serviceChargeItems.map((item) => (
                    <div 
                      key={item.label}
                      className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.label}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Current Service Charge Rates</h3>
                  <p className="text-muted-foreground mb-4">
                    Service charge rates vary by apartment size and location. Please refer to your service charge demand letter or contact Moonstone Block Management for your specific amount.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Payment Schedule:</strong> Bi-annual (1st April and 1st October)
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* How to Pay Tab */}
            <TabsContent value="how-to-pay" className="mt-0" id="payment">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold mb-4">How to Pay Your Service Charge</h2>
                
                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-lg mb-4">Bank Transfer Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Account Name</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{bankDetails.accountName}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(bankDetails.accountName, "Account name")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Sort Code</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium font-mono">{bankDetails.sortCode}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(bankDetails.sortCode, "Sort code")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Account Number</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium font-mono">{bankDetails.accountNumber}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(bankDetails.accountNumber, "Account number")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-muted-foreground">Reference</span>
                      <span className="font-medium text-accent">{bankDetails.reference}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold mb-3">Setting Up a Standing Order</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Log into your online banking</li>
                    <li>Navigate to "Payments" or "Standing Orders"</li>
                    <li>Enter the bank details above</li>
                    <li>Set amount (your monthly or bi-annual payment)</li>
                    <li>Choose payment date (before the due date)</li>
                    <li>Use your flat number as the reference</li>
                  </ol>
                </div>

                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6">
                  <h3 className="font-semibold text-destructive mb-2">Having Difficulty Paying?</h3>
                  <p className="text-muted-foreground">
                    If you're experiencing financial difficulties, please contact Moonstone Block Management as soon as possible. We can discuss payment arrangements to help you manage your obligations.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Budget Tab */}
            <TabsContent value="budget" className="mt-0">
              <div className="max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">Budget & Spending</h2>
                <p className="text-muted-foreground mb-8">
                  Transparency in how your service charge is spent is important to us. Below you'll find an overview of our budget and spending.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">2025 Budget Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Management & Admin</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Security</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cleaning</span>
                        <span className="font-medium">12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maintenance & Repairs</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Insurance</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Utilities</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reserve Fund</span>
                        <span className="font-medium">10%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">Reserve Fund</h3>
                    <p className="text-muted-foreground mb-4">
                      The reserve fund is set aside for major planned works and unexpected repairs. This protects leaseholders from large one-off bills.
                    </p>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-sm text-muted-foreground">Current Balance</div>
                      <div className="text-2xl font-bold text-primary">Contact for details</div>
                    </div>
                  </div>
                </div>

                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Full Budget PDF
                </Button>
              </div>
            </TabsContent>

            {/* Important Dates Tab */}
            <TabsContent value="dates" className="mt-0">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold mb-6">Important Dates</h2>
                
                <div className="space-y-4">
                  {importantDates.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{item.event}</div>
                        <div className="text-accent font-medium">{item.date}</div>
                        <div className="text-sm text-muted-foreground mt-1">{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-0">
              <div className="max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">Documents</h2>
                <p className="text-muted-foreground mb-6">
                  Access important documents related to building management and governance.
                </p>

                <div className="space-y-3">
                  {[
                    { title: "Service Charge Demand 2025", date: "January 2025", type: "Financial" },
                    { title: "Annual Budget 2025", date: "December 2024", type: "Financial" },
                    { title: "Board Meeting Minutes - January 2025", date: "January 2025", type: "Governance" },
                    { title: "Annual Accounts 2024", date: "December 2024", type: "Financial" },
                    { title: "Building Insurance Certificate", date: "April 2024", type: "Legal" },
                  ].map((doc, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{doc.title}</div>
                          <div className="text-sm text-muted-foreground">{doc.date} • {doc.type}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="mt-6">
                  View All Documents
                </Button>
              </div>
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faqs" className="mt-0">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
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

                <div className="mt-8 p-6 bg-secondary/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Still have questions?</h3>
                      <p className="text-muted-foreground text-sm">
                        Contact Moonstone Block Management or visit our full FAQ page for more information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Leaseholders;
