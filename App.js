import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/screens/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar/>
      <Routes/>
    </NavigationContainer>
  );
}

