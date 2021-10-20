import React from 'react'
import SideBar from 'components/SideBar';
import SideBarResponsive from 'components/SideBarResponsive';

const PrivateLayout = ({children}) => {
    return (
      <div className='flex w-screen h-screen'>
           <div className='flex flex-col md:flex-row flex-nowrap h-full w-full'>
          <SideBar/>
          <SideBarResponsive/>
          <main className='flex w-full overflow-y-scroll justify-center items-center' > 
          {children}
          </main>
        </div>
      </div>
      
    )
}

export default PrivateLayout;
