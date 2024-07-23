import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/users';



export const AuthServiceFactory = (token) => {
    const request = requestFactory(token);
    return {
        login: (data) => request.post(`${baseUrl}/login`, data),
        register: (data) => {console.log(data)},
        logout: () => request.get(`${baseUrl}/logout`),
    }
}


