const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// --- Serve Static Files (for images) ---
// This makes the 'uploads' folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Multer Configuration for File Uploads ---
const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/avatars';
        // Create directory if it doesn't exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Create a unique filename: fieldname-timestamp.extension
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadAvatar = multer({ 
    storage: avatarStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Only allow image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// --- Connect to MongoDB ---
mongoose.connect('mongodb://localhost:27017/kisan_mitra_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Successfully connected to MongoDB!'); });

// --- Schemas ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, default: '' },
  profilePicture: { type: String, default: 'uploads/avatars/default-avatar.png' },
}, {
  timestamps: true // This will add createdAt and updatedAt fields automatically
});
const User = mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    status: { type: String, default: 'Processing' },
    items: [{ name: String, quantity: Number, price: Number }]
});
const Order = mongoose.model('Order', orderSchema);

// --- Helper Functions ---
const deleteOldAvatar = (filePath) => {
    // Don't delete the default avatar
    if (filePath && filePath !== 'uploads/avatars/default-avatar.png') {
        const fullPath = path.join(__dirname, filePath);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    }
};

// --- API Routes ---

app.post('/register', async (req, res) => { 
    try { 
        const { name, email, password } = req.body; 
        
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }
        
        const existingUser = await User.findOne({ email }); 
        if (existingUser) { 
            return res.status(400).json({ message: 'User with this email already exists.' }); 
        } 
        
        const newUser = new User({ name, email, password }); 
        await newUser.save(); 
        res.status(201).json({ message: 'User registered successfully!', user: newUser }); 
    } catch (error) { 
        res.status(500).json({ message: 'Server error', error: error.message }); 
    } 
});

app.post('/login', async (req, res) => { 
    try { 
        const { email, password } = req.body; 
        const user = await User.findOne({ email }); 
        if (!user) { 
            return res.status(404).json({ message: "User not found. Please register." }); 
        } 
        if (user.password !== password) { 
            return res.status(401).json({ message: "Invalid credentials. Please try again." }); 
        } 
        res.status(200).json({ message: "Login successful!", user: user }); 
    } catch (error) { 
        res.status(500).json({ message: 'Server error', error: error.message }); 
    } 
});

// UPDATED: Enhanced endpoint to handle complete profile updates (name, email, contact)
app.put('/users/:userId', async (req, res) => {
    try {
        const { name, email, contactNumber } = req.body;
        const userId = req.params.userId;
        
        // Validate that user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found." });
        }
        
        // If email is being updated, check if it's already taken by another user
        if (email && email !== existingUser.email) {
            const emailExists = await User.findOne({ email, _id: { $ne: userId } });
            if (emailExists) {
                return res.status(400).json({ message: "Email is already taken by another user." });
            }
        }
        
        // Build update object with only provided fields
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (contactNumber !== undefined) updateData.contactNumber = contactNumber;
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({ 
            message: "Profile updated successfully!", 
            user: updatedUser 
        });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (email already exists)
            res.status(400).json({ message: 'Email is already taken by another user.' });
        } else if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Invalid data provided.', error: error.message });
        } else {
            res.status(500).json({ message: 'Server error during profile update.', error: error.message });
        }
    }
});

// NEW: Get user profile by ID
app.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching user.', error: error.message });
    }
});

// UPDATED: Enhanced endpoint to handle profile picture upload with old file cleanup
app.post('/users/:userId/avatar', uploadAvatar.single('avatar'), async (req, res) => {
    try {
        const userId = req.params.userId;
        
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
        
        // Get current user to access old profile picture
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ message: "User not found." });
        }
        
        // Delete old profile picture if it exists and is not the default
        deleteOldAvatar(currentUser.profilePicture);
        
        // Use path.join to create a platform-independent path and fix slashes
        const filePath = path.join('uploads', 'avatars', req.file.filename).replace(/\\/g, "/");

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: filePath },
            { new: true }
        );
        
        res.status(200).json({ 
            message: "Avatar updated successfully!", 
            user: updatedUser 
        });
    } catch (error) {
        if (error.message === 'Only image files are allowed!') {
            res.status(400).json({ message: 'Only image files are allowed!' });
        } else if (error.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ message: 'File size too large. Maximum 5MB allowed.' });
        } else {
            res.status(500).json({ message: 'Server error during avatar upload.', error: error.message });
        }
    }
});

// NEW: Delete/Reset profile picture to default
app.delete('/users/:userId/avatar', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        // Delete current profile picture if it's not the default
        deleteOldAvatar(user.profilePicture);
        
        // Reset to default avatar
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: 'uploads/avatars/default-avatar.png' },
            { new: true }
        );
        
        res.status(200).json({ 
            message: "Avatar reset to default successfully!", 
            user: updatedUser 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during avatar reset.', error: error.message });
    }
});

app.put('/update-password', async (req, res) => { 
    try { 
        const { email, newPassword } = req.body; 
        
        if (!email || !newPassword) {
            return res.status(400).json({ message: "Email and new password are required." });
        }
        
        const user = await User.findOne({ email: email }); 
        if (!user) { 
            return res.status(404).json({ message: "No account found with that email address." }); 
        } 
        
        user.password = newPassword; 
        await user.save(); 
        res.status(200).json({ message: "Password updated successfully! You can now log in." }); 
    } catch (error) { 
        res.status(500).json({ message: 'Server error during password update.', error: error.message }); 
    } 
});

