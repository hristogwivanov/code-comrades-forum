import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forumServiceFactory } from '../services/forumService';

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const forumService = forumServiceFactory();

    useEffect(() => {
        forumService.getAll()
            .then(result => {
                setPosts(result);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const onPostSubmit = async (data) => {
        if (!data.userEmail) {
            console.error('Cannot submit post without a valid user email.');
            return;
        }
    
        try {
            const newPost = await forumService.create(data);
            setPosts(state => [...state, newPost]);
            navigate('/forum');
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    const deleteThread = async (threadId) => {
        try {
            await forumService.remove(threadId);
            setPosts(state => state.filter(post => post.id !== threadId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const contextValues = {
        posts,
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