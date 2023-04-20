import React from 'react'
//import { useAppSelector } from '../../app/hooks';
import "./navbar.scss";
type Props = {}

const Navbar = (props: Props) => {
    //const userLogin = useAppSelector(state => state.auth.currentUser)  ;
    const userLogin =localStorage.getItem("user_name")  ;
    console.log('Nav: ', JSON.stringify(userLogin) )
    return (
        <div className="navbar">
          <div className="wrapper">

            <div className="items">
             
            
              <div className="item">
                <img
                  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="avatar"
                />
              </div>
              <div className="text" >
               Xin chào , <b> {userLogin} !</b>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Navbar