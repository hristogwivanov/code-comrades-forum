import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forumServiceFactory } from '../services/forumService';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [replies, setReplies] = useState([]);
    const forumService = forumServiceFactory();
    const { currentUser } = useAuth(); // Get currentUser from useAuth

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
        if (!currentUser) {
            console.error('User must be logged in to submit a post.');
            return;
        }

        const postData = {
            ...data,
            userId: currentUser.uid,
            userEmail: currentUser.email,
        };

        try {
            const newPost = await forumService.create(postData);
            setPosts(state => [...state, newPost]);
            navigate(`/forum/${newPost._id}`);
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    const onReplySubmit = async (data) => {
        if (!currentUser) {
            console.error('User must be logged in to submit a reply.');
            return;
        }

        const replyData = {
            ...data,
            userId: currentUser.uid,
            userEmail: currentUser.email,
        };

        try {
            const newReply = await forumService.createReply(replyData);
            setReplies(state => [...state, newReply]);
        } catch (error) {
            console.error('Error submitting reply:', error);
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

    const getRepliesForPost = async (postId) => {
        try {
            const result = await forumService.getReplies(postId);
            setReplies(result);
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };

    const contextValues = {
        posts,
        getAllPosts,
        onPostSubmit,
        deleteThread,
        getRepliesForPost,
        replies,
        onReplySubmit,
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
