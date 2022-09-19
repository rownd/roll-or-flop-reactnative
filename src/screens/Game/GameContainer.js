import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import GameScreen from './GameScreen';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function GameContainer({ navigation }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('https://us-central1-roll-or-flop-45bfc.cloudfunctions.net/gifs')
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log({ err }));
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Header navigation={navigation} />
      <GameScreen data={data && data?.gifs} />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({});
