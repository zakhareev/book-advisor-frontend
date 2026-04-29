export const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return !!token;
};

export const getToken = () => {
    return localStorage.getItem('access_token');
};

export const getUserEmail = () => {
    return localStorage.getItem('user_email');
};