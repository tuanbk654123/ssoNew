import React from 'react'
import Datatable from '../../datatable/apiResources/Datatable'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../sidebar/Sidebar'
import "./apiResources.scss"
type Props = {}

const ApiResources = (props: Props) => {
  return (
    <div className="list">
      <Sidebar openKey={'sub2'}  isActiveHoverUser={false} isActiveHoverRole={false} isActiveHoverHistory={false} isActiveHoverClient={false} isActiveHoverApiScopes={false} isActiveHoverApiResources={true}
        isActiveHoverTutorial={false} isActiveHoverLogout={false} isActiveHoverHome={false} />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  )
}

export default ApiResources