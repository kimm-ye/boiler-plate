import { LOGIN_USER } from '../_actions/types';

const userReducer = function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER : 
            return { ...state, loginSuccess: action.payload } // ...state는 기존 state를 유지한다는 뜻
        default:
            return state;
    }
}

export default userReducer;