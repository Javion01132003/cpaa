const { useState, useEffect } = React;

// Landing Page Component
function LandingPage({ onStart }) {
    return (
        <div className="landing-page">
            <div className="landing-content">
                <h1>
                    How Much Are You <span className="gradient-text">Overpaying</span> in Taxes?
                </h1>
                <p className="subheadline">
                    Take this <span className="gradient-text">90-second quiz</span> to discover your potential annual savings. 
                    Most business owners between $2M-$8M overpay by{' '}
                    <span className="gradient-text">$50K-$100K annually</span>.
                </p>
                <button className="cta-button" onClick={onStart}>
                    START QUIZ →
                </button>
                <div className="trust-badges">
                    <div className="trust-badge">✓ 90 seconds</div>
                    <div className="trust-badge">✓ Free analysis</div>
                    <div className="trust-badge">✓ Instant results</div>
                </div>
            </div>
        </div>
    );
}

// Question 1: Revenue
function Question1({ onNext, onBack, selectedAnswer }) {
    const [selected, setSelected] = useState(selectedAnswer || null);

    const answers = [
        { id: 'under-2m', label: 'Under $2M', recommended: false },
        { id: '2m-5m', label: '$2M - $5M', recommended: true },
        { id: '5m-10m', label: '$5M - $10M', recommended: true },
        { id: 'over-10m', label: 'Over $10M', recommended: false }
    ];

    const handleSelect = (id) => {
        setSelected(id);
    };

    const handleNext = () => {
        if (selected) {
            onNext(selected);
        }
    };

    return (
        <div className="question-page">
            <div className="question-container">
                <span className="question-number">1 of 3</span>
                <h2 className="question-title">What's your approximate annual revenue?</h2>
                <div className="answer-cards">
                    {answers.map((answer) => (
                        <button
                            key={answer.id}
                            className={`answer-card ${selected === answer.id ? 'selected' : ''} ${answer.recommended ? 'recommended' : ''}`}
                            onClick={() => handleSelect(answer.id)}
                            aria-pressed={selected === answer.id}
                        >
                            {answer.label}
                        </button>
                    ))}
                </div>
                {selected && (
                    <button className="next-button" onClick={handleNext}>
                        Next →
                    </button>
                )}
            </div>
        </div>
    );
}

// Question 2: Industry
function Question2({ onNext, onBack, selectedAnswer }) {
    const [selected, setSelected] = useState(selectedAnswer || null);

    const answers = [
        { id: 'medical', label: 'Medical/Healthcare (practices, labs, clinics)', icon: '🏥' },
        { id: 'production', label: 'Production/Manufacturing', icon: '🏭' },
        { id: 'services', label: 'Multi-location Services (HVAC, plumbing, etc.)', icon: '🔧' },
        { id: 'professional', label: 'Professional Services or Other', icon: '💼' }
    ];

    const handleSelect = (id) => {
        setSelected(id);
    };

    const handleNext = () => {
        if (selected) {
            onNext(selected);
        }
    };

    return (
        <div className="question-page">
            <div className="question-container">
                <span className="question-number">2 of 3</span>
                <h2 className="question-title">Which industry best describes your business?</h2>
                <div className="answer-cards">
                    {answers.map((answer) => (
                        <button
                            key={answer.id}
                            className={`answer-card ${selected === answer.id ? 'selected' : ''}`}
                            onClick={() => handleSelect(answer.id)}
                            aria-pressed={selected === answer.id}
                        >
                            <span className="answer-icon">{answer.icon}</span>
                            {answer.label}
                        </button>
                    ))}
                </div>
                {selected && (
                    <button className="next-button" onClick={handleNext}>
                        Next →
                    </button>
                )}
                <button className="back-button" onClick={onBack}>
                    ← Back
                </button>
            </div>
        </div>
    );
}

