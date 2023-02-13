import React from 'react';
import { StyleSheet, Image, ImageSourcePropType, TouchableOpacity} from 'react-native';

/**
 * @description The properties for the `SoundIcon` component.
 *
 * @typedef {Object} SoundIconProps
 * @property {() => void} [onPress] - Function to call when the component is pressed.
 * @property {number} [marginTop] - Margin to be applied to the top of the component.
 * @property {'flex-start' | 'flex-end' | 'center' | 'stretch' | 'auto' | 'baseline'} [alignSelf] - Alignment of the component within its parent container.
 * @property {number} [marginLeft] - Margin to be applied to the left of the component.
 * @property {ImageSourcePropType} src - Image source for the component.
 */
type SoundIconProps = {
  onPress?: () => void;
  marginTop?: number,
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'auto' | 'baseline';
  marginLeft?: number;
  src: ImageSourcePropType;
};

/**
 * @description A component that displays an image that can be pressed.
 * @param {SoundIconProps} props - Props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const SoundIcon = ({marginTop, src, onPress}: SoundIconProps): JSX.Element => {

  const {container, image} = styles;

  return <TouchableOpacity testID="volume-icon" onPress={onPress} style={[container, {marginTop}]}>
    <Image
      style={image}
      source={src}
      resizeMode="contain"
    />
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginRight: 30,
  },
  image: {
    height: 40,
    width: 40,
  },
});

export { SoundIcon };
