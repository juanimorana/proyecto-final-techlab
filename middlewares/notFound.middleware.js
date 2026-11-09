export const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: 'Ruta no definida (404)' });
};