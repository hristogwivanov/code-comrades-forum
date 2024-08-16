import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forumServiceFactory } from '../services/forumService';

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const forumService = forumServiceFactory();

    const getAllPosts = async () => {
        try {
            const result = await forumService.getAll();
            setPosts(result);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    const onPostSubmit = async (data) => {
        if (!data.userEmail) {
            console.error('Cannot submit post without a valid user email.');
            return;
        }
    
        try {
            const newPost = await forumService.create(data);
            setPosts(state => [...state, newPost]); // Update the state immediately
            navigate(`/forum/${newPost._id}`); // Navigate to the newly created post
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    const deleteThread = async (threadId) => {
        try {
            await forumService.remove(threadId);
            setPosts(state => state.filter(post => post._id !== threadId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const contextValues = {
        posts,
        getAllPosts, // Expose getAllPosts function to context
        onPostSubmit,
        deleteThread,
    };

    return (
        <ForumContext.Provider value={contextValues}>
            {children}
        </ForumContext.Provider>
    );
};

export const useForumContext = () => {
    const context = useContext(ForumContext);
    return context;
};
