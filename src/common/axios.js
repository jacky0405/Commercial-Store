import _axios from 'axios';

const axios = (baseURL) => {

    const instance = _axios.create({
        baseURL:baseURL || 'https://commercial-store.herokuapp.com',
        timeout: 1000
    });

    instance.interceptors.request.use(config => {
        const jwtToken = global.auth.getToken();
        config.headers['Authorization'] = 'Bearer ' + jwtToken;
        return config;
    }, error => {
        return Promise.reject(error);
    })

    return instance;
}

export {axios};

export default axios();
