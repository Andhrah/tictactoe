import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BackButton } from '../../src/components/shared/BackButton';

describe('BackButton component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<BackButton onPress={() => {}} />);
    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('handles onPress correctly', () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(<BackButton onPress={mockFn} />);
    fireEvent.press(getByTestId('back-button'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('renders correctly with marginTop and alignSelf', () => {
    const { getByTestId } = render(<BackButton onPress={() => {}} marginTop={20} alignSelf="flex-end" />);
    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('renders correctly with marginLeft', () => {
    const { getByTestId } = render(<BackButton onPress={() => {}} marginLeft={10} />);
    expect(getByTestId('back-button')).toBeTruthy();
  });
});
