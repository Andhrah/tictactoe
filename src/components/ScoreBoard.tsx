import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, SafeAreaView, StatusBar  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SymbolButton, BigText, BackButton, Line } from './shared';

const screenHeight = Dimensions.get('screen').height;

const ScoreBoard = (props: any) => {

  const [scoreCard, setScoreCard] = useState({
    You: 0,
    CPU: 0,
    draw: 0,
  });

  useEffect(() => {
    getScores();
  }, []);

  const getScores = async () => {
    const scoreCardInfo = await AsyncStorage.getItem('scoreCard');
    if (scoreCardInfo) {
      const data = JSON.parse(scoreCardInfo);
      setScoreCard(data);
    }
  };

  const { container, scoreContainer, cardContainer, text } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar
        animated={true}
        backgroundColor="#022C43"
        barStyle="light-content"
      />

      <BackButton onPress={() => props.navigation.goBack()} marginTop={screenHeight <  812 ? 25 : 30} alignSelf="flex-start" />

      <BigText alignSelf="flex-start" marginTop={80} marginLeft={40}>Score Board</BigText>

      <Line />

      <View style={scoreContainer}>
        <View style={cardContainer}>

          <Text style={text}>You</Text>

          <SymbolButton
            borderColor="#F0A500"
            color="#39A6A3"
            style={styles.card}>
            {scoreCard.You}
          </SymbolButton>
          <Text style={styles.text}>Wins</Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.text}>CPU</Text>
          <SymbolButton
            borderColor="#39A6A3"
            color="#F0A500"
            style={styles.card}>
            {scoreCard.CPU}
          </SymbolButton>
          <Text style={styles.text}>Wins</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022C43',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  cardContainer: {
    width: '30%',
    height: '40%',
    marginHorizontal: 40,
  },
  card: {
    width: '100%',
    height: '100%',
    marginTop: 0,
    marginHorizontal: 0,
  },
});

export default ScoreBoard;
