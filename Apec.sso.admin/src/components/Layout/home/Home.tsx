import React from 'react'
import Chart from '../../chart/Chart';
import Featured from '../../featured/Featured';
// import Navbar from '../../navbar/Navbar';
import { Redirect } from 'react-router-dom';
// import { Button } from 'antd';
// import { useAppSelector } from './../../../app/hooks';

import Sidebar from '../../sidebar/Sidebar';
// import Sidebar from '../../sidebar/Sidebar';
// import Widget from '../../widget/Widget';
import "./home.scss"
import Navbar from '../../navbar/Navbar';
import Widget from '../../widget/Widget';

function Home() {
  const access_token = localStorage.getItem('access_token');
  console.log('home : ', access_token)


  return (
    access_token !== null ?
      <div className='home'>
        <Sidebar openKey={'sub1'}  isActiveHoverUser={false} isActiveHoverRole={false} isActiveHoverHistory={false} isActiveHoverClient={false} isActiveHoverApiScopes={false}
          isActiveHoverTutorial={false} isActiveHoverLogout={false} isActiveHoverHome={true} />
        <div className='homeContainer'>
          < Navbar />
          <div className="widgets">
            <Widget type="user" />

            <Widget type="userActive" />
            <Widget type="userOline" />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="6 tháng trước ( tần xuất đăng nhập )" aspect={2 / 1} />
          </div>

        </div>
      </div>
      :
      <Redirect to="login" />

  )
}

export default Home