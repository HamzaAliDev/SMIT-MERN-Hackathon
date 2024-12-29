import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import AuthContextProvider from './src/contexts/AuthContext';
// import EventContextsProvider from './src/contexts/EventContext';

export default function Main() {
    return (
        <AuthContextProvider>
            {/* <EventContextsProvider> */}
                <App />
            {/* </EventContextsProvider> */}
        </AuthContextProvider>
    )
}


AppRegistry.registerComponent(appName, () => Main);
