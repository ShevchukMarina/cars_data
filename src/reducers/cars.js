import {actionTypes} from '../actions'

const initialState = {
    pendingCars: true,
    pendingCarsByYearAndRegion: true,
    cars: null,
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