import React,{useEffect,useState} from 'react'
import { Fragment } from 'react';
import '../App.css'
import Web3 from 'web3'

const Empresa = () => {
    const [EthereumPrecio,setEthereumPrecio] = useState('')
    const [Oferta,setOferta] = useState(0)
    const [web3,setweb3] = useState(0)
    const [cuenta,setcuenta] = useState(0)
    const [balance,setbalance] = useState(0)

    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets?ids=ethereum')
        .then(response => response.json())
        .then(data => setEthereumPrecio(data.data[0].priceUsd));
        CargarWeb3();
    }, [])
    
    const  CargarWeb3 = async ()=>{
        if (typeof window.ethereum !== 'undefined') {
            setweb3( new Web3(window.ethereum));

          try {
            await window.ethereum.enable();
          } catch(e) {
            console.log("gg")
          }
        }
    }

    const CargarCuentas = async ()=>{
        var accounts = await web3.eth.getAccounts();
        setcuenta(accounts[0])
        const balance = await web3.eth.getBalance(accounts[0]);
        setbalance(balance);
        const TotalPagar= (((Oferta/EthereumPrecio)*0.05)+(Oferta/EthereumPrecio)).toString()
        const valorOferta= web3.utils.toWei(TotalPagar)
        const valorHexadecimal= web3.utils.toHex(valorOferta).toString()   
        let params= [
            {
              from: accounts[0],
              to: '0xc24101beF39F51DfBC75554f7Ee2F00c11B2a03F',
              gas: '0x76c0', // 30400
              gasPrice: '0x9184e72a000', // 10000000000000
              value: valorHexadecimal, // 2441406250
              data:
                '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
            },
          ];
          window.ethereum
            .request({
              method: 'eth_sendTransaction',
              params,
            })
            .then((result) => {
              console.log(result)
              console.log( web3.eth.getTransaction(result));
            })
            .catch((error) => {
                console.log(error)
            });


    }

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
                        <div className="mb-3">
                            <label htmlFor="horas" className="form-label" >Fecha de entrega esperada</label>
                            <input  className="form-control" id="horas"  type="date" style={{"width":"20%"}} min={new Date().toISOString().split("T")[0]}/>
                        </div>
                      
                    </form>
                    <div className="row" style={{"paddingTop":"20px"}}>
                            <div className="col-sm-2">
                                <label  className="form-label" >Monto a ofertar ($)</label>
                                <input className="form-control" id="titulo"  style={{"width":"80%"}} value={Oferta} onChange={(e) => setOferta(e.target.value)} />
                            </div>
                            <div className="col-sm-3" >
                                <label  className="form-label">Monto a pagar en Ethereum</label>
                                <h6>{Oferta/EthereumPrecio} ETH</h6>
                                <label  className="form-label">Comisión de la plataforma (5%):</label>
                                <h6> {(Oferta/EthereumPrecio)*0.05} ETH</h6>
                                <label  className="form-label">Total a pagar:</label>
                                <h6> {((Oferta/EthereumPrecio)*0.05)+(Oferta/EthereumPrecio)} ETH</h6>

                            </div>
                            <div className="col-sm-4" >
                                <label  className="form-label">Precio de un Ethereum</label>
                                <h6>1 ETH = ${EthereumPrecio}</h6>
                            </div>
                    </div>
                    <button  className="btn btn-dark" style={{"marginTop":"20px"}} onClick={()=>CargarCuentas()}>Crear</button>

                </div>
        </Fragment>
    )
}

export default Empresa;