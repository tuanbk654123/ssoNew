import React from 'react'
import Datatable from '../../datatable/user/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./user.scss"
type Props = {}

const User = (props: Props) => {
  return (
    <div className="list">
      <Sidebar isActiveHoverUser={true} isActiveHoverRole={false} isActiveHoverHistory={false} isActiveHoverClient={false}
        isActiveHoverTutorial={false} isActiveHoverLogout={false} isActiveHoverHome={false} />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  )
}

export default User