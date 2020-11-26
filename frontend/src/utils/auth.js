export const getToken = () => localStorage.getItem('sso_seminar-jwt');

export const saveToken = (token) => {
    localStorage.setItem('sso_seminar-jwt', token);
}

export const logout = () => {
    localStorage.removeItem('sso_seminar-jwt');
}