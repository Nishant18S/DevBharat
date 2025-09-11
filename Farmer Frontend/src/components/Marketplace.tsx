import React, { useState, useEffect } from 'react';
import { Store, Search, RefreshCw, Phone } from 'lucide-react';
import { Product, ModalContent } from '../types';

interface MarketplaceProps {
  showModal: (content: ModalContent) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ showModal }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/products/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactFarmer = (farmerName: string, productName: string, contactNumber: string, location: string) => {
    const displayPhone = contactNumber || '+91 98765 43210';
    const displayLocation = location || 'Village Farming Area';

    showModal({
      type: 'contact',
      title: `Contact ${farmerName}`,
      content: (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ 
            background: '#1976D2', 
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
            <Phone size={32} />
          </div>
          <p style={{ marginBottom: '20px' }}>
            Interested in <strong>{productName}</strong>?
          </p>
          <div style={{ 
            background: 'rgba(25, 118, 210, 0.1)', 
            padding: '15px', 
            borderRadius: '12px', 
            marginBottom: '20px' 
          }}>
            <h4 style={{ color: '#1976D2', marginBottom: '10px' }}>Contact Information:</h4>
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: '8px 0' }}>
                <Phone size={16} style={{ marginRight: '10px' }} />
                {displayPhone}
              </p>
              <p style={{ margin: '8px 0' }}>
                <i className="fas fa-user" style={{ width: '20px', marginRight: '10px' }}></i>
                {farmerName}
              </p>
              <p style={{ margin: '8px 0' }}>
                <i className="fas fa-map-marker-alt" style={{ width: '20px', marginRight: '10px' }}></i>
                {displayLocation}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <a 
              href={`tel:${displayPhone}`} 
              className="btn btn-primary" 
              style={{ textDecoration: 'none' }}
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>
        </div>
      )
    });
  };

  if (loading) {
    return (
      <div className="tab-content active">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="loading"></div>
          <p style={{ marginTop: '20px', color: '#666' }}>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content active">
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Store size={20} />
            All Products
          </div>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-secondary" onClick={fetchProducts}>
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <Store size={48} style={{ opacity: 0.3, marginBottom: '20px' }} />
            <p>No products found in the marketplace.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product._id || product.id} className="product-card">
                <img 
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">
                    ₹{product.price} {product.unit && `(${product.unit})`}
                  </div>
                  {product.description && (
                    <div className="product-description" style={{ 
                      fontSize: '0.85rem', 
                      color: '#666', 
                      margin: '8px 0', 
                      lineHeight: '1.4' 
                    }}>
                      {product.description}
                    </div>
                  )}
                  <div className="product-farmer" style={{ marginTop: '8px' }}>
                    Farmer: {product.farmerName}
                  </div>
                  {product.location && (
                    <div className="product-location" style={{ 
                      fontSize: '0.85rem', 
                      color: '#777', 
                      marginTop: '4px' 
                    }}>
                      <i className="fas fa-map-marker-alt"></i> {product.location}
                    </div>
                  )}
                  <div style={{ marginTop: '15px' }}>
                    <button 
                      className="btn btn-primary" 
                      style={{ 
                        width: '100%', 
                        padding: '8px 12px', 
                        fontSize: '0.9rem' 
                      }}
                      onClick={() => contactFarmer(
                        product.farmerName, 
                        product.name, 
                        product.contactNumber || '', 
                        product.location || ''
                      )}
                    >
                      <Phone size={16} />
                      Contact Farmer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;