const Product = require('../models/Product');
const Farmer = require('../models/Farmer');

// Upload Product
exports.uploadProduct = async (req, res) => {
  try {
    const { name, price, quantity, unit, aadhaar, description, location, contactNumber, category } = req.body;
    const image = req.file ? req.file.path : null;

    // Validate required fields
    if (!name || !price || !quantity || !unit || !aadhaar || !description || !location || !contactNumber || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const farmer = await Farmer.findOne({ aadhaar });

    if (!farmer) {
      return res.status(400).json({ message: 'Error verifying Aadhaar' });
    }

    const newProduct = new Product({
      aadhaar,
      farmerName: farmer.name,
      contactNumber,
      name,
      description,
      price,
      quantity,
      unit,
      category,
      location,
      image
    });

    await newProduct.save();
    res.status(200).json({ message: 'Product uploaded successfully', product: newProduct });
  } catch (err) {
    console.error('Error uploading product:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// Get Products by Category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products by category:', err.message);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// Get Products by Farmer (Aadhaar)
exports.getProductsByFarmer = async (req, res) => {
  try {
    const { aadhaar } = req.params;
    const products = await Product.find({ aadhaar });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching farmer products:', err.message);
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, quantity, unit, description, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity, unit, description, category },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};

// Search Products
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error searching products:', err.message);
    res.status(500).json({ message: 'Error searching products', error: err.message });
  }
};