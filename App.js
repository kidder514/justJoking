import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import string from './app/localization/string';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{string.Back}</Text>
        <Text>Changes hey you make automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
