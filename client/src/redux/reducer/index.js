import {
    GET_ALL_DOGS,
    GET_DOG_NAME,
    GET_DOG_DETAIL,
    GET_ALL_TEMPERAMENTS,
    POST_DOG
} from '../actions/index'


const initialState = {
    allDogs: [],
    dogs: [],
    dogDetail: [],
    allTemperaments: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };

        case GET_DOG_NAME:
            return {
                ...state,
                dogs: action.payload
            };

        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            };

        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            };

        case POST_DOG:
            return {
                ...state
            };

        default:
            return state;
    };
};


export default rootReducer;