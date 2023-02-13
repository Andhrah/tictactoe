import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { player } from '../utils/player';

interface SquareProps {
  value: player;
  onPress: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onPress }) => (
  <TouchableOpacity style={styles.squareContainer} onPress={onPress}>
    <Text style={styles.squareText}>{value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  squareContainer: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F0A500',
    borderWidth: 7,
    borderRadius: 10,
  },
  squareText: {
    fontSize: 50,
    color: '#FF276A',
    fontWeight: 'bold',
  },
});

export default Square;
