import { LOGIN_USER, REGISTER_USER, AUTH_USER    } from '../_actions/types';

const userReducer = function (state = {}, action) {
    
    switch (action.type) {
        case LOGIN_USER : 
            return { ...state, loginSuccess: action.payload } // ...state는 기존 state를 유지한다는 뜻
        case REGISTER_USER :
            return { ...state, register: action.payload }
        case AUTH_USER :
            return { ...state, userData: action.payload } // 로그인 상태를 유지하기 위해서
        default:    
            return state;
    }
}

export default userReducer;