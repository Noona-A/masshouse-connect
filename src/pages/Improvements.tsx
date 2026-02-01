import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { HardHat, CheckCircle, Clock, Calendar, PoundSterling, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

const currentProjects = [
  {
    name: "Enhanced CCTV Coverage",
    status: "In Progress",
    progress: 60,
    description: "Installing additional CCTV cameras to improve security coverage in car park and entry points.",
    completion: "March 2025",
    cost: "Included in reserve fund",
  },
  {
    name: "Communal Area Lighting Upgrade",
    status: "Planned",
    progress: 0,
    description: "Upgrading all communal corridor lighting to energy-efficient LED systems.",
    completion: "Q2 2025",
    cost: "Included in 2025 budget",
  },
  {
    name: "Fire Door Inspection & Replacement",
    status: "In Progress",
    progress: 40,
    description: "Systematic inspection and replacement of fire doors not meeting current safety standards.",
    completion: "April 2025",
    cost: "Reserve fund allocation",
  },
];

const completedWorks = [
  {
    name: "Car Park Lighting Upgrade",
    completedDate: "December 2024",
    outcome: "50% reduction in energy costs, improved safety and visibility",
  },
  {
    name: "Entry System Upgrade",
    completedDate: "November 2024",
    outcome: "New intercom system with video capability installed at main entrances",
  },
  {
    name: "Lift Modernisation - Phase 1",
    completedDate: "October 2024",
    outcome: "Control systems upgraded in both buildings, improved reliability",
  },
];

const plannedMaintenance = [
  { work: "Annual fire alarm testing", when: "February 2025", cost: "Service contract" },
  { work: "Window cleaning - external", when: "March 2025", cost: "Included in budget" },
  { work: "Gutter cleaning", when: "April 2025", cost: "Included in budget" },
  { work: "Emergency lighting test", when: "Monthly", cost: "Service contract" },
  { work: "Lift service", when: "Quarterly", cost: "Service contract" },
  { work: "Communal redecoration", when: "2026", cost: "Reserve fund" },
];

const Improvements = () => {
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false);

  const handleSuggestionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuggestionSubmitted(true);
    toast({
      title: "Suggestion Received",
      description: "Thank you! We'll review your suggestion at the next board meeting.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-accent text-accent-foreground";
      case "Planned":
        return "bg-secondary text-secondary-foreground";
      case "Completing":
        return "bg-green-100 text-green-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      <PageHero
        title="Building Improvements & Planned Works"
        subtitle="Keeping you informed about ongoing and upcoming projects"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Improvements" },
        ]}
      />

      {/* Current Projects */}
      <section className="section-padding">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <HardHat className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Current Projects</h2>
              <p className="text-muted-foreground">Work currently underway or planned for the near future</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.map((project, index) => (
              <div 
                key={index}
                className="bg-card rounded-lg border border-border overflow-hidden"
              >
                <div className="h-1.5 bg-primary" style={{ width: `${project.progress}%` }} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <span className={`shrink-0 text-xs font-medium px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  
                  {project.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Expected: {project.completion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <PoundSterling className="h-4 w-4" />
                      <span>{project.cost}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Works */}
      <section className="section-padding bg-muted">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Recently Completed</h2>
              <p className="text-muted-foreground">Works successfully completed in the past year</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {completedWorks.map((work, index) => (
              <div 
                key={index}
                className="bg-card rounded-lg border border-border p-6"
              >
                <div className="flex items-center gap-2 text-green-600 mb-3">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <h3 className="font-semibold mb-2">{work.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{work.outcome}</p>
                <p className="text-xs text-muted-foreground">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {work.completedDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planned Maintenance */}
      <section className="section-padding">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Planned Maintenance Schedule</h2>
              <p className="text-muted-foreground">Routine maintenance and forward planning</p>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Work Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">When</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold hidden sm:table-cell">Funding</th>
                </tr>
              </thead>
              <tbody>
                {plannedMaintenance.map((item, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="px-4 py-3">{item.work}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.when}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{item.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Submit Suggestion */}
      <section className="section-padding bg-secondary/30">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Submit an Improvement Suggestion</h2>
              <p className="text-muted-foreground">
                Have an idea for improving our buildings? We'd love to hear from you.
              </p>
            </div>

            {suggestionSubmitted ? (
              <div className="bg-card rounded-lg border border-border p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-4">
                  Your suggestion has been received. We review all suggestions at our monthly board meetings.
                </p>
                <Button variant="outline" onClick={() => setSuggestionSubmitted(false)}>
                  Submit Another Suggestion
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSuggestionSubmit} className="bg-card rounded-lg border border-border p-6">
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="suggestionName">Your Name</Label>
                      <Input id="suggestionName" required placeholder="Full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="suggestionFlat">Flat Number</Label>
                      <Input id="suggestionFlat" required placeholder="e.g., M123" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="suggestion">Your Suggestion</Label>
                    <Textarea 
                      id="suggestion" 
                      required 
                      rows={4}
                      placeholder="Please describe your improvement idea..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Why Would This Help?</Label>
                    <Textarea 
                      id="reason" 
                      rows={3}
                      placeholder="Explain the benefits of this improvement..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Suggestion
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Improvements;
