import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LeaderboardScreen from './LeaderboardScreen';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';

export default function LeaderBoardContainer({ navigation }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        'https://us-central1-roll-or-flop-45bfc.cloudfunctions.net/leaderboard'
      )
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log({ err }));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <LeaderboardScreen data={data} />
    </View>
  );
}

const styles = StyleSheet.create({});
