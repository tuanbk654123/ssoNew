import React from 'react'
import Datatable from '../../datatable/client/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./client.scss"
type Props = {}

const Client = (props: Props) => {
  return (
    <div className="list">
      <Sidebar openKey={'sub2'}  isActiveHoverUser={false} isActiveHoverRole={false} isActiveHoverHistory={false} isActiveHoverClient={true} isActiveHoverApiScopes={false} isActiveHoverApiResources={false}
        isActiveHoverTutorial={false} isActiveHoverLogout={false} isActiveHoverHome={false} />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  )
}

export default Client