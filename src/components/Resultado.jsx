import styled from '@emotion/styled'

const Cuadro = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    font-size: 700;

    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 30px;
`

const Texto = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`

const Precio = styled.p`
    font-size: 20px;
    span{
        font-weight: 700;
    }
`

const Logo = styled.img`
    max-width: 120px;
`

const Resultado = ({ cotizado }) => {
    const { price, high, low, change, lastUpdate, image } = cotizado
    return(
        <Cuadro>
            <Logo 
                src={`https://cryptocompare.com/${image}`} 
                alt="Logo de la Criptomoneda"
            />
            <div>
                <Precio>El precio es de <span>{ price }</span></Precio>
                <Texto>El valor más alto del día fue <span>{ high }</span></Texto>
                <Texto>El valor más bajo del día fue <span>{ low }</span></Texto>
                <p>Variacíon en las últimas 24h: <span>{ change }</span></p>
                <Texto>Última actualización: <span>{ lastUpdate }</span></Texto>
            </div>
        </Cuadro>
    )
} 

export default Resultado