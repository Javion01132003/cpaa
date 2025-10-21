# n8n Setup Instructions - Tax Quiz to Google Sheets

## 🚀 Quick Setup (5 minutes)

### Step 1: Import the Workflow
1. **Open n8n** (cloud.n8n.io or your self-hosted instance)
2. **Click "Import from File"**
3. **Upload** `n8n-workflow.json` from this folder
4. **Workflow imported!** ✅

### Step 2: Set Up Google Sheets
1. **Create a new Google Sheet** called "Tax Quiz Leads"
2. **Add these column headers** in row 1:
   ```
   A: Timestamp
   B: First Name  
   C: Last Name
   D: Email
   E: Phone
   F: Company
   G: Revenue
   H: Industry
   I: Tax Approach
   J: Result Type
   K: Lead Score
   L: Priority
   M: Potential Savings
   N: Source
   ```
3. **Copy the Google Sheet ID** from the URL:
   - URL: `https://docs.google.com/spreadsheets/d/1ABC123DEF456/edit`
   - ID: `1ABC123DEF456`

### Step 3: Configure Google Sheets Node
1. **Click on "Add to Google Sheets" node**
2. **Add Google Sheets credentials**:
   - Click "Create New Credential"
   - Choose "Google Sheets OAuth2 API"
   - Follow Google authentication flow
3. **Update Sheet ID**:
   - Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID
   - Set Sheet Name to: `Tax Quiz Leads`

### Step 4: Configure Email Notifications (Optional)
1. **Click on "Send Team Notification" node**
2. **Add SMTP credentials**:
   - SMTP Host: (your email provider)
   - Port: 587 (usually)
   - Username: your email
   - Password: your app password
3. **Update recipient email** to your team email

### Step 5: Get Your Webhook URL
1. **Click on "Webhook" node**
2. **Copy the webhook URL** (looks like: `https://your-n8n.domain.com/webhook/tax-quiz-leads`)
3. **Save this URL** - you'll need it for the quiz

### Step 6: Activate the Workflow
1. **Click the toggle** in top right to activate
2. **Status should show "Active"** ✅

## 🔧 Update Your Quiz

Now update your quiz to use the n8n webhook instead of Zapier:

1. **Open** `quiz-simple.html`
2. **Find line ~875**: `const webhookUrl = 'https://hooks.zapier.com/hooks/catch/16479429/urzc4x0/';`
3. **Replace** with your n8n webhook URL
4. **Save and deploy**

## 📊 What This Workflow Does

### **Webhook Receives Data** →
- Quiz form submission with all lead details
- Quiz answers and calculated result type
- Timestamp and source tracking

### **Process Lead Data** →
- **Calculates lead score** (0-100) based on:
  - Revenue size (higher = more points)
  - Tax approach (reactive = more opportunity)
  - Industry complexity
- **Assigns priority**: HOT/HIGH/MEDIUM/LOW
- **Determines potential savings** amount

### **Add to Google Sheets** →
- **Appends new row** with all lead data
- **Updates existing** if same email (prevents duplicates)
- **Organized columns** for easy filtering/sorting

### **Send Team Notification** →
- **Beautiful HTML email** with all lead details
- **Priority-based styling** (HOT leads in red)
- **Action items** and follow-up guidance
- **Sent immediately** when lead submits

### **Respond to Quiz** →
- **Confirms successful** capture to quiz
- **Allows redirect** to booking page
- **CORS headers** for cross-origin requests

## 🎯 Lead Scoring Algorithm

```javascript
Base Score: 50 points

Revenue Scoring:
- $2M-$5M: +20 points
- $5M-$10M: +25 points  
- Over $10M: +30 points
- Other (custom): +15 points

Tax Approach Scoring:
- Once a year only: +30 points (high opportunity)
- Self-done/not sure: +35 points (highest opportunity)
- Quarterly reactive: +15 points (medium opportunity)
- Other (custom): +25 points

Industry Scoring:
- Medical/Healthcare: +15 points (complex regulations)
- Production/Manufacturing: +20 points (equipment depreciation)
- Multi-location Services: +10 points (multiple entities)

Priority Assignment:
- 85+ points: HOT 🔥
- 70-84 points: HIGH ⚡
- 55-69 points: MEDIUM 📊
- Under 55: LOW 📝
```

## 🔍 Testing Your Setup

### Test Data:
```json
{
  "firstName": "John",
  "lastName": "Test",
  "email": "test@example.com",
  "phone": "555-123-4567",
  "company": "Test Company",
  "quizAnswers": {
    "revenue": "2m-5m",
    "industry": "medical",
    "taxApproach": "once-year"
  },
  "resultType": "high-opportunity",
  "timestamp": "2024-10-21T21:00:00.000Z",
  "source": "tax-savings-quiz"
}
```

### Expected Results:
- **Lead Score**: 85 points (HOT priority)
- **Google Sheets**: New row added
- **Email**: Team notification sent
- **Quiz**: Success response received

## 🛠️ Troubleshooting

### Common Issues:

1. **Google Sheets Error**:
   - Check Sheet ID is correct
   - Verify column headers match exactly
   - Ensure Google credentials are authenticated

2. **Email Not Sending**:
   - Check SMTP credentials
   - Verify recipient email address
   - Test with a simple email first

3. **Webhook Not Receiving**:
   - Ensure workflow is activated
   - Check webhook URL is correct in quiz
   - Verify CORS headers are set

4. **Quiz Still Failing**:
   - Check browser console for errors
   - Verify n8n webhook URL in quiz code
   - Test webhook directly with Postman

## 📈 Monitoring & Analytics

### In Google Sheets:
- **Sort by Lead Score** (highest first)
- **Filter by Priority** (HOT leads only)
- **Track conversion rates** by source
- **Analyze quiz answer patterns**

### In n8n:
- **Execution history** shows all submissions
- **Error logs** for failed attempts
- **Performance metrics** and timing

## 🔒 Security & Privacy

- **HTTPS only** for webhook URL
- **CORS configured** for your domain
- **No sensitive data** logged in n8n
- **Google Sheets** access controlled by your account

## 💰 Cost Comparison

### Zapier:
- **$20/month** for 750 tasks
- **Limited customization**
- **Vendor lock-in**

### n8n:
- **FREE** (self-hosted or cloud free tier)
- **Unlimited customization**
- **Full control** over data and workflow

---

**Your n8n webhook will be ready in 5 minutes!** 🚀

Once set up, every quiz submission will:
1. ✅ Save to Google Sheets automatically
2. ✅ Send team notification email  
3. ✅ Calculate lead score and priority
4. ✅ Redirect user to booking page
5. ✅ Work 24/7 with no monthly fees
