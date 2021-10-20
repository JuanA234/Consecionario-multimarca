import useActiveRoute from 'hooks/useActiveRoute';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImagenLogo from './ImagenLogo';

const SideBar = () => {
    return (
        <nav className='hidden md:flex md:w-72 border border-gray-300 h-full flex-col bg-gray-200 p-4 sidebar'>
            <Link to='/admin'>
                <ImagenLogo/>
            </Link>

            <div className='my-4'>
             <Ruta icono="far fa-user" ruta='/admin/perfil' nombre='Perfil'/>
             <Ruta icono="fas fa-car" ruta='/admin/vehiculos' nombre='Vehículos'/>
            < Ruta icono="fas fa-credit-card" ruta='/admin/ventas' nombre='Ventas'/>
             <Ruta icono="fas fa-users" ruta='/admin/usuarios' nombre='Usuarios'/>
            </div>
            <button>Cerrar sesión</button>
        </nav>
    )
}

const Ruta = ({icono, ruta, nombre}) =>{

    const isActive = useActiveRoute(ruta);
    return(
        <Link to={ruta}>
        <button className={`p-1 my-2 bg-${isActive ? 'indigo' : 'gray'}-700 hover:bg-indigo-900 flex w-full items-center rounded-md text-white`}>
        <i className={`${icono} w-10`}></i>
        {nombre}
        </button>
    </Link>
    )
}

export default SideBar;
