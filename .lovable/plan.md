

# Implementation Plan: Form Submissions + Email Notifications

## Summary

There are **two issues** to fix:

1. **ReportIssue form** is NOT calling the backend - it only simulates a submission with a timeout (line 29: `await new Promise(resolve => setTimeout(resolve, 1500))`)
2. **No email notifications** are being sent after successful submissions for any of the three forms

The MeterReadings and BookParking forms ARE correctly calling the edge functions and saving to the database. Only the ReportIssue form is broken.

---

## What Will Be Fixed

### 1. ReportIssue Form (Not Saving to Database)

The current code generates a fake reference locally and never calls the edge function:

```typescript
// Current broken code (lines 24-35)
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay!
  const ref = `MH${Date.now().toString().slice(-6)}`; // Fake reference!
  // Never calls the backend...
};
```

I will update this to call the `submit-issue` edge function properly, similar to how BookParking works.

---

### 2. Email Notifications (All 3 Forms)

Currently, none of the edge functions send confirmation emails. I will create a new **send-email** edge function that uses Lovable AI to generate professional confirmation emails and send them via Resend.

#### Email Flow:
```
Form Submit -> Edge Function (save to DB) -> Call send-email function -> Email sent to resident
```

#### Emails will include:
- Reference number prominently displayed
- Summary of submission details
- Expected next steps
- Contact information

---

## Files to Create/Modify

### New Files

| File | Purpose |
|------|---------|
| `supabase/functions/send-email/index.ts` | New edge function to send emails using Resend |

### Modified Files

| File | Changes |
|------|---------|
| `src/pages/ReportIssue.tsx` | Update to call the `submit-issue` edge function instead of simulating |
| `supabase/functions/submit-issue/index.ts` | Add email notification after successful insert |
| `supabase/functions/submit-meter-reading/index.ts` | Add email notification after successful insert |
| `supabase/functions/submit-parking-booking/index.ts` | Add email notification after successful insert |

---

## Technical Details

### send-email Edge Function

This function will:
- Accept email parameters (to, subject, type, data)
- Use Resend API to send beautifully formatted HTML emails
- Support different email types: issue_confirmation, meter_confirmation, parking_confirmation

### Email Templates

Each email type will include:
- Professional header with Masshouse branding
- Clear reference number
- Submission summary
- Next steps information
- Footer with contact details

### Required Secret

A **RESEND_API_KEY** secret will need to be configured:
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (for custom from address) or use their test domain
3. Create an API key

---

## Implementation Order

1. Update ReportIssue.tsx to properly call the edge function
2. Create the send-email edge function
3. Update submit-issue to call send-email after insert
4. Update submit-meter-reading to call send-email after insert
5. Update submit-parking-booking to call send-email after insert
6. Test all three forms end-to-end

