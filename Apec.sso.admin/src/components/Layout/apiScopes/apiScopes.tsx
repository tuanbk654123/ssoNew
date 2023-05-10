import React from 'react'
import Datatable from '../../datatable/apiScopes/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./apiScopes.scss"
type Props = {}

const ApiScopes = (props: Props) => {
  return (
    <div className="list">
      <Sidebar openKey={'sub2'}  isActiveHoverUser={false} isActiveHoverRole={false} isActiveHoverHistory={false} isActiveHoverClient={false} isActiveHoverApiScopes={true}
        isActiveHoverTutorial={false} isActiveHoverLogout={false} isActiveHoverHome={false} />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  )
}

export default ApiScopes