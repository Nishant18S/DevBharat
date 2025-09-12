import type { SubsidyScheme } from '../types';

export const subsidySchemes: SubsidyScheme[] = [
  {
    id: 'pm_kisan_small',
    name: 'PM-KISAN Small & Marginal Farmer Support',
    type: 'Central Government',
    eligibility: 'Land ≤ 2 acres',
    amount: '₹18,000',
    benefits: [
      '₹6,000 annual direct cash transfer',
      '70% subsidy on certified seeds',
      'Free soil health card',
      'Crop insurance at 50% premium subsidy',
      'Priority access to credit facilities'
    ],
    minLand: 0,
    maxLand: 2,
    documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details']
  },
  {
    id: 'rashtriya_krishi',
    name: 'Rashtriya Krishi Vikas Yojana (RKVY)',
    type: 'State Government',
    eligibility: 'Land 2-5 acres',
    amount: '₹45,000',
    benefits: [
      '60% subsidy on farm equipment',
      'Irrigation infrastructure support',
      'Market linkage facilitation',
      'Storage subsidy up to 50%',
      'Technical training programs'
    ],
    minLand: 2,
    maxLand: 5,
    documents: ['Land Ownership Certificate', 'Aadhaar Card', 'Income Certificate']
  },
  {
    id: 'commercial_farming',
    name: 'Commercial Farming Excellence Program',
    type: 'Central Government',
    eligibility: 'Land > 5 acres',
    amount: '₹85,000',
    benefits: [
      'Equipment subsidy up to 50%',
      'Cold storage facility support',
      'Export market facilitation',
      'Processing unit establishment subsidy',
      'Organic certification support'
    ],
    minLand: 5,
    maxLand: 1000,
    documents: ['Commercial Farming License', 'Environmental Clearance', 'Business Registration']
  },
  {
    id: 'digital_agriculture',
    name: 'Digital Agriculture Innovation Scheme',
    type: 'Private Partnership',
    eligibility: 'Tech-savvy progressive farmers',
    amount: '₹35,000',
    benefits: [
      'Smart farming equipment subsidy',
      'Precision agriculture support',
      'Drone technology access',
      'AI-based crop monitoring',
      'Market price forecasting'
    ],
    minLand: 1,
    maxLand: 1000,
    documents: ['Digital Literacy Certificate', 'Progressive Farmer ID', 'Technology Adoption Agreement']
  },
  {
    id: 'organic_premium',
    name: 'Organic Farming Premium Support',
    type: 'State Government',
    eligibility: 'Organic certification holders',
    amount: '₹65,000',
    benefits: [
      'Organic input subsidy 80%',
      'Certification cost reimbursement',
      'Premium market access guarantee',
      'Export facilitation support',
      'Organic brand development'
    ],
    minLand: 0.5,
    maxLand: 1000,
    documents: ['Organic Certification', 'Soil Test Report', 'Water Quality Certificate']
  },
  {
    id: 'climate_resilient',
    name: 'Climate Resilient Agriculture Program',
    type: 'Central Government',
    eligibility: 'Drought/flood prone areas',
    amount: '₹55,000',
    benefits: [
      'Climate-smart infrastructure',
      'Drought-resistant variety seeds',
      'Weather insurance coverage',
      'Emergency support fund',
      'Resilience building training'
    ],
    minLand: 1,
    maxLand: 1000,
    documents: ['Vulnerability Assessment Certificate', 'Disaster Damage Records', 'Climate Zone Classification']
  }
];