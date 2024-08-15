import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

export const forumServiceFactory = () => {
    const postsCollectionRef = collection(firestore, 'posts');

    const create = async (data) => {
        try {
            const docRef = await addDoc(postsCollectionRef, data);
            return { id: docRef.id, ...data };
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    };

    const getAll = async () => {
        try {
            const querySnapshot = await getDocs(postsCollectionRef);
            const posts = querySnapshot.docs.map(doc => ({
                _id: doc.id,
                ...doc.data(),
            }));
            return posts;
        } catch (error) {
            console.error('Error getting posts:', error);
            throw error;
        }
    };

    const update = async (id, data) => {
        try {
            const postRef = doc(firestore, 'posts', id);
            await updateDoc(postRef, data);
            return { id, ...data };
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    };

    const remove = async (id) => {
        try {
            const postRef = doc(firestore, 'posts', id);
            await deleteDoc(postRef);
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    };

    return {
        create,
        getAll,
        update,
        remove,
    };
};