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

    const getOne = async(postId) => {
        const result = await request.get(`${url}/${postId}`);
        console.log(result);
        return result;
    };

    const create = async (postData) => {
        const result = await request.post(url, postData);
        console.log('Create Post Result:');
        console.log(result);

        return result;
    };

    // const edit = (postId, data) => request.put(`${url}/${postId}`, data);

    //const deletepost = (postId) => request.delete(`${url}/${postId}`);
    return {
        getAll,
        getOne,
        create,
        //  edit,
        //  delete: deletepost,
    };
}