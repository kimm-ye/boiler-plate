import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

  const navigator = useNavigate(); 

  useEffect(() => {
    axios.get('/api/hello')
      .catch(error => console.error('[DEBUG] Axios 오류:', error));
  }, []);

  const onClickHandleLogout = () => {
    axios.get('/api/users/logout')
      .then(response => {
        console.log(response.data); 
        if (response.data.success) {
          alert('로그아웃 성공');
          navigator('/login'); // 로그아웃 성공시 로그인 페이지로 이동
        } else {
          alert('로그아웃 실패');
        }
      })
      .catch(error => {
        console.error('[DEBUG] Axios 오류:', error);
      });
  }

  return (
    <div style= {{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      with: '100%', height: '100vh' 
      }}
    >
      <h2>
        시작페이지
      </h2>

      <button onClick = {onClickHandleLogout}>
        로그아웃
      </button>

    </div>
  )
}

export default LandingPage