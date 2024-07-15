const router = require('express').Router();
const ProductService = require('../service/ProductService');

router.get('/api/product', (req, res, next) => {
    try {
        const products = ProductService.getAllProduct();
        return res.json(products);
    } catch (err) {
        next(err);
    }
});

router.post('/api/product', (req, res, next) => {
    const { name, price } = req.body;

    try {
        const newProduct = ProductService.addProduct(name, price);

        return res.status(201).send({
            error: false,
            message: "Product added successfully",
            data: newProduct
        });
    } catch (err) {
        next(err);
    }
});

router.delete('/api/product/:productId', (req, res, next) => {
    const productId = (req.params.productId);

    try {
        const result = ProductService.deleteProduct(productId);
        return res.json(result);
    } catch (err) {
        next(err);
    }
});

router.put('/api/product/:productId', (req, res, next) => {
    const productId = (req.params.productId);
    const updatedProduct = req.body;
    //updatedProduct.price = parseInt(updatedProduct.price, 10);

    try {
        const updated = ProductService.updateProduct(productId, updatedProduct);
        return res.status(200).send({
            error: false,
            message: "Product updated successfully",
            data: updated
        });
    } catch (err) {
        next(err);
    }
});

router.patch('/api/product/:productId', (req, res, next) => {
    const productId = (req.params.productId);
    const updatedFields = req.body;

    try {
        const updated = ProductService.patchProduct(productId, updatedFields);
       return res.status(200).send({
            error: false,
            message: "Product patched successfully",
            data: updated
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
