import { db } from '../config/firebase.js';
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc } from 'firebase/firestore';

const productsCollection = collection(db, 'products');

export const ProductModel = {
    async getAll() {
        const snapshot = await getDocs(productsCollection);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    async getById(id) {
        const productRef = doc(db, 'products', id);
        const snapshot = await getDoc(productRef);
        if (!snapshot.exists()) return null;
        return { id: snapshot.id, ...snapshot.data() };
    },
    
    async create(data) {
        const docRef = await addDoc(productsCollection, data);
        return { id: docRef.id, ...data };
    },
    
    async delete(id) {
        const productRef = doc(db, 'products', id);
        await deleteDoc(productRef);
        return true;
    }
};