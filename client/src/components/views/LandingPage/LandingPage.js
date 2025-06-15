import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {

  useEffect(() => {
    console.log('[DEBUG] useEffect 실행됨'); // ✅ 이거 추가
    axios.get('/api/hello')
      .then(response => console.log(response.data))
      .catch(error => console.error('[DEBUG] Axios 오류:', error));
  }, []);

  return (
    <div style= {{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      with: '100%', height: '100vh' 
      }}
    >
      <h2>
        시작페이지
      </h2>

    </div>
  )
}

export default LandingPage