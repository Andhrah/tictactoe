/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import calculateWinner from '../helpers/calculateWinner';
import { BigText, SoundIcon, BackButton, Button } from './shared';
import Board from './Board';
import { clickSound, gameSound } from '../helpers/sound';
import { makeCpuMove } from '../helpers/CPUMove';
import vollumeOn from '../../assets/images/volume_on.png';
import vollumeOff from '../../assets/images/volume_off.png';

export let player = {
  You: '',
  CPU: '',
  Empty: '',
};

const initialSquares = Array(9).fill(player.Empty);

const TicTacToe = (props: any) => {
  const [squares, setSquares] = useState(initialSquares);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [youIsNext, setYouIsNext] = useState(true);
  const [turn, setTurn] = useState('you');
  const [isWinner, setIsWinner] = useState('');
  const [scoreCard, setScoreCard] = useState({
    You: 0,
    CPU: 0,
    draw: 0,
  });
  const [mode, setMode] = useState('');

  useEffect(() => {
    getUserGameInfo();
    renderWinner();
    if (winner) {return;}
    if (!youIsNext) {
      makeCpuMove(mode, squares, setSquares, setTurn, setYouIsNext);
    }
  }, [youIsNext, mode]);

  const getUserGameInfo = async () => {
    // get player difficulty mode
    const gameMode = await AsyncStorage.getItem('gameMode');
    setMode(gameMode!);

    // get player chosen symbol
    const jsonValue = await AsyncStorage.getItem('player');
    const playerInfo = JSON.parse(jsonValue!);

    player = playerInfo;

    // set scoreCard to local storage if there is none in there.
    const scoreCardInfo = await AsyncStorage.getItem('scoreCard');
    if (scoreCardInfo === null) {
      const currentScoreCard = JSON.stringify(scoreCard);
      await AsyncStorage.setItem('scoreCard', currentScoreCard);
    } else {
      const data = JSON.parse(scoreCardInfo);
      setScoreCard(data);
    }
  };

  // handle game sound for moves
  const handeSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  const makeYourMove = (index: number) => {
    isSoundOn && gameSound.play();

    // make your move only when the has started and its your turn
    if (!isStarted || turn !== 'you') {return;}
    if (winner) {return;}
    if (squares[index] !== player.Empty) {
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = youIsNext ? player.You : player.CPU;

    setSquares(newSquares);
    setTurn('cpu');
    setTimeout(() => {
      setYouIsNext(false);
    }, 1000); // wait for 1 second (1000 milliseconds)
  };

  const winner = calculateWinner(squares);

  const handleScoreBoard = async () => {
    const jsonValue = JSON.stringify(scoreCard);
    await AsyncStorage.setItem('scoreCard', jsonValue);
  };

  const renderWelcome = () => {
    if (squares.every(square => square === player.Empty)) {
      return <Text style={text}>Welcome!</Text>;
    }
  };

  const renderButton = () => {
    if (!isStarted) {
      return <Button onPress={() => {
        isSoundOn && clickSound.play();
        setIsStarted(true);}
      } bgColor="#FFFFFF" style={button} textStyle={buttonText}>Start Game</Button>;
    }
    if (isWinner){
      return <Button
        onPress={() => {
          isSoundOn && clickSound.play();
          setSquares(Array(9).fill(''));
          setIsWinner('');
          setTurn('you');
          setYouIsNext(true);
          setIsStarted(true);
        }}
        bgColor="#FFFFFF" style={button} textStyle={buttonText}>
        Play Again
      </Button>;
    }
  };

  const displayTurn = () => {
    if (turn === 'you') {
      return <Text style={text}>It's your turn!</Text>;
    } else {
      if (isWinner === '') {return;}
      return <Text style={text}>It's CPU's turn</Text>;
    }
  };

  const renderWinner = () => {
    if (squares.every((square) => square !== '')) {
      scoreCard.draw += 1;
      setIsWinner('It\'s a draw!');
      handleScoreBoard();
      return;
    }
    if (winner === player.You) {
      scoreCard.You += 1;
      setIsWinner('You won! 🎉🏆');
      handleScoreBoard();
      return;
    }
    if (winner) {
      scoreCard.CPU += 1;
      setIsWinner('CPU won!');
      handleScoreBoard();
      return;
    }
  };

  // handles back button
  const handleBackButton = () => {
    isSoundOn && clickSound.play();
    props.navigation.goBack();
  };

  // handles onPress for score-card button
  const handleScoreCard = () => {
    isSoundOn && clickSound.play();
    props.navigation.navigate('ScoreBoard');
  };

  const { container, ScoreBoardContainer, ScoreBoardText, iconContainer, button, buttonText, text } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar
        animated={true}
        backgroundColor="#022C43"
        barStyle="light-content"
      />
      <View style={iconContainer}>

        <BackButton onPress={handleBackButton} />

        <TouchableOpacity onPress={handleScoreCard}
          style={ScoreBoardContainer}>

          <Text style={ScoreBoardText}>Score Board</Text>
        </TouchableOpacity>

        {
          isSoundOn ?
          <SoundIcon onPress={handeSound} src={vollumeOn} />
          : <SoundIcon onPress={handeSound} src={vollumeOff} />
        }
      </View>

      <BigText marginBottom={40} marginTop={40}>Tic Tac Toe</BigText>

      <Board squares={squares} onSquarePress={makeYourMove} />

      {isWinner && <Text style={text}>{isWinner}</Text>}
      {isStarted && !winner && isWinner === '' ? displayTurn() : <></>}
      {!isStarted && renderWelcome()}

      {renderButton()}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#022C43',
    height: '100%',
    width: '100%',
  },
  buttonText: {
    fontSize: 20,
    color: '#212945',
    fontWeight: '700',
  },
  button: {
    width: '40%',
    height: 60,
    borderRadius: 5,
  },
  text: {
    marginTop: 50,
    marginBottom: 30,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  ScoreBoardContainer: {
    backgroundColor: '#39A6A3',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
  },
  ScoreBoardText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
});

export default TicTacToe;
