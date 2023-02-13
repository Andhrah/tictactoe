import React from 'react';
import { TouchableOpacity, Image, StyleSheet} from 'react-native';
import closeIcon from '../../../assets/images/close.png';

/**
 * @description The properties for the `BackButton` component.
 *
 * @typedef {object} BackButtonProps
 * @property {function} onPress - The function to be executed when the back button is pressed.
 * @property {React.ReactNode} [children] - The child elements of the component.
 * @property {number} [marginTop] - The margin from the top of the component.
 * @property {string} [alignSelf] - The alignment of the component along the cross axis.
 * @property {number} [marginLeft] - The margin from the left of the component.
 */
type BackButtonProps = {
  onPress: () => void;
  children?: React.ReactNode; // make the component able to receive children elements
  marginTop?: number;
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'auto' | 'baseline';
  marginLeft?: number;
}

/**
 * @description A back button component to navigate to the previous screen.
 *
 * @param {BackButtonProps} props - Properties for the component.
 * @returns {JSX.Element} - A touchable opacity component with an image inside.
 */
const BackButton = ({onPress, marginTop, alignSelf}: BackButtonProps): JSX.Element => {
  const {container, image} = styles;
  return (
    <TouchableOpacity
      testID="back-button"
      onPress={onPress}
      accessible={true}
      style={{...container,  marginTop, alignSelf }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>

      <Image
        style={image}
        source={closeIcon}
        resizeMode="contain"
        accessibilityLabel="Back button"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
  },
  image: {
    height: 35,
    width: 35,
  },
});

export { BackButton };
