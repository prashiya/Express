const ErrorHandler = require('../error/ErrorHandler');

let product1 = require('../productdata');

class ProductService {
     getAllProduct() {
        return product1;
    }

     addProduct(name, price) {
        if (!name || !price) {
            throw ErrorHandler.validationError('Both name and price are required');
        }

        const newProduct = {
            name,
            price,
            id: new Date().getTime().toString()
        };

        product1.push(newProduct);
        return newProduct;
    }

     deleteProduct(productId) {
        product1 = product1.filter(product => product.id !== productId);
        return { status: 'OK' };
    }

     updateProduct(productId, updatedProduct) {
        const index = product1.findIndex(product => product.id === productId);

    if (index === -1) {
        throw ErrorHandler.notFoundError('Product not found');
    }

    // Ensure that updatedProduct has the required fields
    if (!updatedProduct.name || !updatedProduct.price) {
        throw ErrorHandler.validationError('Both name and price are required');
    }

    // Directly assign the updatedProduct to product1[index]
    updatedProduct.id = product1[index].id;  // Preserve the original id
    product1[index] = updatedProduct;

    return product1[index];
    }

     patchProduct(productId, updatedFields) {
        const index = product1.findIndex(product => product.id === productId);

        if (index !== -1) {
            if (updatedFields.name) {
                product1[index].name = updatedFields.name;
            }
            if (updatedFields.price) {
                product1[index].price = updatedFields.price;
            }
            return product1[index];
        } else {
            throw ErrorHandler.notFoundError('Product not found');
        }
    }
}

module.exports = new ProductService();
