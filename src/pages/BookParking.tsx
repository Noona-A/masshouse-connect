import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, Car, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const BookParking = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [formData, setFormData] = useState({
    resident_name: "",
    flat_number: "",
    resident_email: "",
    resident_phone: "",
    guest_name: "",
    vehicle_registration: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    special_requirements: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const startDateTime = `${formData.start_date}T${formData.start_time}:00`;
      const endDateTime = `${formData.end_date}T${formData.end_time}:00`;

      const { data, error } = await supabase.functions.invoke("submit-parking-booking", {
        body: {
          resident_name: formData.resident_name,
          flat_number: formData.flat_number,
          resident_email: formData.resident_email,
          resident_phone: formData.resident_phone || null,
          guest_name: formData.guest_name,
          vehicle_registration: formData.vehicle_registration,
          start_time: startDateTime,
          end_time: endDateTime,
          special_requirements: formData.special_requirements || null,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setBookingReference(data.booking_reference);
      setSubmitted(true);
      
      toast({
        title: "Booking Submitted",
        description: `Reference: ${data.booking_reference}`,
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <Layout>
        <PageHero
          title="Booking Submitted"
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Book Guest Parking" },
          ]}
        />
        
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Booking Request Received!</h2>
              <p className="text-muted-foreground mb-6">
                Your parking booking request has been submitted and is pending approval.
              </p>
              
              <div className="bg-muted rounded-lg p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Your Booking Reference</p>
                <p className="text-2xl font-bold text-primary">{bookingReference}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Please keep this for your records
                </p>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 text-sm text-muted-foreground mb-6">
                <p>
                  <strong>What happens next?</strong><br />
                  Our management team will review your request and approve or reject it within 24 hours. You'll receive an email notification with the outcome.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    resident_name: "",
                    flat_number: "",
                    resident_email: "",
                    resident_phone: "",
                    guest_name: "",
                    vehicle_registration: "",
                    start_date: "",
                    start_time: "",
                    end_date: "",
                    end_time: "",
                    special_requirements: "",
                  });
                }} variant="outline">
                  Book Another Space
                </Button>
                <Button asChild>
                  <Link to="/">Return to Homepage</Link>
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
        title="Book Guest Parking"
        subtitle="Reserve a visitor parking space for your guests"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Book Guest Parking" },
        ]}
      />

      {/* Info Banner */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="section-container py-4">
          <div className="flex items-center gap-3 text-primary">
            <Car className="h-5 w-5 shrink-0" />
            <p className="text-sm">
              <strong>Visitor parking is limited.</strong> Please book at least 24 hours in advance. Maximum stay is 48 hours.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="section-container">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="bg-card rounded-lg border border-border p-6 md:p-8">
              <div className="space-y-6">
                {/* Resident Details */}
                <div className="border-b border-border pb-4 mb-4">
                  <h3 className="text-lg font-semibold mb-4">Your Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="resident_name">Your Name *</Label>
                      <Input 
                        id="resident_name" 
                        required 
                        placeholder="Full name"
                        value={formData.resident_name}
                        onChange={(e) => setFormData({ ...formData, resident_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="flat_number">Flat Number *</Label>
                      <Input 
                        id="flat_number" 
                        required 
                        placeholder="e.g., M123 or H234"
                        value={formData.flat_number}
                        onChange={(e) => setFormData({ ...formData, flat_number: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="resident_email">Email Address *</Label>
                      <Input 
                        id="resident_email" 
                        type="email" 
                        required 
                        placeholder="your@email.com"
                        value={formData.resident_email}
                        onChange={(e) => setFormData({ ...formData, resident_email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resident_phone">Phone Number</Label>
                      <Input 
                        id="resident_phone" 
                        type="tel" 
                        placeholder="07XXX XXXXXX"
                        value={formData.resident_phone}
                        onChange={(e) => setFormData({ ...formData, resident_phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Guest Details */}
                <div className="border-b border-border pb-4 mb-4">
                  <h3 className="text-lg font-semibold mb-4">Guest Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guest_name">Guest Name *</Label>
                      <Input 
                        id="guest_name" 
                        required 
                        placeholder="Guest's full name"
                        value={formData.guest_name}
                        onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle_registration">Vehicle Registration *</Label>
                      <Input 
                        id="vehicle_registration" 
                        required 
                        placeholder="e.g., AB12 CDE"
                        value={formData.vehicle_registration}
                        onChange={(e) => setFormData({ ...formData, vehicle_registration: e.target.value.toUpperCase() })}
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Times */}
                <div className="border-b border-border pb-4 mb-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Booking Period
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start_date">Start Date *</Label>
                      <Input 
                        id="start_date" 
                        type="date" 
                        required 
                        min={today}
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="start_time">Start Time *</Label>
                      <Input 
                        id="start_time" 
                        type="time" 
                        required 
                        value={formData.start_time}
                        onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="end_date">End Date *</Label>
                      <Input 
                        id="end_date" 
                        type="date" 
                        required 
                        min={formData.start_date || today}
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end_time">End Time *</Label>
                      <Input 
                        id="end_time" 
                        type="time" 
                        required 
                        value={formData.end_time}
                        onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="special_requirements">Special Requirements (Optional)</Label>
                  <Textarea 
                    id="special_requirements" 
                    rows={3}
                    placeholder="e.g., Disabled parking space needed, larger vehicle, etc."
                    value={formData.special_requirements}
                    onChange={(e) => setFormData({ ...formData, special_requirements: e.target.value })}
                  />
                </div>

                {/* Terms */}
                <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                  <p><strong>Please note:</strong></p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Visitor parking is subject to availability and approval</li>
                    <li>Maximum parking duration is 48 hours</li>
                    <li>Vehicles must display a valid permit (sent via email upon approval)</li>
                    <li>Overstaying may result in a parking charge notice</li>
                  </ul>
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Booking Request"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default BookParking;
