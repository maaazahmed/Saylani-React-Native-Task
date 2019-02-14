import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    cagoryList: [],
    serviceList: [],
    currentUser: {},
    currentCategory: {}
}




export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.CATERGORY_LIST:
            return ({
                ...state,
                cagoryList: action.payload
            })
        case ActionTypes.CUEERNT_USER:
            return ({
                ...state,
                currentUser: action.payload
            })
        case ActionTypes.CUEERNT_CATEGORY:
            return ({
                ...state,
                currentCategory: action.payload
            })
        case ActionTypes.SERVICES_KEY:
            return ({
                ...state,
                serviceList: action.payload
            })
        default:
            return state;
    }

}

