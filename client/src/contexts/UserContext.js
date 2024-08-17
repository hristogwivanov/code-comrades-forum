import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userServiceFactory } from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const userService = userServiceFactory(); //auth.accessToken

    useEffect(() => {
        userService.getAll().then((result) => {
            setUsers(result);
        });
    }, []);

    const changeProfilePic = async (src, userId) => {
        console.log("on Settings data");
        console.log(src);
        console.log(userId);
        const data = src;

        const result = await userService.edit(userId, data);

        if (src) {
            navigate("/Settings");
        }
    };



    const getUser = (userId) => {
        return users.find((user) => user._id === userId);
    };

    const contextValues = {
        users,
        getUser,
        changeProfilePic,
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
