import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle, Phone, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ReportIssue = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const { data, error } = await supabase.functions.invoke("submit-issue", {
        body: {
          resident_name: formData.get("name"),
          flat_number: formData.get("flat"),
          resident_email: formData.get("email"),
          resident_phone: formData.get("phone") || null,
          issue_type: formData.get("urgency"),
          location: formData.get("location"),
          category: formData.get("category"),
          description: formData.get("description"),
        },
      });

      if (error) throw error;

      setReferenceNumber(data.reference_number);
      setSubmitted(true);
      
      toast({
        title: "Issue Reported",
        description: `Reference: ${data.reference_number}`,
      });
    } catch (error) {
      console.error("Error submitting issue:", error);
      toast({
        title: "Error",
        description: "Failed to submit issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <PageHero
          title="Issue Reported"
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Report an Issue" },
          ]}
        />
        
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
              <p className="text-muted-foreground mb-6">
                Your issue has been reported successfully. We'll review it and respond as soon as possible.
              </p>
              
              <div className="bg-muted rounded-lg p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Your Reference Number</p>
                <p className="text-2xl font-bold text-primary">#{referenceNumber}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Please keep this for your records
                </p>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground mb-6">
                <p>
                  <strong>What happens next?</strong><br />
                  You'll receive an email confirmation shortly. Our team will assess your report and contact you within 1-2 working days for routine issues.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setSubmitted(false)} variant="outline">
                  Report Another Issue
                </Button>
                <Button onClick={() => window.location.href = '/'}>
                  Return to Homepage
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero
        title="Report a Building Issue"
        subtitle="Report communal area problems to our building management team"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Report an Issue" },
        ]}
      />

      {/* Emergency Warning */}
      <div className="bg-destructive/10 border-b border-destructive/20">
        <div className="section-container py-4">
          <div className="flex items-center gap-3 text-destructive">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm">
              <strong>For emergencies</strong> (fire, flood, security breach), call our 24/7 hotline: {" "}
              <a href="tel:0121XXXXXXX" className="font-bold hover:underline inline-flex items-center gap-1">
                <Phone className="h-4 w-4" />
                0121 XXX XXXX
              </a>
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="section-container">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="bg-card rounded-lg border border-border p-6 md:p-8">
              <div className="space-y-6">
                {/* Name */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input id="name" name="name" required placeholder="Full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flat">Flat Number *</Label>
                    <Input id="flat" name="flat" required placeholder="e.g., M123 or H234" />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" required placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="07XXX XXXXXX" />
                  </div>
                </div>

                {/* Issue Type */}
                <div className="space-y-2">
                  <Label htmlFor="urgency">Issue Urgency *</Label>
                  <Select name="urgency" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">🚨 Emergency (immediate danger)</SelectItem>
                      <SelectItem value="urgent">⚠️ Urgent (within 24 hours)</SelectItem>
                      <SelectItem value="routine">📋 Routine (within 5 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Building/Location *</Label>
                  <Select name="location" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masshouse">Masshouse Building</SelectItem>
                      <SelectItem value="hive">The Hive Building</SelectItem>
                      <SelectItem value="carpark">Shared Underground Car Park</SelectItem>
                      <SelectItem value="external">External/Grounds</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category *</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security">Security/Safety</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="lift">Lift</SelectItem>
                      <SelectItem value="lighting">Lighting</SelectItem>
                      <SelectItem value="heating">Heating/Hot Water</SelectItem>
                      <SelectItem value="plumbing">Plumbing/Drainage</SelectItem>
                      <SelectItem value="doors">Doors/Access/Keys</SelectItem>
                      <SelectItem value="vandalism">Vandalism/Damage</SelectItem>
                      <SelectItem value="noise">Noise Disturbance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    required 
                    rows={5}
                    placeholder="Please describe the issue in detail. Include specific location (floor, area), when you first noticed it, and any other relevant information."
                  />
                </div>

                {/* Contact Preference */}
                <div className="space-y-2">
                  <Label>Preferred Contact Method</Label>
                  <RadioGroup defaultValue="email" name="contact_preference">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="contact_email" />
                        <Label htmlFor="contact_email" className="font-normal">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="contact_phone" />
                        <Label htmlFor="contact_phone" className="font-normal">Phone</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Note about photos */}
                <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                  <p>
                    <strong>💡 Tip:</strong> If you have photos of the issue, please email them separately to{" "}
                    <a href="mailto:support@masshousertm.co.uk" className="text-primary hover:underline">
                      support@masshousertm.co.uk
                    </a>{" "}
                    after submitting this form, referencing your flat number.
                  </p>
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Issue Report"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default ReportIssue;
