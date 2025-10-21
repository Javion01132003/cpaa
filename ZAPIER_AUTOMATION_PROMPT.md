# Zapier Automation Prompt for Tax Quiz Lead Processing

Copy and paste this prompt into Zapier's AI automation builder to create your complete lead processing workflow:

---

## ZAPIER AUTOMATION PROMPT

```
Create a comprehensive lead processing automation for a CPA firm's tax savings quiz funnel with the following workflow:

TRIGGER: Webhook (Catch Hook)
- Receives POST requests from tax savings quiz
- Expected data structure:
  {
    "firstName": "string",
    "lastName": "string", 
    "email": "string",
    "phone": "string",
    "company": "string",
    "quizAnswers": {
      "revenue": "under-2m|2m-5m|5m-10m|over-10m|other: [custom]",
      "industry": "medical|production|services|professional|other: [custom]",
      "taxApproach": "once-year|quarterly-reactive|strategic|self-done|other: [custom]"
    },
    "resultType": "high-opportunity|medium-opportunity|low-opportunity",
    "timestamp": "ISO date string",
    "source": "tax-savings-quiz"
  }

STEP 1: FORMATTER (Code by Zapier)
- Calculate lead score using this algorithm:
  ```javascript
  let score = 50; // Base score
  
  // Revenue scoring
  if (inputData.quizAnswers.revenue === '2m-5m') score += 20;
  if (inputData.quizAnswers.revenue === '5m-10m') score += 25;
  if (inputData.quizAnswers.revenue === 'over-10m') score += 30;
  if (inputData.quizAnswers.revenue && inputData.quizAnswers.revenue.startsWith('other:')) score += 15;
  
  // Tax approach scoring (highest opportunity)
  if (inputData.quizAnswers.taxApproach === 'once-year') score += 30;
  if (inputData.quizAnswers.taxApproach === 'self-done') score += 35;
  if (inputData.quizAnswers.taxApproach === 'quarterly-reactive') score += 15;
  if (inputData.quizAnswers.taxApproach && inputData.quizAnswers.taxApproach.startsWith('other:')) score += 25;
  
  // Industry scoring (complexity/opportunity)
  if (inputData.quizAnswers.industry === 'medical') score += 15;
  if (inputData.quizAnswers.industry === 'production') score += 20;
  if (inputData.quizAnswers.industry === 'services') score += 10;
  
  // Priority assignment
  let priority = 'Medium';
  if (score >= 85) priority = 'Hot';
  else if (score >= 70) priority = 'High';
  else if (score <= 55) priority = 'Low';
  
  // Clean phone number
  const cleanPhone = inputData.phone ? inputData.phone.replace(/\D/g, '') : '';
  
  // Format full name
  const fullName = `${inputData.firstName} ${inputData.lastName}`;
  
  // Determine potential savings message
  let savingsMessage = '$15K-$50K annually';
  if (inputData.resultType === 'high-opportunity') savingsMessage = '$50K-$100K annually';
  if (inputData.resultType === 'low-opportunity') savingsMessage = 'optimization opportunities';
  
  return {
    leadScore: Math.min(score, 100),
    priority: priority,
    cleanPhone: cleanPhone,
    fullName: fullName,
    savingsMessage: savingsMessage,
    industryFormatted: inputData.quizAnswers.industry.replace('-', ' ').toUpperCase(),
    revenueFormatted: inputData.quizAnswers.revenue.replace('-', '-$').toUpperCase()
  };
  ```

STEP 2: CRM INTEGRATION (Choose one)
Option A - HubSpot: Create Contact
- First Name: {{firstName}}
- Last Name: {{lastName}}
- Email: {{email}}
- Phone: {{cleanPhone}}
- Company: {{company}}
- Lead Source: Tax Savings Quiz
- Lead Score: {{leadScore}}
- Priority: {{priority}}
- Custom Properties:
  - Quiz Revenue: {{revenueFormatted}}
  - Quiz Industry: {{industryFormatted}}
  - Quiz Tax Approach: {{quizAnswers__taxApproach}}
  - Result Type: {{resultType}}
  - Potential Savings: {{savingsMessage}}
  - Quiz Completed Date: {{timestamp}}

Option B - Salesforce: Create Lead
- First Name: {{firstName}}
- Last Name: {{lastName}}
- Email: {{email}}
- Phone: {{cleanPhone}}
- Company: {{company}}
- Lead Source: Tax Savings Quiz
- Rating: {{priority}}
- Custom Fields:
  - Lead_Score__c: {{leadScore}}
  - Quiz_Revenue__c: {{quizAnswers__revenue}}
  - Quiz_Industry__c: {{quizAnswers__industry}}
  - Quiz_Tax_Approach__c: {{quizAnswers__taxApproach}}
  - Potential_Savings__c: {{savingsMessage}}

Option C - Google Sheets: Create Row
- Spreadsheet: "Tax Quiz Leads"
- Worksheet: "Leads"
- Columns:
  A: {{timestamp}}
  B: {{fullName}}
  C: {{email}}
  D: {{cleanPhone}}
  E: {{company}}
  F: {{leadScore}}
  G: {{priority}}
  H: {{quizAnswers__revenue}}
  I: {{quizAnswers__industry}}
  J: {{quizAnswers__taxApproach}}
  K: {{resultType}}
  L: {{savingsMessage}}

STEP 3: INSTANT TEAM NOTIFICATION (Gmail)
- To: team@customaccountingcpa.com
- Subject: 🔥 {{priority}} Priority Lead from Tax Quiz - {{fullName}}
- Body:
  ```
  New lead from the tax savings quiz!
  
  CONTACT INFO:
  Name: {{fullName}}
  Email: {{email}}
  Phone: {{cleanPhone}}
  Company: {{company}}
  
  QUIZ RESULTS:
  Revenue: {{revenueFormatted}}
  Industry: {{industryFormatted}}
  Current CPA Approach: {{quizAnswers__taxApproach}}
  Result Type: {{resultType}}
  Potential Savings: {{savingsMessage}}
  
  LEAD INTELLIGENCE:
  Lead Score: {{leadScore}}/100
  Priority: {{priority}}
  Source: Tax Savings Quiz
  Submitted: {{timestamp}}
  
  NEXT STEPS:
  ⏰ Follow up within 1 hour for hot leads
  📞 Call first, then email
  📋 Reference their quiz answers in conversation
  🎯 Focus on their specific tax situation
  
  CRM Link: [Auto-populated based on your CRM choice]
  
  --
  Custom Accounting CPA Lead Alert System
  ```

STEP 4: SLACK NOTIFICATION (if using Slack)
- Channel: #leads or #sales
- Message:
  ```
  🎯 NEW TAX QUIZ LEAD!
  
  *{{fullName}}* from {{company}}
  📧 {{email}} | 📱 {{cleanPhone}}
  
  💰 Revenue: {{revenueFormatted}}
  🏢 Industry: {{industryFormatted}}
  📊 Lead Score: {{leadScore}}/100
  🚨 Priority: {{priority}}
  💵 Potential Savings: {{savingsMessage}}
  
  Quiz completed: {{timestamp}}
  
  Action required: Follow up ASAP! 🚀
  ```

STEP 5: LEAD NURTURE EMAIL (Delay 5 minutes)
- App: Gmail or Email by Zapier
- To: {{email}}
- From: Custom Accounting CPA <hello@customaccountingcpa.com>
- Subject: Your Tax Savings Analysis Results - {{firstName}}
- Body:
  ```
  Hi {{firstName}},
  
  Thank you for completing our tax savings quiz! Based on your answers, I can see significant opportunities to reduce your tax burden.
  
  Here's what caught my attention about your situation:
  
  ✅ Your {{revenueFormatted}} revenue puts you in the sweet spot for advanced tax strategies
  ✅ Your {{industryFormatted}} industry has specific deductions most CPAs miss
  ✅ Your current tax approach suggests you could save {{savingsMessage}}
  
  I'd love to show you exactly how we helped similar businesses:
  
  📈 Stephen Evans (Manufacturing, $6M revenue): Saved $95,000 annually
  📈 Hillary Cutter (Medical Practice, $3M revenue): Saved $40,000+ annually
  
  I've reserved a complimentary 30-minute strategy session for you:
  👉 https://customaccountingcpa.com/free-consultation/
  
  During this call, I'll:
  • Review your specific tax situation
  • Identify immediate savings opportunities  
  • Show you our proven quarterly planning system
  • Answer all your questions
  
  Best regards,
  [Your Name]
  Custom Accounting CPA
  
  P.S. The biggest mistake I see business owners make is waiting until tax season. The best strategies happen throughout the year!
  ```

STEP 6: FOLLOW-UP SEQUENCE (Delay 1 day)
- Filter: Only if no response to previous email
- Send case study relevant to their industry:
  - Medical → Hillary Cutter case study
  - Manufacturing/Production → Stephen Evans case study  
  - Services → Generic multi-location case study
  - Other → Most relevant case study

STEP 7: FINAL FOLLOW-UP (Delay 3 days)
- Filter: Still no booking
- Personal video message or final email with special offer

ADDITIONAL FILTERS:
- Only run for leads with valid email addresses
- Skip if email already exists in CRM (prevent duplicates)
- Higher priority leads get faster follow-up timing

ERROR HANDLING:
- If CRM fails, save to Google Sheets as backup
- If email fails, send Slack notification to admin
- Log all errors for review

TESTING:
- Use this sample data to test:
  {
    "firstName": "John",
    "lastName": "Smith",
    "email": "test@example.com", 
    "phone": "(555) 123-4567",
    "company": "Test Company",
    "quizAnswers": {
      "revenue": "2m-5m",
      "industry": "medical",
      "taxApproach": "once-year"
    },
    "resultType": "high-opportunity",
    "timestamp": "2024-10-21T20:19:00.000Z",
    "source": "tax-savings-quiz"
  }
```

---

## SETUP INSTRUCTIONS:

1. **Copy the entire prompt above**
2. **Go to Zapier.com** and click "Create Zap"
3. **Click "Try AI"** or "Build with AI"
4. **Paste the prompt** and click "Generate"
5. **Review and customize** the generated workflow
6. **Test with sample data** before going live
7. **Copy your webhook URL** from Step 1
8. **Update your quiz code** with the webhook URL

## WEBHOOK URL INTEGRATION:

Once Zapier gives you the webhook URL, update your quiz:

1. Open `quiz-simple.html`
2. Find line ~808: `const webhookUrl = 'YOUR_N8N_WEBHOOK_URL_HERE';`
3. Replace with your Zapier webhook URL
4. Uncomment the fetch code (lines 811-823)
5. Save and test!

## CUSTOMIZATION OPTIONS:

- **Change email templates** to match your brand voice
- **Adjust lead scoring** based on your ideal customer profile  
- **Modify follow-up timing** based on your response rates
- **Add more CRM fields** for better lead qualification
- **Include calendar booking links** in emails
- **Set up SMS notifications** for ultra-hot leads

This automation will handle everything from lead capture to nurture sequences automatically!
