import { useEffect }  from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'; // user_actions.js에서 auth 액션을 가져옵니다.
import { useNavigate } from 'react-router-dom';

function authCheck(SpecificComponent, option, adminRoute = null) {

    // null : 아무나 출입이 가능한 페이지
    // true : 로그인한 유저만 접속 가능한 페이지
    // false : 로그인한 유저는 접속이 불가능한 페이지

    function AuthenticationCheck(props) {
        const dispatch = useDispatch(); 
        const navigator = useNavigate(); 
        
        useEffect(() => {
            dispatch(auth())
            .then(response => {
                console.log(response);
                // 로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        navigator('/login'); // 로그인 페이지로 이동
                    }
                } else  {
                    // 어드민 페이지지만 대상자가 어드민이 아닐때
                    if(adminRoute && !response.payload.isAdmin) {
                        navigator('/');
                    } else {
                        // 이미 기로그인한 대상자라면 로그인페이지는 들어가지 않도록 해야하므로
                        if(!option) {
                            navigator('/');
                        }
                    }
                }
            })
            .catch(error => {
                console.error('[DEBUG] Axios 오류:', error);
            });
        }, [])

         return (
            <SpecificComponent {...props} />
        )
    };

  return AuthenticationCheck;
}

export default authCheck;