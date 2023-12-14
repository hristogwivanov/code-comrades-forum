import { createContext, useContext,  useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userServiceFactory } from '../services/userService';

export const UserContext = createContext();

export const UserProvider = ({
    children,
}) => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const userService = userServiceFactory(); //auth.accessToken

    useEffect(() => {
        userService.getAll()
            .then(result => {
                setUsers(result);
            })
    }, []);



     const changeProfilePic = async (src) => {
    //     console.log('on Settings data');
    //     console.log(values)
        
    //      const result = await userService.edit(values._id, values);

    //     setUserSettings(state => state.map(x => x._id === values._id ? result : x))
    if(src){

        navigate('/Settings');
    }


     };



    // const onGameEditSubmit = async (values) => {
    //     const result = await forumService.edit(values._id, values);

    //     setGames(state => state.map(x => x._id === values._id ? result : x))

    //     navigate(`/catalog/${values._id}`);
    // };

    // const deleteGame = (gameId) => {
    //     setGames(state => state.filter(game => game._id !== gameId))
    // };

     const getUser = (userId) => {
         return users.find(user => user._id === userId);
     };

    const contextValues = {
        //userSettings,
        //onUserSettingsChange,
        users,
        getUser,
        changeProfilePic,
         //onPostSubmit,
        // deleteGame,
        // onGameEditSubmit,
    };


    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);

    return context;
};