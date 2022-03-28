import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import useSelectMonedas from '../hooks/useSelectMonedas.jsx'
import Error from './Error.jsx'
import {monedas} from '../data/monedas.js'

const InputStyled = styled.input`
    background-color: #9497FF;
    border: none;
    border-radius: 5px;
    width: 100%;
    padding: 10px;
    font-weight: 700;
    font-size: 20px;
    color: white;
    text-transform: uppercase;
    transition: background-color .3s ease;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({ setMonedas }) => {

    const [error, setError] = useState(false)
    const [criptos, setCriptos] = useState([])
    const [ SelectMonedas, moneda ] = useSelectMonedas('Elija la Moneda', monedas, setError)
    const [ SelectCriptoMonedas, criptomoneda ] = useSelectMonedas('Elija la Criptomoneda', criptos, setError)
    
    //SelectMonedas()

    useEffect(()=>{
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            //console.log(resultado.Data)

            const arrayCriptos = resultado.Data.map( cripto => {
                const obj = { 
                    id: cripto.CoinInfo.Name, 
                    nombre: cripto.CoinInfo.FullName 
                }
                return obj
            })
            //console.log(arrayCriptos)
            setCriptos(arrayCriptos)
        }

        consultarAPI()

    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault()
        if([moneda, criptomoneda].includes('')){
            setError(true)
            return
        }
        setMonedas({moneda, criptomoneda})
    }

    return(
        <>
            {error ? <Error mensaje={'Todos los campos son obligatorios'} />: ''}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas/>
                <SelectCriptoMonedas/>
                <InputStyled 
                    type="submit" 
                    value="Cotizar"
                />
            </form>
        </>
    )
}

export default Formulario