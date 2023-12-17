import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forumServiceFactory } from '../services/forumService';

export const ForumContext = createContext();

export const ForumProvider = ({
    children,
}) => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const forumService = forumServiceFactory(); //auth.accessToken

    useEffect(() => {
        forumService.getAll()
            .then(result => {
                setPosts(result)
            })
    }, []);

    const onPostSubmit = async (data) => {
        console.log('on Post data');
        console.log(data)
        const newPost = await forumService.create(data);

        setPosts(state => [...state, newPost])

        navigate('/forum');
    };



    // const onGameEditSubmit = async (values) => {
    //     const result = await forumService.edit(values._id, values);

    //     setGames(state => state.map(x => x._id === values._id ? result : x))

    //     navigate(`/catalog/${values._id}`);
    // };

    const deleteThread = (threadId) => {
        setPosts(state => state.filter(post => post._id !== threadId));
    };

    // const getGame = (gameId) => {
    //     return games.find(game => game._id === gameId);
    // };

    const contextValues = {
        posts,
        // getGame,
        onPostSubmit,
        deleteThread,
        // onGameEditSubmit,
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