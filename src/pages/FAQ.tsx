import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Search, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqCategories = {
  rtm: {
    title: "About RTM",
    faqs: [
      {
        question: "What is Right to Manage?",
        answer: "Right to Manage (RTM) is a legal right that allows leaseholders of residential flats to take over the management of their building from the freeholder, without having to prove any fault or pay compensation. The RTM company appoints and supervises the managing agent."
      },
      {
        question: "Who runs the RTM company?",
        answer: "The RTM company is run by a board of directors elected by the leaseholders at the Annual General Meeting. The directors are volunteers who give their time to oversee the management of the buildings."
      },
      {
        question: "How can I join the RTM?",
        answer: "As a leaseholder, you automatically have the right to become a member of the RTM company. Contact us to confirm your membership and receive updates about meetings and decisions."
      },
      {
        question: "What's the difference between RTM and owning the freehold?",
        answer: "RTM gives leaseholders control over management but the freeholder still owns the land and building structure. Buying the freehold (enfranchisement) means leaseholders collectively own the building outright, which has additional costs and legal requirements."
      },
      {
        question: "How are decisions made?",
        answer: "Day-to-day decisions are made by the board of directors, with significant decisions requiring approval at general meetings. All RTM members can vote on important matters like budgets and major works."
      },
      {
        question: "Can the RTM be removed?",
        answer: "RTM cannot be reversed by the freeholder. However, the RTM company must meet its legal obligations. If leaseholders are dissatisfied with RTM management, they can elect new directors."
      },
    ]
  },
  serviceCharge: {
    title: "Service Charges",
    faqs: [
      {
        question: "Why do I pay service charge?",
        answer: "Service charge covers the cost of maintaining and managing the communal areas of the building, including cleaning, security, repairs, insurance, and building a reserve fund for future major works."
      },
      {
        question: "How is my service charge calculated?",
        answer: "Your service charge is calculated based on your flat's share of the total budget, typically determined by the size of your property as stated in your lease. The percentage is fixed in your lease."
      },
      {
        question: "Can service charge increase?",
        answer: "Yes, service charges can change annually based on actual costs and planned works. We aim to provide value while maintaining the buildings to a high standard. Major increases are discussed at general meetings."
      },
      {
        question: "What if I can't afford to pay?",
        answer: "Please contact Moonstone Block Management as soon as possible. We understand circumstances can change and can discuss payment arrangements. The earlier you contact us, the more options we have."
      },
      {
        question: "What happens if I don't pay?",
        answer: "Unpaid service charges accrue interest and can become a charge on your property. In serious cases, legal action may be taken. This affects your ability to sell your flat. Please communicate with us if you're struggling."
      },
      {
        question: "Do tenants pay service charge?",
        answer: "Tenants do not pay service charge directly to the RTM. Their landlord (the leaseholder) is responsible for service charges. Some landlords include service charges in rent."
      },
      {
        question: "How can I challenge the service charge?",
        answer: "You have the right to request a summary of costs and challenge unreasonable charges through the First-tier Tribunal (Property Chamber). Before doing so, we encourage you to raise concerns with the RTM directors first."
      },
      {
        question: "What's the reserve fund for?",
        answer: "The reserve fund is set aside for major planned works (like roof repairs, lift replacement, or external decoration) and unexpected repairs. This protects leaseholders from large one-off bills."
      },
    ]
  },
  building: {
    title: "Building Management",
    faqs: [
      {
        question: "Who manages the buildings day-to-day?",
        answer: "Moonstone Block Management handles day-to-day operations including maintenance, cleaning, security, and responding to resident queries. They report to the RTM board of directors."
      },
      {
        question: "How do I report a problem?",
        answer: "Use our Report an Issue form on this website, or contact Moonstone Block Management directly during office hours. For emergencies, use the 24/7 emergency hotline."
      },
      {
        question: "Who should I call in an emergency?",
        answer: "Call our 24/7 emergency hotline for genuine building emergencies. For life-threatening emergencies, always call 999 first. For issues inside your flat, contact your landlord or letting agent."
      },
      {
        question: "How often are inspections done?",
        answer: "Regular inspections of communal areas are conducted weekly. Fire safety equipment is checked monthly. Full building surveys and risk assessments are conducted annually."
      },
      {
        question: "How are contractors selected?",
        answer: "Contractors are selected through a competitive tender process for larger works. We consider price, quality, experience, and references. Directors approve contractor appointments."
      },
      {
        question: "Can I see the accounts?",
        answer: "Yes, leaseholders have the right to inspect accounts and receipts. Annual accounts are shared at the AGM and available on request. Service charge demands include a summary of spending."
      },
    ]
  },
  living: {
    title: "Living Here",
    faqs: [
      {
        question: "Can I make alterations to my flat?",
        answer: "Minor internal decorations don't require permission. Structural alterations, changes to plumbing/electrics, or anything affecting the building's appearance may require consent from the freeholder and/or RTM. Check your lease for specific requirements."
      },
      {
        question: "What are the noise rules?",
        answer: "Quiet hours are 10pm to 7am. During these times, please keep noise to a minimum. At all times, be considerate of neighbours, especially with music, TV, and impact noise like drilling."
      },
      {
        question: "Can I have pets?",
        answer: "The standard lease prohibits pets. If you already have a pet or wish to keep one, you would need to seek consent from the freeholder. Contact us to discuss options."
      },
      {
        question: "How does parking work?",
        answer: "Parking spaces are allocated to specific flats as per your lease. All vehicles must display a valid permit. Visitor parking is available in designated areas. Unauthorised vehicles may be fined or removed."
      },
      {
        question: "Can I rent out my flat?",
        answer: "Yes, subletting is generally permitted under the lease. You must notify the RTM and freeholder of any tenancy. Your tenant must follow building rules. You remain responsible for service charges."
      },
      {
        question: "How do I get extra keys/fobs?",
        answer: "Flat keys are your responsibility. For building fobs, contact Moonstone Block Management. A charge may apply for replacement fobs. Lost fobs should be reported immediately for security."
      },
      {
        question: "What are the rules for communal areas?",
        answer: "Communal areas must be kept clear at all times. No personal items in corridors. No smoking. No excessive noise. Treat areas with respect. Report any issues to building management."
      },
      {
        question: "Can I install a satellite dish?",
        answer: "External satellite dishes require consent from the freeholder and may affect the building's appearance. The building has communal TV infrastructure. Contact us to discuss your options."
      },
    ]
  },
  buyingSelling: {
    title: "Buying & Selling",
    faqs: [
      {
        question: "I'm buying a flat - what do I need to know?",
        answer: "Request a management information pack through your solicitor. Check service charge history and any planned major works. Review the RTM company accounts. Your solicitor will handle most enquiries."
      },
      {
        question: "I'm selling - what documents do I need?",
        answer: "You'll need a management information pack (often called an LPE1 form) from Moonstone. There may be a fee for this. Allow time for processing. Clear any outstanding service charges before completion."
      },
      {
        question: "How do I get a management information pack?",
        answer: "Contact Moonstone Block Management who will prepare the pack. There is a fee for this service. Standard turnaround is 5-10 working days. Urgent requests may incur additional fees."
      },
      {
        question: "Are there restrictions on selling?",
        answer: "There are no restrictions on selling your flat, but you must clear all outstanding service charges first. Inform Moonstone of the sale so they can update their records and direct demands to the new owner."
      },
      {
        question: "What's the process for change of ownership?",
        answer: "Your solicitor will handle the legal transfer. Ensure you provide forwarding details to Moonstone. The new owner should confirm their contact details with building management. Any deposits for fobs should be refunded."
      },
    ]
  },
  problems: {
    title: "Problems",
    faqs: [
      {
        question: "My neighbour is noisy - what should I do?",
        answer: "First try speaking to your neighbour politely. If the problem persists, report it to building management in writing with dates and times. Persistent noise may be escalated to environmental health or legal action."
      },
      {
        question: "There's a leak from the flat above",
        answer: "First, try to contact the resident above to make them aware. Report to building management immediately. If the leak is serious or during unsociable hours, use the emergency hotline. Keep evidence for any insurance claims."
      },
      {
        question: "I've lost my keys/fob",
        answer: "Report lost fobs to building management immediately so they can be deactivated for security. Replacement fobs are available for a fee. Flat keys are your responsibility - contact a locksmith."
      },
      {
        question: "The lift is broken - how long to fix?",
        answer: "Lift breakdowns are reported to our lift contractor immediately. Most issues are resolved within hours. Complex repairs may take longer. Updates are posted in building lobbies. Those with mobility issues should contact management."
      },
      {
        question: "My car was damaged in the car park",
        answer: "Report to building management and, if you suspect crime, to the police. Check if CCTV captured the incident (footage has limited retention). Claims should go through your car insurance. The RTM is not liable for vehicle damage."
      },
      {
        question: "Who do I complain to if unhappy with service?",
        answer: "First raise the issue with Moonstone Block Management. If unresolved, escalate to the RTM directors. All complaints receive a formal response. Serious concerns can be raised at general meetings."
      },
    ]
  },
};

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const allFaqs = Object.values(faqCategories).flatMap(category => 
    category.faqs.map(faq => ({ ...faq, category: category.title }))
  );

  const filteredFaqs = searchQuery
    ? allFaqs.filter(
        faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <Layout>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about living at Masshouse"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "FAQ" },
        ]}
      />

      <section className="section-padding">
        <div className="section-container">
          {/* Search */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Search Results */}
          {filteredFaqs && (
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-sm text-muted-foreground mb-4">
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found
              </p>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`search-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">
                            {faq.category}
                          </span>
                          {faq.question}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8 bg-muted rounded-lg">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No results found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try different keywords or <Link to="/contact" className="text-primary hover:underline">contact us</Link>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Category Tabs */}
          {!filteredFaqs && (
            <Tabs defaultValue="rtm" className="max-w-4xl mx-auto">
              <TabsList className="w-full flex flex-wrap justify-start gap-2 h-auto bg-transparent p-0 mb-8">
                {Object.entries(faqCategories).map(([key, category]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(faqCategories).map(([key, category]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`${key}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Still Have Questions */}
          <div className="max-w-2xl mx-auto mt-12 p-6 bg-secondary/50 rounded-lg text-center">
            <HelpCircle className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              Can't find the answer you're looking for? Get in touch with us.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
