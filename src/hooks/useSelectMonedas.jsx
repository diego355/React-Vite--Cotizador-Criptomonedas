import {useState} from 'react'
import styled from '@emotion/styled'


const Label = styled.label`
    color: white;   
    display: block;
    font-family: 'Lato', sans-serif;
    font-size:  24px;
    font-weight: 700;
    margin: 15px 0;
`

const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 12px;
    border-radius: 10px;
    margin-bottom: 30px;
`

const useSelectMonedas = (label, opciones, setError) => {

    const [state, setState] = useState('')

    const SelectMonedas = () => (
        <>
            <Label>{label}</Label>
            <Select
                value={state}
                onChange={ e => {
                    setState(e.target.value)
                    setError(false)
                    }
                }
            >
                <option value="">Seleccione una opción</option>
                {opciones.map( opcion =>(
                    <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
                ))}
            </Select>
        </>
    )

    return [ SelectMonedas, state ]
}

export default useSelectMonedas