import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import BackgroundImageComponent from '../../components/Background';
import RollOrFlopImage from '../../../assets/svgs/rollorflop-white+blueshadow.svg';
import RollImage from '../../../assets/svgs/roll-button.svg';
import FlopImage from '../../../assets/svgs/flop-button.svg';
import { useRownd } from '@rownd/react-native';
import { AntDesign } from '@expo/vector-icons';

export default function GameScreen({ data }) {
  const { user, is_authenticated, requestSignIn } = useRownd();
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [index, setIndex] = useState(0);

  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const handleConfettiCannon = () => {
    setShowConfetti(false);
    setTimeout(() => {
      setShowConfetti(true);
    }, 200);
  };

  const requestSignInDuringStreak = () => {
    if (user.data.streak + 1 === 3 && !is_authenticated) {
      requestSignIn();
    }
  };

  const setUserStreak = (isRight) => {
    const streak = parseInt(user.data.streak || 0);
    const longest_streak = parseInt(user.data.longest_streak || 0);
    if (isRight) {
      requestSignInDuringStreak();

      if (!longest_streak || longest_streak < streak + 1) {
        user.set({
          ...user.data,
          streak: streak + 1,
          longest_streak: streak + 1,
        });
      } else {
        user.setValue('streak', streak + 1);
      }
    } else {
      user.setValue('streak', 0);
    }
  };

  const pickRollFlop = (value) => {
    if (!data?.length || data?.length < 1) {
      return;
    }
    if (value === data[index].answer) {
      handleConfettiCannon();
      setIsCorrect(true);
      setShowResult(true);
      setUserStreak(true);
    } else {
      setIsCorrect(false);
      setShowResult(true);
      setUserStreak(false);
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}
    >
     {windowHeight > 750 && <View style={{ marginTop: 8 }}>
        <RollOrFlopImage height={Math.min(56, windowHeight*.08)} width={137} />
      </View>}
      <View
        style={{
          backgroundColor: '#2E6AEE',
          padding: 5,
          paddingLeft: 30,
          paddingRight: 30,
          borderRadius: 27,
          marginTop: 16,
        }}
      >
        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'VeneerCleanReg' }}>
          Will it roll? or Will it flop?
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          // height: Math.min(360, windowHeight*.6),
          // position: 'relative',
          marginTop: 8,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            borderWidth: showResult && !isCorrect ? 10 : 0,
            borderColor: '#FD0000',
            padding: 15,
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column'
          }}
        >
        {(!showResult || (isCorrect && showResult)) && (
          <Text style={{  color: '#2156CA', fontSize: Math.min(40, windowHeight*.045), fontFamily: 'VeneerCleanReg' }}>
            {isCorrect && showResult && (
              <AntDesign name="checkcircle" size={Math.min(40, windowHeight*.04)} color="#2156CA" />
            )}{' '}
            {data && data[index].name}
          </Text>
        )}

        {!isCorrect && showResult && (
          <Text style={{ color: 'grey', fontSize: Math.min(52, windowHeight*.05), fontFamily: 'VeneerCleanReg' }}>
            <AntDesign name="closecircle" size={Math.min(40, windowHeight*.04)} color="#FD0000" /> Nope
          </Text>
        )}

        {data && (
          <Image
            style={{ 
              width: windowWidth * .8, 
              marginTop: Math.min(20, windowHeight*.02), 
              borderRadius: 12,
              resizeMode: 'contain',
              aspectRatio: 1.6
            }}
            source={{
              uri: showResult ? data[index].url : data[index].still_src,
            }}
          />
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Math.min(31, windowHeight*.02),
          }}
        >
          {showResult ? (
            <TouchableOpacity
              style={{
                backgroundColor: '#13BBC2',
                padding: 5,
                paddingRight: 30,
                paddingLeft: 30,
                borderRadius: 20,
              }}
              onPress={() => {
                setShowResult(false);
                setIndex((prev) => {
                  if (prev > data.length - 2) return 0;
                  return prev + 1;
                });
              }}
            >
              <Text style={{ color: 'white', fontSize: 30, fontFamily: 'VeneerCleanReg' }}>NEXT</Text>
            </TouchableOpacity>
          ) : (
            !data?.length ? <ActivityIndicator size="large" color="#fff" /> :
            <>
              <TouchableOpacity
                style={{
                  width: Math.min(130, windowHeight*.18),
                  height: Math.min(72, windowHeight*.1),
                  backgroundColor: '#13BBC2',
                  marginRight: 8,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: '#0B989E',
                }}
                onPress={() => {
                  pickRollFlop('roll');
                }}
              >
                <RollImage height={Math.min(58, windowHeight*.08)} width={93} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: Math.min(130, windowHeight*.18),
                  height: Math.min(72, windowHeight*.1),
                  backgroundColor: '#13BBC2',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: '#072C7A',
                }}
                onPress={() => {
                  pickRollFlop('flop');
                }}
              >
                <FlopImage height={Math.min(58, windowHeight*.04)} width={110} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 32,
        }}
      >
        <View
          style={{
            width: 150,
            height: 40,
            backgroundColor: 'white',
            marginRight: 8,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 18, color: '#2E6AEE', fontFamily: 'VeneerCleanRegIt' }}>
            Streak: {user?.data?.streak ? user?.data?.streak : 0}
          </Text>
        </View>
        <View
          style={{
            width: 150,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 18, color: '#13BBC2', fontFamily: 'VeneerCleanRegIt' }}>
            Best Streak:{' '}
            {user?.data?.longest_streak ? user?.data?.longest_streak : 0}
          </Text>
        </View>
      </View>
      {showConfetti ? (
        <ConfettiCannon count={200} origin={{ x: -25, y: 0 }} fadeOut={true} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
