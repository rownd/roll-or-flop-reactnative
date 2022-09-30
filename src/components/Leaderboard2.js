import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Leaderboard2Container = () => {
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

  return <Leaderboard2 data={data} />;
};



const Leaderboard2 = ({ data }) => {
    const [validLeaderboard, setValidLeaderboard] = useState([]);
    useEffect(() => {
        if (data && data?.leaderboard) {
            data?.leaderboard.forEach(({ gamertag }) => {
                if (!gamertag) return;
                setValidLeaderboard(prev => [...prev, gamertag])
            });
        }
    }, [data?.leaderboard]);

  return (
    <ScrollView
      style={{width:'100%'}}
      contentContainerStyle={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 300
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 40,
          textAlign: 'center',
          marginTop: 20,
          fontFamily: 'VeneerCleanReg'
        }}
      >
        Leaderboard
      </Text>
      <View
        style={{
          width: '90%',
          height: 2,
          backgroundColor: '#009CA3',
          marginTop: 5,
        }}
      />
      <View
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 15,
          backgroundColor: '#009CA3',
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: '#dedede',
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: 16,
          }}
        >
          RANK
        </Text>
        <Text
          style={{
            color: '#dedede',
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: 16,
          }}
        >
          USERNAME
        </Text>
        <Text
          style={{
            color: '#dedede',
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: 16,
          }}
        >
          STREAK
        </Text>
      </View>
      {data &&
        data?.leaderboard &&
        data?.leaderboard.map(({ gamertag, longest_streak }) => {
          if (!gamertag) return null;
          const index = validLeaderboard.indexOf(gamertag);
          return (
            <View
              key={`${gamertag}`}
              style={{
                width: '90%',
                maxWidth: '90%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#02acb5',
                padding: 15,
                borderRadius: 10,
                marginTop: 15,
              }}
            >
              <Text style={{color:'white', fontSize:17, fontWeight:'bold'}}>{index + 1}</Text>
              <Text style={{ flex: 1, marginLeft: 80, color:'white', fontSize:17, fontWeight:'bold' }}>{gamertag}</Text>
              <Text style={{color:'white', fontSize:17, fontWeight:'bold'}}>{longest_streak}</Text>
            </View>
          );
        })}
    </ScrollView>
  );
};

export default Leaderboard2Container;

const styles = StyleSheet.create({});
