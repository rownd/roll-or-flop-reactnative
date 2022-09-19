import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../../components/Header';

const Screen2Container = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Header />
      <Text>Screen2</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <View style={{ width: 200, height: 200, backgroundColor: 'green' }} />
    </View>
  );
};

export default Screen2Container;

const styles = StyleSheet.create({});
