import {render, screen} from '@testing-library/react';
import Features from '../Features';

describe('Features Component', () => {
  test('renders the title', () => {
    render(<Features />);

    const title = screen.getByRole('heading', {level: 3});
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Key Features');
  });

  test('renders correct number of feature cards', () => {
    render(<Features />);

    const cards = [];
    const firstCard = screen.getByText('Personalized Workouts');
    const secondCard = screen.getByText('Supplement Tracking');
    const thirdCard = screen.getByText('Progress Analytics');
    cards.push(firstCard, secondCard, thirdCard);

    expect(cards).toHaveLength(3);
  });

  test('renders the correct content for each feature card', () => {
    render(<Features />);

    const features = [
      {
        title: 'Personalized Workouts',
        description: "Exercise tracking based on local gyms' machines",
      },
      {
        title: 'Supplement Tracking',
        description: 'Log your assisters and track your intake effortlessly',
      },
      {
        title: 'Progress Analytics',
        description:
          'Visualize your fitness journey with detailed progress reports',
      },
    ];

    for (const feature of features) {
      const featureTitle = screen.getByText(feature.title);
      const featureDescription = screen.getByText(feature.description);

      expect(featureTitle).toBeInTheDocument();
      expect(featureDescription).toBeInTheDocument();
    }
  });
});
