# Tax Savings Quiz Funnel

A modern, mobile-first quiz funnel for Custom Accounting CPA designed to qualify leads and drive bookings for strategy calls.

## Features

- **5-Step Flow**: Landing page → 3 questions → Dynamic results
- **Mobile-First Design**: Smooth animations, touch-friendly buttons, modern app aesthetics
- **Dynamic Results**: Three result variants based on quiz responses (high/medium/low opportunity)
- **Booking Integration**: Direct link to scheduling page
- **Analytics Ready**: Console logging for quiz completion and conversion events
- **Accessible**: Keyboard navigation, ARIA labels, reduced motion support

## Tech Stack

- React 18 (via CDN)
- Pure CSS3 (no framework needed)
- Modern ES6+ JavaScript
- Inter font family for professional look

## File Structure

```
quiz-funnel/
├── index.html          # Main HTML file
├── styles.css          # All styles with gradients and animations
├── app.js             # React components and logic
└── README.md          # This file
```

## How to Use

### Option 1: Local Development
1. Open `index.html` in your browser
2. No build process or npm install required!

### Option 2: Deploy to Hosting
Upload all files to any web hosting service:
- Netlify: Drag and drop the folder
- Vercel: Deploy as static site
- GitHub Pages: Push to repo and enable Pages
- Any web server: Upload via FTP

## Customization

### Colors
Update gradient colors in `styles.css`:
- Primary gradient: `#003366` to `#0066cc`
- Secondary gradient: `#0066cc` to `#00aaff`
- Button gradient: `#0066cc` to `#0099ff`

### Booking Link
Update the URL in `app.js` line 268:
```javascript
window.location.href = 'https://customaccountingcpa.com/free-consultation/';
```

### Content
Edit question text, answer options, and results copy directly in `app.js`:
- Questions: See `Question1`, `Question2`, `Question3` components
- Results: See `ResultsPage` component with three variants

## Analytics Integration

The quiz logs to console:
- Quiz completion with all answers
- Timestamp
- Result type shown
- Booking button clicks

To send data to your CRM, add to the `useEffect` in `ResultsPage`:
```javascript
// Example: Send to webhook
fetch('YOUR_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        revenue,
        industry,
        taxApproach,
        timestamp: new Date().toISOString()
    })
});
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No build step needed
- Minimal dependencies (React via CDN)
- Fast load times
- Smooth 60fps animations
- Optimized for mobile

## Case Study References

The results page references real client case studies:
- **Stephen Evans**: $95,000 annual savings (760% ROI)
- **Hillary Cutter**: $40,000+ annual savings (243% ROI)

These are pulled from the case study documents in the parent directory.

## Support

For questions or modifications, refer to the original prompt document or contact the development team.

