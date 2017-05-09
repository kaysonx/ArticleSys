export default (state = [], action = {}) => {
    switch (action.type) {
        case 'ADD_POST':
            return [...state, action.post];
        case 'LOAD_POSTS':
            return action.posts;
        case 'EDIT_POST':
            return state.map(post => (
                post._id === action.post._id ? action.post : post
            ));
        case 'DELETE_POST':
            return state.filter(post => post._id !== action.id);
        default:
            return state;
    }
};
