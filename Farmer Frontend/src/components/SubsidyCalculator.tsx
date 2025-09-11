import React, { useState } from 'react';
import { Calculator, Search, TrendingUp, Shield, Clock, CheckCircle } from 'lucide-react';
import { User, Scheme, ModalContent } from '../types';

interface SubsidyCalculatorProps {
  currentUser: User;
  showModal: (content: ModalContent) => void;
}

const SubsidyCalculator: React.FC<SubsidyCalculatorProps> = ({ currentUser, showModal }) => {
  const [formData, setFormData] = useState({
    landSize: currentUser.landSize,
    annualIncome: currentUser.annualIncome,
    cropType: currentUser.cropType,
    state: currentUser.state || 'maharashtra'
  });
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'landSize' || name === 'annualIncome' ? parseFloat(value) : value
    }));
  };

  const calculateSubsidy = () => {
    setLoading(true);
    
    setTimeout(() => {
      const generatedSchemes = generateSubsidyRecommendations(
        formData.landSize,
        formData.annualIncome,
        formData.cropType,
        formData.state
      );
      setSchemes(generatedSchemes);
      setLoading(false);
    }, 2000);
  };

  const generateSubsidyRecommendations = (landSize: number, income: number, cropType: string, state: string): Scheme[] => {
    const schemes: Scheme[] = [];

    if (income <= 200000) {
      schemes.push({
        name: 'PM-KISAN Samman Nidhi',
        type: 'Government',
        amount: '₹6,000/year',
        eligibility: '100%',
        interestRate: '0%',
        description: 'Direct income support to farmers',
        benefits: ['₹2,000 every 4 months', 'Direct bank transfer', 'No collateral required'],
        bestMatch: income <= 150000,
        image: '/images/pm-kisan.jpg'
      });
    }

    if (landSize <= 5) {
      schemes.push({
        name: 'Pradhan Mantri Fasal Bima Yojana',
        type: 'Government',
        amount: `₹${Math.round(landSize * 15000)}/season`,
        eligibility: '95%',
        interestRate: '2%',
        description: 'Crop insurance scheme',
        benefits: ['Weather risk coverage', 'Yield loss protection', 'Premium subsidy up to 95%'],
        bestMatch: cropType === 'wheat' || cropType === 'rice',
        image: '/images/crop-insurance.jpg'
      });
    }

    schemes.push({
      name: 'HDFC Bank Kisan Credit Card',
      type: 'Private',
      amount: `₹${Math.round(landSize * 50000)}`,
      eligibility: '85%',
      interestRate: '7.5%',
      description: 'Flexible agricultural credit',
      benefits: ['Flexible repayment', 'Insurance coverage', 'Digital banking'],
      bestMatch: income >= 100000,
      image: '/images/kisan-credit.jpg'
    });

    if (landSize >= 2) {
      schemes.push({
        name: 'SBI Agri-Gold Loan',
        type: 'Private',
        amount: `₹${Math.round(landSize * 75000)}`,
        eligibility: '80%',
        interestRate: '8.2%',
        description: 'Low-interest agricultural loan',
        benefits: ['Competitive rates', 'Quick processing', 'Doorstep service'],
        bestMatch: landSize >= 3,
        image: '/images/agri-gold.jpg'
      });
    }

    // State-specific schemes
    if (state === 'maharashtra') {
      schemes.push({
        name: 'Mahatma Jyotiba Phule Shetkari Karjmukti Yojana',
        type: 'State Government',
        amount: '₹1,50,000 waiver',
        eligibility: '90%',
        interestRate: 'N/A',
        description: 'Loan waiver scheme for farmers',
        benefits: ['Complete loan waiver', 'Debt relief', 'Fresh loans available'],
        bestMatch: income <= 300000,
        image: '/images/maharashtra-farmer.jpg'
      });
    }

    if (cropType === 'sugarcane') {
      schemes.push({
        name: 'Sugarcane Subsidy Scheme',
        type: 'Government',
        amount: '₹6,850/hectare',
        eligibility: '88%',
        interestRate: '4%',
        description: 'Special scheme for sugarcane farmers',
        benefits: ['Input subsidy', 'Transport assistance', 'Processing support'],
        bestMatch: cropType === 'sugarcane',
        image: '/images/sugarcane-farmer.jpg'
      });
    }

    return schemes.sort((a, b) => {
      if (a.bestMatch && !b.bestMatch) return -1;
      if (!a.bestMatch && b.bestMatch) return 1;
      return parseFloat(b.eligibility) - parseFloat(a.eligibility);
    });
  };

  const applyScheme = (schemeName: string) => {
    const applicationId = `AGC${Date.now().toString().slice(-6)}`;
    
    showModal({
      type: 'success',
      title: 'Application Submitted Successfully!',
      content: (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #4CAF50, #66BB6A)', 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px', 
            color: 'white', 
            fontSize: '2rem' 
          }}>
            <CheckCircle size={40} />
          </div>
          <p style={{ marginBottom: '20px' }}>
            Your application for <strong>{schemeName}</strong> has been submitted.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '25px' }}>
            Application ID: <strong>{applicationId}</strong><br/>
            Expected processing time: 7-14 business days
          </p>
          <div style={{ 
            background: 'rgba(46, 125, 50, 0.1)', 
            padding: '15px', 
            borderRadius: '12px', 
            marginBottom: '20px' 
          }}>
            <h4 style={{ color: '#2E7D32', marginBottom: '10px' }}>Next Steps:</h4>
            <ul style={{ textAlign: 'left', marginLeft: '20px' }}>
              <li>Check your registered mobile for SMS updates</li>
              <li>Upload required documents within 48 hours</li>
              <li>Track application status in your dashboard</li>
            </ul>
          </div>
        </div>
      )
    });
  };

  return (
    <div className="tab-content active">
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Calculator size={20} />
            Subsidy Calculator
          </div>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Discover government and private subsidies tailored to your farming profile
          </p>
        </div>
        
        <div className="grid grid-4">
          <div className="form-group">
            <label className="form-label">Land Size (Acres)</label>
            <input
              type="number"
              name="landSize"
              className="form-input"
              value={formData.landSize}
              onChange={handleInputChange}
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Annual Income (₹)</label>
            <input
              type="number"
              name="annualIncome"
              className="form-input"
              value={formData.annualIncome}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Crop Type</label>
            <select
              name="cropType"
              className="form-input"
              value={formData.cropType}
              onChange={handleInputChange}
            >
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="cotton">Cotton</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="pulses">Pulses</option>
              <option value="oilseeds">Oilseeds</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">State</label>
            <select
              name="state"
              className="form-input"
              value={formData.state}
              onChange={handleInputChange}
            >
              <option value="maharashtra">Maharashtra</option>
              <option value="punjab">Punjab</option>
              <option value="up">Uttar Pradesh</option>
              <option value="gujarat">Gujarat</option>
              <option value="karnataka">Karnataka</option>
              <option value="tamilnadu">Tamil Nadu</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary" onClick={calculateSubsidy} disabled={loading}>
          <Search size={16} />
          {loading ? 'Finding Subsidies...' : 'Find Subsidies'}
        </button>
      </div>

      {/* Information Section */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.05), rgba(46, 125, 50, 0.1))' }}>
        <h3 style={{ color: '#2E7D32', marginBottom: '15px' }}>
          <TrendingUp size={20} style={{ marginRight: '10px' }} />
          Benefits of Agricultural Subsidies
        </h3>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center', padding: '15px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(76, 175, 80, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              color: '#2E7D32'
            }}>
              <Shield size={30} />
            </div>
            <h4>Risk Mitigation</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Protect against crop failure, price fluctuations, and natural disasters
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(76, 175, 80, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              color: '#2E7D32'
            }}>
              <Calculator size={30} />
            </div>
            <h4>Financial Support</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Access credit, grants, and financial assistance for farming activities
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '15px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(76, 175, 80, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              color: '#2E7D32'
            }}>
              <Clock size={30} />
            </div>
            <h4>Modernization</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              Adopt new technologies and sustainable farming practices with support
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <div className="loading" style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #ccc', 
            borderTopColor: '#2E7D32',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#666' }}>Analyzing your farm profile...</p>
          <p style={{ fontSize: '0.9rem', color: '#888' }}>Matching with the best subsidy schemes</p>
        </div>
      )}

      {schemes.length > 0 && !loading && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#2E7D32', margin: 0 }}>
              Top Recommendations for You
            </h3>
            <span style={{ 
              marginLeft: '15px', 
              padding: '3px 10px', 
              background: 'rgba(46, 125, 50, 0.1)', 
              borderRadius: '12px', 
              fontSize: '0.8rem', 
              color: '#2E7D32' 
            }}>
              {schemes.length} schemes matched
            </span>
          </div>
          
          {schemes.map((scheme, index) => (
            <div 
              key={index}
              className={`scheme-card ${scheme.bestMatch ? 'success-animation' : ''}`}
              style={scheme.bestMatch ? {
                border: '2px solid #4CAF50',
                background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(76, 175, 80, 0.02))'
              } : {}}
            >
              <div className="scheme-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginRight: '15px',
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2E7D32'
                  }}>
                    {scheme.image ? (
                      <img 
                        src={scheme.image} 
                        alt={scheme.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <TrendingUp size={24} />
                    )}
                  </div>
                  <div>
                    <div className="scheme-title">
                      {scheme.name}
                      {scheme.bestMatch && (
                        <span style={{ 
                          marginLeft: '10px', 
                          padding: '3px 8px', 
                          background: 'gold', 
                          borderRadius: '8px', 
                          fontSize: '0.7rem', 
                          color: '#333', 
                          fontWeight: 'bold' 
                        }}>
                          BEST MATCH
                        </span>
                      )}
                    </div>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                      {scheme.description}
                    </div>
                  </div>
                </div>
                <div 
                  className="scheme-type" 
                  style={{ 
                    background: scheme.type === 'Government' 
                      ? '#2E7D32' 
                      : scheme.type === 'State Government' 
                        ? '#1976D2' 
                        : '#7B1FA2' 
                  }}
                >
                  {scheme.type}
                </div>
              </div>
              
              <div className="scheme-details">
                <div className="detail-item">
                  <div className="detail-value">{scheme.amount}</div>
                  <div className="detail-label">Maximum Amount</div>
                </div>
                <div className="detail-item">
                  <div className="detail-value">{scheme.eligibility}</div>
                  <div className="detail-label">Eligibility Match</div>
                </div>
                <div className="detail-item">
                  <div className="detail-value">{scheme.interestRate}</div>
                  <div className="detail-label">Interest Rate</div>
                </div>
              </div>
              
              <div style={{ margin: '15px 0' }}>
                <strong>Key Benefits:</strong>
                <ul style={{ margin: '5px 0 0 20px' }}>
                  {scheme.benefits.map((benefit, i) => (
                    <li key={i} style={{ margin: '3px 0', fontSize: '0.9rem' }}>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                className="apply-btn" 
                onClick={() => applyScheme(scheme.name)}
                style={scheme.bestMatch ? {
                  background: 'linear-gradient(135deg, #4CAF50, #66BB6A)'
                } : {}}
              >
                <CheckCircle size={16} style={{ marginRight: '8px' }} />
                {scheme.bestMatch ? 'Apply Now (Best Match)' : 'Apply Now'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubsidyCalculator;