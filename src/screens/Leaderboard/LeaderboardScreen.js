import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BackgroundImageComponent from '../../components/Background';

export default function LeaderboardScreen({ data }) {
  return (
    <View
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}
    >

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: 12,
          marginBottom: 12,
          padding: 12,
          backgroundColor: '#13BBC2',
        }}
      >
        <Text style={{ fontSize: 22, color: 'white' }}>Rank</Text>
        <Text style={{ width: 170, fontSize: 22, color: 'white' }}>
          Gamertag
        </Text>
        <Text style={{ fontSize: 22, color: 'white' }}>Streak</Text>
      </View>

      {data &&
        data?.leaderboard &&
        data?.leaderboard.map(({ gamertag, longest_streak }, idx) => {
          if (!gamertag || (!longest_streak && longest_streak !== 0)) {
            return null;
          }
          return (
            <View
              key={idx}
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Text style={{ fontSize: 22, color: 'white' }}>{idx + 1}.</Text>
              <Text style={{ width: 170, fontSize: 22, color: 'white' }}>
                {gamertag}
              </Text>
              <Text style={{ fontSize: 22, color: 'white' }}>
                {longest_streak}
              </Text>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({});
