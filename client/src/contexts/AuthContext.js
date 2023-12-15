import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthServiceFactory } from "../services/authService";
import { userServiceFactory } from "../services/userService";

import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage("auth", {});
    const navigate = useNavigate();

    const authService = AuthServiceFactory(auth.accessToken);
    const userService = userServiceFactory();

    const onLoginSubmit = async (data) => {
        try {
            const result = await authService.login(data);

            setAuth(result);

            navigate("/forum");
        } catch (error) {
            console.log("There is a problem");
        }
    };

    const onRegisterSubmit = async (values) => {
        const { confirmPassword, ...registerData } = values;

        if (confirmPassword !== registerData.password) {
            return;
        }

        try {
            const result = await authService.register(registerData);
            setAuth(result);
            //console.log(result)

            const { password, ...publicUserData } = registerData;
            //console.log('publicUserData:');
            // console.log(publicUserData);
            publicUserData.description = "";
            publicUserData.profilePic =
                "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png";

            const userPublicDataResult = await userService.create(
                publicUserData
            );
            //console.log('publicUserDataResult:');
            //console.log(userPublicDataResult);

            navigate("/forum");
        } catch (error) {
            console.log("There is a problem");
        }
    };

    const onLogout = async () => {
        await authService.logout();

        setAuth({});
    };

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userName: auth.username,
        userEmail: auth.email,
        userProfilePic: auth.profilePic,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};
