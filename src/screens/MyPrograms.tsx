import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const MyPrograms = () => {
  return (
    <View style={styles.container}>
      <Text
        variant="headlineMedium"
        style={{
          color: "#fff",
        }}
      >
        Mes Programmes
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191c21",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyPrograms