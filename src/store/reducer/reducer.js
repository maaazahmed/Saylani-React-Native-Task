import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    cagoryList: [],
    serviceList: [],
    myOrders: [],
    acceptedOrder: [],
    finishedOrder: {},
    currentUser: {},
    currentCategory: {},
    choseServises: {},
    myRatting: [],
    myAllRatting: [],
    allWokers: [],
    messageList: [],
    isLoader: false

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
        case ActionTypes.CHOSE_SERVICE:
            return ({
                ...state,
                choseServises: action.payload
            })
        case ActionTypes.MY_ORDERS:
            return ({
                ...state,
                myOrders: action.payload
            })
        case ActionTypes.ACCEPTED_ORDER:
            return ({
                ...state,
                acceptedOrder: action.payload
            })
        case ActionTypes.FINISHED_ORDER:
            return ({
                ...state,
                finishedOrder: action.payload
            })
        case ActionTypes.MY_RATTING:
            return ({
                ...state,
                myRatting: action.payload
            })
        case ActionTypes.MY_RATTINGFOR_PROFILE:
            return ({
                ...state,
                myAllRatting: action.payload
            })
        case ActionTypes.ALL_WORKERS:
            return ({
                ...state,
                allWokers: action.payload
            })
        case ActionTypes.MESSAGE_LIST:
            return ({
                ...state,
                messageList: action.payload
            })
        case ActionTypes.IS_LOADER:
            return ({
                ...state,
                isLoader: action.payload
            })
        default:
            return state;
    }

}

