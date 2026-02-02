import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  type: "issue_confirmation" | "parking_confirmation" | "meter_confirmation";
  data: Record<string, string>;
}

const generateIssueEmail = (data: Record<string, string>) => {
  return {
    subject: `Issue Report Received - ${data.reference_number}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Masshouse RTM</h1>
          <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 14px;">Building Issue Report Confirmation</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
          <h2 style="color: #1e3a5f; margin-top: 0;">Thank you for your report</h2>
          
          <p>Dear ${data.resident_name},</p>
          
          <p>We have received your issue report and our team will review it shortly.</p>
          
          <div style="background: white; border: 2px solid #1e3a5f; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666;">Your Reference Number</p>
            <p style="margin: 0; font-size: 28px; font-weight: bold; color: #1e3a5f;">${data.reference_number}</p>
          </div>
          
          <h3 style="color: #1e3a5f; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">Report Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Flat Number:</td><td style="padding: 8px 0; font-weight: bold;">${data.flat_number}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Location:</td><td style="padding: 8px 0; font-weight: bold;">${data.location}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Category:</td><td style="padding: 8px 0; font-weight: bold;">${data.category}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Urgency:</td><td style="padding: 8px 0; font-weight: bold;">${data.issue_type}</td></tr>
          </table>
          
          <div style="background: #e8f4fd; border-left: 4px solid #1e3a5f; padding: 15px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0; color: #1e3a5f;">What happens next?</h4>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Our team will review your report within 1-2 working days</li>
              <li>You may be contacted for additional information</li>
              <li>Updates will be sent to this email address</li>
            </ul>
          </div>
          
          <p style="color: #666; font-size: 14px;">If you have any questions, please contact us at <a href="mailto:support@masshousertm.co.uk" style="color: #1e3a5f;">support@masshousertm.co.uk</a></p>
        </div>
        
        <div style="background: #1e3a5f; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #e0e0e0; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Masshouse RTM Ltd. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  };
};

const generateParkingEmail = (data: Record<string, string>) => {
  return {
    subject: `Guest Parking Booking - ${data.booking_reference}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Masshouse RTM</h1>
          <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 14px;">Guest Parking Booking Confirmation</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
          <h2 style="color: #1e3a5f; margin-top: 0;">Booking Received</h2>
          
          <p>Dear ${data.resident_name},</p>
          
          <p>We have received your guest parking booking request. It is currently pending approval.</p>
          
          <div style="background: white; border: 2px solid #1e3a5f; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666;">Your Booking Reference</p>
            <p style="margin: 0; font-size: 28px; font-weight: bold; color: #1e3a5f;">${data.booking_reference}</p>
          </div>
          
          <h3 style="color: #1e3a5f; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">Booking Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Guest Name:</td><td style="padding: 8px 0; font-weight: bold;">${data.guest_name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Vehicle Registration:</td><td style="padding: 8px 0; font-weight: bold;">${data.vehicle_registration}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Start Time:</td><td style="padding: 8px 0; font-weight: bold;">${data.start_time}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">End Time:</td><td style="padding: 8px 0; font-weight: bold;">${data.end_time}</td></tr>
          </table>
          
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0; color: #856404;">⏳ Pending Approval</h4>
            <p style="margin: 0; color: #856404;">Your booking is awaiting approval from building management. You will receive another email once it has been reviewed.</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">If you have any questions, please contact us at <a href="mailto:support@masshousertm.co.uk" style="color: #1e3a5f;">support@masshousertm.co.uk</a></p>
        </div>
        
        <div style="background: #1e3a5f; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #e0e0e0; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Masshouse RTM Ltd. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  };
};

const generateMeterEmail = (data: Record<string, string>) => {
  return {
    subject: `Meter Reading Request - ${data.reference_number}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Masshouse RTM</h1>
          <p style="color: #e0e0e0; margin: 10px 0 0 0; font-size: 14px;">Meter Reading Request Confirmation</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
          <h2 style="color: #1e3a5f; margin-top: 0;">Request Received</h2>
          
          <p>Dear ${data.resident_name},</p>
          
          <p>We have received your meter reading request. Our team will schedule a visit to take the reading.</p>
          
          <div style="background: white; border: 2px solid #1e3a5f; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #666;">Your Reference Number</p>
            <p style="margin: 0; font-size: 28px; font-weight: bold; color: #1e3a5f;">${data.reference_number}</p>
          </div>
          
          <h3 style="color: #1e3a5f; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">Request Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Flat Number:</td><td style="padding: 8px 0; font-weight: bold;">${data.flat_number}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Meter Type:</td><td style="padding: 8px 0; font-weight: bold;">${data.meter_type}</td></tr>
            ${data.preferred_date ? `<tr><td style="padding: 8px 0; color: #666;">Preferred Date:</td><td style="padding: 8px 0; font-weight: bold;">${data.preferred_date}</td></tr>` : ''}
          </table>
          
          <div style="background: #e8f4fd; border-left: 4px solid #1e3a5f; padding: 15px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0; color: #1e3a5f;">What happens next?</h4>
            <ul style="margin: 0; padding-left: 20px;">
              <li>We will schedule a visit based on your preferences</li>
              <li>You will receive a confirmation with the scheduled date</li>
              <li>Please ensure access to the meter on the scheduled day</li>
            </ul>
          </div>
          
          <p style="color: #666; font-size: 14px;">If you have any questions, please contact us at <a href="mailto:support@masshousertm.co.uk" style="color: #1e3a5f;">support@masshousertm.co.uk</a></p>
        </div>
        
        <div style="background: #1e3a5f; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #e0e0e0; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} Masshouse RTM Ltd. All rights reserved.</p>
        </div>
      </body>
      </html>
    `,
  };
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, type, data }: EmailRequest = await req.json();

    if (!to || !type || !data) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let emailContent: { subject: string; html: string };

    switch (type) {
      case "issue_confirmation":
        emailContent = generateIssueEmail(data);
        break;
      case "parking_confirmation":
        emailContent = generateParkingEmail(data);
        break;
      case "meter_confirmation":
        emailContent = generateMeterEmail(data);
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Invalid email type" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    console.log(`Sending ${type} email to ${to}`);

    const { data: emailResponse, error } = await resend.emails.send({
      from: "Masshouse RTM <noreply@resend.dev>",
      to: [to],
      subject: emailContent.subject,
      html: emailContent.html,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: error }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, messageId: emailResponse?.id }),
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
