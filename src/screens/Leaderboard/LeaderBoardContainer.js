import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import LeaderboardScreen from "./LeaderboardScreen";

export default function LeaderBoardContainer({ navigation }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://us-central1-roll-or-flop-45bfc.cloudfunctions.net/leaderboard"
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
