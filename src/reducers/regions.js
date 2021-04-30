import {actionTypes} from '../actions'

const initialState = {
    pendingRegions: true,
    regions: null,
}

export default function regionsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_REGIONS_PENDING:
            return {
                ...state,
                pendingRegions: true
            }
        case actionTypes.FETCH_REGIONS_SUCCESS:
            return {
                ...state,
                pendingRegions: false,
                regions: action.payload,
            }
        default:
            return state
    }
}