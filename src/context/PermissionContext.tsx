import { createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { PERMISSIONS, PermissionStatus, check, request, openSettings } from 'react-native-permissions'


export interface PermissionState {
  locationStatus: PermissionStatus;
}

export const permissionsInitState: PermissionState = {
  locationStatus: 'unavailable',
}

type PermissionsContextProps = {
  permissions: PermissionState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
}

export const PermissionContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({ children }: any) => {

  const [ permissions, setPermissions] = useState(permissionsInitState);

  useEffect( () => {
    AppState.addEventListener('change', state => {
      if(state !== 'active') return;

      checkLocationPermission()
    })

  }, [] )

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus

    if ( Platform.OS === 'ios' ) {
      //permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE )
      permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE )
      setPermissions({
        ...permissions,
        locationStatus: permissionStatus
      })
      
    } else {
      //permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION )
      console.log("entro aca")
      permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION )
      setPermissions({
        ...permissions,
        locationStatus: permissionStatus
      })
    }

    if( permissionStatus === 'blocked' ) {
      openSettings()
    }
  }

  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus

    if ( Platform.OS === 'ios' ) {
      permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE )
      setPermissions({
        ...permissions,
        locationStatus: permissionStatus
      })
      
    } else {
      permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION )
      setPermissions({
        ...permissions,
        locationStatus: permissionStatus
      })
    }
  }

  return (
    <PermissionContext.Provider value={{
      permissions,
      askLocationPermission,
      checkLocationPermission
    }}>
      {children}
    </PermissionContext.Provider>
  )

}