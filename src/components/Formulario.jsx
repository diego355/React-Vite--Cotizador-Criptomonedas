import { useEffect } from 'react'
import styled from '@emotion/styled'

import useSelectMonedas from '../hooks/useSelectMonedas.jsx'
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

const Formulario = () => {

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

            console.log(arrayCriptos)
        }

        consultarAPI()

    }, [])

    const [ SelectMonedas, moneda ] = useSelectMonedas('Elija la moneda', monedas)
    //SelectMonedas()

    return(
        <form>
            <SelectMonedas/>
            <InputStyled 
                type="submit" 
                value="Cotizar"
            />
        </form>
    )
}

export default Formulario