app.get('/orders/:userId', async (req, res) => { 
    try { 
        const orders = await Order.find({ userId: req.params.userId }).sort({ date: -1 }); 
        res.status(200).json(orders); 
    } catch (error) { 
        res.status(500).json({ message: "Failed to fetch orders.", error: error.message }); 
    } 
});

app.post('/orders', async (req, res) => { 
    try { 
        const { userId, cart, total } = req.body; 
        const newOrder = new Order({ 
            userId: userId, 
            orderId: `ORD-${Date.now()}`, 
            total: total, 
            items: cart.map(item => ({ 
                name: item.name, 
                quantity: item.quantity, 
                price: item.price 
            })) 
        }); 
        await newOrder.save(); 
        res.status(201).json({ message: "Order created successfully!", order: newOrder }); 
    } catch (error) { 
        res.status(500).json({ message: "Failed to create order.", error: error.message }); 
    } 
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
        }
    }
    res.status(500).json({ message: 'Something went wrong!', error: error.message });
});
// Add these endpoints to your Node.js/Express server (e.g., server.js or app.js)
// Configure multer for avatar uploads
/*const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/avatars';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, `avatar-${req.params.userId}-${uniqueSuffix}${extension}`);
    }
});*/

const avatarUpload = multer({
    storage: avatarStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'));
        }
    }
});

// PUT /users/:userId - Update user profile
app.put('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, contactNumber } = req.body;

        // Validation
        if (!name || name.trim().length < 2) {
            return res.status(400).json({ message: 'Name must be at least 2 characters long.' });
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address.' });
        }

        if (contactNumber && contactNumber.replace(/\D/g, '').length < 10) {
            return res.status(400).json({ message: 'Please provide a valid contact number.' });
        }

        // Check if user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if email is already taken by another user
        if (email !== existingUser.email) {
            const emailExists = await User.findOne({ 
                email: email.toLowerCase(), 
                _id: { $ne: userId } 
            });
            if (emailExists) {
                return res.status(409).json({ message: 'This email is already registered with another account.' });
            }
        }

        // Update user data
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name: name.trim(),
                email: email.toLowerCase(),
                contactNumber: contactNumber || null,
                updatedAt: new Date()
            },
            { new: true, runValidators: true }
        ).select('-password'); // Exclude password from response

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({
            message: 'Profile updated successfully!',
            user: updatedUser
        });

    } catch (error) {
        console.error('Profile update error:', error);
        
        if (error.code === 11000) {
            // Duplicate key error (email already exists)
            res.status(409).json({ message: 'This email is already registered with another account.' });
        } else if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Invalid data provided.' });
        } else {
            res.status(500).json({ message: 'Internal server error. Please try again later.' });
        }
    }
});

// POST /users/:userId/avatar - Update user avatar
app.post('/users/:userId/avatar', avatarUpload.single('avatar'), async (req, res) => {
    try {
        const { userId } = req.params;

        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided.' });
        }

        // Check if user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            // Clean up uploaded file if user doesn't exist
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({ message: 'User not found.' });
        }

        // Remove old avatar if it exists and is not the default
        if (existingUser.profilePicture && 
            existingUser.profilePicture !== 'uploads/avatars/default-avatar.jpg' &&
            fs.existsSync(existingUser.profilePicture)) {
            try {
                fs.unlinkSync(existingUser.profilePicture);
            } catch (unlinkError) {
                console.warn('Could not delete old avatar:', unlinkError);
            }
        }

        // Update user with new avatar path
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profilePicture: req.file.path,
                updatedAt: new Date()
            },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            message: 'Profile picture updated successfully!',
            user: updatedUser
        });

    } catch (error) {
        console.error('Avatar update error:', error);

        // Clean up uploaded file on error
        if (req.file && fs.existsSync(req.file.path)) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.warn('Could not delete uploaded file:', unlinkError);
            }
        }

        if (error.message.includes('Invalid file type')) {
            res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' });
        } else if (error.message.includes('File too large')) {
            res.status(413).json({ message: 'Image file is too large. Maximum size is 5MB.' });
        } else {
            res.status(500).json({ message: 'Failed to upload profile picture. Please try again.' });
        }
    }
});

// GET /users/:userId - Get user profile (optional, for fetching updated data)
app.get('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({
            user: user
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Enhanced login endpoint with complete user data
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Update last login
        await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

        // Return complete user data (excluding password)
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber || '',
            profilePicture: user.profilePicture || 'uploads/avatars/default-avatar.jpg',
            createdAt: user.createdAt,
            lastLogin: new Date()
        };

        res.json({
            message: 'Login successful',
            user: userResponse
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Enhanced registration endpoint
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || name.trim().length < 2) {
            return res.status(400).json({ message: 'Name must be at least 2 characters long.' });
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address.' });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashedPassword,
            profilePicture: 'uploads/avatars/default-avatar.jpg',
            createdAt: new Date()
        });

        await newUser.save();

        res.status(201).json({
            message: 'Registration successful! Please sign in with your new account.',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        
        if (error.code === 11000) {
            res.status(409).json({ message: 'An account with this email already exists.' });
        } else if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Invalid data provided.' });
        } else {
            res.status(500).json({ message: 'Registration failed. Please try again.' });
        }
    }
});

// Middleware to serve uploaded files
app.use('/uploads', express.static('uploads'));

// Error handling middleware for multer
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ message: 'Image file is too large. Maximum size is 5MB.' });
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ message: 'Invalid file upload.' });
        }
    }
    
    if (error.message.includes('Invalid file type')) {
        return res.status(400).json({ message: error.message });
    }
    
    next(error);
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});