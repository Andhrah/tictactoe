import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * @description Line component to render a horizontal line.
 *
 * @returns {JSX.Element} The line component.
 */
const Line = (): JSX.Element => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 5,
    width: 140,
    backgroundColor: '#E87613',
    marginTop: 4,
    marginLeft: 40,
    alignSelf: 'flex-start',
  },
});

export { Line };
