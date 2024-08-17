import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forumServiceFactory } from '../services/forumService';
import { serverTimestamp } from "firebase/firestore";

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [replies, setReplies] = useState([]);
    const forumService = forumServiceFactory();

    const getAllPosts = async () => {
        try {
            const result = await forumService.getAll();
            setPosts(result);
        } catch (error) {
            console.error('Error fetching posts:', error);
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

    const onPostSubmit = async (data) => {
        if (!data.userEmail) {
            console.error('Cannot submit post without a valid user email.');
            return;
        }
    
        try {
            const newPost = await forumService.create(data);
            setPosts(state => [...state, newPost]);
            navigate(`/forum/${newPost._id}`);
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    const onReplySubmit = async (data) => {
        const { postId, userName, postBody } = data;
    
        if (!userName || !postBody || !postId) {
            console.error('Cannot submit reply without a valid user name, body, and postId.');
            return;
        }
    
        try {
            // Create the new reply using the forumService, including a timestamp
            const newReply = await forumService.createReply({
                postId,
                userName,
                replyBody: postBody,
                createdAt: serverTimestamp(), // Add the timestamp here
            });
    
            // Update the state with the new reply, ensuring no duplicates
            setReplies((state) => {
                // Ensure the new reply is added only if it doesn't already exist
                const existingReply = state.find((reply) => reply._id === newReply._id);
                if (!existingReply) {
                    return [...state, newReply].sort((a, b) => b.createdAt - a.createdAt); // Sort replies by timestamp
                }
                return state;
            });
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

    const contextValues = {
        posts,
        replies,
        getAllPosts,
        getRepliesForPost,
        onPostSubmit,
        onReplySubmit,
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
