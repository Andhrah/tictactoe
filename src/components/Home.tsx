import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

import { SymbolButton, BigText, Button, Line, SoundIcon } from './shared';
import { clickSound } from '../helpers/sound';
import vollumeOn from '../../assets/images/volume_on.png';
import vollumeOff from '../../assets/images/volume_off.png';

const screenHeight = Dimensions.get('screen').height;

const player = {
  You: 'X',
  CPU: 'O',
  Empty: '',
};

const Home = (props: any) => {
  const [userSymbol, setUserSymbol] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [, setGameMode] = useState('');

  // Use useEffect hook to set the initial player symbol
  useEffect(() => {
    handlePlayerSymbol(player);
  },[]);

  // Function to handle the setting of player symbol in AsyncStorage
  const handlePlayerSymbol = async (playerSym: object) => {
    try {
      const getValue = await AsyncStorage.getItem('player');
      if (getValue === null) {
        const jsonValue = JSON.stringify(playerSym);
        await AsyncStorage.setItem('player', jsonValue);
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  // player's symbol
  const symbols = ['X', 'O'];

  // Function to handle the user's symbol choice
  const handleSymbolChoice = async (choice: string) => {
    try {
      // Play click sound if sound is on
      isSoundOn && clickSound.play();

      setUserSymbol(choice);

      const getValue = await AsyncStorage.getItem('player');
      const currentPlayer = JSON.parse(getValue!);

      // if the user's choice is different from whhats in the player obect
      // set CPU to user's initial symbol and user's symbol to their current choice
      if (choice !== currentPlayer.You) {
        currentPlayer.CPU = currentPlayer.You;
        currentPlayer.You = choice;
        await AsyncStorage.setItem('player', JSON.stringify(currentPlayer));
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  // Function to toggle sound on or off
  const handeSound = async ()  => {
    setIsSoundOn(!isSoundOn);
  };

  // game modes
  const buttons = ['Easy', 'Medium', 'Hard'];

  // background color for different gameMode
  const getColorForMode = (mode: string) => {
    switch (mode) {
      case 'Easy':
        return '#F0A500';
      case 'Medium':
        return '#FF276A';
      case 'Hard':
        return '#39A6A3';
      default:
        return '#F0A500';
    }
  };

  // Function to handle game mode selection
  const handleGameMode = async (gameMode: string) => {
    try {
      isSoundOn && clickSound.play();

      setGameMode(gameMode);
      await AsyncStorage.setItem('gameMode', gameMode);

      props.navigation.navigate('TicTacToe');
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  const { container, symbolChoiceContainer, marginTop, height } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar
        animated={true}
        backgroundColor="#022C43"
        barStyle="light-content"
      />
      {
        isSoundOn ?
        <SoundIcon onPress={handeSound} src={vollumeOn} marginTop={20} />
        : <SoundIcon onPress={handeSound} src={vollumeOff} marginTop={20} />
      }

      <BigText marginTop={40}>Choose your symbol</BigText>

      <View style={symbolChoiceContainer}>
        {/* Render a SymbolButton for each symbol in the symbols array */}
        {symbols.map((symbol, index) => (
          <SymbolButton
            key={index}
            onPress={() => handleSymbolChoice(symbol)}
            borderColor={index === 0 ? '#F0A500' : '#39A6A3'}
            color={index === 0 ? '#39A6A3' : '#F0A500'}
            style={userSymbol === symbol ? height : {}}>
            {symbol}
          </SymbolButton>
        ))}
      </View>

      <BigText
        marginTop={screenHeight < 812 ? '20%' : '35%'}
        marginLeft={40}
        alignSelf="flex-start">
        Select Difficulty
      </BigText>

      <Line />

      <View style={marginTop} />

      {buttons.map(mode => (
        <Button key={mode} onPress={() => handleGameMode(mode)} bgColor={getColorForMode(mode)} marginTop={15}>
          {mode}
        </Button>
      ))}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#022C43',
    height: '100%',
  },
  symbolChoiceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  marginTop: {
    marginTop: 50,
  },
  height: {
    height: 80,
  },
});

export default Home;
