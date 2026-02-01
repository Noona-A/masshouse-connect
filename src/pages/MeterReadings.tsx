import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "@/components/layout/Layout";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Gauge, CheckCircle } from "lucide-react";

const formSchema = z.object({
  residentName: z.string().min(2, "Name must be at least 2 characters"),
  flatNumber: z.string().min(1, "Flat number is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  meterType: z.enum(["electricity", "gas", "water"], {
    required_error: "Please select a meter type",
  }),
  preferredDate: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const MeterReadings = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      residentName: "",
      flatNumber: "",
      email: "",
      phone: "",
      meterType: undefined,
      preferredDate: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate submission - in production this would call an edge function
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Meter reading request submitted:", data);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Request Submitted",
      description: "Your meter reading request has been received. We'll be in touch soon.",
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <PageHero 
          title="Meter Reading Request" 
          subtitle="Request a meter reading for your property"
        />
        <section className="section-padding">
          <div className="section-container max-w-2xl">
            <Card className="text-center">
              <CardContent className="pt-10 pb-10">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Request Submitted Successfully</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your meter reading request. Our team will process your request and contact you to arrange a suitable time.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>Submit Another Request</Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero 
        title="Meter Reading Request" 
        subtitle="Request a meter reading for your property"
      />
      
      <section className="section-padding">
        <div className="section-container max-w-2xl">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Request a Meter Reading</CardTitle>
                  <CardDescription>
                    Fill out this form to request a meter reading for your flat
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="residentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="flatNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Flat Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 101" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="07xxx xxxxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="meterType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meter Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the type of meter" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="electricity">Electricity</SelectItem>
                            <SelectItem value="gas">Gas</SelectItem>
                            <SelectItem value="water">Water</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>
                          Let us know if you have a preferred date for the reading
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any additional information or access instructions..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default MeterReadings;
