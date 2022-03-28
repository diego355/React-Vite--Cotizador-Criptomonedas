import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'

import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spiner from './components/Spiner'


const Heading = styled.h1 ` 
  font-family: 'Lato', sans-serif;
  color: #FFF;
  width: 90%;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto;
  }
`

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {

  const [monedas, setMonedas] = useState({})
  const [cotizado, setCotizado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(()=>{
    if(Object.keys(monedas).length > 0){
      //console.log(monedas)
      const cotizarMoneda = async ()=>{
        setCargando(true)
        const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + monedas.criptomoneda + '&tsyms=' + monedas.moneda
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        const cotizacion = {
          price: resultado.DISPLAY[monedas.criptomoneda][monedas.moneda].PRICE,
          high: resultado.DISPLAY[monedas.criptomoneda][monedas.moneda].HIGHDAY,
          low: resultado.DISPLAY[monedas.criptomoneda][monedas.moneda].LOWDAY,
          change: resultado.DISPLAY[monedas.criptomoneda][monedas.moneda].CHANGE24HOUR,
          lastUpdate: resultado.DISPLAY[monedas.criptomoneda][monedas.moneda].LASTUPDATE,
          image: resultado.DISPLAY[monedas.criptomoneda][monedas.moneda].IMAGEURL,
        }

        setCotizado(cotizacion)
        setCargando(false)
      }
      
      cotizarMoneda()
      
    }

  }, [monedas])

  return (
      <Contenedor>
        <Imagen 
          src={ImagenCripto}
          alt="Imagen criptomonedas"
        />
        <div>
          <Heading>Cotizar criptomonedas</Heading>
          <Formulario 
            setMonedas={setMonedas}
          />
          {cargando ? <Spiner /> :
          ( cotizado.price && 
            <Resultado
              cotizado = {cotizado}
            />
          )}
           
        </div>
      </Contenedor>
  )
}

export default App
