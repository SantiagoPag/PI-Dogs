import axios from 'axios';
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_DOG_NAME = 'GET_DOG_NAME';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS';
export const POST_DOG = 'POST_DOG';
export const FILTER_BY_NAME = 'FILTER_BY_NAME';
export const FILTER_BY_TEMPERAMENTS = 'FILTER_BY_TEMPERAMENTS';
export const FILTER_BY_WEIGHT = 'FILTER_BY_WEIGHT';
export const FILTER_CREATED_DOG = 'FILTER_CREATED_DOG';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'



export function getAllDogs() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: GET_ALL_DOGS,
            payload: json.data
        })
    };
};

export function getDogName(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: GET_DOG_NAME,
                payload: json.data
            })
        } catch (error) {
            alert('The dog does not exist')
        }
    };
};

export function getDog(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: GET_DOG_DETAIL,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    };
};

export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/temperaments')
        return dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: json.data
        })
    };
};

export function postDog(data) {
    try {
        return async function () {
            const post = await axios.post('http://localhost:3001/dogs', data)
            return post
        }
    } catch (error) {
        alert('Data missing')
    };
};

export function filterByName(payload) {
    return {
        type: FILTER_BY_NAME,
        payload
    }
};

export function filterByTemperaments(payload) {
    return {
        type: FILTER_BY_TEMPERAMENTS,
        payload
    }
};

export function filterByWeight(payload) {
    return {
        type: FILTER_BY_WEIGHT,
        payload
    }
};

export function filterCreatedDog(payload) {
    return {
        type: FILTER_CREATED_DOG,
        payload
    }
};

export function clearDetail() {
    return {
        type: CLEAR_DETAIL,
        payload: []
    }
};

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    }
};

