import { nanoid } from 'nanoid';
import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import 'react-toastify/dist/ReactToastify.css';

const vehiculosBackend = [
    {
        nombre: "Corolla",
        marca: "Toyota",
        modelo: 2014
    },
    {
        nombre: "Sandero",
        marca: "Renault",
        modelo: 2020
    },
    {
        nombre: "Rav4",
        marca: "Toyota",
        modelo: 2011
    },
    {
        nombre: "Fiesta",
        marca: "Ford",
        modelo: 2017
    },
    {
        nombre: "Mazda 3",
        marca: "Mazda",
        modelo: 2020
    },
    {
        nombre: "Chrevolet",
        marca: "Onix",
        modelo: 2021
    }

];

const Vehiculos = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [vehiculos, setVehiculos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear nuevo vehículo');
    const [colorBoton, setColorBoton] = useState('indigo');

    useEffect(() => {
        //Obtener lista de vehículos desde el backend
        setVehiculos(vehiculosBackend);
    }, []);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear nuevo vehículo');
            setColorBoton('indigo');
        }
        else {
            setTextoBoton('Mostrar todo');
            setColorBoton('blue');
        }
    }, [mostrarTabla]);

    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col w-full'>
                <h2 className='text-3xl font-extrabold text-gray-900'>Página de administración de vehículos</h2>
                <button onClick={() => {
                    setMostrarTabla(!mostrarTabla);
                }}
                    className={`text-white bg-${colorBoton}-500 p-4 rounded-full m-6 self-end`}>
                    {textoBoton}
                </button>
            </div>
            {mostrarTabla ? (<TablaVehiculos listaVehiculos={vehiculos} />)
                : (<FormularioCreacionVehiculos
                    setMostrarTabla={setMostrarTabla}
                    listaVehiculos={vehiculos}
                    setVehiculos={setVehiculos} />)}
            <ToastContainer position='bottom-center' autoClose={5000} />

        </div>
    );
};

