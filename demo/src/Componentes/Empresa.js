import React,{useEffect,useState} from 'react'
import { Fragment } from 'react';
import '../App.css'


const Empresa = () => {
    const [EthereumPrecio,setEthereumPrecio] = useState('')
    const [Oferta,setOferta] = useState(0)

    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets?ids=ethereum')
        .then(response => response.json())
        .then(data => setEthereumPrecio(data.data[0].priceUsd));
        
    }, [])

    return (
        
        <Fragment>
                <div className="container">
                    <form autoComplete="off">
                        <div className="mb-3">
                            <label htmlFor="titulo" className="form-label" >Título de la tarea</label>
                            <input  className="form-control" id="titulo"  style={{"width":"40%"}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Descripcion" className="form-label">Descripción</label>
                            <textarea  rows="6" className="form-control" id="Descripcion" />
                        </div>
                      
                    </form>
                    <div className="row" style={{"paddingTop":"20px"}}>
                            <div className="col-sm-2">
                                <label  className="form-label" >Monto a ofertar ($)</label>
                                <input className="form-control" id="titulo"  style={{"width":"80%"}} value={Oferta} onChange={(e) => setOferta(e.target.value)} />
                            </div>
                            <div className="col-sm-3" >
                                <label  className="form-label">Monto a pagar en Ethereum</label>
                                <h6>{Oferta/EthereumPrecio}</h6>
                            </div>
                            <div className="col-sm-4" >
                                <label  className="form-label">Precio de un Ethereum</label>
                                <h6>1 ETH = ${EthereumPrecio}</h6>
                            </div>
                    </div>
                    <button type="submit" className="btn btn-dark" style={{"marginTop":"20px"}}>Crear</button>

                </div>
        </Fragment>
    )
}

export default Empresa;