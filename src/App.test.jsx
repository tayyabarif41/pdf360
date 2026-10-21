import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders the referral dashboard', () => {
  render(<App />);
  expect(
    screen.getByText(/Cross-Sell: CRM Referral Dashboard - Key Segment Summary/i)
  ).toBeInTheDocument();
});
