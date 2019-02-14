import ActionTypes from "../constant/constant"


export const categoryListAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CATERGORY_LIST,
            payload: data
        })
    }
}




export const currentUserAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CUEERNT_USER,
            payload: data
        })
    }
}


export const currentCategoryAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CUEERNT_CATEGORY,
            payload: data
        })
    }
}




export const servicesACtion = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SERVICES_KEY,
            payload: data
        })
    }
}