const TablaVehiculos = ({ listaVehiculos }) => {
    const [busqueda, setBusqueda] = useState('');
    const [vehiculosFiltrados, setVehiculosFiltrados] = useState(listaVehiculos);

    useEffect(() => {
        console.log('Busqueda', busqueda);
        console.log('Lista original', listaVehiculos);
        setVehiculosFiltrados(
            listaVehiculos.filter(
                (elemento) => {
                    return JSON.stringify(elemento).toLocaleLowerCase().includes(busqueda.toLocaleLowerCase());
                })
        );
    }, [busqueda, listaVehiculos])

    return (
        <div className='flex flex-col items-center w-full justify-center'>
            <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder='buscar'
                className='border-2 border-gray-900 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500' />
            <h2 className='text-2xl font-extrabold text-gray-800'>Todos los vehículos</h2>
            <div className='hidden md:flex w-full'>
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Nombre del vehículo</th>
                            <th>Marca del vehículo</th>
                            <th>Modelo del vehículo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehiculosFiltrados.map((vehiculo) => {
                            return (
                                <FilaVehiculo
                                    key={nanoid()}
                                    vehiculo={vehiculo} />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className=' flex flex-col w-full m-2 md:hidden'>
                {vehiculosFiltrados.map((el) => {
                    return (
                    <div className='bg-gray-500 m-2 shadow-xl flex flex-col rounded-xl p-2'>
                        <span>{el.nombre}</span>
                        <span>{el.marca}</span>
                        <span>{el.modelo}</span>
                    </div>
                );
                })}
            </div>
        </div>
    );
};


const FilaVehiculo = ({ vehiculo }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [infoNuevoVehiculo, setInfoNuevoVehiculo] = useState({
        nombre: vehiculo.nombre,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,

    });
    const actualizarVehiculo = () => {
        console.log(infoNuevoVehiculo);
        // Enviar la info al backend 
    }

    const eliminarVehiculo = () => {
        setOpenDialog(false);
    }
    return (
        <tr>
            {edit ?
                <>
                    <td>
                        <input className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type="text"
                            defaultValue={infoNuevoVehiculo.nombre}
                            onChange={(e) =>
                                setInfoNuevoVehiculo({ ...infoNuevoVehiculo, nombre: e.target.value })}
                        />
                    </td>
                    <td>
                        <input className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type="text" defaultValue={infoNuevoVehiculo.marca}
                            onChange={(e) =>
                                setInfoNuevoVehiculo({ ...infoNuevoVehiculo, marca: e.target.value })}
                        />
                    </td>
                    <td>
                        <input className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type="text"
                            defaultValue={infoNuevoVehiculo.modelo}
                            onChange={(e) =>
                                setInfoNuevoVehiculo({ ...infoNuevoVehiculo, modelo: e.target.value })}
                        />
                    </td>
                </>
                :
                <>
                    <td>{vehiculo.nombre}</td>
                    <td>{vehiculo.marca}</td>
                    <td>{vehiculo.modelo}</td>
                </>
            }
            <td>
                <div className='flex w-full justify-around'>
                    {edit ?
                        <>
                            <Tooltip title='Confirmar edición' arrow>
                                <i onClick={() => actualizarVehiculo()}
                                    className="fas fa-check text-green-600 hover:text-green-400" />
                            </Tooltip>
                            <Tooltip title='Cancelar edición' arrow>
                                <i onClick={() => setEdit(!edit)}
                                    className="fas fa-ban hover:text-yellow-500 text-yellow-700" />

                            </Tooltip>
                        </>
                        :
                        <>
                            <Tooltip title='Editar vehículo' arrow>
                                <i onClick={() => setEdit(!edit)}
                                    className="fas fa-pencil-alt hover:text-yellow-500 text-yellow-700" />

                            </Tooltip>

                            <Tooltip title='Eliminar vehículo' arrow>
                                <i onClick={() => setOpenDialog(true)}
                                    className="fas fa-trash text-red-700 hover:text-red-500" />
                            </Tooltip>
                        </>
                    }


                </div>
                <Dialog open={openDialog}>
                    <div className='p-8 flex flex-col'>
                        <h1 className='text-gray-900 text-2xl font-bold'>¿Está seguro de querer eliminar este vehículo? </h1>
                        <div className='flex w-full items-center justify-center my-4'>
                            <button
                                onClick={() => eliminarVehiculo()}
                                className=' mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-800 rounded-lg shadow-md'>
                                Sí</button>
                            <button
                                onClick={() => setOpenDialog(false)}
                                className=' mx-2 px-4 py-2 bg-red-600 text-white hover:bg-red-900 rounded-lg shadow-md'>
                                No</button>
                        </div>
                    </div>
                </Dialog>

            </td>
        </tr>
    )
}

const FormularioCreacionVehiculos = ({ setVehiculos, listaVehiculos, setMostrarTabla }) => {
    const form = useRef(null);

    const submitForm = (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoVehiculo = {};
        fd.forEach((value, key) => {
            nuevoVehiculo[key] = value;
        });
        setMostrarTabla(true);
        setVehiculos([...listaVehiculos, nuevoVehiculo]);
        //Identificar un caso de éxito y mostrar un toast de éxito
        toast.success("Vehículo agregado con éxito");
        //Identificar un caso de error y mostrar un toast de error
        //toast.error("Error agregando vehículo");


    };


    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-700'>Crear nuevo vehículo</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <label className='flex flex-col' htmlFor='nombre'>
                    Nombre del vehículo
                    <input
                        name='nombre'
                        required
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="text"
                    />
                </label>
                <label className='flex flex-col' htmlFor='marca'>
                    Marca del vehículo
                    <select
                        name="marca"
                        required
                        defaultValue={0}
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'>
                        <option disabled value={0}>Seleccione una opción</option>
                        <option>Renault</option>
                        <option>Toyota</option>
                        <option>Ford</option>
                        <option>Mazda</option>
                        <option>Chevrolet</option>
                    </select>
                </label>
                <label className='flex flex-col' htmlFor='modelo'>
                    Modelo del vehículo
                    <input
                        name='nombre'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="number"
                        required
                        min={1992}
                        placeholder='2020' />
                </label>

                <button
                    type='submit'
                    className='col-span-2 bg-green-500 p-2 rounded-full shadow-md hover:bg-green-700 text-white'
                >
                    Guardar vehículo
                </button>
            </form>
        </div>
    );
}

export default Vehiculos;
