import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action'; // user_actions.js에서 loginUser 액션을 가져옵니다.
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  // hook기반 방식
  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 dispatch 함수를 가져옵니다.
  const navigator = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동을 위한 navigator 함수를 가져옵니다.

  const [ Email, setEmail ] = React.useState("");
  const [ Password, setPassword ] = React.useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    // 페이지가 새로고침되는 것을 방지
    event.preventDefault();

    let body = {
      email: Email,
      password: Password  
    }

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess) {
          navigator('/'); // 로그인 성공시 메인 페이지로 이동
        } else {
          alert('Error');
        }
      })
  }

  return (
    <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                  onSubmit={ onSubmitHandler }
            >
                <label>Email</label>
                <input type="email" value = { Email } onChange = { onEmailHandler } />
                <label>Password</label>
                <input type="password" value = { Password } onChange = { onPasswordHandler } />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
    </div>
  )
}

export default LoginPage