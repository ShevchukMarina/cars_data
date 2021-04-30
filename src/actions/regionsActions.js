import api from '../helpers/FetchData'

export const regionTypes = {
    FETCH_REGIONS_PENDING: 'FETCH_REGIONS_PENDING',
    FETCH_REGIONS_SUCCESS: 'FETCH_REGIONS_SUCCESS',
}

export const getRegions = () => dispatch => {
    dispatch({type: regionTypes.FETCH_REGIONS_PENDING})
    api.get('/api/regions')
        .then(res => {
            dispatch({
                type: regionTypes.FETCH_REGIONS_SUCCESS,
                payload: res,
            })
            return res
        })
        .catch(function (e) {
            console.log(e)
        })
}
