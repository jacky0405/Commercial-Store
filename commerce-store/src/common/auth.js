import decode from 'jwt-decode';

const JWT = 'store_token-id';
const setToken = token => {
    localStorage.setItem(JWT,token);
}

const getToken = () => {
    return localStorage.getItem(JWT);
}

const isLogin = () => {
    const jwtToken = getToken();
    return !!jwtToken && !isTokenExpire(jwtToken);
}

const isTokenExpire = (token) => {
    try{
        const _info = decode(token);
        if(_info.exp < Date.now()/1000) {
            return true;
        } else return false;
    } catch {
        return false;
    }
}

const getUser = () => {
    const jwtToken = getToken();
    if(isLogin()){
        const user = decode(jwtToken);
        return user;
    }
    return null;
}

const logout = () => {
    localStorage.removeItem(JWT);
}

global.auth = {
    setToken,
    getUser,
    logout,
    isLogin,
    getToken
}