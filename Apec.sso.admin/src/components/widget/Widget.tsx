import React from 'react'
import "./widget.scss";
// import { useEffect } from "react";
import { UserOutlined  } from '@ant-design/icons';
type Props = {
  type:string,
}

const Widget = (props: Props) => {
    let data = {
      title: "string",
      number: 1,
      link:"",
      icon: {}
    };
    // const dispatch = useDispatch();
    // const users = useSelector((state) => state.user.posts)  ;
    // console.log("Widget",users.totalItem);
    // useEffect(() => {
  
    //   dispatch(searchUser("","","",null,1,10));
   
    
    // }, [dispatch])
  
    //temporary
    const amount = 100;
    //const diff = 20;
  
    switch (props.type ) {
      case "user":
        data = {
          title: "NGƯỜI DÙNG",
   
          number: amount,
          link: "Total Users",
          icon: (
            <UserOutlined
              className="icon"
              style={{
                color: "black",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        };
        break;
        case "userOline":
          data = {
            title: "ONLINE",

            number: amount,
            link: "Tổng số người online",
            icon: (
              <UserOutlined
                className="icon"
                style={{
                  color: "crimson",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                }}
              />
            ),
          };
          break;
      case "userActive":
      
        data = {
          title: "ACTIVE",

          number: amount,
          link: "Số lượng tài khoản active",
          icon: (
            <UserOutlined
              className="icon"
              style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
              }}
            />
          ),
        };
        break;
        case "role":
        
          data = {
            title: "ROLE",
            number: amount,
            link: "Số lượng Quyền",
            icon: (
              <UserOutlined
                className="icon"
                style={{
                  backgroundColor: "rgba(128, 0, 128, 0.2)",
                  color: "purple",
                }}
              />
            ),
          };
          break;
         
          
      default:
        break;
    }
  

  return (
    <div className="widget">
    <div className="left">
      <span className="title">{data.title}</span>
      <span className="counter">
         {data.number}
      </span>
      <span className="link">{data.link}</span>
    </div>
    {/* <div className="right">
      <div className="percentage positive">
        <UserOutlined />
        {diff} %
      </div>
      {data.icon}
    </div> */}
  </div>
  )
}

export default Widget