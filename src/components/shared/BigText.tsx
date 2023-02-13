import React from 'react';
import { Text, StyleSheet} from 'react-native';

/**
 * @description The properties for the `BigText` component.
 *
 * @typedef {object} BigTextProps
 * @property {React.ReactNode} [children] - The children to render inside the Text component.
 * @property {(number|string)} [marginTop] - The margin at the top of the Text component.
 * @property {('flex-start'|'flex-end'|'center'|'stretch'|'auto'|'baseline')} [alignSelf] - Specifies how the component should be aligned along the cross axis.
 * @property {number} [marginLeft] - The margin at the left of the Text component.
 * @property {number} [marginBottom] - The margin at the bottom of the Text component.
 */
type BigTextProps = {
  children?: React.ReactNode;
  marginTop?: number | string,
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'auto' | 'baseline';
  marginLeft?: number;
  marginBottom?: number;
};

/**
 * @description A component to render big text.
 *
 * @param {BigTextProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
const BigText = ({children, marginTop, alignSelf, marginLeft, marginBottom}: BigTextProps): JSX.Element => {
  return (
    <Text style={{...styles.text, marginTop, alignSelf, marginLeft, marginBottom}}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#FFFF',
  },
});

export { BigText };
