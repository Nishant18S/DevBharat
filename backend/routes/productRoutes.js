const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/upload', upload.single('image'), productController.uploadProduct);
router.get('/products', productController.getAllProducts);
router.put('/products/:id', productController.updateProduct);     // 👈 edit
router.delete('/products/:id', productController.deleteProduct); // 👈 delete

module.exports = router;