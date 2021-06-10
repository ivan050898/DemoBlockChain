import React,{useEffect,useState} from 'react'
import { Fragment } from 'react';
import Web3 from 'web3'
 

const Dashboard = () => {
    const [web3,setweb3] = useState(0)
    const [cuenta,setcuenta] = useState(0)
    const [balance,setbalance] = useState(0)
    const [EthereumPrecio,setEthereumPrecio] = useState('')

    const ethereum= window.ethereum
    if(ethereum){
        ethereum.on('accountsChanged',function(accounts){
            setcuenta(accounts[0])
        })
    }
    
    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets?ids=ethereum')
        .then(response => response.json())
        .then(data => setEthereumPrecio(data.data[0].priceUsd));
        document.body.style.backgroundColor = "#F5F5F5"
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
        const montoWei = await web3.eth.getBalance(accounts[0]);
        setbalance(parseFloat(web3.utils.fromWei(montoWei,"ether")).toFixed(2));

    }
   
    const formatMoney =(monto )=>{
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return formatter.format(monto); /* $2,500.00 */
    }
    
    if(typeof web3.eth === 'undefined'){
        return(
            <Fragment>
                <h1>Cargando..</h1>
            </Fragment>
        )
    }else{
        CargarCuentas();
        return (
            <Fragment>
               
                <div className="cardMaterial card w-75 " style={{"marginLeft":"10%","marginTop":"5%","padding":" 30px 30px 30px 30px"}} >
                    <div className="row" >
                        <div className="col-sm-2">
                            <label  className="form-label" >Monto Total de la billetera </label>
                            <h6>{balance} ETH</h6>
                            <h6> ≈ {formatMoney(balance*EthereumPrecio)} </h6>
    
                        </div>
                        <div className="col-sm-4" >
                            <label  className="form-label">Precio de un Ethereum</label>
                            <h6>1 ETH = ${EthereumPrecio}</h6>
                        </div>
                    </div>
                </div>
            </Fragment>
        )

    }

    
}

export default Dashboard;