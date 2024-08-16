export const postReducer = (state, action) => {
    switch (action.type) {
        case "POST_FETCH":
            return {
                ...state,
                ...action.payload,
            };
        case 'COMMENT_ADD':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                         ...action.payload,
                        author: {
                            email: action.userEmail,
                        }
                    }
                ],
            }
        default:
            return state;
    }
};