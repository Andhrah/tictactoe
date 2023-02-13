import React from 'react';
import { Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

/**
 * @description The properties for the `SymbolButton` component.
 *
 * @typedef {object} SymbolButtonProps
 * @property {() => void} [onPress] - Callback function that is called when the button is pressed.
 * @property {React.ReactNode} [children] - The content of the button, could be text or any other React element.
 * @property {string} [borderColor] - The border color of the button.
 * @property {string} [color] - The text color of the button.
 * @property {boolean} [disabled] - Determines if the button is disabled or not.
 * @property {string} [className] - A class name for the button element.
 * @property {StyleProp<ViewStyle>} [style] - An optional custom styles object for the button element.
 */
type SymbolButtonProps = {
  onPress?: () => void;
  children?: React.ReactNode; // make the component able to receive children elements
  borderColor?: string;
  color?: string;
  disabled?: boolean; // make the button disabled or not
  className?: string,
  style?: StyleProp<ViewStyle>;
};

/**
 * @description A component that represents a symbol button.
 *
 * @param {SymbolButtonProps} props - The properties of the component.
 *
 * @returns {JSX.Element} - A React Native component that represents the symbol button.
 */
const SymbolButton = ({ children, borderColor, onPress, color, style }: SymbolButtonProps): JSX.Element => {

  const { button, buttonText } = styles;
  return (
    <TouchableOpacity testID="symbol-button" style={[button, {borderColor: borderColor}, style]} onPress={onPress}>
      <Text style={[buttonText, {color: color}]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    marginHorizontal: 15,
    justifyContent: 'center',
    height: 70,
    width: 73,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export { SymbolButton };
