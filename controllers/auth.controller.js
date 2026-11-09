import jwt from 'jsonwebtoken';

export const AuthController = {
    login(req, res) {
        const { username, password } = req.body;
        if (username === 'admin' && password === 'admin123') {
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
            return res.status(200).json({ token: `Bearer ${token}` });
        }
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
};