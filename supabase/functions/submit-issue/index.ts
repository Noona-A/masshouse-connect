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
      issue_type,
      location,
      category,
      description,
      photo_urls,
    } = body;

    // Validate required fields
    if (!resident_name || !flat_number || !resident_email || !issue_type || !location || !category || !description) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate reference number
    const { data: refData, error: refError } = await supabase.rpc("generate_issue_reference");
    
    if (refError) {
      console.error("Reference generation error:", refError);
      return new Response(
        JSON.stringify({ error: "Failed to generate reference number" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const reference_number = refData;

    // Insert the issue
    const { data: issue, error: insertError } = await supabase
      .from("issues")
      .insert({
        reference_number,
        resident_name,
        flat_number,
        resident_email,
        resident_phone,
        issue_type,
        location,
        category,
        description,
        photo_urls: photo_urls || [],
        status: "reported",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create issue" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create initial status update
    await supabase.from("issue_updates").insert({
      issue_id: issue.id,
      status: "reported",
      notes: "Issue reported by resident",
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        reference_number,
        issue_id: issue.id 
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
