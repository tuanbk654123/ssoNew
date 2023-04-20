import { Button,Image } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { authAction } from '../../../features/auth/authSlice';
import background from './sso.png'
import './login.scss'
// import { Redirect } from 'react-router-dom';
// import { useAppSelector } from './../../../../app/hooks';

function Login() {
    // const isLogging = useAppSelector(state => state.auth.isLoggedIn);
    // console.log('login : ',isLogging)
    const dispatch = useAppDispatch();
    const handleLogin = ()=>{
        dispatch(
            authAction.login()
        )
    }
    // const handleLoginout = ()=>{
    //     dispatch(
    //         authAction.logout()

    //     )
    // }
    return (
        // isLogging? <Redirect to ='/home'/>:
        <div className='root'>
            <div className='middle'>
                <div className='top'>
                    <div className='icon'>
                        <Image
                                width='40px'
                                src={background}
                            />
                    </div>
                
                    <div className='title'>
                        SSO 
                    </div> 
                </div>
                
                <div className='button'>
                <Button style={{width:'130px'}} type="primary"
                onClick={handleLogin}
                >Login</Button>
                {/* <Button style={{width:'130px'}} type="primary"
                onClick={handleLoginout}
                >Logout</Button> */}
                </div> 
            
            </div>
            
        </div>
      )
}
 


export default Login