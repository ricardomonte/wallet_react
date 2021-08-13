import React from 'react';
import '@testing-library/jest-dom';
import { render,screen } from '@testing-library/react';
import Error from '../Error';

test('Content from BtcAmount matches snapshot', () => {
  const content = render(<Error />);
  expect(content.container).toMatchSnapshot();
  expect(screen.getByText('We are sorry, something went wrong')).toBeInTheDocument();
});