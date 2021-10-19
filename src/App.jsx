import React, { useState, useEffect } from 'react';
import 'styles/styles.css';
import { BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import Login from 'pages/Auth/Login';
import Admin from 'pages/admin/Index';
import Registro from 'pages/Auth/Registro';
import Index from 'pages/Auth/Index';
import PublicLayout from 'layouts/PublicLayout';
import PrivateLayout from 'layouts/PrivateLayout';
import AuthLayout from 'layouts/AuthLayout';
import Vehiculos from 'pages/admin/Vehiculos';
import Clientes from 'pages/admin/Clientes';
import { DarkModeContext} from 'context/darkMode';

function App() {
 const [darkMode, setDarkMode] = useState(false);
 useEffect(() => {
   console.log('modo dark:', darkMode);
 }, [darkMode])
  return (
    <div className='App'> 
    <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
    <Router>
      <Switch>
        <Route path={['/admin','/admin/vehiculos','/admin/clientes']}>
          <PrivateLayout>
            <Switch>
              <Route path='/admin/vehiculos'>
                <Vehiculos/>
              </Route>
              <Route path='/admin/clientes'>
                <Clientes/>
              </Route>
              <Route path='/admin'>
                <Admin/>
              </Route>
            </Switch>
          </PrivateLayout>
        </Route>
        <Route  path={['/login','/registro']}>
          <AuthLayout>
            <Switch>
              <Route path='/login'>
                <Login/>
              </Route>
              <Route path='/registro'>
                <Registro/>
              </Route>
            </Switch>
          </AuthLayout>
        </Route>
        <Route path={['/']}>
          <PublicLayout>
            <Switch>
              <Route path='/'>
                <Index/>
              </Route>
            </Switch>
          </PublicLayout>
        </Route>
      </Switch>
    </Router>
    </DarkModeContext.Provider>
  </div>
  );
}

export default App;
