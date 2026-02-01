import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const {
      resident_name,
      flat_number,
      resident_email,
      resident_phone,
      guest_name,
      vehicle_registration,
      start_time,
      end_time,
      special_requirements,
    } = body;

    // Validate required fields
    if (!resident_name || !flat_number || !resident_email || !guest_name || !vehicle_registration || !start_time || !end_time) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate dates
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);
    
    if (startDate >= endDate) {
      return new Response(
        JSON.stringify({ error: "End time must be after start time" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (startDate < new Date()) {
      return new Response(
        JSON.stringify({ error: "Start time cannot be in the past" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate booking reference
    const { data: refData, error: refError } = await supabase.rpc("generate_parking_reference");
    
    if (refError) {
      console.error("Reference generation error:", refError);
      return new Response(
        JSON.stringify({ error: "Failed to generate booking reference" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const booking_reference = refData;

    // Insert the booking
    const { data: booking, error: insertError } = await supabase
      .from("parking_bookings")
      .insert({
        booking_reference,
        resident_name,
        flat_number,
        resident_email,
        resident_phone,
        guest_name,
        vehicle_registration: vehicle_registration.toUpperCase(),
        start_time,
        end_time,
        special_requirements,
        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create booking" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        booking_reference,
        booking_id: booking.id 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