// Question 3: Tax Approach
function Question3({ onNext, onBack, selectedAnswer }) {
    const [selected, setSelected] = useState(selectedAnswer || null);

    const answers = [
        { id: 'once-year', label: 'Once a year at tax time only' },
        { id: 'quarterly-reactive', label: 'Quarterly check-ins but mostly reactive' },
        { id: 'strategic', label: 'Strategic quarterly planning sessions' },
        { id: 'self-done', label: 'I do my own taxes or not sure' }
    ];

    const handleSelect = (id) => {
        setSelected(id);
    };

    const handleNext = () => {
        if (selected) {
            onNext(selected);
        }
    };

    return (
        <div className="question-page">
            <div className="question-container">
                <span className="question-number">3 of 3</span>
                <h2 className="question-title">How does your CPA currently work with you?</h2>
                <div className="answer-cards">
                    {answers.map((answer) => (
                        <button
                            key={answer.id}
                            className={`answer-card ${selected === answer.id ? 'selected' : ''}`}
                            onClick={() => handleSelect(answer.id)}
                            aria-pressed={selected === answer.id}
                        >
                            {answer.label}
                        </button>
                    ))}
                </div>
                {selected && (
                    <button className="next-button" onClick={handleNext}>
                        See My Results →
                    </button>
                )}
                <button className="back-button" onClick={onBack}>
                    ← Back
                </button>
            </div>
        </div>
    );
}

// Results Page
function ResultsPage({ answers }) {
    const { revenue, industry, taxApproach } = answers;
    
    useEffect(() => {
        // Log quiz completion data
        console.log('Quiz Completed:', {
            revenue,
            industry,
            taxApproach,
            timestamp: new Date().toISOString(),
            resultType: getResultType(taxApproach)
        });
    }, []);

    const getResultType = (approach) => {
        if (approach === 'once-year' || approach === 'self-done') {
            return 'high-opportunity';
        } else if (approach === 'quarterly-reactive') {
            return 'medium-opportunity';
        } else {
            return 'low-opportunity';
        }
    };

    const resultType = getResultType(taxApproach);

    const handleBooking = () => {
        console.log('Booking button clicked - Conversion event');
        window.location.href = 'https://customaccountingcpa.com/free-consultation/';
    };

    const renderHighOpportunity = () => (
        <>
            <div className="results-header">
                <h1>
                    You're Likely Overpaying by <span className="gradient-text">$50K-$100K</span> Annually
                </h1>
                <p className="subheadline">
                    Based on your answers, you fit the profile of business owners we've helped save the most money.
                </p>
            </div>
            <div className="results-content">
                <div className="benefit-cards">
                    <div className="benefit-card">
                        <span className="checkmark">✓</span>
                        <p>Your business size puts you in the sweet spot for maximum tax savings opportunities</p>
                    </div>
                    <div className="benefit-card">
                        <span className="checkmark">✓</span>
                        <p>Your industry has specific deductions and strategies that most CPAs miss</p>
                    </div>
                    <div className="benefit-card">
                        <span className="checkmark">✓</span>
                        <p>Your current approach means you're likely missing significant year-round planning opportunities</p>
                    </div>
                </div>
                <div className="social-proof">
                    <p>
                        Stephen Evans saved <span className="gradient-text">$95,000 annually</span> after switching to strategic quarterly planning—
                        that's a <span className="gradient-text">760% ROI</span> on our fees.
                    </p>
                </div>
                <button className="results-cta" onClick={handleBooking}>
                    Book Your Free Strategy Call →
                </button>
            </div>
        </>
    );

    const renderMediumOpportunity = () => (
        <>
            <div className="results-header">
                <h1>
                    You Could Be Saving <span className="gradient-text">$15K-$50K</span> More Annually
                </h1>
                <p className="subheadline">
                    Based on your answers, you're doing better than most—but there's room for improvement.
                </p>
            </div>
            <div className="results-content">
                <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    You're doing better than most—but there's a difference between quarterly meetings and strategic quarterly planning.
                    Most CPAs are reactive. They wait for you to bring issues to them. Strategic planning means proactively finding opportunities,
                    not just reviewing what happened.
                </p>
                <div className="benefit-cards">
                    <div className="benefit-card">
                        <span className="checkmark">✓</span>
                        <p>Your business size is ideal for advanced tax strategies</p>
                    </div>
                    <div className="benefit-card">
                        <span className="checkmark">✓</span>
                        <p>Transition from reactive check-ins to proactive tax planning</p>
                    </div>
                    <div className="benefit-card">
                        <span className="checkmark">✓</span>
                        <p>Industry-specific opportunities are likely being overlooked</p>
                    </div>
                </div>
                <div className="social-proof">
                    <p>
                        Hillary Cutter saved <span className="gradient-text">$40,000+ annually</span> by upgrading to strategic quarterly planning—
                        that's a <span className="gradient-text">243% ROI</span>.
                    </p>
                </div>
                <button className="results-cta" onClick={handleBooking}>
                    Book Your Free Strategy Call →
                </button>
            </div>
        </>
    );

    const renderLowOpportunity = () => (
        <>
            <div className="results-header">
                <h1>
                    You're Ahead of Most Business Owners
                </h1>
                <p className="subheadline">
                    You already have strategic quarterly planning—that puts you in the top 10%.
                </p>
            </div>
            <div className="results-content">
                <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    You're already doing strategic quarterly planning, which means you're ahead of 90% of business owners.
                    But even the best strategies need periodic review to ensure you're not missing new opportunities
                    as tax laws change and your business evolves.
                </p>
                <div className="benefit-cards">
                    <div className="benefit-card">
                        <span className="checkmark">✓</span>
                        <p>Tax laws change constantly—are you capturing new opportunities?</p>
                    </div>
                    <div className="benefit-card">
                        <span className="checkmark">✓</span>
                        <p>A second opinion often reveals strategies your current CPA hasn't considered</p>
                    </div>
                    <div className="benefit-card">
                        <span className="checkmark">✓</span>
                        <p>Industry-specific insights could unlock additional savings</p>
                    </div>
                </div>
                <button className="results-cta" onClick={handleBooking}>
                    Book Your Complimentary Review →
                </button>
            </div>
        </>
    );

    return (
        <div className="results-page">
            {resultType === 'high-opportunity' && renderHighOpportunity()}
            {resultType === 'medium-opportunity' && renderMediumOpportunity()}
            {resultType === 'low-opportunity' && renderLowOpportunity()}
        </div>
    );
}

