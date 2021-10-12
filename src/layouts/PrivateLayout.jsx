import React from 'react'
import SideBar from 'components/SideBar';

const PrivateLayout = ({children}) => {
    return (
        <div className='flex  w-screen h-screen'>
          <SideBar/>
          <main className='flex w-full bg-blue-400  overflow-y-scroll'> {children}</main>
        </div>
    )
}

export default PrivateLayout;
