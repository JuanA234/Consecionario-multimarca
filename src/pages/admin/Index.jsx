import React from 'react'
import { useDarkMode } from 'context/darkMode';

const Admin = () => {
    const {darkMode} = useDarkMode();
    return (
        <div className={`flex w-full h-full bg-gray-${darkMode ? '900' : '50'}`}>
           Pagina principal de Admin
        </div>
    )
}

export default Admin
