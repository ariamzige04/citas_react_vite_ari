import { useState, useEffect } from 'react';
import Error from './Error';


const Formulario = ({pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false)

  // solo se ejecuta cuando paciente haya cambiado (solo cambia o se ejecuta cuando se da click en Editar)
  // escucha los cambios que sucedan en nuestro state
  useEffect(() => {
    
    // comprueba si un objeto tiene algo
    if(Object.keys(paciente).length > 0){//detecta que no este vacio
      setNombre(paciente.nombre)//modifica el state con los datos del objeto
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  
  }, [paciente])//esta leyendo los cambios del objeto de paciente
  


  const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del Formulario
    if([nombre, propietario, email, fecha, sintomas].includes('') ) {
      console.log('Hay un campo vacio')

      setError(true)
      return
    }

    setError(false)
    
    // Objeto de paciente
    //Objeto en memeoria de lo que se lee en el form
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas
    }

    if(paciente.id) {
      // Editando el registro
      objetoPaciente.id = paciente.id//aqui el id previo se le asigna

      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)//es para identificar cual se esta editando (se identifica por medio del ID)

      setPacientes(pacientesActualizados)
      setPaciente({})
    } else {

      // Nuevo registro
      objetoPaciente.id = generarId()//aqui se crea el id en el objeto
      setPacientes([...pacientes, objetoPaciente])

    }



    // Reiniciar el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-xl text-center">Seguimiento pacientes</h2>

          <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold ">Administralos</span>
          </p>

          <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

            {/* Mensaje de error */}
            {error && <Error><p>Todos los campos son obligatorios</p></Error>}

            <div className="mb-5">
              <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                Nombre Mascota
              </label>

              <input 
                id="mascota"
                type="text" 
                placeholder="Nombre de la Mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={ (e) => setNombre(e.target.value) }
              />
            </div>

            <div className="mb-5">
              <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                Nombre Propietario
              </label>

              <input 
                id="propietario"
                type="text" 
                placeholder="Nombre del Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={propietario}
                onChange={ (e) => setPropietario(e.target.value) }
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                Email
              </label>

              <input 
                id="email"
                type="email" 
                placeholder="Email Contacto Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={ (e) => setEmail(e.target.value) }
              />
            </div>

            <div className="mb-5">
              <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                Alta
              </label>

              <input 
                id="alta"
                type="date" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={fecha}
                onChange={ (e) => setFecha(e.target.value) }
              />
            </div>

            <div className="mb-5">
              <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                Sintomas
              </label>

              <textarea 
                id="sintomas" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Describe los Sintomas"
                value={sintomas}
                onChange={ (e) => setSintomas(e.target.value) }
                ></textarea>
            </div>

            <input 
              type="submit" 
              value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
              className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" 
              />

          </form>
      </div>
    )
  }
  
  export default Formulario
  