import React,{useEffect,useState} from 'react'
import { Fragment } from 'react';
import Web3 from 'web3'
 

const Dashboard = () => {
    const [web3,setweb3] = useState(0)
    const [cuenta,setcuenta] = useState(0)
    const [balance,setbalance] = useState(0)
    const [EthereumPrecio,setEthereumPrecio] = useState('')
    const [transacciones,setTransacciones] = useState('')

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
    
    const HayTransaccion = (block) =>{
        for(var j = 0; j < block.transactions.length; j++) {
            if( block.transactions[j].to === "0x51aF34eB9FdeA6e1a906C7eeB11eD06C4A508782" ||  block.transactions[j].from === "0x51aF34eB9FdeA6e1a906C7eeB11eD06C4A508782" ){
               return true;
            }
            return false;
        }
    }
    const getTransactions = async()=>{
        var n = await web3.eth.getBlockNumber();
        var txs = [];
        for(var i = 0; i <= n; i++) {
            var block = await web3.eth.getBlock(i, true).then((result) => {
                if( HayTransaccion(result)){
                    txs.push(result.transactions);
                }
            })
        }
        console.log(txs.flat())
        setTransacciones(txs)

       
    }



    if(typeof web3.eth === 'undefined'){
        return(
            <Fragment>
                <h1>Cargando..</h1>
            </Fragment>
        )
    }else{
        CargarCuentas();
        //getTransactions();
        return (
            <Fragment>
               
                <div className="cardMaterial card w-75 " style={{"marginLeft":"10%","marginTop":"5%","padding":" 30px 30px 30px 30px"}} >
                    <div className="row" >
                        <div className="col-sm-2">
                            <label  className="form-label" >Monto Total de la billetera </label>
                            <h6>{balance} ETH</h6>
                            <h6> ≈ {formatMoney(balance*EthereumPrecio)} </h6>
    
                        </div>
                        <div className="col-sm-3" >
                            <label  className="form-label">Monto para pagos a estudiantes</label>
                            <h6>{balance*0.95} ETH</h6>
                            <h6> ≈ {formatMoney((balance*0.95)*EthereumPrecio)} </h6>
                        </div>
                        <div className="col-sm-3" >
                            <label  className="form-label">Monto de ganancia de plataforma</label>
                            <h6>{balance*0.05} ETH</h6>
                            <h6> ≈ {formatMoney((balance*0.05)*EthereumPrecio)} </h6>
                        </div>
                        <div className="col-sm-3" >
                            <label  className="form-label">Precio de un Ethereum</label>
                            <h6>1 ETH = ${EthereumPrecio}</h6>
                        </div>
                    </div>
                </div>
                <h1 style={{"fontSize":"28px","marginLeft":"10%","marginBottom":"1%"}}>Pagos Realizados a nuestra cuenta</h1>
                <div className="cardMaterial card w-75 " style={{"marginLeft":"10%","marginTop":"0px","padding":" 30px 30px 30px 30px"}} >
                    <h1>gg</h1>
                    <button  className="btn btn-dark" style={{"marginTop":"20px"}} onClick={()=>getTransactions()}>Crear</button>

                </div>
            </Fragment>
        )

    }

    
}

export default Dashboard;