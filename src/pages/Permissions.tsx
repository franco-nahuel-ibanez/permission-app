import { Button, StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import { PermissionContext } from '../context/PermissionContext'


const Permissions = () => {

  const { permissions, askLocationPermission } = useContext(PermissionContext)

  return (
    <View style={styles.container}>
      <Text>Permissions</Text>

      <Button
       title='Permiso'
       onPress={askLocationPermission}
      />

      <Text>
        {JSON.stringify(permissions, null, 5)}
      </Text>

    </View>
  )
}

export default Permissions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})