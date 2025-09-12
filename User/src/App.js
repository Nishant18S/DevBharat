import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// --- Image Imports ---
import loginImage from "./images/log.png";
import registerImage from "./images/reg.png";
import qrCodeImage from "./images/qr-code.png";
import defaultAvatar from "./images/default-avatar.jpg";

// --- Helper & Core UI Components ---
const CustomAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="toast-container">
      {" "}
      <div className="toast-notification">
        {" "}
        <p>{message}</p> <button onClick={onClose}>&times;</button>{" "}
      </div>{" "}
    </div>
  );
};
const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return (
    <div className="clock-display">
      {time.toLocaleDateString("en-US", options)}
    </div>
  );
};

const Header = ({ setPage, user, cartItemCount, handleLogout }) => (
  <header className="header">
    <div className="container header-content">
      <div className="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10zM2 13a10 10 0 0 1 10-10 10 10 0 0 1 10 10h-2a7 7 0 0 0-7-7 7 7 0 0 0-7 7z" />
        </svg>
        <h1>Kisan Mitra</h1>
      </div>
      <div className="header-nav">
        <div className="user-info">
          <span>Welcome, {user ? user.name : "Guest"}!</span>
          <Clock />
        </div>
        <div className="cart-icon" onClick={() => setPage("checkout")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </div>
        <button onClick={handleLogout} className="button button-logout">
          Logout
        </button>
      </div>
    </div>
  </header>
);
const Sidebar = ({ page, setPage }) => {
  const navItems = [
    { name: "Products", page: "products" },
    { name: "Orders", page: "orders" },
    { name: "Analytics", page: "analytics" },
    { name: "Profile", page: "profile" },
    { name: "Settings", page: "settings" },
  ];
  return (
    <aside className="sidebar">
      {" "}
      <nav>
        {" "}
        <ul>
          {" "}
          {navItems.map((item) => (
            <li key={item.name}>
              {" "}
              <button
                onClick={() => setPage(item.page)}
                className={page === item.page ? "active" : ""}
              >
                {item.name}
              </button>{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </nav>{" "}
    </aside>
  );
};

// --- PAGE COMPONENTS ---
const AuthPage = ({ handleLogin, handleRegister, setPage }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    handleLogin(signInEmail, signInPassword);
  };
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    handleRegister({
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
    });
  };
  return (
    <div
      className={`auth-page-container ${isSignUpMode ? "sign-up-mode" : ""}`}
    >
      {" "}
      <div className="forms-container">
        {" "}
        <div className="signin-signup">
          {" "}
          <form onSubmit={handleSignInSubmit} className="sign-in-form">
            {" "}
            <h1 className="auth-logo-text">Kisan Mitra</h1>{" "}
            <h2 className="title">Sign in</h2>{" "}
            <div className="input-field">
              {" "}
              <i className="fas fa-envelope"></i>{" "}
              <input
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                required
              />{" "}
            </div>{" "}
            <div className="input-field">
              {" "}
              <i className="fas fa-lock"></i>{" "}
              <input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                required
              />{" "}
            </div>{" "}
            <button
              type="button"
              className="forgot-password-btn"
              onClick={() => setPage("forgotPassword")}
            >
              Forgot Password?
            </button>{" "}
            <button type="submit" className="btn solid">
              Login
            </button>{" "}
          </form>{" "}
          <form onSubmit={handleSignUpSubmit} className="sign-up-form">
            {" "}
            <h1 className="auth-logo-text">Kisan Mitra</h1>{" "}
            <h2 className="title">Sign up</h2>{" "}
            <div className="input-field">
              {" "}
              <i className="fas fa-user"></i>{" "}
              <input
                type="text"
                placeholder="Full Name"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                required
              />{" "}
            </div>{" "}
            <div className="input-field">
              {" "}
              <i className="fas fa-envelope"></i>{" "}
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
              />{" "}
            </div>{" "}
            <div className="input-field">
              {" "}
              <i className="fas fa-lock"></i>{" "}
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
              />{" "}
            </div>{" "}
            <button type="submit" className="btn solid">
              Sign up
            </button>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
      <div className="panels-container">
        {" "}
        <div className="panel left-panel">
          {" "}
          <div className="content">
            {" "}
            <h3>New here ?</h3>{" "}
            <p>
              Join the Kisan Mitra community today and connect directly with
              farmers!
            </p>{" "}
            <button
              className="btn transparent"
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up
            </button>{" "}
          </div>{" "}
          <img src={loginImage} className="image" alt="" />{" "}
        </div>{" "}
        <div className="panel right-panel">
          {" "}
          <div className="content">
            {" "}
            <h3>One of us ?</h3>{" "}
            <p>
              Already have an account? Sign in to access your dashboard and the
              marketplace.
            </p>{" "}
            <button
              className="btn transparent"
              onClick={() => setIsSignUpMode(false)}
            >
              Sign in
            </button>{" "}
          </div>{" "}
          <img src={registerImage} className="image" alt="" />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
const ForgotPasswordPage = ({ handleUpdatePassword, setPage }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdatePassword(email, newPassword);
  };
  return (
    <div className="simple-auth-container">
      {" "}
      <div className="simple-auth-card">
        {" "}
        <h1 className="auth-logo-text">Kisan Mitra</h1>{" "}
        <h2 className="title">Reset Password</h2>{" "}
        <p className="form-subtitle">Enter your email and new password.</p>{" "}
        <form onSubmit={handleSubmit} className="simple-form">
          {" "}
          <div className="input-field">
            {" "}
            <i className="fas fa-envelope"></i>{" "}
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />{" "}
          </div>{" "}
          <div className="input-field">
            {" "}
            <i className="fas fa-lock"></i>{" "}
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />{" "}
          </div>{" "}
          <button
            type="submit"
            className="btn solid"
            style={{ width: "100%", marginTop: "10px" }}
          >
            Update Password
          </button>{" "}
          <button
            type="button"
            className="forgot-password-btn"
            onClick={() => setPage("login")}
          >
            Back to Login
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};
const ProfilePage = ({ user, handleProfileUpdate, handleAvatarUpdate }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [contact, setContact] = useState(
    user.contactNumber ? user.contactNumber.slice(3) : ""
  );
  const [countryCode, setCountryCode] = useState(
    user.contactNumber ? user.contactNumber.slice(0, 3) : "+91"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setContact(user.contactNumber ? user.contactNumber.slice(3) : "");
    setCountryCode(user.contactNumber ? user.contactNumber.slice(0, 3) : "+91");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await handleProfileUpdate({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        contactNumber: contact ? `${countryCode}${contact}` : "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setContact(user.contactNumber ? user.contactNumber.slice(3) : "");
    setCountryCode(user.contactNumber ? user.contactNumber.slice(0, 3) : "+91");
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      handleAvatarUpdate(file);
    }
  };

  const isFormChanged = () => {
    return (
      name !== user.name ||
      email !== user.email ||
      `${countryCode}${contact}` !== (user.contactNumber || "+91")
    );
  };

  return (
    <div className="page-content">
      <h2>Your Profile</h2>
      <div className="card profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src={
                user.profilePicture
                  ? `http://localhost:5001/${user.profilePicture}?${Date.now()}`
                  : defaultAvatar
              }
              alt="User Avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
            />
            {isEditing && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />
                <button
                  className="avatar-edit-btn"
                  onClick={handleAvatarClick}
                  title="Change profile picture"
                >
                  <i className="fas fa-camera"></i>
                </button>
              </>
            )}
          </div>
          <div className="profile-name">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            {user.contactNumber && (
              <p className="profile-contact">
                <i className="fas fa-phone"></i>
                {user.contactNumber}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              required
              minLength={2}
              maxLength={50}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>
            <div className="contact-input-group">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={!isEditing}
                className="country-code-select"
              >
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (AU)</option>
              </select>
              <input
                id="contact"
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value.replace(/\D/g, ""))}
                disabled={!isEditing}
                placeholder="Enter phone number"
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>
          </div>
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="button button-primary"
                  disabled={isSaving || !isFormChanged()}
                >
                  {isSaving ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i> Save Changes
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="button button-primary"
                onClick={() => setIsEditing(true)}
              >
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
const SettingsPage = ({ user, handleUpdatePassword }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return handleUpdatePassword(null, null, "Passwords do not match.");
    }
    handleUpdatePassword(user.email, newPassword);
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="page-content">
      {" "}
      <h2>Settings</h2>{" "}
      <div className="settings-form-card">
        {" "}
        <h2 className="title">Change Password</h2>{" "}
        <p className="form-subtitle">Update the password for your account.</p>{" "}
        <form onSubmit={handleSubmit} className="simple-form">
          {" "}
          <div className="input-field">
            {" "}
            <i className="fas fa-lock"></i>{" "}
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />{" "}
          </div>{" "}
          <div className="input-field">
            {" "}
            <i className="fas fa-lock"></i>{" "}
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />{" "}
          </div>{" "}
          <button
            type="submit"
            className="btn solid"
            style={{ width: "100%", marginTop: "10px" }}
          >
            Update Password
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};
const AnalyticsPage = ({ purchaseHistory }) => {
  const totalOrders = purchaseHistory.length;
  const totalSpent = purchaseHistory.reduce(
    (acc, order) => acc + order.total,
    0
  );
  const productsPurchased = purchaseHistory.reduce(
    (acc, order) =>
      acc + order.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );
  const savingsThisMonth = totalOrders > 0 ? "12%" : "0%";
  const salesData = [
    { month: "June", sales: 6500 },
    { month: "July", sales: 8200 },
    { month: "August", sales: 9500 },
  ];
  const categoryData = [
    { name: "Vegetables", value: 55 },
    { name: "Fruits", value: 30 },
    { name: "Grains", value: 15 },
  ];
  const maxSales = Math.max(...salesData.map((item) => item.sales));
  const getSalesHeight = (sales) => {
    if (maxSales === 0) return 20;
    const percentage = (sales / maxSales) * 100;
    return Math.max(percentage, 15);
  };
  const maxCategory = Math.max(...categoryData.map((item) => item.value));
  const getCategoryHeight = (value) => {
    if (maxCategory === 0) return 20;
    const percentage = (value / maxCategory) * 100;
    return Math.max(percentage, 15);
  };
  return (
    <div className="page-content">
      {" "}
      <h2>Analytics</h2>{" "}
      <div className="analytics-grid">
        {" "}
        <div className="card analytics-card">
          {" "}
          <h3>Total Orders</h3> <p>{totalOrders}</p>{" "}
        </div>{" "}
        <div className="card analytics-card">
          {" "}
          <h3>Total Spent</h3> <p>₹{totalSpent.toFixed(0)}</p>{" "}
        </div>{" "}
        <div className="card analytics-card">
          {" "}
          <h3>Products Purchased</h3> <p>{productsPurchased}</p>{" "}
        </div>{" "}
        <div className="card analytics-card">
          {" "}
          <h3>Savings This Month</h3> <p>{savingsThisMonth}</p>{" "}
        </div>{" "}
      </div>{" "}
      {purchaseHistory.length > 0 && (
        <div className="dashboard-charts">
          {" "}
          <div className="card chart-card">
            {" "}
            <h3>Recent Sales Data (₹)</h3>{" "}
            <div className="bar-chart">
              {" "}
              {salesData.map((d, index) => (
                <div key={d.month} className="bar-item">
                  {" "}
                  <div className="bar-label">
                    ₹{d.sales.toLocaleString()}
                  </div>{" "}
                  <div
                    className="bar"
                    style={{
                      height: `${getSalesHeight(d.sales)}%`,
                      animationDelay: `${index * 0.2}s`,
                    }}
                  ></div>{" "}
                  <div className="bar-category">{d.month}</div>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </div>{" "}
          <div className="card chart-card">
            {" "}
            <h3>Popular Product Categories</h3>{" "}
            <div className="bar-chart">
              {" "}
              {categoryData.map((d, index) => (
                <div key={d.name} className="bar-item">
                  {" "}
                  <div className="bar-label">{d.value}%</div>{" "}
                  <div
                    className="bar bar-secondary"
                    style={{
                      height: `${getCategoryHeight(d.value)}%`,
                      animationDelay: `${index * 0.2}s`,
                    }}
                  ></div>{" "}
                  <div className="bar-category">{d.name}</div>{" "}
                </div>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};
const ProductsPage = ({
  products,
  loading,
  error,
  addToCart,
  fetchProducts,
}) => {
  if (loading) {
    return (
      <div className="page-content">
        {" "}
        <h2>Marketplace</h2>{" "}
        <div className="loading-container">
          {" "}
          <div className="loading-spinner"></div> <p>Loading Products...</p>{" "}
        </div>{" "}
      </div>
    );
  }
  if (error) {
    return (
      <div className="page-content">
        {" "}
        <h2>Marketplace</h2>{" "}
        <div className="empty-state">
          {" "}
          <i className="fas fa-exclamation-triangle"></i>{" "}
          <h3>Connection Error</h3> <p>{error}</p>{" "}
          <button className="btn solid" onClick={fetchProducts}>
            {" "}
            <i className="fas fa-sync"></i> Retry{" "}
          </button>{" "}
        </div>{" "}
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="page-content">
        {" "}
        <h2>Marketplace</h2>{" "}
        <div className="empty-state">
          {" "}
          <i className="fas fa-box-open"></i> <h3>No Products Available</h3>{" "}
          <p>Check back later for new products from our suppliers.</p>{" "}
        </div>{" "}
      </div>
    );
  }
  return (
    <div className="page-content">
      {" "}
      <h2>Marketplace</h2>{" "}
      <div className="product-grid">
        {" "}
        {products.map((p) => (
          <div key={p._id} className="card product-card">
            {" "}
            <img
              src={`http://localhost:5000/${p.image}`}
              alt={p.name}
              className="product-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/400x400/3b82f6/ffffff?text=Image+Not+Found";
              }}
            />{" "}
            <div className="product-info">
              {" "}
              <div className="product-header">
                {" "}
                <h3 className="product-name">{p.name}</h3>{" "}
                <span className="product-badge">Fresh</span>{" "}
              </div>{" "}
              <div className="product-price">
                ₹{p.price} / {p.unit || "kg"}
              </div>{" "}
              <div className="product-description">
                {" "}
                <i className="fas fa-info-circle"></i>{" "}
                {p.description || "No description available"}{" "}
              </div>{" "}
              <div className="product-farmer">
                {" "}
                <i className="fas fa-user"></i> {p.farmerName}{" "}
              </div>{" "}
              <div className="product-contact">
                {" "}
                <i className="fas fa-phone"></i>{" "}
                {p.contactNumber || "Not provided"}{" "}
              </div>{" "}
              <div className="product-location">
                {" "}
                <i className="fas fa-map-marker-alt"></i>{" "}
                {p.location || "Not available"}{" "}
              </div>{" "}
              <div className="product-action">
                {" "}
                <input
                  type="number"
                  id={`qty-${p._id}`}
                  defaultValue="1"
                  min="1"
                />{" "}
                <button
                  className="button button-primary"
                  onClick={() => {
                    const qty = document.getElementById(`qty-${p._id}`).value;
                    addToCart(p, parseInt(qty, 10));
                  }}
                >
                  Add to Cart
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};
const CheckoutPage = ({ cart, updateQuantity, removeFromCart, setPage }) => {
  if (cart.length === 0) {
    return (
      <div className="page-content">
        {" "}
        <h2>Shopping Cart</h2>{" "}
        <div className="card empty-cart">
          {" "}
          <h3>Your Cart is Empty</h3>{" "}
          <p>Looks like you haven't added anything yet.</p>{" "}
          <button
            onClick={() => setPage("products")}
            className="button button-primary"
          >
            Start Shopping
          </button>{" "}
        </div>{" "}
      </div>
    );
  }
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  return (
    <div className="page-content">
      {" "}
      <h2>Shopping Cart</h2>{" "}
      <div className="card checkout-card">
        {" "}
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            {" "}
            <img
              src={`http://localhost:5000/${item.image}`}
              alt={item.name}
            />{" "}
            <div className="cart-item-details">
              {" "}
              <h3>{item.name}</h3> <p>₹{item.price.toFixed(2)}</p>{" "}
            </div>{" "}
            <div className="cart-item-actions">
              {" "}
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateQuantity(item._id, parseInt(e.target.value, 10))
                }
              />{" "}
              <p className="cart-item-total">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>{" "}
              <button
                onClick={() => removeFromCart(item._id)}
                className="cart-item-remove"
              >
                &times;
              </button>{" "}
            </div>{" "}
          </div>
        ))}{" "}
        <div className="checkout-summary">
          {" "}
          <p>
            <span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span>
          </p>{" "}
          <p>
            <span>Tax (5%):</span> <span>₹{tax.toFixed(2)}</span>
          </p>{" "}
          <p className="total">
            <span>Total:</span> <span>₹{total.toFixed(2)}</span>
          </p>{" "}
          <button
            onClick={() => setPage("payment")}
            className="button button-primary"
          >
            Proceed to Payment
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
const PaymentPage = ({ setPage, handlePayment, showAlert }) => {
  const [timeLeft, setTimeLeft] = useState(300);
  useEffect(() => {
    if (timeLeft === 0) {
      showAlert("Payment time expired!");
      setPage("checkout");
      return;
    }
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, setPage, showAlert]);
  return (
    <div className="page-content">
      {" "}
      <h2>Complete Your Payment</h2>{" "}
      <div className="card payment-card">
        {" "}
        <p>Scan the QR code with your payment app.</p>{" "}
        <img src={qrCodeImage} alt="Payment QR Code" className="qr-code" />{" "}
        <div className="timer">
          Time Left: {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>{" "}
        <button
          onClick={handlePayment}
          className="button button-primary button-full"
        >
          I Have Paid
        </button>{" "}
      </div>{" "}
    </div>
  );
};
const HistoryPage = ({ purchaseHistory }) => (
  <div className="page-content">
    {" "}
    <h2>Your Orders</h2>{" "}
    <div className="card">
      {" "}
      <table className="history-table">
        {" "}
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Items</th>
            <th>Status</th>
          </tr>
        </thead>{" "}
        <tbody>
          {" "}
          {purchaseHistory.map((order) => (
            <tr key={order.orderId}>
              {" "}
              <td>{order.orderId}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>₹{order.total.toFixed(2)}</td>
              <td>
                {order.items.reduce((acc, item) => acc + item.quantity, 0)}
              </td>{" "}
              <td>
                <span
                  className={`status-badge status-${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </td>{" "}
            </tr>
          ))}{" "}
        </tbody>{" "}
      </table>{" "}
    </div>{" "}
  </div>
);

const Footer = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <div className="footer-main">
        <div className="footer-brand">
          <h3>Kisan Mitra</h3>
        </div>
        <nav className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#help">Help</a>
        </nav>
      </div>
      <div className="footer-copyright">
                        <span>© 2025</span>
                        <span className="brand-name">Kisan Mitra</span>
                        <span>| Crafted with</span>
                        <span className="heart">❤</span>
                        <span>by</span>
                        <span className="team-name">Team DevBharat</span>
                    </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [page, setPage] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setIsAuthenticated(true);
      setPage("products");
    }
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/products/products");
      if (!res.ok) throw new Error("Failed to fetch products from the server.");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user && user._id) {
        try {
          const response = await fetch(
            `http://localhost:5001/orders/${user._id}`
          );
          const data = await response.json();
          if (response.ok) {
            setPurchaseHistory(data);
          } else {
            showAlert("Could not fetch purchase history.");
          }
        } catch (error) {
          showAlert("Error fetching history.");
        }
      }
    };
    if (isAuthenticated) fetchHistory();
  }, [user, isAuthenticated]);

  const showAlert = (message) => setAlert({ show: true, message: message });
  const handleRegister = async (userData) => {
    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        showAlert(data.message || "Failed to register.");
        return;
      }
      showAlert("Registration successful! Please sign in.");
    } catch (error) {
      showAlert("Could not connect to the server.");
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        showAlert(data.message);
        return;
      }
      sessionStorage.setItem("user", JSON.stringify(data.user)); // Saves user to session
      setUser(data.user);
      setIsAuthenticated(true);
      setPage("products");
    } catch (error) {
      showAlert("Could not connect to the server. Please try again later.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user"); 
    setUser(null);
    setIsAuthenticated(false);
    setCart([]);
    setPurchaseHistory([]);
    setPage("login");
  };

  const handleUpdatePassword = async (email, newPassword, error) => {
    if (error) {
      showAlert(error);
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();
      showAlert(data.message);
      if (response.ok) {
        setPage("login");
      }
    } catch (err) {
      showAlert("Failed to connect to the server.");
    }
  };

  const handleProfileUpdate = async (updatedData) => {
    if (!user || !user._id) {
      showAlert("User session expired. Please log in again.");
      return;
    }
    if (!updatedData.name || updatedData.name.trim().length < 2) {
      showAlert("Name must be at least 2 characters long.");
      return;
    }
    if (
      !updatedData.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedData.email)
    ) {
      showAlert("Please enter a valid email address.");
      return;
    }
    if (updatedData.contactNumber && updatedData.contactNumber.length < 10) {
      showAlert("Please enter a valid contact number.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedData.name.trim(),
          email: updatedData.email.trim().toLowerCase(),
          contactNumber: updatedData.contactNumber || null,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }
      sessionStorage.setItem("user", JSON.stringify(data.user)); 
      setUser(data.user);
      showAlert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      if (error.message.includes("email already exists")) {
        showAlert("This email is already registered with another account.");
      } else if (error.message.includes("network")) {
        showAlert("Network error. Please check your connection and try again.");
      } else {
        showAlert(
          error.message || "Could not update profile. Please try again."
        );
      }
    }
  };

  const handleAvatarUpdate = async (file) => {
    if (!user || !user._id) {
      showAlert("User session expired. Please log in again.");
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      showAlert("Please upload a valid image file (JPEG, PNG, GIF, or WebP).");
      return;
    }
    if (file.size > maxSize) {
      showAlert("Image size must be less than 5MB.");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const response = await fetch(
        `http://localhost:5001/users/${user._id}/avatar`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to upload avatar.");
      }
      const updatedUser = { ...user, profilePicture: data.user.profilePicture };
      sessionStorage.setItem("user", JSON.stringify(updatedUser)); // Also update sessionStorage
      setUser(updatedUser);
      showAlert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Avatar update error:", error);
      if (error.message.includes("file too large")) {
        showAlert("Image file is too large. Please choose a smaller image.");
      } else if (error.message.includes("invalid file type")) {
        showAlert("Invalid file type. Please upload a valid image.");
      } else {
        showAlert(
          error.message || "Could not upload profile picture. Please try again."
        );
      }
    }
  };

  const handlePayment = async () => {
    if (!user) {
      showAlert("You must be logged in to place an order.");
      return;
    }
    const total =
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.05;
    try {
      const response = await fetch("http://localhost:5001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, cart, total }),
      });
      const data = await response.json();
      if (!response.ok) {
        showAlert(data.message);
        return;
      }
      setPurchaseHistory((prev) => [data.order, ...prev]);
      setCart([]);
      showAlert("Payment Successful! Your order is being processed.");
      setPage("orders");
    } catch (error) {
      showAlert("Could not place order. Please try again.");
    }
  };

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i._id === product._id);
      if (existing) {
        return prevCart.map((i) =>
          i._id === product._id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showAlert(`${quantity} x ${product.name} added to cart!`);
  };
  const updateQuantity = (id, qty) =>
    setCart((p) => p.map((i) => (i._id === id ? { ...i, quantity: qty } : i)));
  const removeFromCart = (id) => setCart((p) => p.filter((i) => i._id !== id));
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderPage = () => {
    switch (page) {
      case "products":
        return (
          <ProductsPage
            products={products}
            loading={loading}
            error={error}
            addToCart={addToCart}
            fetchProducts={fetchProducts}
          />
        );
      case "orders":
        return <HistoryPage purchaseHistory={purchaseHistory} />;
      case "analytics":
        return <AnalyticsPage purchaseHistory={purchaseHistory} />;
      case "profile":
        return (
          <ProfilePage
            user={user}
            handleProfileUpdate={handleProfileUpdate}
            handleAvatarUpdate={handleAvatarUpdate}
          />
        );
      case "settings":
        return (
          <SettingsPage
            user={user}
            handleUpdatePassword={handleUpdatePassword}
          />
        );
      case "checkout":
        return (
          <CheckoutPage
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            setPage={setPage}
          />
        );
      case "payment":
        return (
          <PaymentPage
            setPage={setPage}
            handlePayment={handlePayment}
            showAlert={showAlert}
          />
        );
      default:
        return (
          <ProductsPage
            products={products}
            loading={loading}
            error={error}
            addToCart={addToCart}
            fetchProducts={fetchProducts}
          />
        );
    }
  };

  if (isAuthenticated) {
    return (
      <div className="app-wrapper">
        {alert.show && (
          <CustomAlert
            message={alert.message}
            onClose={() => setAlert({ show: false, message: "" })}
          />
        )}
        <Header
          setPage={setPage}
          user={user}
          cartItemCount={cartItemCount}
          handleLogout={handleLogout}
        />
        <div className="main-layout">
          <Sidebar page={page} setPage={setPage} />
          <main className="main-content">{renderPage()}</main>
        </div>
        <Footer />
      </div>
    );
  }

  let authContent;
  switch (page) {
    case "forgotPassword":
      authContent = (
        <ForgotPasswordPage
          handleUpdatePassword={handleUpdatePassword}
          setPage={setPage}
        />
      );
      break;
    case "login":
    default:
      authContent = (
        <AuthPage
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          setPage={setPage}
        />
      );
      break;
  }

  return (
    <div className="app-wrapper-auth">
      {alert.show && (
        <CustomAlert
          message={alert.message}
          onClose={() => setAlert({ show: false, message: "" })}
        />
      )}
      {authContent}
    </div>
  );
}
