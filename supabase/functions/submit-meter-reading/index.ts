import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface MeterReadingRequest {
  residentName: string;
  flatNumber: string;
  email: string;
  phone?: string;
  meterType: 'electricity' | 'gas' | 'water';
  preferredDate?: string;
  additionalNotes?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: MeterReadingRequest = await req.json();
    console.log('Received meter reading request:', body);

    // Validate required fields
    if (!body.residentName || !body.flatNumber || !body.email || !body.meterType) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.error('Invalid email format:', body.email);
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate reference number
    const { data: refData, error: refError } = await supabase.rpc('generate_meter_reference');
    
    if (refError) {
      console.error('Error generating reference:', refError);
      return new Response(
        JSON.stringify({ error: 'Failed to generate reference number' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const referenceNumber = refData;
    console.log('Generated reference number:', referenceNumber);

    // Insert meter reading request
    const { data, error } = await supabase
      .from('meter_readings')
      .insert({
        resident_name: body.residentName,
        flat_number: body.flatNumber,
        email: body.email,
        phone: body.phone || null,
        meter_type: body.meterType,
        preferred_date: body.preferredDate || null,
        additional_notes: body.additionalNotes || null,
        reference_number: referenceNumber,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting meter reading:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to submit meter reading request' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Meter reading request submitted successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        referenceNumber,
        message: 'Meter reading request submitted successfully'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
