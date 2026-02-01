import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2, CheckCircle, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface IssueData {
  reference_number: string;
  status: string;
  category: string;
  location: string;
  issue_type: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface UpdateData {
  id: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  reported: { label: "Reported", color: "bg-blue-100 text-blue-800", icon: <AlertCircle className="h-4 w-4" /> },
  acknowledged: { label: "Acknowledged", color: "bg-purple-100 text-purple-800", icon: <Clock className="h-4 w-4" /> },
  in_progress: { label: "In Progress", color: "bg-yellow-100 text-yellow-800", icon: <Clock className="h-4 w-4" /> },
  resolved: { label: "Resolved", color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-4 w-4" /> },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-800", icon: <CheckCircle className="h-4 w-4" /> },
};

const CheckIssueStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [issue, setIssue] = useState<IssueData | null>(null);
  const [updates, setUpdates] = useState<UpdateData[]>([]);
  const [formData, setFormData] = useState({
    reference: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIssue(null);
    setUpdates([]);

    try {
      const { data, error } = await supabase.functions.invoke("check-issue-status", {
        body: {
          reference_number: formData.reference,
          email: formData.email,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setIssue(data.issue);
      setUpdates(data.updates || []);
    } catch (error: any) {
      console.error("Lookup error:", error);
      toast({
        title: "Issue Not Found",
        description: error.message || "Please check your reference number and email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    return statusConfig[status] || { label: status, color: "bg-gray-100 text-gray-800", icon: <Clock className="h-4 w-4" /> };
  };

  return (
    <Layout>
      <PageHero
        title="Check Issue Status"
        subtitle="Track the progress of your reported issue"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Check Issue Status" },
        ]}
      />

      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            {/* Search Form */}
            <div className="bg-card rounded-lg border border-border p-6 md:p-8 mb-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reference">Reference Number *</Label>
                    <Input 
                      id="reference" 
                      required 
                      placeholder="e.g., MSH-123456"
                      value={formData.reference}
                      onChange={(e) => setFormData({ ...formData, reference: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Check Status
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Results */}
            {issue && (
              <div className="bg-card rounded-lg border border-border p-6 md:p-8">
                {/* Issue Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Reference</p>
                    <p className="text-xl font-bold text-primary">{issue.reference_number}</p>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusInfo(issue.status).color}`}>
                    {getStatusInfo(issue.status).icon}
                    {getStatusInfo(issue.status).label}
                  </div>
                </div>

                {/* Issue Details */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium capitalize">{issue.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium capitalize">{issue.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Priority</p>
                    <p className="font-medium capitalize">{issue.issue_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reported On</p>
                    <p className="font-medium">{format(new Date(issue.created_at), "dd MMM yyyy, HH:mm")}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="text-sm bg-muted p-3 rounded-lg">{issue.description}</p>
                </div>

                {/* Timeline */}
                {updates.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-4">Status Timeline</h3>
                    <div className="space-y-4">
                      {updates.map((update, index) => (
                        <div key={update.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${index === updates.length - 1 ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                            {index < updates.length - 1 && <div className="w-0.5 h-full bg-border mt-1" />}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getStatusInfo(update.status).color}`}>
                                {getStatusInfo(update.status).label}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(update.created_at), "dd MMM yyyy, HH:mm")}
                              </span>
                            </div>
                            {update.notes && (
                              <p className="text-sm text-muted-foreground">{update.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Help Text */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Can't find your issue? <Link to="/report-issue" className="text-primary hover:underline">Report a new issue</Link></p>
              <p className="mt-2">Need help? <Link to="/contact" className="text-primary hover:underline">Contact us</Link></p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckIssueStatus;
