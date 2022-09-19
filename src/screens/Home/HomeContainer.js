import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HomeScreen from './HomeScreen';

const HomeContainer = ({ navigation }) => {

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <HomeScreen navigation={navigation} />
      <Footer />
    </View>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({});
