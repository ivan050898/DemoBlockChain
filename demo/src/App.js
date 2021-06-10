import React,{Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Empresa from './Componentes/Empresa';
import Dashboard from './Componentes/Dashboard';

const App =() => {
  return (
    <Fragment>
      <Router>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Cryptobay</span>
          </div>
        </nav>
          <div  className="cointainer " >
            <Switch>
              <Route exact path='/Empresa' component={Empresa} ></Route>
              <Route exact path='/Dashboard' component={Dashboard} ></Route>

            </Switch>
          </div>
         

        </Router>
    </Fragment>
  );
}

export default App;
