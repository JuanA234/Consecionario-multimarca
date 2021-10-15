import React from 'react'
import Footer from 'components/Footer';
import NavBar from 'components/NavBar';

const PublicLayout = ({children}) => {
    return (
        <div className='flex flex-col justify-between h-screen'>
            <NavBar/>
            <div className='h-full overflow-y-scroll bg-blue-400'>
                <main className='h-full'>
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    )
}

export default PublicLayout;
