import React from 'react';
import { render } from '@testing-library/react-native';
import { BigText } from '../../src/components/shared/BigText';

describe('BigText component', () => {
  it('renders correctly', () => {
    render(<BigText />);
  });
  it('renders the text passed as children prop', () => {
    const text = 'Some text';
    const { getByText } = render(<BigText>{text}</BigText>);

    expect(getByText(text)).toBeTruthy();
  });

  it('renders with marginTop prop passed', () => {
    const marginTop = 20;
    const { getByText } = render(<BigText marginTop={marginTop}>Some text</BigText>);

    expect(getByText('Some text').props.style).toHaveProperty('marginTop', marginTop);
  });

  it('renders with alignSelf prop passed', () => {
    const alignSelf = 'center';
    const { getByText } = render(<BigText alignSelf={alignSelf}>Some text</BigText>);

    expect(getByText('Some text').props.style).toHaveProperty('alignSelf', alignSelf);
  });

  it('renders with marginLeft prop passed', () => {
    const marginLeft = 20;
    const { getByText } = render(<BigText marginLeft={marginLeft}>Some text</BigText>);

    expect(getByText('Some text').props.style).toHaveProperty('marginLeft', marginLeft);
  });

  it('renders with marginBottom prop passed', () => {
    const marginBottom = 20;
    const { getByText } = render(<BigText marginBottom={marginBottom}>Some text</BigText>);

    expect(getByText('Some text').props.style).toHaveProperty('marginBottom', marginBottom);
  });
});
