const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');

const router = require('express').Router();

router.post('/addProduct', productController.upload, productController.addProduct);
router.get('/allProducts', productController.getAllProducts);
router.get('/published', productController.getPublishedProducts);

router.post('/addReview/:id', reviewController.addReview);
router.get('/allReviews', reviewController.getAllReviews);

router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

router.get('/reviews/:id', productController.getProductReviews);




module.exports = router;