import React from 'react';
import Home from './src/screens/Frontend/Home';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import MainNavigator from './src/navigation/MainNavigator';


function App(): React.JSX.Element {
  

  return (
    <>
    {/* <Home /> */}
    {/* <Login /> */}
    {/* <Register /> */}
    <MainNavigator />
    </>
  );
}

export default App;
