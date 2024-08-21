import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import HomeScreen from "./HomeScreen";

const HomeContainer = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "rgba(52, 52, 52, 0)" }}>
      <Header navigation={navigation} />
      <ScrollView style={{ flex: 1 }}>
        <HomeScreen navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({});
