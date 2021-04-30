import {actionTypes} from '../actions'

const initialState = {
    pendingCars: true,
    pendingCarsByYear: true,
    pendingCarsByYearAndRegion: true,
    cars: null,
    // carsByYear: null
}

export default function carsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_CARS_DATA_PENDING:
            return {
                ...state,
                pendingCars: true
            }
        case actionTypes.FETCH_CARS_DATA_SUCCESS:
            return {
                ...state,
                pendingCars: false,
                cars: action.payload,
            }
        case actionTypes.FETCH_CARS_DATA_BY_YEAR_PENDING:
            return {
                ...state,
                pendingCarsByYear: true
            }
        case actionTypes.FETCH_CARS_DATA_BY_YEAR_SUCCESS:
            return {
                ...state,
                pendingCarsByYear: false,
                cars: action.payload,
            }
        case actionTypes.FETCH_CARS_DATA_BY_REGION_SUCCESS:
            return {
                ...state,
                pendingCarsByRegion: false,
                cars: action.payload,
            }
        case actionTypes.FETCH_CARS_DATA_BY_REGION_PENDING:
            return {
                ...state,
                pendingCarsByRegion: true
            }
        case actionTypes.FETCH_CARS_DATA_BY_YEAR_AND_REGION_PENDING:
            return {
                ...state,
                pendingCarsByYearAndRegion: true
            }
        case actionTypes.FETCH_CARS_DATA_BY_YEAR_AND_REGION_SUCCESS:
            return {
                ...state,
                pendingCarsByYearAndRegion: false,
                cars: action.payload,
            }
        default:
            return state
    }
}