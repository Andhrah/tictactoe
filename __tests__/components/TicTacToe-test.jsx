import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TicTacToe from '../../src/components/TicTacToe';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('../../src/helpers/CPUMove', () => ({
  makeCpuMove: jest.fn(),
}));
jest.mock('../../src/helpers/calculateWinner', () => jest.fn());
jest.mock('react-native-sound', () => {
  class SoundMock {
    constructor() {}
  }
  return SoundMock;
});
jest.mock('../../assets/audios/clickselect.mp3', () => {
  return jest.fn();
});
jest.mock('../../assets/audios/game_sound.wav', () => {
  return jest.fn();
});

const setup = () => {
  const mockNavigate = jest.fn();
  const utils = render(<TicTacToe navigation={{ navigate: mockNavigate }} />);

  return {
    ...utils,
    mockNavigate,
  };
};

describe('TicTacToe', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockImplementation(() => Promise.resolve(JSON.stringify({
      You: 'X',
      CPU: 'O',
      Empty: '',
    })));
    AsyncStorage.setItem.mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the welcome message when the game starts', async () => {
    const { getByText } = render(<TicTacToe />);
    await act(async () => {});

    expect(getByText('Welcome!')).toBeDefined();
  });

  it('renders the start button when the game has not started', async () => {
    const { getByText } = render(<TicTacToe />);
    await act(async () => {});

    expect(getByText('Start Game')).toBeDefined();
  });


  it('should toggle sound on/off when sound icon is pressed', async () => {
    const { getByTestId, rerender } = setup();
    const soundIcon = getByTestId('volume-icon');

    await act(async () => {});

    fireEvent.press(soundIcon);
    rerender(<TicTacToe />);
    const soundIconOff = getByTestId('volume-icon');
    expect(soundIconOff).toBeDefined();
  });

});
