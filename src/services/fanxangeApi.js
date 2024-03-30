import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_APP_BACKEND_URL;

// Define Axios requests for each of your endpoints
const axiosInstance = axios.create({
    baseURL,
});

// Set Bearer token in the headers for each request except login
axiosInstance.interceptors.request.use(
    (config) => {
        // Add your Bearer token here
        const token = Cookies.get('authToken');
        // Ensure config.headers is initialized as an empty object
        config.headers = config.headers || {};

        // Exclude the Authorization header for the login request
        if (token && !config.url?.includes('login')) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const apiEndpoints = {
    login: 'auth/login',
    getProfile: 'auth/user',
    getUsers: 'auth/all',
    getStartedMatches: 'match/live',
    getNotStartedMatches: 'match/upcomming',
    getCompletedMatches: 'match/result',
    getPlayers: 'player',
    getOrders: 'order',
    getMatchOrders: 'order/match/:matchid',
    getPlayersOrders: 'order/player'

};

// Define functions to make Axios requests for your endpoints
const makeRequest = async (url, method = 'GET', data = null) => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const ipoStatusApi = {
    login: (requestData) => makeRequest(apiEndpoints.login, 'POST', requestData),
    deleteUser: (userid) => makeRequest(apiEndpoints.deleteUser.replace(':id', userid), 'DELETE'),
    getProfile: () => makeRequest(apiEndpoints.getProfile),
    getUsers: () => makeRequest(apiEndpoints.getUsers),

    getStartedMatches: () => makeRequest(apiEndpoints.getStartedMatches),
    getNotStartedMatches: () => makeRequest(apiEndpoints.getNotStartedMatches),
    getCompletedMatches: () => makeRequest(apiEndpoints.getCompletedMatches),

    getPlayers: (requestData) => makeRequest(apiEndpoints.getPlayers, 'POST', requestData),

    getOrders: () => makeRequest(apiEndpoints.getOrders, 'POST'),
    getMatchOrders: (matchid) => makeRequest(apiEndpoints.getMatchOrders.replace(':matchid', matchid)),
    getPlayersOrders: (requestData) => makeRequest(apiEndpoints.getPlayers, 'POST', requestData),



    logout: () => {
        Cookies.remove('authToken');
        return Promise.resolve();
    }
};
