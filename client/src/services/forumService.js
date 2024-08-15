import { collection, addDoc, getDocs, getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
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

    const getOne = async (id) => {
        try {
            const docRef = doc(firestore, 'posts', id); // Create a reference to the specific document
            const docSnap = await getDoc(docRef); // Fetch the document by ID
            
            if (docSnap.exists()) {
                return { _id: docSnap.id, ...docSnap.data() }; // Return the document data along with its ID
            } else {
                throw new Error('No such document!');
            }
        } catch (error) {
            console.error('Error getting post:', error);
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
        getOne,
        update,
        remove,
    };
};