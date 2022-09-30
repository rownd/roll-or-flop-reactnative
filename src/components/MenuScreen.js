import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRownd } from '@rownd/react-native';
import Leaderboard2 from './Leaderboard2';

export default function MenuScreen({ navigation, closeHeader, setShowLeaderboard, showLeaderboard }) {
  const { requestSignIn, is_authenticated, signOut, manageAccount } = useRownd();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: showLeaderboard ? '#13BBC2':'#009CA3',
        width: '100%',
        alignItems: 'center',
      }}
    >
      {showLeaderboard ? (
        <Leaderboard2 />
      ) : (
        <>
          <TouchableOpacity
            style={{
              width: '80%',
              height: 83,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 2,
              borderColor: '#00878D',
            }}
            onPress={() => {
              if (is_authenticated) {
                signOut();
              } else {
                requestSignIn();
              }
              closeHeader();
            }}
          >
            <Text style={{ color: 'white', fontSize: 36, textAlign: 'center', fontFamily: 'VeneerCleanReg' }}>
              {is_authenticated ? 'Sign out' : 'Sign in'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '80%',
              height: 83,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 2,
              borderColor: '#00878D',
            }}
            onPress={() => {
              // closeHeader();
              // navigation.navigate('Leaderboard');
              setShowLeaderboard(true);
            }}
          >
            <Text style={{ color: 'white', fontSize: 36, textAlign: 'center', fontFamily: 'VeneerCleanReg' }}>
              Leaderboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '80%',
              height: 83,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 2,
              borderColor: '#00878D',
            }}
            onPress={() => {
              closeHeader();
              navigation.navigate('Home');
            }}
          >
            <Text style={{ color: 'white', fontSize: 36, textAlign: 'center', fontFamily: 'VeneerCleanReg' }}>
              Home
            </Text>
          </TouchableOpacity>
          {
            is_authenticated && (
              <TouchableOpacity
            style={{
              width: '80%',
              height: 83,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              manageAccount()
            }}
          >
            <Text style={{ color: 'white', fontSize: 36, textAlign: 'center', fontFamily: 'VeneerCleanReg' }}>
              Profile
            </Text>
          </TouchableOpacity>
            )
          }
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
