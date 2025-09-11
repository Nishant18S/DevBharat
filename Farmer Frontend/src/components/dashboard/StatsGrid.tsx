import React, { useState, useEffect } from 'react';
import { User } from '../../types';

interface StatsGridProps {
  currentUser: User;
}

const StatsGrid: React.FC<StatsGridProps> = ({ currentUser }) => {
  const [randomData, setRandomData] = useState({
    activeSchemes: 0,
    soilQuality: '',
    rainfall: 0,
    cropYield: 0,
    marketPrice: 0,
    subsidyAmount: 0
  });

  useEffect(() => {
    // Generate random data when component mounts
    const generateRandomData = () => {
      const schemes = Math.floor(Math.random() * 8) + 5; // 5-12 schemes
      const soilQualities = ['Excellent', 'Good', 'Average', 'Poor'];
      const soilQuality = soilQualities[Math.floor(Math.random() * soilQualities.length)];
      const rainfall = Math.floor(Math.random() * 300) + 500; // 500-800 mm
      const cropYield = (Math.random() * 5 + 2).toFixed(1); // 2.0-7.0 tons/acre
      const marketPrice = Math.floor(Math.random() * 3000) + 2000; // ₹2000-5000/ton
      const subsidyAmount = Math.floor(Math.random() * 50000) + 10000; // ₹10,000-60,000

      setRandomData({
        activeSchemes: schemes,
        soilQuality,
        rainfall,
        cropYield: parseFloat(cropYield),
        marketPrice,
        subsidyAmount
      });
    };

    generateRandomData();
  }, []);

  // Get actual data from currentUser with fallback values
  const landSize = currentUser?.landSize || Math.floor(Math.random() * 10) + 2; // 2-12 acres if not provided
  const annualIncome = currentUser?.annualIncome || Math.floor(Math.random() * 500000) + 100000; // ₹1-6L if not provided
  const cropType = currentUser?.cropType || ['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton'][Math.floor(Math.random() * 5)];

  return (
    <div className="stats-grid">
      {/* Actual user data with fallbacks */}
      <div className="stat-card">
        <div className="stat-value">{landSize}</div>
        <div className="stat-label">Acres of Land</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">₹{(annualIncome / 100000).toFixed(1)}L</div>
        <div className="stat-label">Annual Income</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{cropType}</div>
        <div className="stat-label">Primary Crop</div>
      </div>
      
      {/* Random data */}
      <div className="stat-card">
        <div className="stat-value">{randomData.activeSchemes}</div>
        <div className="stat-label">Active Schemes</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{randomData.soilQuality}</div>
        <div className="stat-label">Soil Quality</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{randomData.rainfall}mm</div>
        <div className="stat-label">Annual Rainfall</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{randomData.cropYield}t/acre</div>
        <div className="stat-label">Avg Yield</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">₹{randomData.marketPrice}</div>
        <div className="stat-label">Market Price/ton</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">₹{randomData.subsidyAmount.toLocaleString()}</div>
        <div className="stat-label">Subsidy Received</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{Math.floor(Math.random() * 20) + 5}%</div>
        <div className="stat-label">Crop Growth</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{Math.floor(Math.random() * 15) + 1}</div>
        <div className="stat-label">Years Farming</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{Math.floor(Math.random() * 8) + 2}</div>
        <div className="stat-label">Crop Varieties</div>
      </div>
    </div>
  );
};

export default StatsGrid;