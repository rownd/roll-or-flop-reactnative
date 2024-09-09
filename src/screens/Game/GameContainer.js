import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import GameScreen from "./GameScreen";

export default function GameContainer({ navigation }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://us-central1-roll-or-flop-45bfc.cloudfunctions.net/gifs")
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log({ err }));
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Header navigation={navigation} />
      <GameScreen data={data && data?.gifs} />
    </View>
  );
}

const styles = StyleSheet.create({});
