import {useState, useEffect} from 'react'
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {

  // aqui estan los arreglos de pacientes
  // de aqui salen los datos hacia los demas componentes video 82
  const [pacientes, setPacientes] = useState([])//arreglo vacio
  const [paciente, setPaciente] = useState({})//objeto vacio

  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []

      setPacientes(pacientesLS)
    }

    obtenerLS()
  }, [])

  useEffect(() => {
      localStorage.setItem('pacientes', JSON.stringify(pacientes))//aqui se guarda en localstorage
  }, [pacientes])


  const eliminarPaciente = id => {
    // console.log('eliminando paciente', id)
    //saca un leemento del arreglo
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)//traete todos los id diferentes al que te estoy pasando
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header 
      />

      <div className="mt-12 md:flex ">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}//es el que se selecciono (individual)
          setPaciente={setPaciente}
        />
        <ListadoPacientes 
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />

      </div>
    </div>
  )
}

export default App