// GOOGLE APPS SCRIPT CODE
// 1. Go to script.google.com
// 2. Create new project
// 3. Paste this code
// 4. Deploy as web app
// 5. Copy the deployment URL

function doPost(e) {
  try {
    // Parse the JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Open your Google Sheet (replace with your Sheet ID)
    const sheet = SpreadsheetApp.openById('YOUR_GOOGLE_SHEET_ID_HERE').getSheetByName('Tax Quiz Leads');
    
    // Calculate lead score
    const leadScore = calculateLeadScore(data.quizAnswers);
    const priority = leadScore >= 85 ? 'HOT' : leadScore >= 70 ? 'HIGH' : leadScore >= 55 ? 'MEDIUM' : 'LOW';
    
    // Add row to sheet
    sheet.appendRow([
      data.timestamp,
      data.firstName,
      data.lastName,
      data.email,
      data.phone || '',
      data.company || '',
      data.quizAnswers.revenue,
      data.quizAnswers.industry,
      data.quizAnswers.taxApproach,
      data.resultType,
      leadScore,
      priority,
      data.source
    ]);
    
    // Send email notification
    const emailBody = `
New Tax Quiz Lead:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}

Quiz Results:
Revenue: ${data.quizAnswers.revenue}
Industry: ${data.quizAnswers.industry}
Tax Approach: ${data.quizAnswers.taxApproach}
Result Type: ${data.resultType}

Lead Score: ${leadScore}/100 (${priority} Priority)
Submitted: ${data.timestamp}
    `;
    
    // Send email (replace with your email)
    GmailApp.sendEmail(
      'leads@customaccountingcpa.com',
      `New ${priority} Priority Lead: ${data.firstName} ${data.lastName}`,
      emailBody
    );
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Lead captured successfully',
      leadScore: leadScore,
      priority: priority
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function calculateLeadScore(answers) {
  let score = 50;
  
  // Revenue scoring
  if (answers.revenue === '2m-5m') score += 20;
  if (answers.revenue === '5m-10m') score += 25;
  if (answers.revenue === 'over-10m') score += 30;
  
  // Tax approach scoring
  if (answers.taxApproach === 'once-year') score += 30;
  if (answers.taxApproach === 'self-done') score += 35;
  if (answers.taxApproach === 'quarterly-reactive') score += 15;
  
  // Industry scoring
  if (answers.industry === 'medical') score += 15;
  if (answers.industry === 'production') score += 20;
  if (answers.industry === 'services') score += 10;
  
  return Math.min(score, 100);
}
