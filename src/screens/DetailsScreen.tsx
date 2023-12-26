import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text } from 'react-native'

const DetailsScreen = ({route}) => {
  const { item } = route.params;

  console.log(item)

  return (
    <SafeAreaView style={styles.container}>
      <Text>Details screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191c21",
  },
});

export default DetailsScreen