# n8n Lead Automation Setup Guide

## Overview
This guide shows you how to set up n8n automation to process leads from your tax savings quiz funnel.

## Lead Data Structure
The quiz sends this data to your webhook:

```json
{
  "firstName": "John",
  "lastName": "Smith", 
  "email": "john@company.com",
  "phone": "(555) 123-4567",
  "company": "Smith Industries",
  "quizAnswers": {
    "revenue": "2m-5m",
    "industry": "medical", 
    "taxApproach": "once-year"
  },
  "resultType": "high-opportunity",
  "timestamp": "2024-10-21T20:19:00.000Z",
  "source": "tax-savings-quiz",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://google.com"
}
```

## n8n Workflow Setup

### Step 1: Create Webhook Node
1. **Add Webhook Node** in n8n
2. **Set HTTP Method**: POST
3. **Copy the webhook URL** (looks like: `https://your-n8n.domain.com/webhook/abc123`)
4. **Update quiz code**: Replace `YOUR_N8N_WEBHOOK_URL_HERE` with your actual URL

### Step 2: Process Lead Data
Add these nodes after the webhook:

#### A. **Set Node** - Clean & Format Data
```javascript
// Clean phone number
const phone = $json.phone ? $json.phone.replace(/\D/g, '') : '';

// Format company name
const company = $json.company || 'Not provided';

// Determine priority based on quiz answers
let priority = 'Medium';
if ($json.resultType === 'high-opportunity') priority = 'High';
if ($json.resultType === 'low-opportunity') priority = 'Low';

// Create lead score
let leadScore = 50;
if ($json.quizAnswers.revenue === '2m-5m' || $json.quizAnswers.revenue === '5m-10m') leadScore += 20;
if ($json.quizAnswers.taxApproach === 'once-year' || $json.quizAnswers.taxApproach === 'self-done') leadScore += 30;

return {
  firstName: $json.firstName,
  lastName: $json.lastName,
  email: $json.email,
  phone: phone,
  company: company,
  priority: priority,
  leadScore: leadScore,
  source: 'Tax Savings Quiz',
  quizData: $json.quizAnswers,
  resultType: $json.resultType,
  submittedAt: $json.timestamp
};
```

#### B. **CRM Integration** (Choose one):

**Option 1: HubSpot**
- Add HubSpot node
- Action: "Create Contact"
- Map fields from Set node

**Option 2: Salesforce** 
- Add Salesforce node
- Action: "Create Lead"
- Map fields from Set node

**Option 3: Airtable**
- Add Airtable node
- Action: "Create Record"
- Map fields to your base

**Option 4: Google Sheets**
- Add Google Sheets node
- Action: "Append Row"
- Map data to columns

#### C. **Email Notifications**
Add Gmail/Outlook node to notify your team:

```
Subject: 🔥 New High-Priority Lead from Tax Quiz

Hi Team,

New lead from the tax savings quiz:

Name: {{$json.firstName}} {{$json.lastName}}
Email: {{$json.email}}
Company: {{$json.company}}
Phone: {{$json.phone}}

Quiz Results:
- Revenue: {{$json.quizData.revenue}}
- Industry: {{$json.quizData.industry}}  
- Current CPA Approach: {{$json.quizData.taxApproach}}
- Result Type: {{$json.resultType}}
- Lead Score: {{$json.leadScore}}/100

Priority: {{$json.priority}}

Follow up ASAP!
```

#### D. **Slack Notification** (Optional)
Add Slack node for instant team alerts:

```
🎯 New Tax Quiz Lead!

*{{$json.firstName}} {{$json.lastName}}* from {{$json.company}}
📧 {{$json.email}} | 📱 {{$json.phone}}

💰 Revenue: {{$json.quizData.revenue}}
🏢 Industry: {{$json.quizData.industry}}
📊 Lead Score: {{$json.leadScore}}/100
🚨 Priority: {{$json.priority}}

Quiz completed at {{$json.submittedAt}}
```

### Step 3: Error Handling
Add **Error Trigger** node to handle failed webhook calls:
- Log errors to file
- Send error notifications
- Retry failed requests

### Step 4: Testing
1. **Test webhook** with sample data
2. **Complete quiz** on your site
3. **Verify data** appears in your CRM
4. **Check notifications** are sent

## Activating the Integration

### In your quiz file:
1. Open `quiz-simple.html`
2. Find line ~808: `const webhookUrl = 'YOUR_N8N_WEBHOOK_URL_HERE';`
3. Replace with your actual webhook URL
4. Uncomment the fetch code (lines 811-823)
5. Save and test!

## Data Storage Locations

### Current Storage (before n8n setup):
- **Browser Console**: All quiz data logged
- **localStorage**: Lead data saved locally
- **Format**: `quizLead_[timestamp]`

### After n8n Setup:
- **n8n Database**: Webhook execution logs
- **Your CRM**: Contact/lead records  
- **Email**: Notifications to team
- **Slack**: Real-time alerts

## Advanced Features

### Lead Scoring Algorithm:
```javascript
let score = 50; // Base score

// Revenue scoring
if (revenue === '2m-5m') score += 20;
if (revenue === '5m-10m') score += 25; 
if (revenue === 'over-10m') score += 30;

// Tax approach scoring  
if (taxApproach === 'once-year') score += 30;
if (taxApproach === 'self-done') score += 35;
if (taxApproach === 'quarterly-reactive') score += 15;

// Industry scoring
if (industry === 'medical') score += 10;
if (industry === 'production') score += 15;

return Math.min(score, 100); // Cap at 100
```

### Follow-up Automation:
1. **Immediate**: Welcome email with calendar link
2. **Day 1**: Case study relevant to their industry  
3. **Day 3**: Personal video from CPA
4. **Day 7**: Final follow-up with special offer

### Analytics Tracking:
- Quiz completion rate
- Lead quality by traffic source
- Conversion rate by result type
- Revenue attribution

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure n8n allows your domain
2. **Webhook Not Firing**: Check URL and HTTP method
3. **Missing Data**: Verify form field names match
4. **CRM Failures**: Check API credentials and field mapping

### Debug Steps:
1. Check browser console for errors
2. Test webhook with Postman
3. Review n8n execution logs
4. Verify CRM API responses

## Security Notes
- Use HTTPS for webhook URLs
- Validate incoming data in n8n
- Sanitize user inputs
- Rate limit webhook calls
- Monitor for spam submissions

---

**Need help?** Check the n8n documentation or reach out for support!
