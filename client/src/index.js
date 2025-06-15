import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import 'antd/dist/antd.css';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import { thunk } from 'redux-thunk';
import Reducer from './_reducers'; // _reducers/index.js에서 export한 rootReducer를 사용

// 이렇게 선언하는 이유는 createStore에서 store를 redux에서 생성하는 건데
// 그냥 store는 객체밖에 못 받기 때문에 promise와 function을
// 사용할 수 있도록 해주는 미들웨어를 적용하기 위함이다.
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  thunk
)(createStore);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware(
      Reducer, // _reducers/index.js에서 export한 rootReducer를 사용
      window.__REDUX_DEVTOOLS_EXTENSION__ && 
      window.__REDUX_DEVTOOLS_EXTENSION__() // Redux DevTools 확장 프로그램을 사용하기 위한 설정
    )}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
