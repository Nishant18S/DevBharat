import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line, Radar, Scatter } from 'react-chartjs-2';
import { Download, Table, Map, TrendingUp, BarChart3, PieChart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedState, setSelectedState] = useState<string>('');
  const [mapData, setMapData] = useState<any>(null);

  // Indian states agriculture data
  const stateWiseData = {
    labels: ['Uttar Pradesh', 'Punjab', 'Maharashtra', 'Madhya Pradesh', 'Karnataka', 
             'West Bengal', 'Gujarat', 'Rajasthan', 'Andhra Pradesh', 'Tamil Nadu'],
    datasets: [{
      label: 'Food Grain Production (Million Tons)',
      data: [58, 31, 26, 25, 15, 18, 14, 23, 21, 17],
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  // Major crops distribution
  const cropsData = {
    labels: ['Rice', 'Wheat', 'Maize', 'Pulses', 'Oilseeds', 'Sugarcane', 'Cotton'],
    datasets: [{
      data: [44, 35, 9, 7, 13, 4, 5],
      backgroundColor: [
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 205, 86, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(201, 203, 207, 0.7)',
        'rgba(255, 99, 132, 0.7)'
      ],
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 2,
    }]
  };

  // Yield trends for major crops
  const yieldTrendsData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Rice (kg/hectare)',
        data: [2600, 2680, 2750, 2820, 2900, 2980],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Wheat (kg/hectare)',
        data: [3200, 3300, 3420, 3500, 3600, 3700],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Pulses (kg/hectare)',
        data: [800, 820, 850, 880, 900, 920],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        tension: 0.4,
      }
    ]
  };

  // Irrigation coverage
  const irrigationData = {
    labels: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Tamil Nadu', 'Andhra Pradesh', 
             'Karnataka', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Madhya Pradesh'],
    datasets: [{
      label: 'Irrigation Coverage (%)',
      data: [98, 85, 75, 65, 60, 55, 45, 40, 35, 30],
      backgroundColor: 'rgba(153, 102, 255, 0.7)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  };

  // Seasonal production
  const seasonalData = {
    labels: ['Kharif', 'Rabi', 'Zaid'],
    datasets: [{
      label: 'Production (Million Tons)',
      data: [150, 160, 15],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(255, 206, 86, 0.7)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  };

  // India map data (simplified)
  const indiaMapData = [
    { state: 'Uttar Pradesh', production: 58, color: '#1f77b4' },
    { state: 'Punjab', production: 31, color: '#ff7f0e' },
    { state: 'Maharashtra', production: 26, color: '#2ca02c' },
    { state: 'Madhya Pradesh', production: 25, color: '#d62728' },
    { state: 'Karnataka', production: 15, color: '#9467bd' },
    { state: 'West Bengal', production: 18, color: '#8c564b' },
    { state: 'Gujarat', production: 14, color: '#e377c2' },
    { state: 'Rajasthan', production: 23, color: '#7f7f7f' },
    { state: 'Andhra Pradesh', production: 21, color: '#bcbd22' },
    { state: 'Tamil Nadu', production: 17, color: '#17becf' }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const charts = [
    { 
      id: 'production', 
      title: 'Top States - Food Grain Production', 
      type: 'production', 
      icon: <BarChart3 size={16} />,
      component: <Bar data={stateWiseData} options={chartOptions} /> 
    },
    { 
      id: 'crops', 
      title: 'Major Crops Distribution', 
      type: 'distribution', 
      icon: <PieChart size={16} />,
      component: <Doughnut data={cropsData} options={chartOptions} /> 
    },
    { 
      id: 'yield', 
      title: 'Crop Yield Trends', 
      type: 'yield', 
      icon: <TrendingUp size={16} />,
      component: <Line data={yieldTrendsData} options={chartOptions} /> 
    },
    { 
      id: 'irrigation', 
      title: 'Irrigation Coverage by State', 
      type: 'infrastructure', 
      icon: <BarChart3 size={16} />,
      component: <Bar data={irrigationData} options={chartOptions} /> 
    },
    { 
      id: 'seasonal', 
      title: 'Seasonal Production', 
      type: 'production', 
      icon: <PieChart size={16} />,
      component: <Bar data={seasonalData} options={chartOptions} /> 
    }
  ];

  const filteredCharts = activeFilter === 'all' ? charts : charts.filter(chart => chart.type === activeFilter);

  // Simple India map visualization with image
  const renderIndiaMap = () => (
    <div className="india-map-container">
      <div className="map-title">Food Grain Production by State (Million Tons)</div>
      <div className="map-wrapper">
        {/* India map image as background */}
        <div className="india-map-image">
          <img 
            src="https://i0.wp.com/indiadatamap.com/wp-content/uploads/2025/08/Total-poultry-production-in-India-state-wise-2025.png?resize=1024%2C1024&ssl=1" 
            alt="India Map" 
            className="map-bg"
          />
          
          {/* Interactive state markers */}
          <div className="state-markers">
            <div 
              className="state-marker up" 
              data-production="58" 
              onClick={() => setSelectedState('Uttar Pradesh')}
              title="Uttar Pradesh - 58 MT"
            >
              UP
            </div>
            <div 
              className="state-marker pb" 
              data-production="31" 
              onClick={() => setSelectedState('Punjab')}
              title="Punjab - 31 MT"
            >
              PB
            </div>
            <div 
              className="state-marker mh" 
              data-production="26" 
              onClick={() => setSelectedState('Maharashtra')}
              title="Maharashtra - 26 MT"
            >
              MH
            </div>
            <div 
              className="state-marker mp" 
              data-production="25" 
              onClick={() => setSelectedState('Madhya Pradesh')}
              title="Madhya Pradesh - 25 MT"
            >
              MP
            </div>
            <div 
              className="state-marker rj" 
              data-production="23" 
              onClick={() => setSelectedState('Rajasthan')}
              title="Rajasthan - 23 MT"
            >
              RJ
            </div>
            <div 
              className="state-marker ap" 
              data-production="21" 
              onClick={() => setSelectedState('Andhra Pradesh')}
              title="Andhra Pradesh - 21 MT"
            >
              AP
            </div>
            <div 
              className="state-marker wb" 
              data-production="18" 
              onClick={() => setSelectedState('West Bengal')}
              title="West Bengal - 18 MT"
            >
              WB
            </div>
            <div 
              className="state-marker tn" 
              data-production="17" 
              onClick={() => setSelectedState('Tamil Nadu')}
              title="Tamil Nadu - 17 MT"
            >
              TN
            </div>
            <div 
              className="state-marker ka" 
              data-production="15" 
              onClick={() => setSelectedState('Karnataka')}
              title="Karnataka - 15 MT"
            >
              KA
            </div>
            <div 
              className="state-marker gj" 
              data-production="14" 
              onClick={() => setSelectedState('Gujarat')}
              title="Gujarat - 14 MT"
            >
              GJ
            </div>
          </div>
        </div>
      </div>
      
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-color high"></span>
          <span>High Production (25+ MT)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color medium"></span>
          <span>Medium Production (15-25 MT)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color low"></span>
          <span>Low Production (&lt;15 MT)</span>
        </div>
      </div>

      {selectedState && (
        <div className="state-info">
          <h4>{selectedState}</h4>
          <p>Food Grain Production: {indiaMapData.find(s => s.state === selectedState)?.production} Million Tons</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-container">
      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 30px;
          background: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .dashboard-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dashboard-subtitle {
          font-size: 1.1rem;
          color: #718096;
          margin-bottom: 25px;
        }

        .chart-controls {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .chart-controls button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border: 2px solid #e2e8f0;
          background: white;
          color: #4a5568;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .chart-controls button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border-color: #667eea;
          color: #667eea;
        }

        .chart-controls button.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .map-section {
          margin: 30px 0;
        }

        .india-map-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .map-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
          text-align: center;
          margin-bottom: 20px;
        }

        .map-wrapper {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }

        .india-map-image {
          position: relative;
          max-width: 600px;
          width: 100%;
        }

        .map-bg {
          width: 100%;
          height: auto;
          border-radius: 15px;
          filter: brightness(0.9) contrast(1.1);
        }

        .state-markers {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .state-marker {
          position: absolute;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .state-marker:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          z-index: 10;
        }

        /* Approximate positioning for major states */
        .state-marker.up { top: 25%; left: 45%; }
        .state-marker.pb { top: 15%; left: 42%; }
        .state-marker.mh { top: 50%; left: 35%; }
        .state-marker.mp { top: 40%; left: 45%; }
        .state-marker.rj { top: 30%; left: 30%; }
        .state-marker.ap { top: 65%; left: 45%; }
        .state-marker.wb { top: 40%; left: 65%; }
        .state-marker.tn { top: 75%; left: 45%; }
        .state-marker.ka { top: 65%; left: 40%; }
        .state-marker.gj { top: 40%; left: 25%; }

        .map-legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: #4a5568;
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }

        .legend-color.high { background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); }
        .legend-color.medium { background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%); }
        .legend-color.low { background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%); }

        .state-info {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 15px;
          margin-top: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .state-info h4 {
          margin: 0 0 10px 0;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .state-info p {
          margin: 0;
          font-size: 1rem;
          opacity: 0.9;
        }

        .key-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }

        .metric-card {
          background: rgba(255, 255, 255, 0.95);
          padding: 25px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .metric-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .metric-label {
          font-size: 0.9rem;
          color: #718096;
          font-weight: 500;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }

        .chart-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .chart-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f7fafc;
        }

        .chart-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.2rem;
          font-weight: 600;
          color: #2d3748;
        }

        .chart-actions {
          display: flex;
          gap: 8px;
        }

        .chart-actions button {
          padding: 8px;
          background: #f7fafc;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          color: #718096;
          transition: all 0.2s ease;
        }

        .chart-actions button:hover {
          background: #e2e8f0;
          color: #4a5568;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 15px;
          }
          
          .dashboard-header h1 {
            font-size: 2rem;
          }
          
          .charts-grid {
            grid-template-columns: 1fr;
          }
          
          .chart-container {
            padding: 20px;
          }
          
          .key-metrics {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          
          .metric-value {
            font-size: 2rem;
          }
          
          .state-marker {
            padding: 6px 8px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .chart-controls {
            flex-direction: column;
            align-items: center;
          }
          
          .chart-controls button {
            width: 200px;
            justify-content: center;
          }
          
          .map-legend {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
      
      <div className="dashboard-header">
        <h1>🇮🇳 India Agricultural Analytics Dashboard</h1>
        <p className="dashboard-subtitle">Comprehensive analysis of Indian agriculture sector</p>
        
        <div className="chart-controls">
          <button className={activeFilter === 'all' ? 'active' : ''} onClick={() => setActiveFilter('all')}>
            <Map size={16} /> All Charts
          </button>
          <button className={activeFilter === 'production' ? 'active' : ''} onClick={() => setActiveFilter('production')}>
            <BarChart3 size={16} /> Production
          </button>
          <button className={activeFilter === 'yield' ? 'active' : ''} onClick={() => setActiveFilter('yield')}>
            <TrendingUp size={16} /> Yield
          </button>
          <button className={activeFilter === 'distribution' ? 'active' : ''} onClick={() => setActiveFilter('distribution')}>
            <PieChart size={16} /> Distribution
          </button>
          <button className={activeFilter === 'infrastructure' ? 'active' : ''} onClick={() => setActiveFilter('infrastructure')}>
            Infrastructure
          </button>
        </div>
      </div>

      {/* India Map Section */}
      <div className="map-section">
        {renderIndiaMap()}
      </div>

      {/* Key Metrics */}
      <div className="key-metrics">
        <div className="metric-card">
          <div className="metric-value">315M</div>
          <div className="metric-label">Total Food Grain Production (Tons)</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">156M</div>
          <div className="metric-label">Hectares under Cultivation</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">48%</div>
          <div className="metric-label">Irrigation Coverage</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">₹19.5T</div>
          <div className="metric-label">Agricultural GDP</div>
        </div>
      </div>

      <div className="charts-grid">
        {filteredCharts.map((chart) => (
          <div key={chart.id} className="chart-container">
            <div className="chart-header">
              <div className="chart-title">
                {chart.icon}
                {chart.title}
              </div>
              <div className="chart-actions">
                <button title="Download as PNG">
                  <Download size={14} />
                </button>
                <button title="View Data Table">
                  <Table size={14} />
                </button>
              </div>
            </div>
            <div style={{ height: '300px' }}>
              {chart.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartsSection;