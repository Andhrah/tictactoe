import React from 'react';
import { Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

/**
 * @description The properties for the `Button` component.
 *
 * @typedef {object} ButtonProps
 * @property {() => void} [onPress] - The function that will be called when the button is pressed.
 * @property {React.ReactNode} [children] - The children to render inside the button.
 * @property {string} [bgColor] - The background color of the button.
 * @property {string} [color] - The color of the text inside the button.
 * @property {boolean} [disabled] - Whether or not the button is disabled.
 * @property {string} [className] - A class name for styling the button.
 * @property {number} [marginTop] - The margin at the top of the button.
 * @property {StyleProp<ViewStyle>} [style] - Style object to pass to the button.
 * @property {object} [textStyle] - Style object to pass to the text inside the button.
 */
type ButtonProps = {
  onPress?: () => void;
  children?: React.ReactNode;
  bgColor?: string;
  color?: string;
  disabled?: boolean;
  className?: string,
  marginTop?: number,
  style?: StyleProp<ViewStyle>;
  textStyle?: object;
};

/**
 * @description A component to render a button.
 *
 * @param {ButtonProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
const Button = ({ children, bgColor, onPress, marginTop, style, textStyle }: ButtonProps): JSX.Element => {
  const {button, buttonText} = styles;
  return (
    <TouchableOpacity testID="app-button" style={[button, style, {backgroundColor: bgColor, marginTop: marginTop}]} onPress={onPress}>
      <Text style={[buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    height: 68,
    width: '80%',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export { Button };
