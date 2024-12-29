import React from 'react';
import { useAuth } from './src/contexts/AuthContext';
import MainNavigator from './src/navigation/MainNavigator';
import Loader from './src/components/Loader';


function App(): React.JSX.Element {
  const {isLoading} = useAuth();
  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <MainNavigator />
  );
}

export default App;
