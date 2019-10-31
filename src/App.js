import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Error from "./components/Error";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
function App() {
  //State principal
  //ciudad = state, guardarCiudad = this.setState
  //pais = state, guardarPais = this.setState
  const [ciudad, guardarCiudad] = useState("");
  const [pais, guardarPais] = useState("");
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    //prevenir ejecucion
    if (ciudad === '' ||  pais === '') {
      return;
    }

    const consultarAPI = async () => {
      const key = "c459fac016a0c04184044e410ba3dbfa";
      //ejemplo
      //https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;
  
      //consultar la URL
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      //console.log(resultado);
      guardarResultado(resultado);
    };

    consultarAPI();
  }, [ciudad, pais]);

  const datosConsulta = datos => {
    console.log(datos);
    //Validar que ambos campos estén
    if (datos.ciudad === "" || datos.pais === "") {
      //un error
      guardarError(true);
      return;
    }

    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  };

  // Cargar un componente condicionalmente
  let componente;
  if (error) {
    //Hay un error, mostrarlo
    componente = <Error mensaje={"Ambos campos son obligatorios"} />;
  } 
  else if(resultado.cod === "404"){
    componente = <Error mensaje={"La ciudad no existe en nuestro registro"}/>;
  }
  else {
    componente = <Clima 
    resultado = {resultado}
    />;
  }

  return (
    <div className="App">
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario datosConsulta={datosConsulta} />
            </div>
            <div className="col s12 m6">{componente}</div>
          </div>          
        </div>
      </div>
    </div>
  );
}

export default App;
