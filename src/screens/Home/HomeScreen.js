import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import RollOrFlopImage from '../../../assets/svgs/rollorflop-noshadow.svg';
import WonderGamesImage from '../../../assets/svgs/wondrgames-black2.svg';
import BackgroundImageComponent from '../../components/Background';
import { useRownd } from '@rownd/react-native';

const HomeScreen = ({ navigation }) => {
  const { requestSignIn, user, signOut, is_authenticated } = useRownd();
  const windowHeight = Dimensions.get('window').height;

  return (
    <View
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0)',
      }}
    >
      <Text style={{ fontSize: 40, color: 'white', paddingTop: 20, fontFamily: 'VeneerCleanReg' }}>
        { user?.data?.first_name ? `Welcome, ${user?.data?.gamertag || user.data.first_name}` : 'Welcome!' }
      </Text>
      <View
        style={{
          width: '90%',
          height: Math.min(294, windowHeight*.4),
          backgroundColor: 'white',
          opacity: 0.6,
          borderRadius: 40,
          marginTop: 30,
          display: 'flex',
          alignItems: 'center',
          paddingTop: 45,
        }}
      >
        <RollOrFlopImage width={268} height={111} />
        <View style={{ marginTop: 24, flexDirection: 'row' }}>
          <Text style={{ marginRight: 4, marginLeft: 60 }}>By</Text>
          <WonderGamesImage width={116} height={33} />
        </View>
      </View>
      <TouchableOpacity
        style={{ marginTop: 32 }}
        onPress={() => navigation.navigate('Game')}
      >
        <View
          style={{
            width: 270,
            height: Math.min(79, windowHeight*.1),
            backgroundColor: '#2E6AEE',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'white',
          }}
        >
          <Text style={{ fontSize: Math.min(38, windowHeight*.05), color: 'white', fontFamily: 'VeneerCleanReg' }}>Play Now</Text>
        </View>
      </TouchableOpacity>

      {!is_authenticated ? (
        <TouchableOpacity
          style={{ marginTop: Math.min(32, windowHeight*.04) }}
          onPress={() => requestSignIn()}
        >
          <Text style={{ fontSize: 20, color: 'white', fontFamily: 'VeneerCleanReg' }}>
            Sign in to existing session
          </Text>
        </TouchableOpacity>
      ) : (
        <>
        <TouchableOpacity style={{ marginTop: 32 }} onPress={() => signOut()}>
          <Text style={{ fontSize: 20, color: 'white', fontFamily: 'VeneerCleanReg' }}>
            Sign out of existing session
          </Text>
        </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
