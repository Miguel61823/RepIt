import {render, screen} from '@testing-library/react';
import Plans from '../plans';

describe('Plans Component', () => {
  test('renders the title', () => {
    render(<Plans />);

    const title = screen.getByRole('heading', {level: 3});
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Pricing Plans');
  });

  test('renders correct number of plan cards', () => {
    render(<Plans />);

    const cards = [];
    const basicCard = screen.getByText('Basic');
    const proCard = screen.getByText('Pro');
    const eliteCard = screen.getByText('Elite');
    cards.push(basicCard, proCard, eliteCard);

    expect(cards).toHaveLength(3);
  });

  test('renders the correct pricing for each plan', () => {
    render(<Plans />);

    const prices = [
      {price: '$9.99', plan: 'Basic'},
      {price: '$19.99', plan: 'Pro'},
      {price: '$29.99', plan: 'Elite'},
    ];

    for (const item of prices) {
      const priceElement = screen.getByText(item.price);
      const planElement = screen.getByText(item.plan);
      expect(priceElement).toBeInTheDocument();
      expect(planElement).toBeInTheDocument();
    }
  });

  test('renders the correct features for each plan', () => {
    render(<Plans />);

    const planFeatures = {
      basic: [
        '✓ Personalized workouts',
        '✓ Basic nutrition tracking',
        '✓ Limited progress analytics',
      ],
      pro: [
        '✓ Advanced personalized workouts',
        '✓ Comprehensive nutrition tracking',
        '✓ Full progress analytics',
        '✓ Coach support',
      ],
      elite: [
        '✓ All Pro features',
        '✓ Personalized meal plans',
        '✓ 1-on-1 coaching sessions',
        '✓ Premium content access',
      ],
    };

    for (const features of Object.values(planFeatures)) {
      for (const feature of features) {
        const featureElement = screen.getByText(feature);
        expect(featureElement).toBeInTheDocument();
      }
    }
  });

  test('renders "Choose Plan" button for each plan', () => {
    render(<Plans />);

    const buttons = screen.getAllByText('Choose Plan');
    expect(buttons).toHaveLength(3);
  });

  test('renders monthly subscription text for each plan', () => {
    render(<Plans />);

    const monthlyTexts = screen.getAllByText('/month');
    expect(monthlyTexts).toHaveLength(3);
  });
});
