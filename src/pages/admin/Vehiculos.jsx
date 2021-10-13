import React, {useEffect , useState} from 'react'

const Vehiculos = () => {

   const [nombreVehiculo, setNombreVehiculo] = useState('');

    useEffect(() => {
        console.log('funcion que se ejecuta cada que cambia el valor');
    }, [nombreVehiculo]);

    const enviarDatosAlBackend = () =>{
        console.log('El nombre del vehículo es ', nombreVehiculo);
    }

    return (
        <form className='flex flex-col'>
            <h2>Formulario de creación de vehículos</h2> 
                <input onChange={(e)=>{setNombreVehiculo(e.target.value)}} type="text" placeholder='Nombre del vehículo' />
                <input onChange={(e)=>{console.log(e.target.value)}} type="text" placeholder='Marca del vehículo' />
                <input type="text" placeholder='Modelo del vehículo' />
                <button type='button' onClick={enviarDatosAlBackend} className='bg-indigo-500 text-white rounded-md'>Enviar datos</button>
        </form>

    );
};

export default Vehiculos
