import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import BackgroundImageComponent from '../../components/Background';
import RollOrFlopImage from '../../../assets/svgs/rollorflop-white+blueshadow.svg';
import RollImage from '../../../assets/svgs/roll-button.svg';
import FlopImage from '../../../assets/svgs/flop-button.svg';
import { useRownd } from '@rownd/react-native__native-modules';
import { AntDesign } from '@expo/vector-icons';

export default function GameScreen({ data }) {
  const { user, is_authenticated, requestSignIn } = useRownd();
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [index, setIndex] = useState(0);

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
      <BackgroundImageComponent />
      <View style={{ marginTop: 16 }}>
        <RollOrFlopImage height={56} width={137} />
      </View>
      <View
        style={{
          backgroundColor: '#2E6AEE',
          padding: 5,
          paddingLeft: 30,
          paddingRight: 30,
          borderRadius: 27,
          marginTop: 24,
        }}
      >
        <Text style={{ fontSize: 20, color: 'white' }}>
          Will it roll? or Will it flop?
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          height: 361,
          position: 'relative',
          marginTop: 8,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            backgroundColor: 'white',
            opacity: 0.6,
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            borderWidth: showResult && !isCorrect ? 10 : 0,
            borderColor: '#FD0000',
          }}
        />
        {(!showResult || (isCorrect && showResult)) && (
          <Text style={{ marginTop: 24, color: '#2156CA', fontSize: 40 }}>
            {isCorrect && showResult && (
              <AntDesign name="checkcircle" size={40} color="#2156CA" />
            )}{' '}
            {data && data[index].name}
          </Text>
        )}

        {!isCorrect && showResult && (
          <Text style={{ marginTop: 24, color: 'grey', fontSize: 54 }}>
            <AntDesign name="closecircle" size={40} color="#FD0000" /> Nope
          </Text>
        )}

        {data && (
          <Image
            style={{ width: 208, height: 130, marginTop: 20, borderRadius: 12 }}
            source={{
              uri: showResult ? data[index].url : data[index].still_src,
            }}
          />
        )}

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 31,
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
              <Text style={{ color: 'white', fontSize: 30 }}>NEXT</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  width: 130,
                  height: 72,
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
                <RollImage height={58} width={93} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 130,
                  height: 72,
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
                <FlopImage height={58} width={110} />
              </TouchableOpacity>
            </>
          )}
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
          <Text style={{ fontSize: 18, color: '#2E6AEE' }}>
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
          <Text style={{ fontSize: 18, color: '#13BBC2' }}>
            Best Streak:{' '}
            {user?.data?.longest_streak ? user?.data?.longest_streak : 0}
          </Text>
        </View>
      </View>
      {showConfetti ? (
        <ConfettiCannon count={200} origin={{ x: 10, y: 100 }} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
