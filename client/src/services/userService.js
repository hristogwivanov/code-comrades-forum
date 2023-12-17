import { requestFactory } from './requester';

const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3030'
    : 'http://localhost:3030'; //TODO: Add server url when deployed
const url = `${baseUrl}/data/userinfo`;


export const userServiceFactory = () => {
    const request = requestFactory();

    const getAll = async () => {
        const result = await request.get(url);
        const users = Object.values(result);
       //console.log(result)

        return users;

    };

    const getOne = async(userPublicId) => {
        const result = await request.get(`${url}/${userPublicId}`);
        return result;
    };


    const create = async (userPublicData) => {
        const result = await request.post(url, userPublicData);

        return result;
    };



    const edit = (userId, data) => request.put(`${url}/${userId}`, data);

    //const deletepost = (postId) => request.delete(`${url}/${postId}`);
    return {
        getAll,
        getOne,
        create,
        edit,
        //  delete: deletepost,
    };
}