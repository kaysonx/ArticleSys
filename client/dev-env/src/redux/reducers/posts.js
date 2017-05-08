export default (state = [], action = {}) => {
    switch (action.type) {
        case 'ADD_POST':
            return [...state, action.post];
        case 'LOAD_POSTS':
            return action.posts;
        default:
            return state;
    }
};
