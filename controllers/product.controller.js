import { ProductService } from '../services/product.service.js';

export const ProductController = {
    async getAll(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (error) { res.status(500).json({ error: 'Error del servidor' }); }
    },
    async getById(req, res) {
        try {
            const product = await ProductService.getProductById(req.params.id);
            if (!product) return res.status(404).json({ error: 'No encontrado' });
            res.status(200).json(product);
        } catch (error) { res.status(500).json({ error: 'Error del servidor' }); }
    },
    async create(req, res) {
        try {
            const newProduct = await ProductService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) { res.status(400).json({ error: 'Petición incorrecta' }); }
    },
    async delete(req, res) {
        try {
            await ProductService.deleteProduct(req.params.id);
            res.status(200).json({ message: 'Eliminado' });
        } catch (error) { res.status(500).json({ error: 'Error del servidor' }); }
    }
};