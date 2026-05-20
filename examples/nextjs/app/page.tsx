'use client';

import React, { useState, useEffect } from 'react';

const BrandBriefForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    vision: '',
    mission: '',
    coreValues: ['', '', '', ''],
    targetAge: '',
    targetGender: '',
    targetLocation: '',
    targetIncome: '',
    targetInterests: '',
    painPoints: '',
    competitors: ['', '', ''],
    competitorStrengths: '',
    competitorWeaknesses: '',
    uniqueness: '',
    personality: '',
    voiceTone: '',
    traits: ['', '', '', '', ''],
    preferredColors: '',
    avoidedColors: '',
    preferredStyle: '',
    inspirationBrands: '',
    dislikedBrands: '',
    deliverables: {
      logo: false,
      brandGuidelines: false,
      businessCard: false,
      letterhead: false,
      envelope: false,
      socialMedia: false,
      patches: false,
      website: false,
      packaging: false,
      signage: false,
      other: ''
    },
    goals: '',
    timeline: '',
    budget: '',
    additionalNotes: ''
  });

  const steps = [
    { title: 'Basic Info', number: 1 },
    { title: 'Vision', number: 2 },
    { title: 'Audience', number: 3 },
    { title: 'Competition', number: 4 },
    { title: 'Identity', number: 5 },
    { title: 'Visuals', number: 6 },
    { title: 'Deliverables', number: 7 },
    { title: 'Goals', number: 8 }
  ];

  useEffect(() => {
    const savedData = localStorage.getItem('brandBriefData_3b');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('brandBriefData_3b', JSON.stringify(formData));
  }, [formData]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: any, i: number) => i === index ? value : item)
    }));
  };

  const updateDeliverables = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      deliverables: { ...prev.deliverables, [key]: value }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    const formattedData = `
BRAND BRIEF - 3B STUDIO
═══════════════════════════════════════

1. BASIC INFORMATION
────────────────────────
Company Name: ${formData.companyName}
Industry: ${formData.industry}
Description: ${formData.description}

Contact Information:
Name: ${formData.contactName}
Email: ${formData.contactEmail}
Phone: ${formData.contactPhone}

2. VISION, MISSION & VALUES
────────────────────────
Vision: ${formData.vision}
Mission: ${formData.mission}
Core Values:
${formData.coreValues.filter(v => v).map((v, i) => `  ${i + 1}. ${v}`).join('\n')}

3. TARGET AUDIENCE
────────────────────────
Age Range: ${formData.targetAge}
Gender: ${formData.targetGender}
Location: ${formData.targetLocation}
Income Level: ${formData.targetIncome}
Interests & Behaviors: ${formData.targetInterests}
Pain Points: ${formData.painPoints}

4. COMPETITION ANALYSIS
────────────────────────
Main Competitors:
${formData.competitors.filter(c => c).map((c, i) => `  ${i + 1}. ${c}`).join('\n')}
Competitor Strengths: ${formData.competitorStrengths}
Competitor Weaknesses: ${formData.competitorWeaknesses}
Unique Selling Proposition: ${formData.uniqueness}

5. IDENTITY & PERSONALITY
────────────────────────
Brand Personality: ${formData.personality}
Brand Voice: ${formData.voiceTone}
Brand Traits:
${formData.traits.filter(t => t).map((t, i) => `  ${i + 1}. ${t}`).join('\n')}

6. VISUAL REQUIREMENTS
────────────────────────
Preferred Colors: ${formData.preferredColors}
Colors to Avoid: ${formData.avoidedColors}
Preferred Style: ${formData.preferredStyle}
Inspiration Brands: ${formData.inspirationBrands}
Brands to Avoid: ${formData.dislikedBrands}

7. DELIVERABLES
────────────────────────
${Object.entries(formData.deliverables).filter(([k, v]) => v && k !== 'other').map(([k]) => {
  const labels: Record<string, string> = {
    logo: 'Logo',
    brandGuidelines: 'Brand Guidelines',
    businessCard: 'Business Card',
    letterhead: 'Letterhead',
    envelope: 'Envelope',
    socialMedia: 'Social Media Templates',
    patches: 'Patches/Stickers',
    website: 'Website Design',
    packaging: 'Packaging',
    signage: 'Signage'
  };
  return `  ✓ ${labels[k]}`;
}).join('\n')}
${formData.deliverables.other ? `  ✓ Other: ${formData.deliverables.other}` : ''}

8. GOALS & EXPECTATIONS
────────────────────────
Project Goals: ${formData.goals}
Timeline: ${formData.timeline}
Budget: ${formData.budget}
Additional Notes: ${formData.additionalNotes}

────────────────────────
Building brands as systems
3B Studio | 3bsssh@gmail.com | +964 785 080 0280
    `.trim();

    navigator.clipboard.writeText(formattedData).then(() => {
      alert('✅ Data copied successfully!');
    });

    const blob = new Blob([formattedData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brand_brief_${formData.companyName || 'form'}_3bstudio.txt`;
    a.click();
  };

  const renderStep = () => {
    switch(currentStep) {
      case 0:
        return (
          <div className="step-content">
            <div className="step-header">
              <div className="step-number">01</div>
              <h2>Basic Information</h2>
              <p className="step-description">Tell us about your brand</p>
            </div>
            
            <div className="form-group">
              <label>Company/Project Name *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="Enter your company name"
                required
              />
            </div>

            <div className="form-group">
              <label>Industry/Sector *</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => updateField('industry', e.target.value)}
                placeholder="e.g., Technology, F&B, Healthcare"
              />
            </div>

            <div className="form-group">
              <label>Brief Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe what your brand does and what makes it unique..."
                rows={4}
              />
            </div>

            <div className="section-divider"></div>

            <h3>Contact Information</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => updateField('contactName', e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateField('contactEmail', e.target.value)}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => updateField('contactPhone', e.target.value)}
                placeholder="+964 XXX XXX XXXX"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <div className="step-number">02</div>
              <h2>Vision, Mission & Values</h2>
              <p className="step-description">Define your brand's purpose</p>
            </div>

            <div className="form-group">
              <label>Vision</label>
              <p className="helper-text">Where do you see your brand in the future?</p>
              <textarea
                value={formData.vision}
                onChange={(e) => updateField('vision', e.target.value)}
                placeholder="Your aspirational future state..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Mission</label>
              <p className="helper-text">What is your brand's core purpose?</p>
              <textarea
                value={formData.mission}
                onChange={(e) => updateField('mission', e.target.value)}
                placeholder="The problem you solve and value you create..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Core Values</label>
              <p className="helper-text">The principles that guide your brand</p>
              {formData.coreValues.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) => updateArrayField('coreValues', index, e.target.value)}
                  placeholder={`Value ${index + 1}`}
                  className="value-input"
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <div className="step-number">03</div>
              <h2>Target Audience</h2>
              <p className="step-description">Who are you building for?</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age Range</label>
                <input
                  type="text"
                  value={formData.targetAge}
                  onChange={(e) => updateField('targetAge', e.target.value)}
                  placeholder="18-35"
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <input
                  type="text"
                  value={formData.targetGender}
                  onChange={(e) => updateField('targetGender', e.target.value)}
                  placeholder="All / Male / Female"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Geographic Location</label>
              <input
                type="text"
                value={formData.targetLocation}
                onChange={(e) => updateField('targetLocation', e.target.value)}
                placeholder="City, Country, or Region"
              />
            </div>

            <div className="form-group">
              <label>Income Level</label>
              <input
                type="text"
                value={formData.targetIncome}
                onChange={(e) => updateField('targetIncome', e.target.value)}
                placeholder="Income bracket or purchasing power"
              />
            </div>

            <div className="form-group">
              <label>Interests & Behaviors</label>
              <textarea
                value={formData.targetInterests}
                onChange={(e) => updateField('targetInterests', e.target.value)}
                placeholder="What motivates them? What are their habits and preferences?"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Pain Points</label>
              <p className="helper-text">What problems does your brand solve for them?</p>
              <textarea
                value={formData.painPoints}
                onChange={(e) => updateField('painPoints', e.target.value)}
                placeholder="Describe their challenges and your solution..."
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <div className="step-number">04</div>
              <h2>Competition Analysis</h2>
              <p className="step-description">Understand your competitive landscape</p>
            </div>

            <div className="form-group">
              <label>Main Competitors</label>
              <p className="helper-text">List 3-5 key competitors</p>
              {formData.competitors.map((comp, index) => (
                <input
                  key={index}
                  type="text"
                  value={comp}
                  onChange={(e) => updateArrayField('competitors', index, e.target.value)}
                  placeholder={`Competitor ${index + 1}`}
                  className="value-input"
                />
              ))}
            </div>

            <div className="form-group">
              <label>Competitor Strengths</label>
              <textarea
                value={formData.competitorStrengths}
                onChange={(e) => updateField('competitorStrengths', e.target.value)}
                placeholder="What are they doing well?"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Competitor Weaknesses</label>
              <textarea
                value={formData.competitorWeaknesses}
                onChange={(e) => updateField('competitorWeaknesses', e.target.value)}
                placeholder="Where do they fall short?"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Your Unique Advantage</label>
              <p className="helper-text">What makes you different and better?</p>
              <textarea
                value={formData.uniqueness}
                onChange={(e) => updateField('uniqueness', e.target.value)}
                placeholder="Your unique selling proposition..."
                rows={3}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <div className="step-number">05</div>
              <h2>Brand Identity</h2>
              <p className="step-description">Define your brand's personality</p>
            </div>

            <div className="form-group">
              <label>Brand Personality</label>
              <p className="helper-text">If your brand were a person...</p>
              <textarea
                value={formData.personality}
                onChange={(e) => updateField('personality', e.target.value)}
                placeholder="Professional, innovative, trustworthy..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Brand Voice</label>
              <p className="helper-text">How does your brand communicate?</p>
              <textarea
                value={formData.voiceTone}
                onChange={(e) => updateField('voiceTone', e.target.value)}
                placeholder="Formal, conversational, inspiring..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Key Brand Traits</label>
              <p className="helper-text">5 adjectives that describe your brand</p>
              {formData.traits.map((trait, index) => (
                <input
                  key={index}
                  type="text"
                  value={trait}
                  onChange={(e) => updateArrayField('traits', index, e.target.value)}
                  placeholder={`Trait ${index + 1}`}
                  className="value-input"
                />
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <div className="step-number">06</div>
              <h2>Visual Direction</h2>
              <p className="step-description">Guide the visual identity</p>
            </div>

            <div className="form-group">
              <label>Preferred Colors</label>
              <input
                type="text"
                value={formData.preferredColors}
                onChange={(e) => updateField('preferredColors', e.target.value)}
                placeholder="Navy blue, gold, white..."
              />
            </div>

            <div className="form-group">
              <label>Colors to Avoid</label>
              <input
                type="text"
                value={formData.avoidedColors}
                onChange={(e) => updateField('avoidedColors', e.target.value)}
                placeholder="Colors that don't fit..."
              />
            </div>

            <div className="form-group">
              <label>Visual Style</label>
              <input
                type="text"
                value={formData.preferredStyle}
                onChange={(e) => updateField('preferredStyle', e.target.value)}
                placeholder="Minimal, bold, elegant, modern..."
              />
            </div>

            <div className="form-group">
              <label>Inspiration</label>
              <p className="helper-text">Brands or designs you admire</p>
              <textarea
                value={formData.inspirationBrands}
                onChange={(e) => updateField('inspirationBrands', e.target.value)}
                placeholder="List brands or describe visual styles you like..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>What to Avoid</label>
              <p className="helper-text">Styles or brands that don't resonate</p>
              <textarea
                value={formData.dislikedBrands}
                onChange={(e) => updateField('dislikedBrands', e.target.value)}
                placeholder="Help us understand what you don't want..."
                rows={3}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="step-content">
            <div className="step-header">
              <div className="step-number">07</div>
              <h2>Deliverables</h2>
              <p className="step-description">What do you need us to create?</p>
            </div>

            <div className="deliverables-grid">
              {[
                { key: 'logo', title: 'Logo', desc: 'Brand mark & wordmark' },
                { key: 'brandGuidelines', title: 'Brand Guidelines', desc: 'Complete style guide' },
                { key: 'businessCard', title: 'Business Card', desc: 'Professional cards' },
                { key: 'letterhead', title: 'Letterhead', desc: 'Stationery design' },
                { key: 'envelope', title: 'Envelope', desc: 'Branded envelopes' },
                { key: 'socialMedia', title: 'Social Media', desc: 'Templates & assets' },
                { key: 'patches', title: 'Patches/Stickers', desc: 'Branded merchandise' },
                { key: 'website', title: 'Website Design', desc: 'Digital presence' },
                { key: 'packaging', title: 'Packaging', desc: 'Product packaging' },
                { key: 'signage', title: 'Signage', desc: 'Environmental graphics' }
              ].map((item) => (
                <label key={item.key} className="deliverable-card">
                  <input
                    type="checkbox"
                    checked={formData.deliverables[item.key as keyof typeof formData.deliverables] as boolean}
                    onChange={(e) => updateDeliverables(item.key, e.target.checked)}
                  />
                  <div className="card-content">
                    <div className="card-title">{item.title}</div>
                    <div className="card-desc">{item.desc}</div>
                  </div>
                  <div className="card-check">
                    {formData.deliverables[item.key as keyof typeof formData.deliverables] && '✓'}
                  </div>
                </label>
              ))}
            </div>

            <div className="form-group">
              <label>Other Requirements</label>
              <input
                type="text"
                value={formData.deliverables.other}
                onChange={(e) => updateDeliverables('other', e.target.value)}
                placeholder="Any other deliverables you need..."
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="step-content">
            <div className="step-header">
              <div className="step-number">08</div>
              <h2>Goals & Timeline</h2>
              <p className="step-description">Define success and expectations</p>
            </div>

            <div className="form-group">
              <label>Project Goals</label>
              <textarea
                value={formData.goals}
                onChange={(e) => updateField('goals', e.target.value)}
                placeholder="What do you want to achieve? What does success look like?"
                rows={4}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Timeline</label>
                <input
                  type="text"
                  value={formData.timeline}
                  onChange={(e) => updateField('timeline', e.target.value)}
                  placeholder="When do you need this?"
                />
              </div>
              <div className="form-group">
                <label>Budget Range</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                  placeholder="Your budget range"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Additional Notes</label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => updateField('additionalNotes', e.target.value)}
                placeholder="Anything else we should know?"
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="brand-brief-container">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
        }

        .brand-brief-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
          font-family: 'Inter', sans-serif;
          padding: 0;
          position: relative;
        }

        .brand-brief-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(109, 91, 208, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(109, 91, 208, 0.03) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .header {
          position: relative;
          z-index: 10;
          padding: 40px 20px 60px;
          text-align: center;
          background: white;
          border-bottom: 1px solid #f0f0f0;
        }

        .logo-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .logo {
          width: 180px;
          height: 80px;
          background: #6D5BD0;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 32px;
          color: white;
          letter-spacing: -1px;
          position: relative;
          overflow: hidden;
        }

        .logo::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .tagline {
          font-size: 14px;
          font-weight: 500;
          color: #666;
          letter-spacing: 0.5px;
          animation: fadeIn 1s ease 0.3s both;
        }

        .form-title-main {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin-top: 32px;
          margin-bottom: 8px;
          animation: fadeIn 1s ease 0.5s both;
        }

        .form-subtitle-main {
          font-size: 16px;
          color: #666;
          font-weight: 400;
          animation: fadeIn 1s ease 0.7s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .progress-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          position: relative;
          z-index: 5;
        }

        .progress-wrapper {
          background: white;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          margin-bottom: 24px;
        }

        .progress-track {
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 2px;
          background: #f0f0f0;
          z-index: 0;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6D5BD0, #8b79ea);
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 12px rgba(109, 91, 208, 0.3);
        }

        .progress-step {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
        }

        .progress-step:hover .step-dot {
          transform: scale(1.1);
        }

        .step-dot {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: #999;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .progress-step.active .step-dot {
          background: #6D5BD0;
          border-color: #6D5BD0;
          color: white;
          box-shadow: 0 4px 16px rgba(109, 91, 208, 0.3);
          transform: scale(1.05);
        }

        .progress-step.completed .step-dot {
          background: #6D5BD0;
          border-color: #6D5BD0;
          color: white;
        }

        .step-dot-label {
          margin-top: 12px;
          font-size: 12px;
          font-weight: 500;
          color: #999;
          text-align: center;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-dot-label {
          color: #6D5BD0;
          font-weight: 600;
        }

        .progress-step.completed .step-dot-label {
          color: #666;
        }

        .form-card {
          max-width: 800px;
          margin: 0 auto 60px;
          background: white;
          border-radius: 24px;
          padding: 56px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          position: relative;
          z-index: 5;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }

        .step-content {
          animation: fadeInContent 0.5s ease;
        }

        @keyframes fadeInContent {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .step-header {
          margin-bottom: 40px;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 24px;
        }

        .step-number {
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          color: #6D5BD0;
          background: rgba(109, 91, 208, 0.1);
          padding: 6px 12px;
          border-radius: 6px;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }

        .step-content h2 {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .step-description {
          font-size: 16px;
          color: #666;
          font-weight: 400;
        }

        h3 {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 32px 0 20px;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
          margin: 40px 0;
        }

        .form-group {
          margin-bottom: 28px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 10px;
          letter-spacing: -0.2px;
        }

        .helper-text {
          font-size: 13px;
          color: #999;
          margin-bottom: 10px;
          font-weight: 400;
        }

        input[type="text"],
        input[type="email"],
        input[type="tel"],
        textarea {
          width: 100%;
          padding: 14px 16px;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          background: #fafafa;
          border: 1.5px solid #e0e0e0;
          border-radius: 10px;
          color: #1a1a1a;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        input::placeholder,
        textarea::placeholder {
          color: #aaa;
        }

        input:focus,
        textarea:focus {
          background: white;
          border-color: #6D5BD0;
          box-shadow: 0 0 0 4px rgba(109, 91, 208, 0.08);
          transform: translateY(-1px);
        }

        textarea {
          resize: vertical;
          min-height: 100px;
          line-height: 1.6;
        }

        .value-input {
          margin-bottom: 12px;
        }

        .deliverables-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .deliverable-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #fafafa;
          border: 1.5px solid #e0e0e0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .deliverable-card input[type="checkbox"] {
          display: none;
        }

        .deliverable-card:hover {
          background: #f5f5f5;
          border-color: #d0d0d0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .deliverable-card:has(input:checked) {
          border-color: #6D5BD0;
          background: rgba(109, 91, 208, 0.05);
        }

        .card-content {
          flex: 1;
        }

        .card-title {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .card-desc {
          font-size: 13px;
          color: #666;
        }

        .card-check {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 2px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          color: white;
          font-weight: bold;
        }

        .deliverable-card:has(input:checked) .card-check {
          background: #6D5BD0;
          border-color: #6D5BD0;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid #f0f0f0;
        }

        button {
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          outline: none;
        }

        .btn-prev {
          background: #f5f5f5;
          color: #666;
          border: 1.5px solid #e0e0e0;
        }

        .btn-prev:hover:not(:disabled) {
          background: #ebebeb;
          border-color: #d0d0d0;
          transform: translateX(-2px);
        }

        .btn-next {
          background: #6D5BD0;
          color: white;
          box-shadow: 0 4px 12px rgba(109, 91, 208, 0.3);
          margin-left: auto;
        }

        .btn-next:hover {
          background: #5b4ab8;
          box-shadow: 0 6px 16px rgba(109, 91, 208, 0.4);
          transform: translateX(2px);
        }

        .btn-submit {
          background: linear-gradient(135deg, #6D5BD0, #8b79ea);
          color: white;
          box-shadow: 0 4px 16px rgba(109, 91, 208, 0.3);
          margin-left: auto;
        }

        .btn-submit:hover {
          box-shadow: 0 6px 20px rgba(109, 91, 208, 0.4);
          transform: scale(1.02);
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .auto-save-indicator {
          text-align: center;
          padding: 16px;
          font-size: 13px;
          color: #999;
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .footer {
          text-align: center;
          padding: 60px 20px 40px;
          position: relative;
          z-index: 5;
          color: #666;
        }

        .footer-tagline {
          font-size: 15px;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .footer-contact {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .footer-contact a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #666;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 8px 16px;
          border-radius: 8px;
        }

        .footer-contact a:hover {
          color: #6D5BD0;
          background: rgba(109, 91, 208, 0.05);
        }

        @media (max-width: 768px) {
          .header {
            padding: 32px 20px 48px;
          }

          .logo {
            width: 150px;
            height: 70px;
            font-size: 28px;
          }

          .form-title-main {
            font-size: 24px;
          }

          .progress-wrapper {
            padding: 24px 16px;
          }

          .step-dot-label {
            display: none;
          }

          .form-card {
            padding: 32px 24px;
            border-radius: 20px;
          }

          .step-content h2 {
            font-size: 26px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .deliverables-grid {
            grid-template-columns: 1fr;
          }

          .button-container {
            flex-direction: column-reverse;
          }

          button {
            width: 100%;
            justify-content: center;
          }

          .btn-next,
          .btn-submit {
            margin-left: 0;
          }
        }

        @media (max-width: 480px) {
          .progress-steps {
            overflow-x: auto;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }

          .step-dot {
            width: 36px;
            height: 36px;
            font-size: 13px;
          }

          .form-card {
            padding: 28px 20px;
          }
        }
      `}</style>

      <div className="header">
        <div className="logo-wrapper">
          <div className="logo">3B Studio</div>
        </div>
        <p className="tagline">Building brands as systems</p>
        <h1 className="form-title-main">Brand Brief</h1>
        <p className="form-subtitle-main">Let's build something extraordinary</p>
      </div>

      <div className="progress-container">
        <div className="progress-wrapper">
          <div className="progress-steps">
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(index)}
              >
                <div className="step-dot">
                  {index < currentStep ? '✓' : step.number}
                </div>
                <div className="step-dot-label">{step.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="form-card">
        {renderStep()}

        <div className="button-container">
          <button
            className="btn-prev"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            ← Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button className="btn-next" onClick={nextStep}>
              Next →
            </button>
          ) : (
            <button className="btn-submit" onClick={handleSubmit}>
              Submit Brief →
            </button>
          )}
        </div>

        <div className="auto-save-indicator">
          ✨ Auto-saved
        </div>
      </div>

      <div className="footer">
        <p className="footer-tagline">Building brands as systems</p>
        <div className="footer-contact">
          <a href="mailto:3bsssh@gmail.com">
            ✉ 3bsssh@gmail.com
          </a>
          <a href="tel:+9647850800280">
            ☎ +964 785 080 0280
          </a>
        </div>
      </div>
    </div>
  );
};

export default BrandBriefForm;
