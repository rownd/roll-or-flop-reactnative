import React from 'react';
import { Text, View, Button, useColorScheme } from 'react-native';
import { RowndProvider } from '@rownd/react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { changeBarColors } from 'react-native-immersive-bars';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';


import Screen2Container from './src/screens/Screen2/Screen2Container';
import HomeContainer from './src/screens/Home/HomeContainer';
import GameContainer from './src/screens/Game/GameContainer';
import LeaderBoardContainer from './src/screens/Leaderboard/LeaderBoardContainer';
import ErrorBoundary from 'react-native-error-boundary';
import BackgroundImageComponent from './src/components/Background';
import Footer from './src/components/Footer';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Stack = createNativeStackNavigator();

const CustomFallback = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Something happened!</Text>
      <Text>{props.error.toString()}</Text>
      <Button onPress={props.resetError} title={'Try again'} />
    </View>
  );
};

function App() {

  const [loaded] = useFonts({
    VeneerCleanReg: require('./assets/fonts/VeneerCleanReg.otf'),
    VeneerCleanRegIt: require('./assets/fonts/VeneerCleanRegIt.otf'),
  });

  React.useEffect(() => {
    changeBarColors(false);
    // or changeBarColors(isDarkMode);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary FallbackComponent={CustomFallback}>
        <View style={{ flex: 1 }}>
          <RowndProvider
            config={{ appKey: '17331884-13e8-454f-843e-a823111f23d9' }}
          >
            {/* <Main /> */}
            <NavigationContainer theme={navTheme}>
              <BackgroundImageComponent />
              <SafeAreaView style={{ flex: 1 }}>
                <Stack.Navigator screenOptions={{
                  headerTitleStyle: {
                    fontFamily: 'VeneerCleanReg',
                  }
                }}>
                  <Stack.Screen
                    name="Home"
                    component={HomeContainer}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Screen2"
                    component={Screen2Container}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Leaderboard"
                    component={LeaderBoardContainer}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Game"
                    component={GameContainer}
                    options={{
                      headerShown: false,
                    }}
                  />

                </Stack.Navigator>
              </SafeAreaView>
              <Footer />
            </NavigationContainer>
          </RowndProvider>
        </View>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

export default App;
