const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.Controller');
const auth = require('../middleWare/auth');
const { addProductValidator } = require('../middleWare/validation');
const formidableMiddleware = require('express-formidable')

router.post('/',auth('createAny','product'),addProductValidator,productsController.addProduct)

router.route('/product/:id')
.get(productsController.getProductById)
.patch(auth('updateAny','product'),productsController.updateProductById)
.delete(auth('deleteAny','product'),productsController.deleteProductById);

router.get('/all',productsController.allProducts);
router.post('/paginate/all',productsController.paginateProducts)

// Upload Images
router.post('/upload',auth('createAny','product'),formidableMiddleware(),productsController.picUpload)
module.exports = router