import BackgroundImage from '../../assets/svgs/webapp-background.svg';
import { StyleSheet, Text, View } from 'react-native';

const BackgroundImageComponent = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: -150,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        padding: 0,
      }}
    >
      <BackgroundImage height="100%" />
    </View>
  );
};
export default BackgroundImageComponent;
