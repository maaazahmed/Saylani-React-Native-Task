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

export const choseServisesAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CHOSE_SERVICE,
            payload: data
        })
    }
}


export const myOrderAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.MY_ORDERS,
            payload: data
        })
    }
}


export const AcceptedOrderAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ACCEPTED_ORDER,
            payload: data
        })
    }
}


export const finishedOrder = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.FINISHED_ORDER,
            payload: data
        })
    }
}



export const myRatingAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.MY_RATTING,
            payload: data
        })
    }
}


export const myRatingActionActio = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.MY_RATTINGFOR_PROFILE,
            payload: data
        })
    }
}



export const AllWorkersAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ALL_WORKERS,
            payload: data
        })
    }
}


export const messageListAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.MESSAGE_LIST,
            payload: data
        })
    }
}


export const isLoaderAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.IS_LOADER,
            payload: data
        })
    }
}


export const adminDataAction = (data) => {
    console.log(data,"ACRion")
    return dispatch => {
        dispatch({
            type: ActionTypes.ADMIN_DATA,
            payload: data
        })
    }
}




