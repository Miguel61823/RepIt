import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import FacilityCard from '../FacilityCard';
import {Facility} from '@/server/api/facilities';
import {EquipmentData} from '@/drizzle/api/equipment';
import { ClerkProvider } from '@clerk/clerk-react';

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useSession: () => ({
    session: {
      user: {
        id: 'test-user-id',
      },
    },
    isSignedIn: true,
    isLoaded: true,
  }),
}));

const mockFacility: Facility = {
  osm_id: 'facility123',
  name: 'Test Facility',
  address: '123 Test Street',
  phone: '123-456-7890',
  leisure: 'fitness_centre',
  website: 'https://testfacility.com',
  lat: undefined,
  lon: undefined,
  accessibility: '',
};

const mockEquipment: EquipmentData[] = [
  {
    osm_id: 'facility123',
    user_id: 'user1',
    name: 'Treadmill',
    identifier: 'eq1',
    type: 'cardio',
    condition: 'excellent',
    description: 'A high-quality treadmill',
    maintenance_date: '2024-11-01',
    quantity: 1,
  },
];

describe('FacilityCard Component', () => {
  const renderWithClerk = (component: React.ReactNode) => {
    return render(
      <ClerkProvider publishableKey="mock_key">
        {component}
      </ClerkProvider>
    );
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  it('renders facility information correctly', () => {
    renderWithClerk(<FacilityCard facility={mockFacility} />);

    expect(screen.getByText('Test Facility')).toBeInTheDocument();
    expect(screen.getByText('123 Test Street')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('Fitness Center')).toBeInTheDocument();
  });

  it('renders website link with correct URL', () => {
    render(<FacilityCard facility={mockFacility} />);

    const websiteLink = screen.getByText('- link');
    expect(websiteLink).toHaveAttribute('href', 'https://testfacility.com');
  });

  it('falls back to Google search link if no website is provided', () => {
    const facilityWithoutWebsite = {...mockFacility, website: ''};
    render(<FacilityCard facility={facilityWithoutWebsite} />);

    const googleSearchLink = screen.getByText('- check the web');
    expect(googleSearchLink).toHaveAttribute(
      'href',
      'https://www.google.com/search?q=Test Facility',
    );
  });

  it('fetches equipment when AddEquipmentButton triggers callback', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({data: mockEquipment}),
    });

    render(<FacilityCard facility={mockFacility} />);

    // Simulate adding equipment
    const addEquipmentButton = screen.getByText(/Add Equipment/i);
    fireEvent.click(addEquipmentButton);

    // Wait for fetch to resolve and component to update
    expect(fetch).toHaveBeenCalledWith('/api/equipment?osm_id=facility123');
    expect(await screen.findByText('Treadmill')).toBeInTheDocument();
  });

  it('handles fetch errors gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<FacilityCard facility={mockFacility} />);

    // Simulate adding equipment
    const addEquipmentButton = screen.getByText(/Add Equipment/i);
    fireEvent.click(addEquipmentButton);

    // Wait for fetch to fail
    expect(fetch).toHaveBeenCalledWith('/api/equipment?osm_id=facility123');
    expect(
      screen.queryByText('Treadmill'), // Ensure no equipment is displayed
    ).not.toBeInTheDocument();
  });
});
