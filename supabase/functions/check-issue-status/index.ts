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
    const { reference_number, email } = body;

    if (!reference_number || !email) {
      return new Response(
        JSON.stringify({ error: "Reference number and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Find the issue
    const { data: issue, error: issueError } = await supabase
      .from("issues")
      .select("*")
      .eq("reference_number", reference_number.toUpperCase())
      .eq("resident_email", email.toLowerCase())
      .single();

    if (issueError || !issue) {
      return new Response(
        JSON.stringify({ error: "Issue not found. Please check your reference number and email." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get status updates
    const { data: updates, error: updatesError } = await supabase
      .from("issue_updates")
      .select("*")
      .eq("issue_id", issue.id)
      .order("created_at", { ascending: true });

    if (updatesError) {
      console.error("Updates fetch error:", updatesError);
    }

    return new Response(
      JSON.stringify({ 
        issue: {
          reference_number: issue.reference_number,
          status: issue.status,
          category: issue.category,
          location: issue.location,
          issue_type: issue.issue_type,
          description: issue.description,
          created_at: issue.created_at,
          updated_at: issue.updated_at,
        },
        updates: updates || []
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
