import { requestFactory } from './requester';

const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3030'
    : 'http://localhost:3030'; //TODO: Add server url when deployed
const url = `${baseUrl}/data/posts`;


export const forumServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(url);
        const posts = Object.values(result);

        return posts;

    };

    // const getOne = async(gameId) => {
    //     const result = await request.get(`${url}/${gameId}`);
    //     console.log(result);
    //     return result;
    // };

    const create = async (postData) => {
        const result = await request.post(url, postData);

        console.log(result);

        return result;
    };

    // const edit = (gameId, data) => request.put(`${url}/${gameId}`, data);

    //const deleteGame = (gameId) => request.delete(`${url}/${gameId}`);
    return {
        getAll,
        // getOne,
        create,
        //  edit,
        //  delete: deleteGame,
    };
}