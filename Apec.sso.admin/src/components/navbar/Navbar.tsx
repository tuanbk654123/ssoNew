import React from 'react'
//import { useAppSelector } from '../../app/hooks';
import "./navbar.scss";
import { Button, Dropdown, Menu } from 'antd';
import { BarsOutlined, LeftOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { authAction } from '../../features/auth/authSlice';
import { useHistory } from 'react-router-dom';
type Props = {}

const Navbar = (props: Props) => {
    // dropdown
    const dispatch = useAppDispatch();
    const handleLoginout = () => {
      dispatch(
          authAction.logout()

      )
  }
  let navigate = useHistory();
  const routeChange = () => {
    let path = `/login`;
    navigate.push(path);
  };
  function signOut() {
      handleLoginout();
      routeChange();
  };
    const menu = (
      <Menu
        items={[
          // {
          //   key: '1',
          //   label: (
          //     <Button onClick={signOut} type='text' >
          //       Thông tin người dùng
          //     </Button>
          //   ),
          // },
          {
            key: '2',
            label: (
              <Button onClick={signOut} type='text' style={{width:"100%"   }} >
                Đăng Xuất
              </Button>
            ),
          }
        ]}
      />
    );
  
    //const userLogin = useAppSelector(state => state.auth.currentUser)  ;
    const userLogin =localStorage.getItem("user_name")  ;
    console.log('Nav: ', JSON.stringify(userLogin) )
    return (
        <div className="navbar">
          <div className="wrapper">

            <div className="items">
             
              <Dropdown overlay={menu} placement="bottomLeft" arrow>
                <div className="item">
                  <img
                    src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                    className="avatar"
                  />
                </div>
              </Dropdown>
              <div className="text" >
               Xin chào , <b> {userLogin} !</b>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Navbar