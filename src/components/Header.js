import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import SVGLogo from '../../assets/svgs/wondrgames-white.svg';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import MenuScreen from './MenuScreen';
import { NativeModules } from 'react-native';

const Header = ({ navigation, hideMenu }) => {
  const [open, setOpen] = useState(false);
  const [statusBarHeight, setStatusBarHeight] = useState(Platform.OS === 'ios' ? 40 : 10);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const { StatusBarManager } = NativeModules;

  useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager?.getHeight(({height}) => {
        setStatusBarHeight(height)
      });
    }
  },[])
  
  return (
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          backgroundColor: showLeaderboard ? '#009CA3':'#13BBC2',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: statusBarHeight + 5,
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 10
        }}
      >
        <SVGLogo width={72} height={20} />
        {!hideMenu && (
          <TouchableOpacity onPress={() => {
            if (showLeaderboard) {
              setShowLeaderboard(false)
            } else {
              setOpen((prev) => !prev)
            }
            }}>
            {open && !showLeaderboard ? (
              <AntDesign name="close" size={24} color="white" />
            ) : (
              <Feather name="menu" size={24} color="white" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {open && (
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#009CA3',
          }}
        >
          <MenuScreen
            navigation={navigation}
            closeHeader={setOpen}
            setShowLeaderboard={setShowLeaderboard}
            showLeaderboard={showLeaderboard}
          />
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
