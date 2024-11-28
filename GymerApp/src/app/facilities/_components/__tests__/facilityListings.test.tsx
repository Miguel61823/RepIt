// __tests__/FacilityListings.test.tsx
import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import FacilityListings from '../facilityListings';
import * as facilitiesApi from '@/server/api/facilities';
import findSportsFacilities from '@/lib/osm';

jest.mock('@/server/api/facilities', () => ({
  getNearbyFacilities: jest.fn(),
  insertFacilities: jest.fn(),
}));

jest.mock('@/lib/osm', () => jest.fn());

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mocking the Geolocation API
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};
global.navigator.geolocation = mockGeolocation;

describe('FacilityListings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    render(<FacilityListings search={undefined} />);
    expect(screen.getByText('Radius: 2 km')).toBeInTheDocument();
    expect(screen.getByText("I don't see my facility")).toBeInTheDocument();
  });

  it('displays an error if location services are disabled', async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((_, reject) =>
      reject(new Error('Geolocation error')),
    );

    render(<FacilityListings search={undefined} />);
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() =>
      expect(
        screen.getByText('Please enable location services.'),
      ).toBeInTheDocument(),
    );
  });

  it('calls handleDBSearch and displays facilities', async () => {
    const mockFacilities = [
      {osm_id: '1', name: 'Facility A', lat: 37.7749, lon: -122.4194},
      {osm_id: '2', name: 'Facility B', lat: 37.7849, lon: -122.4094},
    ];

    mockGeolocation.getCurrentPosition.mockImplementation((resolve) =>
      resolve({coords: {latitude: 37.7749, longitude: -122.4194}}),
    );

    facilitiesApi.getNearbyFacilities.mockResolvedValue(mockFacilities);

    render(<FacilityListings search={undefined} />);
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => expect(facilitiesApi.getNearbyFacilities).toHaveBeenCalled());

    expect(screen.getByText('Facility A')).toBeInTheDocument();
    expect(screen.getByText('Facility B')).toBeInTheDocument();
  });

  it('calls handleOSMSearch and inserts facilities', async () => {
    const mockOSMFacilities = [
      {osm_id: '3', name: 'Facility C', lat: 37.7649, lon: -122.4294},
    ];

    mockGeolocation.getCurrentPosition.mockImplementation((resolve) =>
      resolve({coords: {latitude: 37.7749, longitude: -122.4194}}),
    );

    (findSportsFacilities as jest.Mock).mockResolvedValue(mockOSMFacilities);

    render(<FacilityListings search={undefined} />);
    fireEvent.click(screen.getByText("I don't see my facility"));

    await waitFor(() =>
      expect(findSportsFacilities).toHaveBeenCalledWith(
        37.7749,
        -122.4194,
        2000, // range * 1000
      ),
    );
    expect(facilitiesApi.insertFacilities).toHaveBeenCalledWith(mockOSMFacilities);
  });
});
