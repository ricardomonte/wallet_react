import React from 'react';
import '@testing-library/jest-dom';
import { render,screen } from '@testing-library/react';
import BtcAmount from '../BtcAmount';

test('Content from BtcAmount matches snapshot', () => {
  const content = render(<BtcAmount btcAmount={'0.2'} />);
  expect(content.container).toMatchSnapshot();
  expect(screen.getByText('Available funds:')).toBeInTheDocument();
});