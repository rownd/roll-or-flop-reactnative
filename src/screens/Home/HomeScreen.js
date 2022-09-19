import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import RollOrFlopImage from '../../../assets/svgs/rollorflop-noshadow.svg';
import WonderGamesImage from '../../../assets/svgs/wondrgames-black2.svg';
import BackgroundImageComponent from '../../components/Background';
import { useRownd } from '@rownd/react-native__native-modules';

const HomeScreen = ({ navigation }) => {
  const { requestSignIn, user, signOut, is_authenticated } = useRownd();

  return (
    <View
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}
    >
      <BackgroundImageComponent />
      {user?.data?.first_name && (
        <Text style={{ fontSize: 40, color: 'white', paddingTop: 20 }}>
          Welcome, {user?.data?.gamertag || user.data.first_name}
        </Text>
      )}
      <View
        style={{
          width: '90%',
          height: 294,
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
            height: 79,
            backgroundColor: '#2E6AEE',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'white',
          }}
        >
          <Text style={{ fontSize: 40, color: 'white' }}>Play Now</Text>
        </View>
      </TouchableOpacity>

      {!is_authenticated ? (
        <TouchableOpacity
          style={{ marginTop: 32 }}
          onPress={() => requestSignIn()}
        >
          <Text style={{ fontSize: 18, color: 'white' }}>
            Sign in to existing session
          </Text>
        </TouchableOpacity>
      ) : (
        <>
        <TouchableOpacity style={{ marginTop: 32 }} onPress={() => signOut()}>
          <Text style={{ fontSize: 18, color: 'white' }}>
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
