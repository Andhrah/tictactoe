import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../../src/components/Home';

jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
}));

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
  const utils = render(<Home navigation={{ navigate: mockNavigate }} />);

  return {
    ...utils,
    mockNavigate,
  };
};

describe('Home component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the sound icon', () => {
    const { getByTestId } = setup();
    const soundIcon = getByTestId('volume-icon');
    expect(soundIcon).toBeDefined();
  });

  it('should toggle sound on/off when sound icon is pressed', () => {
    const { getByTestId, rerender } = setup();
    const soundIcon = getByTestId('volume-icon');
    fireEvent.press(soundIcon);
    rerender(<Home />);
    const soundIconOff = getByTestId('volume-icon');
    expect(soundIconOff).toBeDefined();
  });

  it('should render the player symbol choices', () => {
    const { getAllByTestId } = setup();
    const symbolButtons = getAllByTestId('symbol-button');
    expect(symbolButtons).toHaveLength(2);
  });

  it('should render the game mode buttons', () => {
    const { getAllByTestId } = setup();
    const gameModeButtons = getAllByTestId('app-button');
    expect(gameModeButtons).toHaveLength(3);
  });

});
