export const themeReducer = (state, action) => {
    switch (action.type) {
        case 'dark':
            return 'dark';
        case 'light':
            return 'light';
        default:
            throw new Error();
    }
};
