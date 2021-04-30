import api from '../helpers/FetchData'

export const carTypes = {
    FETCH_CARS_DATA_PENDING: 'FETCH_CARS_DATA_PENDING',
    FETCH_CARS_DATA_SUCCESS: 'FETCH_CARS_DATA_SUCCESS',
    FETCH_CARS_DATA_BY_YEAR_PENDING: 'FETCH_CARS_DATA_BY_YEAR_PENDING',
    FETCH_CARS_DATA_BY_YEAR_SUCCESS: 'FETCH_CARS_DATA_BY_YEAR_SUCCESS',
    FETCH_CARS_DATA_BY_REGION_PENDING: 'FETCH_CARS_DATA_BY_REGION_PENDING',
    FETCH_CARS_DATA_BY_REGION_SUCCESS: 'FETCH_CARS_DATA_BY_REGION_SUCCESS',
    FETCH_CARS_DATA_BY_YEAR_AND_REGION_PENDING: 'FETCH_CARS_DATA_BY_YEAR_AND_REGION_PENDING',
    FETCH_CARS_DATA_BY_YEAR_AND_REGION_SUCCESS: 'FETCH_CARS_DATA_BY_YEAR_AND_REGION_SUCCESS'
}

export const getCars = () => dispatch => {
    dispatch({type: carTypes.FETCH_CARS_DATA_PENDING})
    api.get('/api/cars')
        .then(res => {
            dispatch({
                type: carTypes.FETCH_CARS_DATA_SUCCESS,
                payload: res,
            })
            return res
        })
        .catch(function (e) {
            console.log(e)
        })
}

export const getCarsByYear = (data) => dispatch => {
    dispatch({type: carTypes.FETCH_CARS_DATA_BY_YEAR_PENDING})
    api.get('/api/cars/year', data)
        .then(res => {
            dispatch({
                type: carTypes.FETCH_CARS_DATA_BY_YEAR_SUCCESS,
                payload: res,
            })
            return res
        })
        .catch(function (e) {
            console.log(e)
        })
}
export const getCarsByRegion = (data) => dispatch => {
    dispatch({type: carTypes.FETCH_CARS_DATA_BY_REGION_PENDING})
    api.get('/api/cars/region', data)
        .then(res => {
            dispatch({
                type: carTypes.FETCH_CARS_DATA_BY_REGION_SUCCESS,
                payload: res,
            })
            return res
        })
        .catch(function (e) {
            console.log(e)
        })
}

export const getCarsByYearAndRegion = (data) => dispatch => {
    dispatch({type: carTypes.FETCH_CARS_DATA_BY_YEAR_AND_REGION_PENDING})
    api.get('/api/cars/find', data)
        .then(res => {
            dispatch({
                type: carTypes.FETCH_CARS_DATA_BY_YEAR_AND_REGION_SUCCESS,
                payload: res,
            })
            return res
        })
        .catch(function (e) {
            console.log(e)
        })
}