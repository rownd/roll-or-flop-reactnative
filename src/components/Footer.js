import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RowndLogo from '../../assets/svgs/Rownd-white.svg';

const Footer = () => {
  return (
    <View
      style={{
        height: 70,
        width: '100%',
        backgroundColor: '#2F66F0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        position: 'absolute',
        bottom: 0,
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          fontFamily: 'VeneerCleanReg',
          marginRight: 16,
        }}
      >
        Powered by
      </Text>
      <RowndLogo width={79} height={16} />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
