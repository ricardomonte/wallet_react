import React from 'react';
import '@testing-library/jest-dom';
import { render,screen } from '@testing-library/react';
import ByeUser from '../ByeUser';

test('Content from ByeUser matches snapshot', () => {
  const content = render(<ByeUser />);
  expect(content.container).toMatchSnapshot();
  expect(screen.getByText('See you soon')).toBeInTheDocument();
});