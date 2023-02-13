import React from 'react';
import { StyleSheet, View } from 'react-native';
import { player } from '../utils/player';
import Square from './Square';

type BoardProps = {
  squares: player[];
  onSquarePress: (index: number) => void;
}

const Board = ({ squares, onSquarePress }: BoardProps): JSX.Element => (
  <View testID="board" style={styles.board}>
    {squares.map((square, index) => (
      <Square
        key={index}
        value={square}
        onPress={() => onSquarePress(index)}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  board: {
    width: '75%',
    height: '34%',
    flexWrap: 'wrap',
  },
});

export default Board;
