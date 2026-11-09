import { ProductModel } from '../models/product.model.js';

export const ProductService = {
    async getAllProducts() {
        return await ProductModel.getAll();
    },
    
    async getProductById(id) {
        return await ProductModel.getById(id);
    },
    
    async createProduct(data) {
        if (!data.name || !data.price) {
            throw new Error('Los campos name y price son obligatorios');
        }
        return await ProductModel.create(data);
    },
    
    async deleteProduct(id) {
        return await ProductModel.delete(id);
    }
};