// Main App Component
function App() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        revenue: null,
        industry: null,
        taxApproach: null
    });

    const progress = currentStep === 0 ? 0 : currentStep === 1 ? 33 : currentStep === 2 ? 66 : currentStep === 3 ? 100 : 100;

    const handleStart = () => {
        setCurrentStep(1);
    };

    const handleQuestion1Next = (answer) => {
        setAnswers({ ...answers, revenue: answer });
        setCurrentStep(2);
    };

    const handleQuestion2Next = (answer) => {
        setAnswers({ ...answers, industry: answer });
        setCurrentStep(3);
    };

    const handleQuestion3Next = (answer) => {
        setAnswers({ ...answers, taxApproach: answer });
        setCurrentStep(4);
    };

    const handleBack = (step) => {
        setCurrentStep(step);
    };

    return (
        <div className="app-container">
            {currentStep > 0 && currentStep < 4 && (
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
            )}
            
            {currentStep === 0 && <LandingPage onStart={handleStart} />}
            {currentStep === 1 && (
                <Question1 
                    onNext={handleQuestion1Next} 
                    onBack={() => handleBack(0)}
                    selectedAnswer={answers.revenue}
                />
            )}
            {currentStep === 2 && (
                <Question2 
                    onNext={handleQuestion2Next} 
                    onBack={() => handleBack(1)}
                    selectedAnswer={answers.industry}
                />
            )}
            {currentStep === 3 && (
                <Question3 
                    onNext={handleQuestion3Next} 
                    onBack={() => handleBack(2)}
                    selectedAnswer={answers.taxApproach}
                />
            )}
            {currentStep === 4 && <ResultsPage answers={answers} />}
        </div>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

