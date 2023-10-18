import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Permissions from '../pages/Permissions';
import MapScreen from '../pages/MapScreen';
import { PermissionContext } from '../context/PermissionContext';
import LoadingScreen from '../pages/LoadingScreen';

const Stack = createNativeStackNavigator();
  
export const Navigator = () => {

  const { permissions } = useContext(PermissionContext)
  
  if( permissions.locationStatus === 'unavailable' ) {
    return <LoadingScreen />
  } 

  return (
    <Stack.Navigator
      initialRouteName='Permissions'
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        (permissions.locationStatus === 'granted')
         ? <Stack.Screen name="Map" component={MapScreen} />
         : <Stack.Screen name="Permissions" component={Permissions} />
      }
    </Stack.Navigator>
  );
}