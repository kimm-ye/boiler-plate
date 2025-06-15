import { combineReducers } from 'redux';
import user from './user_reducer';


// _reducers/index.js 파일은 여러 리듀서를 결합하여 하나의 루트 리듀서를 만드는 역할을 합니다.
// 여러가지 state가 있을 수 있기 때문에 combineReducers를 사용하여 하나로 합쳐서 관리한다.
const rootReducer = combineReducers({
  user,
});

export default rootReducer;
