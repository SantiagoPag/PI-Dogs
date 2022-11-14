import {
    GET_ALL_DOGS,
    GET_DOG_NAME,
    GET_DOG_DETAIL,
    GET_ALL_TEMPERAMENTS,
    POST_DOG,
    FILTER_BY_NAME,
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_WEIGHT,
    FILTER_CREATED_DOG,
    CLEAR_DETAIL
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

        case FILTER_BY_NAME:
            const filterDogs = action.payload === 'A-Z' ? state.dogs.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            })
            : state.dogs.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
            });
            return {
                ...state,
                dogs: filterDogs
            };

        case FILTER_BY_TEMPERAMENTS:
            const allDogs = state.allDogs
            const filterTemp = action.payload === 'All' ? allDogs : allDogs.filter(e => {
                return e.temperament?.includes(action.payload)
            });

            return {
                ...state,
                dogs: filterTemp
            };

        case FILTER_BY_WEIGHT:
            const allDogsWeight = state.allDogs.filter(e => e.weight_min)
            const filterWeight = action.payload === 'min_weight' ? allDogsWeight.sort((a, b) => {
                return a.weight_min - b.weight_min
            })
            : allDogsWeight.sort((a, b) => {
                return a.weight_min - b.weight_min
            }).reverse()

            return {
                ...state,
                dogs: filterWeight
            };

        case FILTER_CREATED_DOG:
            const allDogs2 = state.allDogs;
            const filterCreated = action.payload === 'created' ? allDogs2.filter(e => e.createdInDb) : allDogs2.filter(e => !e.createdInDb);

            return {
                ...state,
                dogs: actions.payload === 'all' ? state.allDogs2 : filterCreated
            };

        case CLEAR_DETAIL:
            return {
                ...state
            };

        default:
            return state;
    };
};


export default rootReducer;